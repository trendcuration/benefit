#!/usr/bin/env bash
# 정부24 데이터를 새로 받아 benefit 저장소 `data` 브랜치에 올린다(매주 토요일 새벽 cron).
#  1) gov24-sync.mjs 로 ../benefit-data/v1 생성
#  2) 데이터 커밋(A) → pointer.json 에 A를 적어 커밋(B) → 푸시
#  3) jsDelivr 의 @data/pointer.json 캐시를 비워 앱이 새 커밋을 보게 한다
# 앱은 pointer.json 의 커밋으로 고정된 주소에서 데이터를 읽으므로, 실패해도 이전 데이터가 그대로 쓰인다.
set -euo pipefail
cd "$(dirname "$0")/.."
DATA_DIR="$(cd .. && pwd)/benefit-data"
LOG_PREFIX="[gov24-publish $(date '+%F %T')]"

node scripts/gov24-sync.mjs "$DATA_DIR"

cd "$DATA_DIR"
git add -A v1
if git diff --cached --quiet; then
  echo "$LOG_PREFIX 바뀐 데이터 없음"
  exit 0
fi
git commit -q -m "data: 정부24 공공서비스 $(date '+%F')"
DATA_COMMIT=$(git rev-parse HEAD)
printf '{"commit":"%s","updatedAt":"%s"}\n' "$DATA_COMMIT" "$(date -u '+%FT%TZ')" > pointer.json
git add pointer.json
git commit -q -m "pointer: $DATA_COMMIT"

for i in 1 2 3 4; do
  git push -q origin data && break
  sleep $((2 ** i))
done
git fetch -q origin data
[ "$(git rev-parse HEAD)" = "$(git rev-parse origin/data)" ] || { echo "$LOG_PREFIX 푸시 확인 실패"; exit 1; }

# 푸시 직후엔 jsDelivr가 브랜치의 새 커밋을 아직 못 봐서 한 번 비워도 옛 값이 다시 캐시될 수 있다 —
# 잠시 기다렸다 한 번 더 비우고, 새 커밋이 보이는지 확인한다.
for wait in 0 30 60; do
  sleep "$wait"
  curl -s --max-time 30 "https://purge.jsdelivr.net/gh/trendcuration/benefit@data/pointer.json" > /dev/null || true
  sleep 5
  if curl -s --max-time 15 "https://cdn.jsdelivr.net/gh/trendcuration/benefit@data/pointer.json" | grep -q "$DATA_COMMIT"; then
    break
  fi
done
echo "$LOG_PREFIX 완료: data $DATA_COMMIT"
