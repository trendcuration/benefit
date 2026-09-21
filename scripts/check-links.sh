#!/usr/bin/env bash
# 지원금 링크(src/data/subsidies.ts)와 복지로 링크가 실제로 열리는지 점검한다.
# 사용: bash scripts/check-links.sh
# - 도메인 없음(curl 6)·인증서 오류(60)·HTTP 4xx/5xx가 "확실한 깨진 링크"다.
# - 시간 초과(28)는 정부 사이트의 해외 IP 차단일 수 있어(서버가 해외에 있으면) 국내에서 직접 확인이 필요하다.
set -u
cd "$(dirname "$0")/.."
grep -oE "url: *'[^']+'" src/data/subsidies.ts | sed "s/url: *'//;s/'$//" > /tmp/benefit-urls.txt
echo "https://www.bokjiro.go.kr" >> /tmp/benefit-urls.txt
sort -u /tmp/benefit-urls.txt -o /tmp/benefit-urls.txt
check() {
  local u="$1" out rc
  out=$(curl -s -o /dev/null -L --max-time 20 --max-redirs 6 -c /tmp/bk-ck -b /tmp/bk-ck \
    -A "Mozilla/5.0 (Linux; Android 14) Chrome/126 Mobile Safari/537.36" \
    -w "%{http_code}|%{time_total}" "$u" 2>/dev/null); rc=$?
  echo "$rc|$out|$u"
}
export -f check
grep -v '^$' /tmp/benefit-urls.txt | xargs -P 8 -I{} bash -c 'check "{}"' | sort > /tmp/benefit-linkcheck.txt
echo "총 $(wc -l < /tmp/benefit-linkcheck.txt)개 점검"
awk -F'|' '$1!=0 || $2>=400 {printf "문제: curl=%s HTTP=%s  %s\n", $1, $2, $4}' /tmp/benefit-linkcheck.txt
echo "정상: $(awk -F'|' '$1==0 && $2>=200 && $2<400' /tmp/benefit-linkcheck.txt | wc -l)개"
