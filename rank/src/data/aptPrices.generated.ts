// 자동 생성 파일 — scripts/fetch-apt-prices.mjs → build-apt-dataset.mjs 순서로 다시 생성하세요. 직접 수정하지 마세요.
// 국토교통부 아파트매매 실거래가 상세 자료 기준(가격대별 대표 단지 샘플)

export interface AptSeriesPoint {
  ym: string;
  medianManwon: number;
}

export interface AptComplex {
  name: string;
  dong: string;
  sggName: string;
  pyeong: number;
  areaM2: number;
  latestManwon: number;
  series: AptSeriesPoint[];
}

export interface RegionGroupData {
  label: string;
  complexes: AptComplex[];
}

export const APT_PRICE_DATA: Record<string, RegionGroupData> = {
  "gangnam-bundang": {
    "label": "강남·분당",
    "complexes": [
      {
        "name": "시범한양",
        "dong": "서현동",
        "sggName": "분당구",
        "pyeong": 9,
        "areaM2": 28.71,
        "latestManwon": 92900,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 63000
          },
          {
            "ym": "202206",
            "medianManwon": 55000
          },
          {
            "ym": "202212",
            "medianManwon": 54000
          },
          {
            "ym": "202303",
            "medianManwon": 57000
          },
          {
            "ym": "202306",
            "medianManwon": 58050
          },
          {
            "ym": "202309",
            "medianManwon": 61950
          },
          {
            "ym": "202312",
            "medianManwon": 55000
          },
          {
            "ym": "202403",
            "medianManwon": 59150
          },
          {
            "ym": "202406",
            "medianManwon": 63750
          },
          {
            "ym": "202409",
            "medianManwon": 71500
          },
          {
            "ym": "202412",
            "medianManwon": 68000
          },
          {
            "ym": "202503",
            "medianManwon": 68000
          },
          {
            "ym": "202506",
            "medianManwon": 70000
          },
          {
            "ym": "202509",
            "medianManwon": 76150
          },
          {
            "ym": "202603",
            "medianManwon": 99000
          },
          {
            "ym": "202606",
            "medianManwon": 92900
          }
        ]
      },
      {
        "name": "한솔마을(4단지)(주공)",
        "dong": "정자동",
        "sggName": "분당구",
        "pyeong": 11,
        "areaM2": 35.28,
        "latestManwon": 103000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 70900
          },
          {
            "ym": "202206",
            "medianManwon": 71000
          },
          {
            "ym": "202209",
            "medianManwon": 56000
          },
          {
            "ym": "202212",
            "medianManwon": 50400
          },
          {
            "ym": "202303",
            "medianManwon": 54750
          },
          {
            "ym": "202306",
            "medianManwon": 59980
          },
          {
            "ym": "202309",
            "medianManwon": 61350
          },
          {
            "ym": "202312",
            "medianManwon": 57000
          },
          {
            "ym": "202403",
            "medianManwon": 54700
          },
          {
            "ym": "202406",
            "medianManwon": 55500
          },
          {
            "ym": "202409",
            "medianManwon": 63000
          },
          {
            "ym": "202412",
            "medianManwon": 58000
          },
          {
            "ym": "202503",
            "medianManwon": 58850
          },
          {
            "ym": "202506",
            "medianManwon": 60000
          },
          {
            "ym": "202509",
            "medianManwon": 66000
          },
          {
            "ym": "202512",
            "medianManwon": 81500
          },
          {
            "ym": "202603",
            "medianManwon": 98000
          },
          {
            "ym": "202606",
            "medianManwon": 103000
          }
        ]
      },
      {
        "name": "청솔마을(주공9단지)",
        "dong": "금곡동",
        "sggName": "분당구",
        "pyeong": 11,
        "areaM2": 36.54,
        "latestManwon": 103200,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 69500
          },
          {
            "ym": "202212",
            "medianManwon": 55000
          },
          {
            "ym": "202303",
            "medianManwon": 58000
          },
          {
            "ym": "202306",
            "medianManwon": 59500
          },
          {
            "ym": "202309",
            "medianManwon": 63500
          },
          {
            "ym": "202403",
            "medianManwon": 61250
          },
          {
            "ym": "202406",
            "medianManwon": 61800
          },
          {
            "ym": "202409",
            "medianManwon": 64500
          },
          {
            "ym": "202412",
            "medianManwon": 63550
          },
          {
            "ym": "202503",
            "medianManwon": 65500
          },
          {
            "ym": "202506",
            "medianManwon": 65000
          },
          {
            "ym": "202509",
            "medianManwon": 77250
          },
          {
            "ym": "202512",
            "medianManwon": 86750
          },
          {
            "ym": "202603",
            "medianManwon": 97300
          },
          {
            "ym": "202606",
            "medianManwon": 103200
          }
        ]
      },
      {
        "name": "한솔마을(6단지)(주공)",
        "dong": "정자동",
        "sggName": "분당구",
        "pyeong": 11,
        "areaM2": 37.67,
        "latestManwon": 108000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 74650
          },
          {
            "ym": "202209",
            "medianManwon": 59000
          },
          {
            "ym": "202212",
            "medianManwon": 53000
          },
          {
            "ym": "202303",
            "medianManwon": 56050
          },
          {
            "ym": "202306",
            "medianManwon": 62000
          },
          {
            "ym": "202403",
            "medianManwon": 59700
          },
          {
            "ym": "202406",
            "medianManwon": 63200
          },
          {
            "ym": "202409",
            "medianManwon": 64800
          },
          {
            "ym": "202412",
            "medianManwon": 60900
          },
          {
            "ym": "202503",
            "medianManwon": 64100
          },
          {
            "ym": "202506",
            "medianManwon": 67500
          },
          {
            "ym": "202509",
            "medianManwon": 70000
          },
          {
            "ym": "202512",
            "medianManwon": 100000
          },
          {
            "ym": "202603",
            "medianManwon": 85550
          },
          {
            "ym": "202606",
            "medianManwon": 108000
          }
        ]
      },
      {
        "name": "양지마을(5단지)(한양501-514)",
        "dong": "수내동",
        "sggName": "분당구",
        "pyeong": 11,
        "areaM2": 35.1,
        "latestManwon": 118250,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 72500
          },
          {
            "ym": "202303",
            "medianManwon": 66500
          },
          {
            "ym": "202306",
            "medianManwon": 66000
          },
          {
            "ym": "202309",
            "medianManwon": 71000
          },
          {
            "ym": "202312",
            "medianManwon": 67000
          },
          {
            "ym": "202403",
            "medianManwon": 58000
          },
          {
            "ym": "202406",
            "medianManwon": 71000
          },
          {
            "ym": "202409",
            "medianManwon": 83500
          },
          {
            "ym": "202412",
            "medianManwon": 79250
          },
          {
            "ym": "202503",
            "medianManwon": 74750
          },
          {
            "ym": "202506",
            "medianManwon": 80000
          },
          {
            "ym": "202509",
            "medianManwon": 95000
          },
          {
            "ym": "202512",
            "medianManwon": 112000
          },
          {
            "ym": "202603",
            "medianManwon": 120500
          },
          {
            "ym": "202606",
            "medianManwon": 118250
          }
        ]
      },
      {
        "name": "무지개(12단지)(주공)",
        "dong": "구미동",
        "sggName": "분당구",
        "pyeong": 18,
        "areaM2": 58.14,
        "latestManwon": 125000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 73000
          },
          {
            "ym": "202206",
            "medianManwon": 72000
          },
          {
            "ym": "202303",
            "medianManwon": 62250
          },
          {
            "ym": "202306",
            "medianManwon": 62500
          },
          {
            "ym": "202312",
            "medianManwon": 62250
          },
          {
            "ym": "202403",
            "medianManwon": 58000
          },
          {
            "ym": "202406",
            "medianManwon": 62200
          },
          {
            "ym": "202409",
            "medianManwon": 63700
          },
          {
            "ym": "202412",
            "medianManwon": 62250
          },
          {
            "ym": "202503",
            "medianManwon": 67800
          },
          {
            "ym": "202506",
            "medianManwon": 70750
          },
          {
            "ym": "202509",
            "medianManwon": 75250
          },
          {
            "ym": "202512",
            "medianManwon": 99000
          },
          {
            "ym": "202603",
            "medianManwon": 113000
          },
          {
            "ym": "202606",
            "medianManwon": 125000
          }
        ]
      },
      {
        "name": "한솔마을(1단지)(청구)",
        "dong": "정자동",
        "sggName": "분당구",
        "pyeong": 26,
        "areaM2": 84.965,
        "latestManwon": 133000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 128250
          },
          {
            "ym": "202206",
            "medianManwon": 133000
          },
          {
            "ym": "202212",
            "medianManwon": 95000
          },
          {
            "ym": "202303",
            "medianManwon": 102000
          },
          {
            "ym": "202306",
            "medianManwon": 120000
          },
          {
            "ym": "202309",
            "medianManwon": 118000
          },
          {
            "ym": "202403",
            "medianManwon": 126000
          },
          {
            "ym": "202406",
            "medianManwon": 126000
          },
          {
            "ym": "202409",
            "medianManwon": 125500
          },
          {
            "ym": "202412",
            "medianManwon": 131500
          },
          {
            "ym": "202503",
            "medianManwon": 131000
          },
          {
            "ym": "202506",
            "medianManwon": 145000
          },
          {
            "ym": "202509",
            "medianManwon": 148000
          },
          {
            "ym": "202603",
            "medianManwon": 175000
          },
          {
            "ym": "202606",
            "medianManwon": 133000
          }
        ]
      },
      {
        "name": "까치마을",
        "dong": "수서동",
        "sggName": "강남구",
        "pyeong": 10,
        "areaM2": 34.44,
        "latestManwon": 145000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 100625
          },
          {
            "ym": "202303",
            "medianManwon": 89000
          },
          {
            "ym": "202306",
            "medianManwon": 82575
          },
          {
            "ym": "202309",
            "medianManwon": 89500
          },
          {
            "ym": "202403",
            "medianManwon": 82250
          },
          {
            "ym": "202406",
            "medianManwon": 86000
          },
          {
            "ym": "202409",
            "medianManwon": 87500
          },
          {
            "ym": "202412",
            "medianManwon": 89000
          },
          {
            "ym": "202503",
            "medianManwon": 91000
          },
          {
            "ym": "202506",
            "medianManwon": 96000
          },
          {
            "ym": "202509",
            "medianManwon": 116000
          },
          {
            "ym": "202512",
            "medianManwon": 135000
          },
          {
            "ym": "202603",
            "medianManwon": 143250
          },
          {
            "ym": "202606",
            "medianManwon": 145000
          }
        ]
      },
      {
        "name": "판교원마을6단지(판교대광로제비앙)",
        "dong": "판교동",
        "sggName": "분당구",
        "pyeong": 18,
        "areaM2": 59.667,
        "latestManwon": 146000,
        "series": [
          {
            "ym": "202209",
            "medianManwon": 55673
          },
          {
            "ym": "202303",
            "medianManwon": 92000
          },
          {
            "ym": "202306",
            "medianManwon": 93000
          },
          {
            "ym": "202309",
            "medianManwon": 98000
          },
          {
            "ym": "202312",
            "medianManwon": 94500
          },
          {
            "ym": "202403",
            "medianManwon": 92250
          },
          {
            "ym": "202406",
            "medianManwon": 94500
          },
          {
            "ym": "202409",
            "medianManwon": 90950
          },
          {
            "ym": "202503",
            "medianManwon": 106600
          },
          {
            "ym": "202506",
            "medianManwon": 116250
          },
          {
            "ym": "202509",
            "medianManwon": 114000
          },
          {
            "ym": "202512",
            "medianManwon": 125000
          },
          {
            "ym": "202603",
            "medianManwon": 141000
          },
          {
            "ym": "202606",
            "medianManwon": 146000
          }
        ]
      },
      {
        "name": "이매촌(한신)",
        "dong": "이매동",
        "sggName": "분당구",
        "pyeong": 15,
        "areaM2": 50.1,
        "latestManwon": 148500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 90500
          },
          {
            "ym": "202303",
            "medianManwon": 82800
          },
          {
            "ym": "202306",
            "medianManwon": 81500
          },
          {
            "ym": "202309",
            "medianManwon": 85000
          },
          {
            "ym": "202403",
            "medianManwon": 81500
          },
          {
            "ym": "202406",
            "medianManwon": 88000
          },
          {
            "ym": "202409",
            "medianManwon": 85200
          },
          {
            "ym": "202412",
            "medianManwon": 93500
          },
          {
            "ym": "202503",
            "medianManwon": 94425
          },
          {
            "ym": "202506",
            "medianManwon": 93000
          },
          {
            "ym": "202509",
            "medianManwon": 117500
          },
          {
            "ym": "202512",
            "medianManwon": 121500
          },
          {
            "ym": "202603",
            "medianManwon": 132500
          },
          {
            "ym": "202606",
            "medianManwon": 148500
          }
        ]
      },
      {
        "name": "송파더센트레",
        "dong": "장지동",
        "sggName": "송파구",
        "pyeong": 16,
        "areaM2": 51.96,
        "latestManwon": 151750,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 104250
          },
          {
            "ym": "202212",
            "medianManwon": 75000
          },
          {
            "ym": "202303",
            "medianManwon": 83400
          },
          {
            "ym": "202306",
            "medianManwon": 91000
          },
          {
            "ym": "202312",
            "medianManwon": 90000
          },
          {
            "ym": "202403",
            "medianManwon": 89500
          },
          {
            "ym": "202406",
            "medianManwon": 93750
          },
          {
            "ym": "202409",
            "medianManwon": 100000
          },
          {
            "ym": "202412",
            "medianManwon": 99200
          },
          {
            "ym": "202503",
            "medianManwon": 101500
          },
          {
            "ym": "202506",
            "medianManwon": 105000
          },
          {
            "ym": "202509",
            "medianManwon": 120000
          },
          {
            "ym": "202512",
            "medianManwon": 146000
          },
          {
            "ym": "202603",
            "medianManwon": 149000
          },
          {
            "ym": "202606",
            "medianManwon": 151750
          }
        ]
      },
      {
        "name": "리센츠",
        "dong": "잠실동",
        "sggName": "송파구",
        "pyeong": 8,
        "areaM2": 27.68,
        "latestManwon": 153000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 105000
          },
          {
            "ym": "202206",
            "medianManwon": 109150
          },
          {
            "ym": "202303",
            "medianManwon": 84250
          },
          {
            "ym": "202306",
            "medianManwon": 97000
          },
          {
            "ym": "202309",
            "medianManwon": 106000
          },
          {
            "ym": "202312",
            "medianManwon": 97000
          },
          {
            "ym": "202403",
            "medianManwon": 95500
          },
          {
            "ym": "202406",
            "medianManwon": 102000
          },
          {
            "ym": "202409",
            "medianManwon": 108000
          },
          {
            "ym": "202412",
            "medianManwon": 110000
          },
          {
            "ym": "202503",
            "medianManwon": 115000
          },
          {
            "ym": "202506",
            "medianManwon": 122000
          },
          {
            "ym": "202509",
            "medianManwon": 147500
          },
          {
            "ym": "202512",
            "medianManwon": 157500
          },
          {
            "ym": "202603",
            "medianManwon": 151500
          },
          {
            "ym": "202606",
            "medianManwon": 153000
          }
        ]
      },
      {
        "name": "성원대치2단지아파트",
        "dong": "개포동",
        "sggName": "강남구",
        "pyeong": 10,
        "areaM2": 33.18,
        "latestManwon": 153000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 119000
          },
          {
            "ym": "202206",
            "medianManwon": 101500
          },
          {
            "ym": "202209",
            "medianManwon": 92000
          },
          {
            "ym": "202303",
            "medianManwon": 95000
          },
          {
            "ym": "202306",
            "medianManwon": 97000
          },
          {
            "ym": "202309",
            "medianManwon": 102500
          },
          {
            "ym": "202312",
            "medianManwon": 99000
          },
          {
            "ym": "202406",
            "medianManwon": 98500
          },
          {
            "ym": "202409",
            "medianManwon": 104000
          },
          {
            "ym": "202412",
            "medianManwon": 103750
          },
          {
            "ym": "202503",
            "medianManwon": 103500
          },
          {
            "ym": "202506",
            "medianManwon": 111750
          },
          {
            "ym": "202509",
            "medianManwon": 129000
          },
          {
            "ym": "202603",
            "medianManwon": 155500
          },
          {
            "ym": "202606",
            "medianManwon": 153000
          }
        ]
      },
      {
        "name": "신동아",
        "dong": "수서동",
        "sggName": "강남구",
        "pyeong": 10,
        "areaM2": 33.18,
        "latestManwon": 160250,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 115000
          },
          {
            "ym": "202206",
            "medianManwon": 97000
          },
          {
            "ym": "202306",
            "medianManwon": 87000
          },
          {
            "ym": "202309",
            "medianManwon": 91000
          },
          {
            "ym": "202312",
            "medianManwon": 88000
          },
          {
            "ym": "202403",
            "medianManwon": 92000
          },
          {
            "ym": "202406",
            "medianManwon": 91500
          },
          {
            "ym": "202409",
            "medianManwon": 90000
          },
          {
            "ym": "202503",
            "medianManwon": 98850
          },
          {
            "ym": "202506",
            "medianManwon": 109000
          },
          {
            "ym": "202509",
            "medianManwon": 127500
          },
          {
            "ym": "202512",
            "medianManwon": 151200
          },
          {
            "ym": "202603",
            "medianManwon": 148750
          },
          {
            "ym": "202606",
            "medianManwon": 160250
          }
        ]
      },
      {
        "name": "송파시그니처롯데캐슬",
        "dong": "거여동",
        "sggName": "송파구",
        "pyeong": 18,
        "areaM2": 59.98,
        "latestManwon": 184000,
        "series": [
          {
            "ym": "202303",
            "medianManwon": 108000
          },
          {
            "ym": "202306",
            "medianManwon": 117500
          },
          {
            "ym": "202309",
            "medianManwon": 118000
          },
          {
            "ym": "202312",
            "medianManwon": 117500
          },
          {
            "ym": "202403",
            "medianManwon": 116000
          },
          {
            "ym": "202406",
            "medianManwon": 120000
          },
          {
            "ym": "202409",
            "medianManwon": 135000
          },
          {
            "ym": "202412",
            "medianManwon": 138500
          },
          {
            "ym": "202503",
            "medianManwon": 134000
          },
          {
            "ym": "202506",
            "medianManwon": 143000
          },
          {
            "ym": "202509",
            "medianManwon": 156250
          },
          {
            "ym": "202512",
            "medianManwon": 174500
          },
          {
            "ym": "202603",
            "medianManwon": 179000
          },
          {
            "ym": "202606",
            "medianManwon": 184000
          }
        ]
      },
      {
        "name": "봇들마을3단지(주공)",
        "dong": "삼평동",
        "sggName": "분당구",
        "pyeong": 18,
        "areaM2": 59.95,
        "latestManwon": 190000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 130000
          },
          {
            "ym": "202212",
            "medianManwon": 100000
          },
          {
            "ym": "202303",
            "medianManwon": 111500
          },
          {
            "ym": "202306",
            "medianManwon": 119500
          },
          {
            "ym": "202309",
            "medianManwon": 123250
          },
          {
            "ym": "202312",
            "medianManwon": 119050
          },
          {
            "ym": "202403",
            "medianManwon": 120500
          },
          {
            "ym": "202406",
            "medianManwon": 123400
          },
          {
            "ym": "202409",
            "medianManwon": 136000
          },
          {
            "ym": "202412",
            "medianManwon": 137000
          },
          {
            "ym": "202503",
            "medianManwon": 138850
          },
          {
            "ym": "202506",
            "medianManwon": 150000
          },
          {
            "ym": "202509",
            "medianManwon": 170000
          },
          {
            "ym": "202606",
            "medianManwon": 190000
          }
        ]
      },
      {
        "name": "코오롱아파트",
        "dong": "방이동",
        "sggName": "송파구",
        "pyeong": 26,
        "areaM2": 84.95,
        "latestManwon": 207500,
        "series": [
          {
            "ym": "202209",
            "medianManwon": 140000
          },
          {
            "ym": "202303",
            "medianManwon": 113000
          },
          {
            "ym": "202306",
            "medianManwon": 94800
          },
          {
            "ym": "202309",
            "medianManwon": 131500
          },
          {
            "ym": "202312",
            "medianManwon": 111500
          },
          {
            "ym": "202403",
            "medianManwon": 120000
          },
          {
            "ym": "202406",
            "medianManwon": 132000
          },
          {
            "ym": "202409",
            "medianManwon": 137750
          },
          {
            "ym": "202412",
            "medianManwon": 136350
          },
          {
            "ym": "202503",
            "medianManwon": 147500
          },
          {
            "ym": "202506",
            "medianManwon": 157000
          },
          {
            "ym": "202509",
            "medianManwon": 176500
          },
          {
            "ym": "202512",
            "medianManwon": 207500
          },
          {
            "ym": "202603",
            "medianManwon": 223000
          },
          {
            "ym": "202606",
            "medianManwon": 207500
          }
        ]
      },
      {
        "name": "가락(1차)쌍용아파트",
        "dong": "가락동",
        "sggName": "송파구",
        "pyeong": 26,
        "areaM2": 84.69,
        "latestManwon": 209000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 159500
          },
          {
            "ym": "202303",
            "medianManwon": 115500
          },
          {
            "ym": "202306",
            "medianManwon": 129000
          },
          {
            "ym": "202309",
            "medianManwon": 130000
          },
          {
            "ym": "202312",
            "medianManwon": 134000
          },
          {
            "ym": "202403",
            "medianManwon": 130500
          },
          {
            "ym": "202406",
            "medianManwon": 136500
          },
          {
            "ym": "202409",
            "medianManwon": 141500
          },
          {
            "ym": "202412",
            "medianManwon": 137500
          },
          {
            "ym": "202503",
            "medianManwon": 149500
          },
          {
            "ym": "202506",
            "medianManwon": 163000
          },
          {
            "ym": "202509",
            "medianManwon": 191500
          },
          {
            "ym": "202512",
            "medianManwon": 200000
          },
          {
            "ym": "202603",
            "medianManwon": 216500
          },
          {
            "ym": "202606",
            "medianManwon": 209000
          }
        ]
      },
      {
        "name": "개포래미안포레스트",
        "dong": "개포동",
        "sggName": "강남구",
        "pyeong": 18,
        "areaM2": 59.92,
        "latestManwon": 271500,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 195000
          },
          {
            "ym": "202303",
            "medianManwon": 171000
          },
          {
            "ym": "202306",
            "medianManwon": 184000
          },
          {
            "ym": "202309",
            "medianManwon": 191500
          },
          {
            "ym": "202312",
            "medianManwon": 192500
          },
          {
            "ym": "202403",
            "medianManwon": 187000
          },
          {
            "ym": "202406",
            "medianManwon": 199000
          },
          {
            "ym": "202409",
            "medianManwon": 230000
          },
          {
            "ym": "202412",
            "medianManwon": 240000
          },
          {
            "ym": "202503",
            "medianManwon": 244500
          },
          {
            "ym": "202506",
            "medianManwon": 255000
          },
          {
            "ym": "202509",
            "medianManwon": 275000
          },
          {
            "ym": "202603",
            "medianManwon": 300000
          },
          {
            "ym": "202606",
            "medianManwon": 271500
          }
        ]
      },
      {
        "name": "헬리오시티",
        "dong": "가락동",
        "sggName": "송파구",
        "pyeong": 26,
        "areaM2": 84.96,
        "latestManwon": 283500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 218000
          },
          {
            "ym": "202206",
            "medianManwon": 202000
          },
          {
            "ym": "202209",
            "medianManwon": 138000
          },
          {
            "ym": "202212",
            "medianManwon": 169000
          },
          {
            "ym": "202303",
            "medianManwon": 184000
          },
          {
            "ym": "202306",
            "medianManwon": 195000
          },
          {
            "ym": "202309",
            "medianManwon": 206500
          },
          {
            "ym": "202312",
            "medianManwon": 192500
          },
          {
            "ym": "202403",
            "medianManwon": 201250
          },
          {
            "ym": "202406",
            "medianManwon": 215000
          },
          {
            "ym": "202409",
            "medianManwon": 230000
          },
          {
            "ym": "202412",
            "medianManwon": 229000
          },
          {
            "ym": "202503",
            "medianManwon": 245000
          },
          {
            "ym": "202506",
            "medianManwon": 270250
          },
          {
            "ym": "202509",
            "medianManwon": 284000
          },
          {
            "ym": "202512",
            "medianManwon": 291000
          },
          {
            "ym": "202603",
            "medianManwon": 281500
          },
          {
            "ym": "202606",
            "medianManwon": 283500
          }
        ]
      },
      {
        "name": "올림픽훼밀리타운",
        "dong": "문정동",
        "sggName": "송파구",
        "pyeong": 41,
        "areaM2": 136.325,
        "latestManwon": 295000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 233000
          },
          {
            "ym": "202206",
            "medianManwon": 233000
          },
          {
            "ym": "202303",
            "medianManwon": 203500
          },
          {
            "ym": "202306",
            "medianManwon": 207250
          },
          {
            "ym": "202309",
            "medianManwon": 216000
          },
          {
            "ym": "202312",
            "medianManwon": 209000
          },
          {
            "ym": "202403",
            "medianManwon": 202250
          },
          {
            "ym": "202406",
            "medianManwon": 207250
          },
          {
            "ym": "202409",
            "medianManwon": 229000
          },
          {
            "ym": "202412",
            "medianManwon": 228750
          },
          {
            "ym": "202503",
            "medianManwon": 260000
          },
          {
            "ym": "202506",
            "medianManwon": 260000
          },
          {
            "ym": "202509",
            "medianManwon": 280000
          },
          {
            "ym": "202603",
            "medianManwon": 290000
          },
          {
            "ym": "202606",
            "medianManwon": 295000
          }
        ]
      },
      {
        "name": "파크리오",
        "dong": "신천동",
        "sggName": "송파구",
        "pyeong": 26,
        "areaM2": 84.9,
        "latestManwon": 296000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 215000
          },
          {
            "ym": "202206",
            "medianManwon": 212000
          },
          {
            "ym": "202209",
            "medianManwon": 202000
          },
          {
            "ym": "202212",
            "medianManwon": 170000
          },
          {
            "ym": "202303",
            "medianManwon": 181800
          },
          {
            "ym": "202306",
            "medianManwon": 203850
          },
          {
            "ym": "202309",
            "medianManwon": 212500
          },
          {
            "ym": "202312",
            "medianManwon": 197000
          },
          {
            "ym": "202403",
            "medianManwon": 208500
          },
          {
            "ym": "202406",
            "medianManwon": 218500
          },
          {
            "ym": "202409",
            "medianManwon": 223000
          },
          {
            "ym": "202412",
            "medianManwon": 230000
          },
          {
            "ym": "202503",
            "medianManwon": 247500
          },
          {
            "ym": "202506",
            "medianManwon": 270000
          },
          {
            "ym": "202509",
            "medianManwon": 288000
          },
          {
            "ym": "202512",
            "medianManwon": 295000
          },
          {
            "ym": "202603",
            "medianManwon": 285000
          },
          {
            "ym": "202606",
            "medianManwon": 296000
          }
        ]
      },
      {
        "name": "트리지움",
        "dong": "잠실동",
        "sggName": "송파구",
        "pyeong": 26,
        "areaM2": 84.95,
        "latestManwon": 312000,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 230000
          },
          {
            "ym": "202212",
            "medianManwon": 185000
          },
          {
            "ym": "202303",
            "medianManwon": 198500
          },
          {
            "ym": "202306",
            "medianManwon": 215000
          },
          {
            "ym": "202309",
            "medianManwon": 228000
          },
          {
            "ym": "202312",
            "medianManwon": 225000
          },
          {
            "ym": "202403",
            "medianManwon": 219500
          },
          {
            "ym": "202406",
            "medianManwon": 226500
          },
          {
            "ym": "202409",
            "medianManwon": 243000
          },
          {
            "ym": "202412",
            "medianManwon": 248000
          },
          {
            "ym": "202503",
            "medianManwon": 287000
          },
          {
            "ym": "202506",
            "medianManwon": 307500
          },
          {
            "ym": "202509",
            "medianManwon": 320000
          },
          {
            "ym": "202512",
            "medianManwon": 320000
          },
          {
            "ym": "202603",
            "medianManwon": 300000
          },
          {
            "ym": "202606",
            "medianManwon": 312000
          }
        ]
      },
      {
        "name": "잠실엘스",
        "dong": "잠실동",
        "sggName": "송파구",
        "pyeong": 26,
        "areaM2": 84.8,
        "latestManwon": 338000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 267000
          },
          {
            "ym": "202206",
            "medianManwon": 235000
          },
          {
            "ym": "202209",
            "medianManwon": 210000
          },
          {
            "ym": "202212",
            "medianManwon": 203000
          },
          {
            "ym": "202303",
            "medianManwon": 215000
          },
          {
            "ym": "202306",
            "medianManwon": 225000
          },
          {
            "ym": "202309",
            "medianManwon": 240250
          },
          {
            "ym": "202312",
            "medianManwon": 230750
          },
          {
            "ym": "202403",
            "medianManwon": 230000
          },
          {
            "ym": "202406",
            "medianManwon": 252000
          },
          {
            "ym": "202409",
            "medianManwon": 267000
          },
          {
            "ym": "202412",
            "medianManwon": 268000
          },
          {
            "ym": "202503",
            "medianManwon": 290000
          },
          {
            "ym": "202506",
            "medianManwon": 320000
          },
          {
            "ym": "202509",
            "medianManwon": 329500
          },
          {
            "ym": "202512",
            "medianManwon": 335000
          },
          {
            "ym": "202603",
            "medianManwon": 328000
          },
          {
            "ym": "202606",
            "medianManwon": 338000
          }
        ]
      },
      {
        "name": "은마",
        "dong": "대치동",
        "sggName": "강남구",
        "pyeong": 23,
        "areaM2": 76.79,
        "latestManwon": 345000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 228000
          },
          {
            "ym": "202209",
            "medianManwon": 214000
          },
          {
            "ym": "202212",
            "medianManwon": 185000
          },
          {
            "ym": "202303",
            "medianManwon": 202000
          },
          {
            "ym": "202306",
            "medianManwon": 223000
          },
          {
            "ym": "202309",
            "medianManwon": 235000
          },
          {
            "ym": "202312",
            "medianManwon": 240000
          },
          {
            "ym": "202403",
            "medianManwon": 220000
          },
          {
            "ym": "202406",
            "medianManwon": 235150
          },
          {
            "ym": "202409",
            "medianManwon": 255000
          },
          {
            "ym": "202412",
            "medianManwon": 269500
          },
          {
            "ym": "202503",
            "medianManwon": 302500
          },
          {
            "ym": "202506",
            "medianManwon": 360000
          },
          {
            "ym": "202509",
            "medianManwon": 353000
          },
          {
            "ym": "202512",
            "medianManwon": 376000
          },
          {
            "ym": "202603",
            "medianManwon": 347000
          },
          {
            "ym": "202606",
            "medianManwon": 345000
          }
        ]
      },
      {
        "name": "주공아파트 5단지",
        "dong": "잠실동",
        "sggName": "송파구",
        "pyeong": 23,
        "areaM2": 76.5,
        "latestManwon": 405700,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 271000
          },
          {
            "ym": "202206",
            "medianManwon": 275500
          },
          {
            "ym": "202212",
            "medianManwon": 200850
          },
          {
            "ym": "202303",
            "medianManwon": 247850
          },
          {
            "ym": "202306",
            "medianManwon": 247850
          },
          {
            "ym": "202309",
            "medianManwon": 255325
          },
          {
            "ym": "202312",
            "medianManwon": 245800
          },
          {
            "ym": "202403",
            "medianManwon": 247800
          },
          {
            "ym": "202406",
            "medianManwon": 263050
          },
          {
            "ym": "202409",
            "medianManwon": 274800
          },
          {
            "ym": "202412",
            "medianManwon": 310200
          },
          {
            "ym": "202503",
            "medianManwon": 345250
          },
          {
            "ym": "202506",
            "medianManwon": 382270
          },
          {
            "ym": "202509",
            "medianManwon": 378700
          },
          {
            "ym": "202512",
            "medianManwon": 387700
          },
          {
            "ym": "202603",
            "medianManwon": 412700
          },
          {
            "ym": "202606",
            "medianManwon": 405700
          }
        ]
      },
      {
        "name": "반포자이",
        "dong": "반포동",
        "sggName": "서초구",
        "pyeong": 26,
        "areaM2": 84.943,
        "latestManwon": 470000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 373500
          },
          {
            "ym": "202212",
            "medianManwon": 348000
          },
          {
            "ym": "202303",
            "medianManwon": 304000
          },
          {
            "ym": "202306",
            "medianManwon": 325000
          },
          {
            "ym": "202309",
            "medianManwon": 330000
          },
          {
            "ym": "202312",
            "medianManwon": 315500
          },
          {
            "ym": "202403",
            "medianManwon": 334000
          },
          {
            "ym": "202406",
            "medianManwon": 350000
          },
          {
            "ym": "202409",
            "medianManwon": 400000
          },
          {
            "ym": "202503",
            "medianManwon": 435000
          },
          {
            "ym": "202506",
            "medianManwon": 458000
          },
          {
            "ym": "202509",
            "medianManwon": 488000
          },
          {
            "ym": "202512",
            "medianManwon": 501000
          },
          {
            "ym": "202603",
            "medianManwon": 505000
          },
          {
            "ym": "202606",
            "medianManwon": 470000
          }
        ]
      },
      {
        "name": "래미안퍼스티지",
        "dong": "반포동",
        "sggName": "서초구",
        "pyeong": 26,
        "areaM2": 84.93,
        "latestManwon": 545000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 360000
          },
          {
            "ym": "202212",
            "medianManwon": 310000
          },
          {
            "ym": "202303",
            "medianManwon": 340000
          },
          {
            "ym": "202306",
            "medianManwon": 349750
          },
          {
            "ym": "202309",
            "medianManwon": 348000
          },
          {
            "ym": "202312",
            "medianManwon": 395000
          },
          {
            "ym": "202403",
            "medianManwon": 350500
          },
          {
            "ym": "202406",
            "medianManwon": 395000
          },
          {
            "ym": "202409",
            "medianManwon": 430000
          },
          {
            "ym": "202412",
            "medianManwon": 435000
          },
          {
            "ym": "202503",
            "medianManwon": 465200
          },
          {
            "ym": "202506",
            "medianManwon": 501000
          },
          {
            "ym": "202512",
            "medianManwon": 515000
          },
          {
            "ym": "202603",
            "medianManwon": 550000
          },
          {
            "ym": "202606",
            "medianManwon": 545000
          }
        ]
      }
    ]
  },
  "seoul-premium": {
    "label": "서울 상급지",
    "complexes": [
      {
        "name": "대우미래사랑",
        "dong": "서교동",
        "sggName": "마포구",
        "pyeong": 10,
        "areaM2": 34.29,
        "latestManwon": 30950,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 29350
          },
          {
            "ym": "202206",
            "medianManwon": 31500
          },
          {
            "ym": "202303",
            "medianManwon": 29000
          },
          {
            "ym": "202306",
            "medianManwon": 29500
          },
          {
            "ym": "202312",
            "medianManwon": 29800
          },
          {
            "ym": "202403",
            "medianManwon": 29600
          },
          {
            "ym": "202406",
            "medianManwon": 30000
          },
          {
            "ym": "202409",
            "medianManwon": 31000
          },
          {
            "ym": "202412",
            "medianManwon": 30000
          },
          {
            "ym": "202503",
            "medianManwon": 29750
          },
          {
            "ym": "202506",
            "medianManwon": 30000
          },
          {
            "ym": "202509",
            "medianManwon": 30875
          },
          {
            "ym": "202512",
            "medianManwon": 30800
          },
          {
            "ym": "202603",
            "medianManwon": 30000
          },
          {
            "ym": "202606",
            "medianManwon": 30950
          }
        ]
      },
      {
        "name": "현대",
        "dong": "마장동",
        "sggName": "성동구",
        "pyeong": 18,
        "areaM2": 59.94,
        "latestManwon": 128250,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 85500
          },
          {
            "ym": "202303",
            "medianManwon": 89100
          },
          {
            "ym": "202306",
            "medianManwon": 76500
          },
          {
            "ym": "202309",
            "medianManwon": 78400
          },
          {
            "ym": "202312",
            "medianManwon": 81000
          },
          {
            "ym": "202403",
            "medianManwon": 80200
          },
          {
            "ym": "202406",
            "medianManwon": 82250
          },
          {
            "ym": "202412",
            "medianManwon": 87900
          },
          {
            "ym": "202503",
            "medianManwon": 83500
          },
          {
            "ym": "202506",
            "medianManwon": 89650
          },
          {
            "ym": "202509",
            "medianManwon": 92500
          },
          {
            "ym": "202603",
            "medianManwon": 134500
          },
          {
            "ym": "202606",
            "medianManwon": 128250
          }
        ]
      },
      {
        "name": "상암월드컵파크2단지",
        "dong": "상암동",
        "sggName": "마포구",
        "pyeong": 18,
        "areaM2": 59.92,
        "latestManwon": 129500,
        "series": [
          {
            "ym": "202212",
            "medianManwon": 79000
          },
          {
            "ym": "202303",
            "medianManwon": 83500
          },
          {
            "ym": "202306",
            "medianManwon": 83000
          },
          {
            "ym": "202309",
            "medianManwon": 85000
          },
          {
            "ym": "202403",
            "medianManwon": 85500
          },
          {
            "ym": "202406",
            "medianManwon": 90750
          },
          {
            "ym": "202412",
            "medianManwon": 99900
          },
          {
            "ym": "202503",
            "medianManwon": 96500
          },
          {
            "ym": "202506",
            "medianManwon": 103000
          },
          {
            "ym": "202509",
            "medianManwon": 104300
          },
          {
            "ym": "202512",
            "medianManwon": 114250
          },
          {
            "ym": "202603",
            "medianManwon": 126000
          },
          {
            "ym": "202606",
            "medianManwon": 129500
          }
        ]
      },
      {
        "name": "상암월드컵파크7단지",
        "dong": "상암동",
        "sggName": "마포구",
        "pyeong": 26,
        "areaM2": 84.9,
        "latestManwon": 137250,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 127000
          },
          {
            "ym": "202206",
            "medianManwon": 114000
          },
          {
            "ym": "202212",
            "medianManwon": 100000
          },
          {
            "ym": "202303",
            "medianManwon": 103000
          },
          {
            "ym": "202309",
            "medianManwon": 109000
          },
          {
            "ym": "202312",
            "medianManwon": 103000
          },
          {
            "ym": "202406",
            "medianManwon": 110000
          },
          {
            "ym": "202409",
            "medianManwon": 111750
          },
          {
            "ym": "202412",
            "medianManwon": 115500
          },
          {
            "ym": "202503",
            "medianManwon": 120000
          },
          {
            "ym": "202506",
            "medianManwon": 119500
          },
          {
            "ym": "202509",
            "medianManwon": 123000
          },
          {
            "ym": "202512",
            "medianManwon": 125000
          },
          {
            "ym": "202606",
            "medianManwon": 137250
          }
        ]
      },
      {
        "name": "성산시영(대우)",
        "dong": "성산동",
        "sggName": "마포구",
        "pyeong": 15,
        "areaM2": 50.03,
        "latestManwon": 147000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 100500
          },
          {
            "ym": "202206",
            "medianManwon": 105700
          },
          {
            "ym": "202212",
            "medianManwon": 79000
          },
          {
            "ym": "202303",
            "medianManwon": 85800
          },
          {
            "ym": "202306",
            "medianManwon": 87700
          },
          {
            "ym": "202309",
            "medianManwon": 70000
          },
          {
            "ym": "202312",
            "medianManwon": 86500
          },
          {
            "ym": "202403",
            "medianManwon": 89500
          },
          {
            "ym": "202406",
            "medianManwon": 88250
          },
          {
            "ym": "202412",
            "medianManwon": 96500
          },
          {
            "ym": "202503",
            "medianManwon": 97000
          },
          {
            "ym": "202506",
            "medianManwon": 104000
          },
          {
            "ym": "202509",
            "medianManwon": 117000
          },
          {
            "ym": "202512",
            "medianManwon": 139000
          },
          {
            "ym": "202603",
            "medianManwon": 134000
          },
          {
            "ym": "202606",
            "medianManwon": 147000
          }
        ]
      },
      {
        "name": "왕십리풍림아이원",
        "dong": "하왕십리동",
        "sggName": "성동구",
        "pyeong": 18,
        "areaM2": 59.936,
        "latestManwon": 148500,
        "series": [
          {
            "ym": "202212",
            "medianManwon": 80000
          },
          {
            "ym": "202303",
            "medianManwon": 81000
          },
          {
            "ym": "202306",
            "medianManwon": 85700
          },
          {
            "ym": "202312",
            "medianManwon": 92000
          },
          {
            "ym": "202406",
            "medianManwon": 95000
          },
          {
            "ym": "202409",
            "medianManwon": 101000
          },
          {
            "ym": "202412",
            "medianManwon": 104500
          },
          {
            "ym": "202503",
            "medianManwon": 100750
          },
          {
            "ym": "202506",
            "medianManwon": 113250
          },
          {
            "ym": "202509",
            "medianManwon": 120000
          },
          {
            "ym": "202512",
            "medianManwon": 137750
          },
          {
            "ym": "202603",
            "medianManwon": 151000
          },
          {
            "ym": "202606",
            "medianManwon": 148500
          }
        ]
      },
      {
        "name": "신촌태영데시앙",
        "dong": "창전동",
        "sggName": "마포구",
        "pyeong": 26,
        "areaM2": 84.97,
        "latestManwon": 152000,
        "series": [
          {
            "ym": "202303",
            "medianManwon": 104500
          },
          {
            "ym": "202309",
            "medianManwon": 109000
          },
          {
            "ym": "202403",
            "medianManwon": 114000
          },
          {
            "ym": "202406",
            "medianManwon": 115000
          },
          {
            "ym": "202409",
            "medianManwon": 129500
          },
          {
            "ym": "202412",
            "medianManwon": 118250
          },
          {
            "ym": "202503",
            "medianManwon": 119800
          },
          {
            "ym": "202506",
            "medianManwon": 126000
          },
          {
            "ym": "202509",
            "medianManwon": 130000
          },
          {
            "ym": "202512",
            "medianManwon": 146250
          },
          {
            "ym": "202603",
            "medianManwon": 150000
          },
          {
            "ym": "202606",
            "medianManwon": 152000
          }
        ]
      },
      {
        "name": "대림e-편한세상",
        "dong": "행당동",
        "sggName": "성동구",
        "pyeong": 18,
        "areaM2": 59.96,
        "latestManwon": 159750,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 118800
          },
          {
            "ym": "202212",
            "medianManwon": 85000
          },
          {
            "ym": "202303",
            "medianManwon": 85250
          },
          {
            "ym": "202306",
            "medianManwon": 90000
          },
          {
            "ym": "202309",
            "medianManwon": 92000
          },
          {
            "ym": "202403",
            "medianManwon": 92000
          },
          {
            "ym": "202406",
            "medianManwon": 100000
          },
          {
            "ym": "202412",
            "medianManwon": 109000
          },
          {
            "ym": "202503",
            "medianManwon": 113750
          },
          {
            "ym": "202506",
            "medianManwon": 125000
          },
          {
            "ym": "202509",
            "medianManwon": 129000
          },
          {
            "ym": "202512",
            "medianManwon": 145500
          },
          {
            "ym": "202603",
            "medianManwon": 159750
          },
          {
            "ym": "202606",
            "medianManwon": 159750
          }
        ]
      },
      {
        "name": "벽산",
        "dong": "하왕십리동",
        "sggName": "성동구",
        "pyeong": 35,
        "areaM2": 114.46,
        "latestManwon": 163000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 137000
          },
          {
            "ym": "202206",
            "medianManwon": 153000
          },
          {
            "ym": "202212",
            "medianManwon": 93000
          },
          {
            "ym": "202303",
            "medianManwon": 107000
          },
          {
            "ym": "202306",
            "medianManwon": 125000
          },
          {
            "ym": "202309",
            "medianManwon": 118000
          },
          {
            "ym": "202312",
            "medianManwon": 103000
          },
          {
            "ym": "202403",
            "medianManwon": 123000
          },
          {
            "ym": "202406",
            "medianManwon": 117600
          },
          {
            "ym": "202409",
            "medianManwon": 139500
          },
          {
            "ym": "202412",
            "medianManwon": 130000
          },
          {
            "ym": "202503",
            "medianManwon": 135000
          },
          {
            "ym": "202506",
            "medianManwon": 130950
          },
          {
            "ym": "202509",
            "medianManwon": 145500
          },
          {
            "ym": "202512",
            "medianManwon": 154000
          },
          {
            "ym": "202603",
            "medianManwon": 167000
          },
          {
            "ym": "202606",
            "medianManwon": 163000
          }
        ]
      },
      {
        "name": "성산시영(유원)",
        "dong": "성산동",
        "sggName": "마포구",
        "pyeong": 18,
        "areaM2": 59.43,
        "latestManwon": 166750,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 127500
          },
          {
            "ym": "202206",
            "medianManwon": 129150
          },
          {
            "ym": "202303",
            "medianManwon": 103000
          },
          {
            "ym": "202306",
            "medianManwon": 109750
          },
          {
            "ym": "202309",
            "medianManwon": 113000
          },
          {
            "ym": "202312",
            "medianManwon": 106700
          },
          {
            "ym": "202403",
            "medianManwon": 108000
          },
          {
            "ym": "202406",
            "medianManwon": 110000
          },
          {
            "ym": "202409",
            "medianManwon": 113700
          },
          {
            "ym": "202412",
            "medianManwon": 111250
          },
          {
            "ym": "202503",
            "medianManwon": 120000
          },
          {
            "ym": "202506",
            "medianManwon": 130000
          },
          {
            "ym": "202509",
            "medianManwon": 140000
          },
          {
            "ym": "202512",
            "medianManwon": 156000
          },
          {
            "ym": "202603",
            "medianManwon": 168000
          },
          {
            "ym": "202606",
            "medianManwon": 166750
          }
        ]
      },
      {
        "name": "행당한진타운",
        "dong": "행당동",
        "sggName": "성동구",
        "pyeong": 18,
        "areaM2": 59.96,
        "latestManwon": 167000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 117000
          },
          {
            "ym": "202209",
            "medianManwon": 103000
          },
          {
            "ym": "202212",
            "medianManwon": 85000
          },
          {
            "ym": "202303",
            "medianManwon": 87500
          },
          {
            "ym": "202306",
            "medianManwon": 93750
          },
          {
            "ym": "202403",
            "medianManwon": 91000
          },
          {
            "ym": "202406",
            "medianManwon": 105000
          },
          {
            "ym": "202409",
            "medianManwon": 110500
          },
          {
            "ym": "202412",
            "medianManwon": 111500
          },
          {
            "ym": "202503",
            "medianManwon": 114750
          },
          {
            "ym": "202506",
            "medianManwon": 132500
          },
          {
            "ym": "202509",
            "medianManwon": 138000
          },
          {
            "ym": "202512",
            "medianManwon": 165000
          },
          {
            "ym": "202603",
            "medianManwon": 169000
          },
          {
            "ym": "202606",
            "medianManwon": 167000
          }
        ]
      },
      {
        "name": "삼성래미안",
        "dong": "도원동",
        "sggName": "용산구",
        "pyeong": 18,
        "areaM2": 59.94,
        "latestManwon": 167000,
        "series": [
          {
            "ym": "202303",
            "medianManwon": 95000
          },
          {
            "ym": "202306",
            "medianManwon": 105000
          },
          {
            "ym": "202309",
            "medianManwon": 103750
          },
          {
            "ym": "202312",
            "medianManwon": 103250
          },
          {
            "ym": "202403",
            "medianManwon": 108000
          },
          {
            "ym": "202406",
            "medianManwon": 112750
          },
          {
            "ym": "202412",
            "medianManwon": 119000
          },
          {
            "ym": "202503",
            "medianManwon": 119500
          },
          {
            "ym": "202506",
            "medianManwon": 125000
          },
          {
            "ym": "202509",
            "medianManwon": 105800
          },
          {
            "ym": "202512",
            "medianManwon": 160000
          },
          {
            "ym": "202603",
            "medianManwon": 150000
          },
          {
            "ym": "202606",
            "medianManwon": 167000
          }
        ]
      },
      {
        "name": "대우",
        "dong": "금호동4가",
        "sggName": "성동구",
        "pyeong": 18,
        "areaM2": 59.97,
        "latestManwon": 170000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 114000
          },
          {
            "ym": "202306",
            "medianManwon": 100000
          },
          {
            "ym": "202309",
            "medianManwon": 110000
          },
          {
            "ym": "202403",
            "medianManwon": 103500
          },
          {
            "ym": "202406",
            "medianManwon": 109500
          },
          {
            "ym": "202409",
            "medianManwon": 125000
          },
          {
            "ym": "202412",
            "medianManwon": 131000
          },
          {
            "ym": "202503",
            "medianManwon": 129000
          },
          {
            "ym": "202506",
            "medianManwon": 129000
          },
          {
            "ym": "202509",
            "medianManwon": 149500
          },
          {
            "ym": "202512",
            "medianManwon": 178500
          },
          {
            "ym": "202606",
            "medianManwon": 170000
          }
        ]
      },
      {
        "name": "대흥동태영아파트",
        "dong": "대흥동",
        "sggName": "마포구",
        "pyeong": 18,
        "areaM2": 59.4,
        "latestManwon": 170500,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 126000
          },
          {
            "ym": "202303",
            "medianManwon": 98000
          },
          {
            "ym": "202306",
            "medianManwon": 100500
          },
          {
            "ym": "202312",
            "medianManwon": 92000
          },
          {
            "ym": "202403",
            "medianManwon": 108750
          },
          {
            "ym": "202406",
            "medianManwon": 113250
          },
          {
            "ym": "202409",
            "medianManwon": 123875
          },
          {
            "ym": "202503",
            "medianManwon": 124750
          },
          {
            "ym": "202506",
            "medianManwon": 138000
          },
          {
            "ym": "202509",
            "medianManwon": 163000
          },
          {
            "ym": "202603",
            "medianManwon": 166000
          },
          {
            "ym": "202606",
            "medianManwon": 170500
          }
        ]
      },
      {
        "name": "서울숲 한신 더 휴",
        "dong": "행당동",
        "sggName": "성동구",
        "pyeong": 18,
        "areaM2": 59.91,
        "latestManwon": 179000,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 120000
          },
          {
            "ym": "202303",
            "medianManwon": 92000
          },
          {
            "ym": "202306",
            "medianManwon": 95500
          },
          {
            "ym": "202309",
            "medianManwon": 102500
          },
          {
            "ym": "202312",
            "medianManwon": 107000
          },
          {
            "ym": "202403",
            "medianManwon": 100900
          },
          {
            "ym": "202406",
            "medianManwon": 114300
          },
          {
            "ym": "202409",
            "medianManwon": 118400
          },
          {
            "ym": "202412",
            "medianManwon": 111000
          },
          {
            "ym": "202503",
            "medianManwon": 124500
          },
          {
            "ym": "202506",
            "medianManwon": 132000
          },
          {
            "ym": "202509",
            "medianManwon": 144500
          },
          {
            "ym": "202512",
            "medianManwon": 159000
          },
          {
            "ym": "202606",
            "medianManwon": 179000
          }
        ]
      },
      {
        "name": "벽산",
        "dong": "금호동1가",
        "sggName": "성동구",
        "pyeong": 26,
        "areaM2": 84.82,
        "latestManwon": 184500,
        "series": [
          {
            "ym": "202303",
            "medianManwon": 101500
          },
          {
            "ym": "202306",
            "medianManwon": 96000
          },
          {
            "ym": "202309",
            "medianManwon": 105500
          },
          {
            "ym": "202312",
            "medianManwon": 90000
          },
          {
            "ym": "202403",
            "medianManwon": 105375
          },
          {
            "ym": "202406",
            "medianManwon": 113250
          },
          {
            "ym": "202409",
            "medianManwon": 106900
          },
          {
            "ym": "202412",
            "medianManwon": 134250
          },
          {
            "ym": "202503",
            "medianManwon": 132700
          },
          {
            "ym": "202506",
            "medianManwon": 127500
          },
          {
            "ym": "202509",
            "medianManwon": 136800
          },
          {
            "ym": "202512",
            "medianManwon": 146750
          },
          {
            "ym": "202603",
            "medianManwon": 173750
          },
          {
            "ym": "202606",
            "medianManwon": 184500
          }
        ]
      },
      {
        "name": "신금호파크자이",
        "dong": "금호동2가",
        "sggName": "성동구",
        "pyeong": 18,
        "areaM2": 59.98,
        "latestManwon": 204000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 145000
          },
          {
            "ym": "202212",
            "medianManwon": 113500
          },
          {
            "ym": "202303",
            "medianManwon": 122500
          },
          {
            "ym": "202306",
            "medianManwon": 125000
          },
          {
            "ym": "202309",
            "medianManwon": 130000
          },
          {
            "ym": "202312",
            "medianManwon": 123000
          },
          {
            "ym": "202403",
            "medianManwon": 127500
          },
          {
            "ym": "202406",
            "medianManwon": 135000
          },
          {
            "ym": "202412",
            "medianManwon": 145000
          },
          {
            "ym": "202503",
            "medianManwon": 155000
          },
          {
            "ym": "202506",
            "medianManwon": 175000
          },
          {
            "ym": "202509",
            "medianManwon": 186000
          },
          {
            "ym": "202606",
            "medianManwon": 204000
          }
        ]
      },
      {
        "name": "마포그랑자이",
        "dong": "대흥동",
        "sggName": "마포구",
        "pyeong": 18,
        "areaM2": 59.98,
        "latestManwon": 207000,
        "series": [
          {
            "ym": "202209",
            "medianManwon": 132000
          },
          {
            "ym": "202303",
            "medianManwon": 120000
          },
          {
            "ym": "202306",
            "medianManwon": 135700
          },
          {
            "ym": "202309",
            "medianManwon": 142750
          },
          {
            "ym": "202312",
            "medianManwon": 143500
          },
          {
            "ym": "202403",
            "medianManwon": 138500
          },
          {
            "ym": "202406",
            "medianManwon": 150250
          },
          {
            "ym": "202409",
            "medianManwon": 169500
          },
          {
            "ym": "202503",
            "medianManwon": 170500
          },
          {
            "ym": "202506",
            "medianManwon": 208500
          },
          {
            "ym": "202509",
            "medianManwon": 212500
          },
          {
            "ym": "202512",
            "medianManwon": 230250
          },
          {
            "ym": "202603",
            "medianManwon": 225000
          },
          {
            "ym": "202606",
            "medianManwon": 207000
          }
        ]
      },
      {
        "name": "이편한세상금호파크힐스",
        "dong": "금호동1가",
        "sggName": "성동구",
        "pyeong": 18,
        "areaM2": 59.983,
        "latestManwon": 210000,
        "series": [
          {
            "ym": "202209",
            "medianManwon": 140000
          },
          {
            "ym": "202212",
            "medianManwon": 120000
          },
          {
            "ym": "202303",
            "medianManwon": 118000
          },
          {
            "ym": "202306",
            "medianManwon": 129000
          },
          {
            "ym": "202309",
            "medianManwon": 135000
          },
          {
            "ym": "202312",
            "medianManwon": 127000
          },
          {
            "ym": "202403",
            "medianManwon": 133750
          },
          {
            "ym": "202406",
            "medianManwon": 141000
          },
          {
            "ym": "202503",
            "medianManwon": 163000
          },
          {
            "ym": "202506",
            "medianManwon": 173000
          },
          {
            "ym": "202509",
            "medianManwon": 190000
          },
          {
            "ym": "202512",
            "medianManwon": 215000
          },
          {
            "ym": "202603",
            "medianManwon": 210000
          },
          {
            "ym": "202606",
            "medianManwon": 210000
          }
        ]
      },
      {
        "name": "옥수삼성",
        "dong": "옥수동",
        "sggName": "성동구",
        "pyeong": 26,
        "areaM2": 84.822,
        "latestManwon": 214000,
        "series": [
          {
            "ym": "202212",
            "medianManwon": 112500
          },
          {
            "ym": "202306",
            "medianManwon": 138000
          },
          {
            "ym": "202309",
            "medianManwon": 148000
          },
          {
            "ym": "202312",
            "medianManwon": 145000
          },
          {
            "ym": "202403",
            "medianManwon": 143000
          },
          {
            "ym": "202406",
            "medianManwon": 154000
          },
          {
            "ym": "202409",
            "medianManwon": 165000
          },
          {
            "ym": "202412",
            "medianManwon": 160000
          },
          {
            "ym": "202503",
            "medianManwon": 170000
          },
          {
            "ym": "202506",
            "medianManwon": 199000
          },
          {
            "ym": "202509",
            "medianManwon": 205250
          },
          {
            "ym": "202606",
            "medianManwon": 214000
          }
        ]
      },
      {
        "name": "텐즈힐(2단지)",
        "dong": "상왕십리동",
        "sggName": "성동구",
        "pyeong": 26,
        "areaM2": 84.95,
        "latestManwon": 218500,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 162500
          },
          {
            "ym": "202303",
            "medianManwon": 134000
          },
          {
            "ym": "202306",
            "medianManwon": 135500
          },
          {
            "ym": "202309",
            "medianManwon": 143750
          },
          {
            "ym": "202403",
            "medianManwon": 141500
          },
          {
            "ym": "202406",
            "medianManwon": 148200
          },
          {
            "ym": "202503",
            "medianManwon": 170750
          },
          {
            "ym": "202506",
            "medianManwon": 175000
          },
          {
            "ym": "202509",
            "medianManwon": 185000
          },
          {
            "ym": "202512",
            "medianManwon": 215000
          },
          {
            "ym": "202603",
            "medianManwon": 202500
          },
          {
            "ym": "202606",
            "medianManwon": 218500
          }
        ]
      },
      {
        "name": "래미안 옥수 리버젠",
        "dong": "옥수동",
        "sggName": "성동구",
        "pyeong": 18,
        "areaM2": 59.25,
        "latestManwon": 218500,
        "series": [
          {
            "ym": "202303",
            "medianManwon": 127500
          },
          {
            "ym": "202309",
            "medianManwon": 143000
          },
          {
            "ym": "202312",
            "medianManwon": 140900
          },
          {
            "ym": "202403",
            "medianManwon": 145000
          },
          {
            "ym": "202406",
            "medianManwon": 154000
          },
          {
            "ym": "202412",
            "medianManwon": 169000
          },
          {
            "ym": "202503",
            "medianManwon": 174000
          },
          {
            "ym": "202506",
            "medianManwon": 197000
          },
          {
            "ym": "202509",
            "medianManwon": 205000
          },
          {
            "ym": "202512",
            "medianManwon": 226500
          },
          {
            "ym": "202603",
            "medianManwon": 228500
          },
          {
            "ym": "202606",
            "medianManwon": 218500
          }
        ]
      },
      {
        "name": "마포자이더센트리지(102동~112동)",
        "dong": "염리동",
        "sggName": "마포구",
        "pyeong": 26,
        "areaM2": 84.995,
        "latestManwon": 224000,
        "series": [
          {
            "ym": "202212",
            "medianManwon": 136000
          },
          {
            "ym": "202306",
            "medianManwon": 158500
          },
          {
            "ym": "202309",
            "medianManwon": 154750
          },
          {
            "ym": "202403",
            "medianManwon": 159000
          },
          {
            "ym": "202406",
            "medianManwon": 168500
          },
          {
            "ym": "202412",
            "medianManwon": 179000
          },
          {
            "ym": "202503",
            "medianManwon": 184500
          },
          {
            "ym": "202506",
            "medianManwon": 217500
          },
          {
            "ym": "202509",
            "medianManwon": 226000
          },
          {
            "ym": "202512",
            "medianManwon": 241000
          },
          {
            "ym": "202603",
            "medianManwon": 245000
          },
          {
            "ym": "202606",
            "medianManwon": 224000
          }
        ]
      },
      {
        "name": "마포아이파크포레",
        "dong": "신수동",
        "sggName": "마포구",
        "pyeong": 26,
        "areaM2": 84.901,
        "latestManwon": 244500,
        "series": [
          {
            "ym": "202303",
            "medianManwon": 156500
          },
          {
            "ym": "202306",
            "medianManwon": 174500
          },
          {
            "ym": "202309",
            "medianManwon": 175000
          },
          {
            "ym": "202312",
            "medianManwon": 175000
          },
          {
            "ym": "202403",
            "medianManwon": 171500
          },
          {
            "ym": "202406",
            "medianManwon": 188400
          },
          {
            "ym": "202409",
            "medianManwon": 135000
          },
          {
            "ym": "202412",
            "medianManwon": 210000
          },
          {
            "ym": "202503",
            "medianManwon": 214000
          },
          {
            "ym": "202506",
            "medianManwon": 221000
          },
          {
            "ym": "202509",
            "medianManwon": 248000
          },
          {
            "ym": "202512",
            "medianManwon": 238000
          },
          {
            "ym": "202606",
            "medianManwon": 244500
          }
        ]
      },
      {
        "name": "센트라스",
        "dong": "하왕십리동",
        "sggName": "성동구",
        "pyeong": 26,
        "areaM2": 84.96,
        "latestManwon": 247000,
        "series": [
          {
            "ym": "202303",
            "medianManwon": 147500
          },
          {
            "ym": "202306",
            "medianManwon": 162500
          },
          {
            "ym": "202309",
            "medianManwon": 166000
          },
          {
            "ym": "202312",
            "medianManwon": 167000
          },
          {
            "ym": "202403",
            "medianManwon": 167000
          },
          {
            "ym": "202406",
            "medianManwon": 170000
          },
          {
            "ym": "202409",
            "medianManwon": 175000
          },
          {
            "ym": "202412",
            "medianManwon": 179000
          },
          {
            "ym": "202503",
            "medianManwon": 179000
          },
          {
            "ym": "202506",
            "medianManwon": 195000
          },
          {
            "ym": "202509",
            "medianManwon": 212000
          },
          {
            "ym": "202512",
            "medianManwon": 232000
          },
          {
            "ym": "202606",
            "medianManwon": 247000
          }
        ]
      },
      {
        "name": "한가람",
        "dong": "이촌동",
        "sggName": "용산구",
        "pyeong": 18,
        "areaM2": 59.88,
        "latestManwon": 248000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 140000
          },
          {
            "ym": "202209",
            "medianManwon": 177000
          },
          {
            "ym": "202303",
            "medianManwon": 148000
          },
          {
            "ym": "202306",
            "medianManwon": 159000
          },
          {
            "ym": "202309",
            "medianManwon": 157750
          },
          {
            "ym": "202312",
            "medianManwon": 155000
          },
          {
            "ym": "202403",
            "medianManwon": 160000
          },
          {
            "ym": "202406",
            "medianManwon": 163000
          },
          {
            "ym": "202409",
            "medianManwon": 176500
          },
          {
            "ym": "202503",
            "medianManwon": 185000
          },
          {
            "ym": "202506",
            "medianManwon": 210000
          },
          {
            "ym": "202509",
            "medianManwon": 215000
          },
          {
            "ym": "202512",
            "medianManwon": 194000
          },
          {
            "ym": "202606",
            "medianManwon": 248000
          }
        ]
      },
      {
        "name": "마포래미안푸르지오4단지",
        "dong": "아현동",
        "sggName": "마포구",
        "pyeong": 26,
        "areaM2": 84.8919,
        "latestManwon": 257500,
        "series": [
          {
            "ym": "202209",
            "medianManwon": 171500
          },
          {
            "ym": "202212",
            "medianManwon": 162000
          },
          {
            "ym": "202303",
            "medianManwon": 162000
          },
          {
            "ym": "202306",
            "medianManwon": 174500
          },
          {
            "ym": "202309",
            "medianManwon": 181250
          },
          {
            "ym": "202406",
            "medianManwon": 180000
          },
          {
            "ym": "202409",
            "medianManwon": 206500
          },
          {
            "ym": "202412",
            "medianManwon": 204500
          },
          {
            "ym": "202503",
            "medianManwon": 209000
          },
          {
            "ym": "202506",
            "medianManwon": 230000
          },
          {
            "ym": "202509",
            "medianManwon": 260000
          },
          {
            "ym": "202603",
            "medianManwon": 235000
          },
          {
            "ym": "202606",
            "medianManwon": 257500
          }
        ]
      },
      {
        "name": "서울숲리버뷰자이",
        "dong": "행당동",
        "sggName": "성동구",
        "pyeong": 26,
        "areaM2": 84.95,
        "latestManwon": 265500,
        "series": [
          {
            "ym": "202212",
            "medianManwon": 144000
          },
          {
            "ym": "202303",
            "medianManwon": 157500
          },
          {
            "ym": "202306",
            "medianManwon": 180000
          },
          {
            "ym": "202309",
            "medianManwon": 177000
          },
          {
            "ym": "202403",
            "medianManwon": 181500
          },
          {
            "ym": "202406",
            "medianManwon": 197000
          },
          {
            "ym": "202409",
            "medianManwon": 199750
          },
          {
            "ym": "202412",
            "medianManwon": 198000
          },
          {
            "ym": "202503",
            "medianManwon": 200000
          },
          {
            "ym": "202506",
            "medianManwon": 233000
          },
          {
            "ym": "202509",
            "medianManwon": 253000
          },
          {
            "ym": "202512",
            "medianManwon": 260000
          },
          {
            "ym": "202606",
            "medianManwon": 265500
          }
        ]
      }
    ]
  },
  "gyeonggi-premium": {
    "label": "경기 상급지",
    "complexes": [
      {
        "name": "삼성1",
        "dong": "원천동",
        "sggName": "영통구",
        "pyeong": 15,
        "areaM2": 49.14,
        "latestManwon": 22950,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 31200
          },
          {
            "ym": "202206",
            "medianManwon": 25000
          },
          {
            "ym": "202303",
            "medianManwon": 21250
          },
          {
            "ym": "202306",
            "medianManwon": 22000
          },
          {
            "ym": "202309",
            "medianManwon": 23100
          },
          {
            "ym": "202312",
            "medianManwon": 22000
          },
          {
            "ym": "202403",
            "medianManwon": 22000
          },
          {
            "ym": "202406",
            "medianManwon": 20600
          },
          {
            "ym": "202409",
            "medianManwon": 21400
          },
          {
            "ym": "202412",
            "medianManwon": 21750
          },
          {
            "ym": "202503",
            "medianManwon": 21400
          },
          {
            "ym": "202506",
            "medianManwon": 22500
          },
          {
            "ym": "202509",
            "medianManwon": 21000
          },
          {
            "ym": "202512",
            "medianManwon": 21750
          },
          {
            "ym": "202603",
            "medianManwon": 20700
          },
          {
            "ym": "202606",
            "medianManwon": 22950
          }
        ]
      },
      {
        "name": "동남",
        "dong": "매탄동",
        "sggName": "영통구",
        "pyeong": 15,
        "areaM2": 49.68,
        "latestManwon": 26000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 40000
          },
          {
            "ym": "202206",
            "medianManwon": 40500
          },
          {
            "ym": "202212",
            "medianManwon": 28500
          },
          {
            "ym": "202303",
            "medianManwon": 29000
          },
          {
            "ym": "202306",
            "medianManwon": 27500
          },
          {
            "ym": "202309",
            "medianManwon": 28500
          },
          {
            "ym": "202312",
            "medianManwon": 28300
          },
          {
            "ym": "202403",
            "medianManwon": 28400
          },
          {
            "ym": "202406",
            "medianManwon": 28500
          },
          {
            "ym": "202409",
            "medianManwon": 27400
          },
          {
            "ym": "202412",
            "medianManwon": 28300
          },
          {
            "ym": "202503",
            "medianManwon": 28000
          },
          {
            "ym": "202506",
            "medianManwon": 26325
          },
          {
            "ym": "202509",
            "medianManwon": 29000
          },
          {
            "ym": "202512",
            "medianManwon": 29000
          },
          {
            "ym": "202603",
            "medianManwon": 24800
          },
          {
            "ym": "202606",
            "medianManwon": 26000
          }
        ]
      },
      {
        "name": "늘푸른벽산",
        "dong": "망포동",
        "sggName": "영통구",
        "pyeong": 18,
        "areaM2": 59.884,
        "latestManwon": 42500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 44000
          },
          {
            "ym": "202206",
            "medianManwon": 40000
          },
          {
            "ym": "202212",
            "medianManwon": 30000
          },
          {
            "ym": "202303",
            "medianManwon": 32150
          },
          {
            "ym": "202306",
            "medianManwon": 36700
          },
          {
            "ym": "202309",
            "medianManwon": 40000
          },
          {
            "ym": "202312",
            "medianManwon": 38700
          },
          {
            "ym": "202403",
            "medianManwon": 37000
          },
          {
            "ym": "202406",
            "medianManwon": 37000
          },
          {
            "ym": "202409",
            "medianManwon": 39800
          },
          {
            "ym": "202503",
            "medianManwon": 37900
          },
          {
            "ym": "202506",
            "medianManwon": 40500
          },
          {
            "ym": "202509",
            "medianManwon": 39500
          },
          {
            "ym": "202512",
            "medianManwon": 40650
          },
          {
            "ym": "202603",
            "medianManwon": 43500
          },
          {
            "ym": "202606",
            "medianManwon": 42500
          }
        ]
      },
      {
        "name": "신나무실휴먼시아5단지",
        "dong": "영통동",
        "sggName": "영통구",
        "pyeong": 18,
        "areaM2": 59.99,
        "latestManwon": 43750,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 48000
          },
          {
            "ym": "202206",
            "medianManwon": 45000
          },
          {
            "ym": "202209",
            "medianManwon": 34000
          },
          {
            "ym": "202212",
            "medianManwon": 31800
          },
          {
            "ym": "202303",
            "medianManwon": 32800
          },
          {
            "ym": "202306",
            "medianManwon": 35000
          },
          {
            "ym": "202309",
            "medianManwon": 37650
          },
          {
            "ym": "202312",
            "medianManwon": 36750
          },
          {
            "ym": "202403",
            "medianManwon": 37150
          },
          {
            "ym": "202406",
            "medianManwon": 38000
          },
          {
            "ym": "202412",
            "medianManwon": 39000
          },
          {
            "ym": "202503",
            "medianManwon": 38125
          },
          {
            "ym": "202506",
            "medianManwon": 35200
          },
          {
            "ym": "202509",
            "medianManwon": 37300
          },
          {
            "ym": "202512",
            "medianManwon": 38000
          },
          {
            "ym": "202603",
            "medianManwon": 40000
          },
          {
            "ym": "202606",
            "medianManwon": 43750
          }
        ]
      },
      {
        "name": "신나무실쌍용",
        "dong": "영통동",
        "sggName": "영통구",
        "pyeong": 18,
        "areaM2": 59.965,
        "latestManwon": 44500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 49800
          },
          {
            "ym": "202206",
            "medianManwon": 51300
          },
          {
            "ym": "202212",
            "medianManwon": 35800
          },
          {
            "ym": "202306",
            "medianManwon": 38900
          },
          {
            "ym": "202309",
            "medianManwon": 38750
          },
          {
            "ym": "202312",
            "medianManwon": 37500
          },
          {
            "ym": "202403",
            "medianManwon": 39500
          },
          {
            "ym": "202406",
            "medianManwon": 38400
          },
          {
            "ym": "202409",
            "medianManwon": 38500
          },
          {
            "ym": "202412",
            "medianManwon": 41000
          },
          {
            "ym": "202503",
            "medianManwon": 38400
          },
          {
            "ym": "202506",
            "medianManwon": 37960
          },
          {
            "ym": "202509",
            "medianManwon": 40000
          },
          {
            "ym": "202512",
            "medianManwon": 40000
          },
          {
            "ym": "202603",
            "medianManwon": 44450
          },
          {
            "ym": "202606",
            "medianManwon": 44500
          }
        ]
      },
      {
        "name": "황골마을(쌍용)",
        "dong": "영통동",
        "sggName": "영통구",
        "pyeong": 18,
        "areaM2": 59.8,
        "latestManwon": 45950,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 42750
          },
          {
            "ym": "202212",
            "medianManwon": 34000
          },
          {
            "ym": "202303",
            "medianManwon": 34150
          },
          {
            "ym": "202306",
            "medianManwon": 33150
          },
          {
            "ym": "202309",
            "medianManwon": 38175
          },
          {
            "ym": "202312",
            "medianManwon": 36400
          },
          {
            "ym": "202403",
            "medianManwon": 36500
          },
          {
            "ym": "202406",
            "medianManwon": 38075
          },
          {
            "ym": "202409",
            "medianManwon": 36500
          },
          {
            "ym": "202412",
            "medianManwon": 40300
          },
          {
            "ym": "202503",
            "medianManwon": 37950
          },
          {
            "ym": "202506",
            "medianManwon": 39250
          },
          {
            "ym": "202509",
            "medianManwon": 40500
          },
          {
            "ym": "202512",
            "medianManwon": 41500
          },
          {
            "ym": "202603",
            "medianManwon": 40500
          },
          {
            "ym": "202606",
            "medianManwon": 45950
          }
        ]
      },
      {
        "name": "벽적골주공휴먼시아8단지",
        "dong": "영통동",
        "sggName": "영통구",
        "pyeong": 18,
        "areaM2": 59.99,
        "latestManwon": 47800,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 49000
          },
          {
            "ym": "202206",
            "medianManwon": 40000
          },
          {
            "ym": "202209",
            "medianManwon": 41000
          },
          {
            "ym": "202212",
            "medianManwon": 33000
          },
          {
            "ym": "202303",
            "medianManwon": 36000
          },
          {
            "ym": "202306",
            "medianManwon": 39000
          },
          {
            "ym": "202309",
            "medianManwon": 40350
          },
          {
            "ym": "202312",
            "medianManwon": 39500
          },
          {
            "ym": "202403",
            "medianManwon": 41000
          },
          {
            "ym": "202406",
            "medianManwon": 39400
          },
          {
            "ym": "202409",
            "medianManwon": 42150
          },
          {
            "ym": "202412",
            "medianManwon": 36000
          },
          {
            "ym": "202503",
            "medianManwon": 35000
          },
          {
            "ym": "202506",
            "medianManwon": 40800
          },
          {
            "ym": "202509",
            "medianManwon": 42000
          },
          {
            "ym": "202512",
            "medianManwon": 42350
          },
          {
            "ym": "202603",
            "medianManwon": 41500
          },
          {
            "ym": "202606",
            "medianManwon": 47800
          }
        ]
      },
      {
        "name": "영통센트럴파크뷰",
        "dong": "영통동",
        "sggName": "영통구",
        "pyeong": 18,
        "areaM2": 59.99,
        "latestManwon": 50800,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 46500
          },
          {
            "ym": "202206",
            "medianManwon": 45550
          },
          {
            "ym": "202209",
            "medianManwon": 37800
          },
          {
            "ym": "202212",
            "medianManwon": 36000
          },
          {
            "ym": "202303",
            "medianManwon": 35200
          },
          {
            "ym": "202306",
            "medianManwon": 36000
          },
          {
            "ym": "202309",
            "medianManwon": 38600
          },
          {
            "ym": "202312",
            "medianManwon": 38800
          },
          {
            "ym": "202403",
            "medianManwon": 35900
          },
          {
            "ym": "202406",
            "medianManwon": 38750
          },
          {
            "ym": "202409",
            "medianManwon": 39300
          },
          {
            "ym": "202412",
            "medianManwon": 41250
          },
          {
            "ym": "202503",
            "medianManwon": 38000
          },
          {
            "ym": "202506",
            "medianManwon": 41500
          },
          {
            "ym": "202509",
            "medianManwon": 42000
          },
          {
            "ym": "202512",
            "medianManwon": 41350
          },
          {
            "ym": "202603",
            "medianManwon": 42000
          },
          {
            "ym": "202606",
            "medianManwon": 50800
          }
        ]
      },
      {
        "name": "벽적골우성",
        "dong": "영통동",
        "sggName": "영통구",
        "pyeong": 18,
        "areaM2": 59.84,
        "latestManwon": 51500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 57500
          },
          {
            "ym": "202206",
            "medianManwon": 47750
          },
          {
            "ym": "202209",
            "medianManwon": 49000
          },
          {
            "ym": "202212",
            "medianManwon": 40000
          },
          {
            "ym": "202303",
            "medianManwon": 41000
          },
          {
            "ym": "202306",
            "medianManwon": 43800
          },
          {
            "ym": "202309",
            "medianManwon": 47400
          },
          {
            "ym": "202312",
            "medianManwon": 48000
          },
          {
            "ym": "202403",
            "medianManwon": 47250
          },
          {
            "ym": "202406",
            "medianManwon": 47150
          },
          {
            "ym": "202409",
            "medianManwon": 47000
          },
          {
            "ym": "202412",
            "medianManwon": 48000
          },
          {
            "ym": "202503",
            "medianManwon": 44500
          },
          {
            "ym": "202506",
            "medianManwon": 44850
          },
          {
            "ym": "202509",
            "medianManwon": 48000
          },
          {
            "ym": "202512",
            "medianManwon": 47000
          },
          {
            "ym": "202603",
            "medianManwon": 50000
          },
          {
            "ym": "202606",
            "medianManwon": 51500
          }
        ]
      },
      {
        "name": "주공그린빌3",
        "dong": "매탄동",
        "sggName": "영통구",
        "pyeong": 26,
        "areaM2": 84.45,
        "latestManwon": 52250,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 58000
          },
          {
            "ym": "202206",
            "medianManwon": 50000
          },
          {
            "ym": "202209",
            "medianManwon": 45000
          },
          {
            "ym": "202303",
            "medianManwon": 46500
          },
          {
            "ym": "202306",
            "medianManwon": 45000
          },
          {
            "ym": "202309",
            "medianManwon": 49500
          },
          {
            "ym": "202312",
            "medianManwon": 44500
          },
          {
            "ym": "202403",
            "medianManwon": 46500
          },
          {
            "ym": "202406",
            "medianManwon": 49500
          },
          {
            "ym": "202409",
            "medianManwon": 51500
          },
          {
            "ym": "202412",
            "medianManwon": 49500
          },
          {
            "ym": "202503",
            "medianManwon": 50000
          },
          {
            "ym": "202506",
            "medianManwon": 52500
          },
          {
            "ym": "202509",
            "medianManwon": 50000
          },
          {
            "ym": "202512",
            "medianManwon": 52500
          },
          {
            "ym": "202603",
            "medianManwon": 51500
          },
          {
            "ym": "202606",
            "medianManwon": 52250
          }
        ]
      },
      {
        "name": "원천레이크파크",
        "dong": "원천동",
        "sggName": "영통구",
        "pyeong": 18,
        "areaM2": 59.8,
        "latestManwon": 52350,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 55650
          },
          {
            "ym": "202206",
            "medianManwon": 55500
          },
          {
            "ym": "202209",
            "medianManwon": 42000
          },
          {
            "ym": "202212",
            "medianManwon": 36000
          },
          {
            "ym": "202303",
            "medianManwon": 35000
          },
          {
            "ym": "202306",
            "medianManwon": 38750
          },
          {
            "ym": "202309",
            "medianManwon": 40300
          },
          {
            "ym": "202403",
            "medianManwon": 41300
          },
          {
            "ym": "202406",
            "medianManwon": 41500
          },
          {
            "ym": "202409",
            "medianManwon": 44500
          },
          {
            "ym": "202503",
            "medianManwon": 44700
          },
          {
            "ym": "202506",
            "medianManwon": 45350
          },
          {
            "ym": "202509",
            "medianManwon": 45000
          },
          {
            "ym": "202512",
            "medianManwon": 46000
          },
          {
            "ym": "202603",
            "medianManwon": 46500
          },
          {
            "ym": "202606",
            "medianManwon": 52350
          }
        ]
      },
      {
        "name": "벽적골한신",
        "dong": "영통동",
        "sggName": "영통구",
        "pyeong": 18,
        "areaM2": 59.73,
        "latestManwon": 53200,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 49000
          },
          {
            "ym": "202209",
            "medianManwon": 43850
          },
          {
            "ym": "202212",
            "medianManwon": 40000
          },
          {
            "ym": "202303",
            "medianManwon": 42000
          },
          {
            "ym": "202306",
            "medianManwon": 45900
          },
          {
            "ym": "202309",
            "medianManwon": 44750
          },
          {
            "ym": "202312",
            "medianManwon": 48500
          },
          {
            "ym": "202403",
            "medianManwon": 44000
          },
          {
            "ym": "202406",
            "medianManwon": 48700
          },
          {
            "ym": "202409",
            "medianManwon": 46800
          },
          {
            "ym": "202412",
            "medianManwon": 47700
          },
          {
            "ym": "202503",
            "medianManwon": 44350
          },
          {
            "ym": "202506",
            "medianManwon": 46900
          },
          {
            "ym": "202509",
            "medianManwon": 46000
          },
          {
            "ym": "202512",
            "medianManwon": 48500
          },
          {
            "ym": "202603",
            "medianManwon": 50250
          },
          {
            "ym": "202606",
            "medianManwon": 53200
          }
        ]
      },
      {
        "name": "풍림",
        "dong": "영통동",
        "sggName": "영통구",
        "pyeong": 26,
        "areaM2": 84.84,
        "latestManwon": 54000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 59000
          },
          {
            "ym": "202206",
            "medianManwon": 57500
          },
          {
            "ym": "202209",
            "medianManwon": 50000
          },
          {
            "ym": "202212",
            "medianManwon": 31500
          },
          {
            "ym": "202303",
            "medianManwon": 48600
          },
          {
            "ym": "202306",
            "medianManwon": 50625
          },
          {
            "ym": "202309",
            "medianManwon": 51000
          },
          {
            "ym": "202312",
            "medianManwon": 52000
          },
          {
            "ym": "202403",
            "medianManwon": 56000
          },
          {
            "ym": "202412",
            "medianManwon": 53000
          },
          {
            "ym": "202503",
            "medianManwon": 53000
          },
          {
            "ym": "202506",
            "medianManwon": 53000
          },
          {
            "ym": "202509",
            "medianManwon": 51000
          },
          {
            "ym": "202512",
            "medianManwon": 49000
          },
          {
            "ym": "202603",
            "medianManwon": 54500
          },
          {
            "ym": "202606",
            "medianManwon": 54000
          }
        ]
      },
      {
        "name": "황골마을주공1",
        "dong": "영통동",
        "sggName": "영통구",
        "pyeong": 18,
        "areaM2": 59.99,
        "latestManwon": 54150,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 48000
          },
          {
            "ym": "202206",
            "medianManwon": 46500
          },
          {
            "ym": "202209",
            "medianManwon": 39000
          },
          {
            "ym": "202212",
            "medianManwon": 36000
          },
          {
            "ym": "202303",
            "medianManwon": 34000
          },
          {
            "ym": "202306",
            "medianManwon": 36850
          },
          {
            "ym": "202309",
            "medianManwon": 41150
          },
          {
            "ym": "202312",
            "medianManwon": 36650
          },
          {
            "ym": "202403",
            "medianManwon": 39225
          },
          {
            "ym": "202406",
            "medianManwon": 38300
          },
          {
            "ym": "202409",
            "medianManwon": 42000
          },
          {
            "ym": "202412",
            "medianManwon": 43000
          },
          {
            "ym": "202503",
            "medianManwon": 42250
          },
          {
            "ym": "202506",
            "medianManwon": 42850
          },
          {
            "ym": "202509",
            "medianManwon": 43000
          },
          {
            "ym": "202512",
            "medianManwon": 45250
          },
          {
            "ym": "202603",
            "medianManwon": 45500
          },
          {
            "ym": "202606",
            "medianManwon": 54150
          }
        ]
      },
      {
        "name": "청명마을(주공)",
        "dong": "영통동",
        "sggName": "영통구",
        "pyeong": 18,
        "areaM2": 59.99,
        "latestManwon": 55000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 51000
          },
          {
            "ym": "202206",
            "medianManwon": 49750
          },
          {
            "ym": "202209",
            "medianManwon": 43000
          },
          {
            "ym": "202212",
            "medianManwon": 38000
          },
          {
            "ym": "202303",
            "medianManwon": 39900
          },
          {
            "ym": "202306",
            "medianManwon": 40600
          },
          {
            "ym": "202309",
            "medianManwon": 42250
          },
          {
            "ym": "202312",
            "medianManwon": 42550
          },
          {
            "ym": "202403",
            "medianManwon": 41300
          },
          {
            "ym": "202406",
            "medianManwon": 41500
          },
          {
            "ym": "202409",
            "medianManwon": 45250
          },
          {
            "ym": "202412",
            "medianManwon": 44350
          },
          {
            "ym": "202503",
            "medianManwon": 45500
          },
          {
            "ym": "202506",
            "medianManwon": 46100
          },
          {
            "ym": "202509",
            "medianManwon": 47200
          },
          {
            "ym": "202512",
            "medianManwon": 49200
          },
          {
            "ym": "202603",
            "medianManwon": 49000
          },
          {
            "ym": "202606",
            "medianManwon": 55000
          }
        ]
      },
      {
        "name": "벽적골9단지주공",
        "dong": "영통동",
        "sggName": "영통구",
        "pyeong": 18,
        "areaM2": 59.39,
        "latestManwon": 63100,
        "series": [
          {
            "ym": "202209",
            "medianManwon": 41500
          },
          {
            "ym": "202212",
            "medianManwon": 36300
          },
          {
            "ym": "202303",
            "medianManwon": 38600
          },
          {
            "ym": "202306",
            "medianManwon": 43000
          },
          {
            "ym": "202309",
            "medianManwon": 44000
          },
          {
            "ym": "202312",
            "medianManwon": 44700
          },
          {
            "ym": "202403",
            "medianManwon": 45000
          },
          {
            "ym": "202406",
            "medianManwon": 45800
          },
          {
            "ym": "202409",
            "medianManwon": 48000
          },
          {
            "ym": "202412",
            "medianManwon": 45300
          },
          {
            "ym": "202503",
            "medianManwon": 49500
          },
          {
            "ym": "202506",
            "medianManwon": 48500
          },
          {
            "ym": "202509",
            "medianManwon": 49800
          },
          {
            "ym": "202512",
            "medianManwon": 51500
          },
          {
            "ym": "202603",
            "medianManwon": 59800
          },
          {
            "ym": "202606",
            "medianManwon": 63100
          }
        ]
      },
      {
        "name": "동수원자이1차",
        "dong": "망포동",
        "sggName": "영통구",
        "pyeong": 26,
        "areaM2": 84.9688,
        "latestManwon": 64125,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 57000
          },
          {
            "ym": "202206",
            "medianManwon": 56900
          },
          {
            "ym": "202212",
            "medianManwon": 47250
          },
          {
            "ym": "202303",
            "medianManwon": 45700
          },
          {
            "ym": "202306",
            "medianManwon": 46500
          },
          {
            "ym": "202309",
            "medianManwon": 50800
          },
          {
            "ym": "202312",
            "medianManwon": 47500
          },
          {
            "ym": "202403",
            "medianManwon": 52000
          },
          {
            "ym": "202406",
            "medianManwon": 50750
          },
          {
            "ym": "202409",
            "medianManwon": 54000
          },
          {
            "ym": "202412",
            "medianManwon": 54000
          },
          {
            "ym": "202503",
            "medianManwon": 53500
          },
          {
            "ym": "202506",
            "medianManwon": 54500
          },
          {
            "ym": "202509",
            "medianManwon": 57400
          },
          {
            "ym": "202512",
            "medianManwon": 60000
          },
          {
            "ym": "202603",
            "medianManwon": 63000
          },
          {
            "ym": "202606",
            "medianManwon": 64125
          }
        ]
      },
      {
        "name": "매탄위브하늘채",
        "dong": "매탄동",
        "sggName": "영통구",
        "pyeong": 26,
        "areaM2": 84.818,
        "latestManwon": 76250,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 73150
          },
          {
            "ym": "202206",
            "medianManwon": 67000
          },
          {
            "ym": "202209",
            "medianManwon": 68500
          },
          {
            "ym": "202212",
            "medianManwon": 58000
          },
          {
            "ym": "202303",
            "medianManwon": 62000
          },
          {
            "ym": "202306",
            "medianManwon": 64800
          },
          {
            "ym": "202309",
            "medianManwon": 67000
          },
          {
            "ym": "202312",
            "medianManwon": 62000
          },
          {
            "ym": "202403",
            "medianManwon": 70000
          },
          {
            "ym": "202406",
            "medianManwon": 69800
          },
          {
            "ym": "202409",
            "medianManwon": 71500
          },
          {
            "ym": "202412",
            "medianManwon": 69000
          },
          {
            "ym": "202503",
            "medianManwon": 71650
          },
          {
            "ym": "202506",
            "medianManwon": 74150
          },
          {
            "ym": "202509",
            "medianManwon": 75000
          },
          {
            "ym": "202512",
            "medianManwon": 74500
          },
          {
            "ym": "202603",
            "medianManwon": 74200
          },
          {
            "ym": "202606",
            "medianManwon": 76250
          }
        ]
      },
      {
        "name": "영통에듀파크(321동~327동)",
        "dong": "영통동",
        "sggName": "영통구",
        "pyeong": 26,
        "areaM2": 84.96,
        "latestManwon": 88750,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 73000
          },
          {
            "ym": "202206",
            "medianManwon": 74000
          },
          {
            "ym": "202212",
            "medianManwon": 55000
          },
          {
            "ym": "202303",
            "medianManwon": 63250
          },
          {
            "ym": "202306",
            "medianManwon": 68900
          },
          {
            "ym": "202309",
            "medianManwon": 71000
          },
          {
            "ym": "202312",
            "medianManwon": 70000
          },
          {
            "ym": "202403",
            "medianManwon": 64000
          },
          {
            "ym": "202406",
            "medianManwon": 63000
          },
          {
            "ym": "202409",
            "medianManwon": 72000
          },
          {
            "ym": "202412",
            "medianManwon": 71800
          },
          {
            "ym": "202503",
            "medianManwon": 76500
          },
          {
            "ym": "202506",
            "medianManwon": 77350
          },
          {
            "ym": "202509",
            "medianManwon": 79500
          },
          {
            "ym": "202603",
            "medianManwon": 82000
          },
          {
            "ym": "202606",
            "medianManwon": 88750
          }
        ]
      },
      {
        "name": "영통SKVIEW",
        "dong": "망포동",
        "sggName": "영통구",
        "pyeong": 26,
        "areaM2": 84.7372,
        "latestManwon": 99750,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 86600
          },
          {
            "ym": "202206",
            "medianManwon": 79000
          },
          {
            "ym": "202303",
            "medianManwon": 72250
          },
          {
            "ym": "202306",
            "medianManwon": 81500
          },
          {
            "ym": "202309",
            "medianManwon": 83000
          },
          {
            "ym": "202312",
            "medianManwon": 79300
          },
          {
            "ym": "202403",
            "medianManwon": 78000
          },
          {
            "ym": "202406",
            "medianManwon": 80000
          },
          {
            "ym": "202409",
            "medianManwon": 77500
          },
          {
            "ym": "202412",
            "medianManwon": 80250
          },
          {
            "ym": "202503",
            "medianManwon": 85000
          },
          {
            "ym": "202506",
            "medianManwon": 82500
          },
          {
            "ym": "202509",
            "medianManwon": 84200
          },
          {
            "ym": "202512",
            "medianManwon": 92250
          },
          {
            "ym": "202603",
            "medianManwon": 91400
          },
          {
            "ym": "202606",
            "medianManwon": 99750
          }
        ]
      },
      {
        "name": "광교호반베르디움",
        "dong": "원천동",
        "sggName": "영통구",
        "pyeong": 18,
        "areaM2": 59.9306,
        "latestManwon": 113250,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 86000
          },
          {
            "ym": "202206",
            "medianManwon": 80000
          },
          {
            "ym": "202209",
            "medianManwon": 71350
          },
          {
            "ym": "202212",
            "medianManwon": 65750
          },
          {
            "ym": "202303",
            "medianManwon": 72000
          },
          {
            "ym": "202306",
            "medianManwon": 74000
          },
          {
            "ym": "202309",
            "medianManwon": 81100
          },
          {
            "ym": "202312",
            "medianManwon": 76000
          },
          {
            "ym": "202403",
            "medianManwon": 77000
          },
          {
            "ym": "202406",
            "medianManwon": 78350
          },
          {
            "ym": "202409",
            "medianManwon": 79250
          },
          {
            "ym": "202412",
            "medianManwon": 82000
          },
          {
            "ym": "202503",
            "medianManwon": 82400
          },
          {
            "ym": "202506",
            "medianManwon": 85400
          },
          {
            "ym": "202509",
            "medianManwon": 90000
          },
          {
            "ym": "202512",
            "medianManwon": 100000
          },
          {
            "ym": "202603",
            "medianManwon": 108000
          },
          {
            "ym": "202606",
            "medianManwon": 113250
          }
        ]
      },
      {
        "name": "영통아이파크캐슬1단지",
        "dong": "망포동",
        "sggName": "영통구",
        "pyeong": 26,
        "areaM2": 84.69,
        "latestManwon": 118000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 90500
          },
          {
            "ym": "202206",
            "medianManwon": 82200
          },
          {
            "ym": "202209",
            "medianManwon": 76750
          },
          {
            "ym": "202212",
            "medianManwon": 76000
          },
          {
            "ym": "202303",
            "medianManwon": 81250
          },
          {
            "ym": "202306",
            "medianManwon": 84000
          },
          {
            "ym": "202309",
            "medianManwon": 84500
          },
          {
            "ym": "202312",
            "medianManwon": 87750
          },
          {
            "ym": "202403",
            "medianManwon": 84000
          },
          {
            "ym": "202406",
            "medianManwon": 89550
          },
          {
            "ym": "202412",
            "medianManwon": 97500
          },
          {
            "ym": "202503",
            "medianManwon": 95250
          },
          {
            "ym": "202506",
            "medianManwon": 96500
          },
          {
            "ym": "202509",
            "medianManwon": 97000
          },
          {
            "ym": "202512",
            "medianManwon": 107000
          },
          {
            "ym": "202603",
            "medianManwon": 112000
          },
          {
            "ym": "202606",
            "medianManwon": 118000
          }
        ]
      },
      {
        "name": "힐스테이트영통",
        "dong": "망포동",
        "sggName": "영통구",
        "pyeong": 26,
        "areaM2": 84.8897,
        "latestManwon": 129000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 93000
          },
          {
            "ym": "202206",
            "medianManwon": 92800
          },
          {
            "ym": "202212",
            "medianManwon": 83000
          },
          {
            "ym": "202303",
            "medianManwon": 87500
          },
          {
            "ym": "202306",
            "medianManwon": 91850
          },
          {
            "ym": "202309",
            "medianManwon": 96000
          },
          {
            "ym": "202312",
            "medianManwon": 93000
          },
          {
            "ym": "202403",
            "medianManwon": 94200
          },
          {
            "ym": "202406",
            "medianManwon": 97500
          },
          {
            "ym": "202409",
            "medianManwon": 101000
          },
          {
            "ym": "202412",
            "medianManwon": 100650
          },
          {
            "ym": "202503",
            "medianManwon": 102000
          },
          {
            "ym": "202506",
            "medianManwon": 103500
          },
          {
            "ym": "202509",
            "medianManwon": 109000
          },
          {
            "ym": "202512",
            "medianManwon": 112000
          },
          {
            "ym": "202603",
            "medianManwon": 124000
          },
          {
            "ym": "202606",
            "medianManwon": 129000
          }
        ]
      },
      {
        "name": "광교센트럴뷰",
        "dong": "이의동",
        "sggName": "영통구",
        "pyeong": 26,
        "areaM2": 84.81,
        "latestManwon": 161000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 113650
          },
          {
            "ym": "202209",
            "medianManwon": 107500
          },
          {
            "ym": "202212",
            "medianManwon": 90000
          },
          {
            "ym": "202303",
            "medianManwon": 104500
          },
          {
            "ym": "202306",
            "medianManwon": 110000
          },
          {
            "ym": "202309",
            "medianManwon": 116500
          },
          {
            "ym": "202312",
            "medianManwon": 114500
          },
          {
            "ym": "202403",
            "medianManwon": 115000
          },
          {
            "ym": "202406",
            "medianManwon": 119500
          },
          {
            "ym": "202409",
            "medianManwon": 133000
          },
          {
            "ym": "202503",
            "medianManwon": 129250
          },
          {
            "ym": "202506",
            "medianManwon": 131000
          },
          {
            "ym": "202509",
            "medianManwon": 137750
          },
          {
            "ym": "202512",
            "medianManwon": 146250
          },
          {
            "ym": "202603",
            "medianManwon": 158750
          },
          {
            "ym": "202606",
            "medianManwon": 161000
          }
        ]
      },
      {
        "name": "광교중흥에스클래스",
        "dong": "원천동",
        "sggName": "영통구",
        "pyeong": 26,
        "areaM2": 84.9007,
        "latestManwon": 184000,
        "series": [
          {
            "ym": "202209",
            "medianManwon": 137500
          },
          {
            "ym": "202212",
            "medianManwon": 130500
          },
          {
            "ym": "202303",
            "medianManwon": 137500
          },
          {
            "ym": "202306",
            "medianManwon": 147000
          },
          {
            "ym": "202309",
            "medianManwon": 153000
          },
          {
            "ym": "202312",
            "medianManwon": 140000
          },
          {
            "ym": "202403",
            "medianManwon": 135500
          },
          {
            "ym": "202406",
            "medianManwon": 153000
          },
          {
            "ym": "202409",
            "medianManwon": 145000
          },
          {
            "ym": "202412",
            "medianManwon": 157500
          },
          {
            "ym": "202503",
            "medianManwon": 160000
          },
          {
            "ym": "202506",
            "medianManwon": 161750
          },
          {
            "ym": "202509",
            "medianManwon": 166500
          },
          {
            "ym": "202512",
            "medianManwon": 164250
          },
          {
            "ym": "202603",
            "medianManwon": 168000
          },
          {
            "ym": "202606",
            "medianManwon": 184000
          }
        ]
      },
      {
        "name": "자연앤힐스테이트",
        "dong": "이의동",
        "sggName": "영통구",
        "pyeong": 26,
        "areaM2": 84.46,
        "latestManwon": 188500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 147000
          },
          {
            "ym": "202206",
            "medianManwon": 143750
          },
          {
            "ym": "202209",
            "medianManwon": 120000
          },
          {
            "ym": "202212",
            "medianManwon": 108900
          },
          {
            "ym": "202303",
            "medianManwon": 127000
          },
          {
            "ym": "202306",
            "medianManwon": 134000
          },
          {
            "ym": "202309",
            "medianManwon": 139000
          },
          {
            "ym": "202312",
            "medianManwon": 136000
          },
          {
            "ym": "202403",
            "medianManwon": 138100
          },
          {
            "ym": "202406",
            "medianManwon": 145750
          },
          {
            "ym": "202409",
            "medianManwon": 152000
          },
          {
            "ym": "202412",
            "medianManwon": 160000
          },
          {
            "ym": "202503",
            "medianManwon": 152500
          },
          {
            "ym": "202506",
            "medianManwon": 160000
          },
          {
            "ym": "202509",
            "medianManwon": 165000
          },
          {
            "ym": "202512",
            "medianManwon": 178500
          },
          {
            "ym": "202603",
            "medianManwon": 184000
          },
          {
            "ym": "202606",
            "medianManwon": 188500
          }
        ]
      },
      {
        "name": "광교e편한세상",
        "dong": "이의동",
        "sggName": "영통구",
        "pyeong": 36,
        "areaM2": 120.0331,
        "latestManwon": 212000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 165000
          },
          {
            "ym": "202206",
            "medianManwon": 165000
          },
          {
            "ym": "202209",
            "medianManwon": 150000
          },
          {
            "ym": "202212",
            "medianManwon": 141000
          },
          {
            "ym": "202306",
            "medianManwon": 159000
          },
          {
            "ym": "202309",
            "medianManwon": 169000
          },
          {
            "ym": "202403",
            "medianManwon": 158250
          },
          {
            "ym": "202406",
            "medianManwon": 165500
          },
          {
            "ym": "202409",
            "medianManwon": 184900
          },
          {
            "ym": "202412",
            "medianManwon": 180000
          },
          {
            "ym": "202503",
            "medianManwon": 183000
          },
          {
            "ym": "202506",
            "medianManwon": 180250
          },
          {
            "ym": "202509",
            "medianManwon": 192000
          },
          {
            "ym": "202512",
            "medianManwon": 188000
          },
          {
            "ym": "202603",
            "medianManwon": 200000
          },
          {
            "ym": "202606",
            "medianManwon": 212000
          }
        ]
      },
      {
        "name": "래미안슈르",
        "dong": "원문동",
        "sggName": "과천시",
        "pyeong": 26,
        "areaM2": 84.964,
        "latestManwon": 219400,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 148000
          },
          {
            "ym": "202209",
            "medianManwon": 148000
          },
          {
            "ym": "202212",
            "medianManwon": 124500
          },
          {
            "ym": "202303",
            "medianManwon": 133000
          },
          {
            "ym": "202306",
            "medianManwon": 142000
          },
          {
            "ym": "202309",
            "medianManwon": 146000
          },
          {
            "ym": "202312",
            "medianManwon": 138000
          },
          {
            "ym": "202403",
            "medianManwon": 143250
          },
          {
            "ym": "202406",
            "medianManwon": 157000
          },
          {
            "ym": "202409",
            "medianManwon": 159500
          },
          {
            "ym": "202412",
            "medianManwon": 167000
          },
          {
            "ym": "202503",
            "medianManwon": 175000
          },
          {
            "ym": "202506",
            "medianManwon": 200000
          },
          {
            "ym": "202509",
            "medianManwon": 215000
          },
          {
            "ym": "202606",
            "medianManwon": 219400
          }
        ]
      }
    ]
  },
  "daejeon-premium": {
    "label": "대전 상급지",
    "complexes": [
      {
        "name": "송강그린",
        "dong": "송강동",
        "sggName": "유성구",
        "pyeong": 18,
        "areaM2": 59.914,
        "latestManwon": 19650,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 22250
          },
          {
            "ym": "202206",
            "medianManwon": 21950
          },
          {
            "ym": "202209",
            "medianManwon": 18750
          },
          {
            "ym": "202212",
            "medianManwon": 17000
          },
          {
            "ym": "202303",
            "medianManwon": 16500
          },
          {
            "ym": "202306",
            "medianManwon": 17900
          },
          {
            "ym": "202309",
            "medianManwon": 18150
          },
          {
            "ym": "202312",
            "medianManwon": 19000
          },
          {
            "ym": "202403",
            "medianManwon": 18750
          },
          {
            "ym": "202406",
            "medianManwon": 18575
          },
          {
            "ym": "202409",
            "medianManwon": 18750
          },
          {
            "ym": "202412",
            "medianManwon": 19000
          },
          {
            "ym": "202503",
            "medianManwon": 18400
          },
          {
            "ym": "202506",
            "medianManwon": 18000
          },
          {
            "ym": "202509",
            "medianManwon": 19700
          },
          {
            "ym": "202512",
            "medianManwon": 19450
          },
          {
            "ym": "202603",
            "medianManwon": 18250
          },
          {
            "ym": "202606",
            "medianManwon": 19650
          }
        ]
      },
      {
        "name": "구봉마을주공8-1",
        "dong": "관저동",
        "sggName": "서구",
        "pyeong": 18,
        "areaM2": 59.47,
        "latestManwon": 19700,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 24000
          },
          {
            "ym": "202206",
            "medianManwon": 21500
          },
          {
            "ym": "202209",
            "medianManwon": 20100
          },
          {
            "ym": "202212",
            "medianManwon": 20000
          },
          {
            "ym": "202303",
            "medianManwon": 18000
          },
          {
            "ym": "202306",
            "medianManwon": 19000
          },
          {
            "ym": "202309",
            "medianManwon": 18800
          },
          {
            "ym": "202312",
            "medianManwon": 19200
          },
          {
            "ym": "202403",
            "medianManwon": 21000
          },
          {
            "ym": "202406",
            "medianManwon": 20500
          },
          {
            "ym": "202409",
            "medianManwon": 19450
          },
          {
            "ym": "202412",
            "medianManwon": 19800
          },
          {
            "ym": "202503",
            "medianManwon": 19600
          },
          {
            "ym": "202506",
            "medianManwon": 18500
          },
          {
            "ym": "202509",
            "medianManwon": 20000
          },
          {
            "ym": "202512",
            "medianManwon": 20300
          },
          {
            "ym": "202603",
            "medianManwon": 18900
          },
          {
            "ym": "202606",
            "medianManwon": 19700
          }
        ]
      },
      {
        "name": "갈마",
        "dong": "갈마동",
        "sggName": "서구",
        "pyeong": 26,
        "areaM2": 84.68,
        "latestManwon": 22500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 27500
          },
          {
            "ym": "202206",
            "medianManwon": 28000
          },
          {
            "ym": "202209",
            "medianManwon": 26750
          },
          {
            "ym": "202212",
            "medianManwon": 27750
          },
          {
            "ym": "202303",
            "medianManwon": 23500
          },
          {
            "ym": "202306",
            "medianManwon": 23000
          },
          {
            "ym": "202309",
            "medianManwon": 26500
          },
          {
            "ym": "202312",
            "medianManwon": 24000
          },
          {
            "ym": "202403",
            "medianManwon": 23750
          },
          {
            "ym": "202406",
            "medianManwon": 24350
          },
          {
            "ym": "202409",
            "medianManwon": 23200
          },
          {
            "ym": "202412",
            "medianManwon": 25250
          },
          {
            "ym": "202503",
            "medianManwon": 24650
          },
          {
            "ym": "202506",
            "medianManwon": 21800
          },
          {
            "ym": "202509",
            "medianManwon": 23700
          },
          {
            "ym": "202512",
            "medianManwon": 23750
          },
          {
            "ym": "202603",
            "medianManwon": 23700
          },
          {
            "ym": "202606",
            "medianManwon": 22500
          }
        ]
      },
      {
        "name": "하나로",
        "dong": "월평동",
        "sggName": "서구",
        "pyeong": 18,
        "areaM2": 59.76,
        "latestManwon": 23000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 19000
          },
          {
            "ym": "202206",
            "medianManwon": 26000
          },
          {
            "ym": "202209",
            "medianManwon": 25850
          },
          {
            "ym": "202212",
            "medianManwon": 22200
          },
          {
            "ym": "202303",
            "medianManwon": 21300
          },
          {
            "ym": "202306",
            "medianManwon": 21500
          },
          {
            "ym": "202309",
            "medianManwon": 22000
          },
          {
            "ym": "202312",
            "medianManwon": 22450
          },
          {
            "ym": "202403",
            "medianManwon": 22700
          },
          {
            "ym": "202406",
            "medianManwon": 23325
          },
          {
            "ym": "202409",
            "medianManwon": 25700
          },
          {
            "ym": "202412",
            "medianManwon": 22500
          },
          {
            "ym": "202503",
            "medianManwon": 22950
          },
          {
            "ym": "202506",
            "medianManwon": 23750
          },
          {
            "ym": "202509",
            "medianManwon": 24100
          },
          {
            "ym": "202512",
            "medianManwon": 23500
          },
          {
            "ym": "202603",
            "medianManwon": 24000
          },
          {
            "ym": "202606",
            "medianManwon": 23000
          }
        ]
      },
      {
        "name": "구봉마을5",
        "dong": "관저동",
        "sggName": "서구",
        "pyeong": 26,
        "areaM2": 84.71,
        "latestManwon": 26000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 38900
          },
          {
            "ym": "202206",
            "medianManwon": 31000
          },
          {
            "ym": "202209",
            "medianManwon": 28500
          },
          {
            "ym": "202212",
            "medianManwon": 30750
          },
          {
            "ym": "202303",
            "medianManwon": 26900
          },
          {
            "ym": "202306",
            "medianManwon": 28100
          },
          {
            "ym": "202309",
            "medianManwon": 27500
          },
          {
            "ym": "202312",
            "medianManwon": 30150
          },
          {
            "ym": "202403",
            "medianManwon": 29500
          },
          {
            "ym": "202406",
            "medianManwon": 29125
          },
          {
            "ym": "202409",
            "medianManwon": 29250
          },
          {
            "ym": "202412",
            "medianManwon": 28000
          },
          {
            "ym": "202503",
            "medianManwon": 30000
          },
          {
            "ym": "202509",
            "medianManwon": 28400
          },
          {
            "ym": "202512",
            "medianManwon": 29000
          },
          {
            "ym": "202603",
            "medianManwon": 26300
          },
          {
            "ym": "202606",
            "medianManwon": 26000
          }
        ]
      },
      {
        "name": "롯데",
        "dong": "내동",
        "sggName": "서구",
        "pyeong": 26,
        "areaM2": 84.99,
        "latestManwon": 27500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 29800
          },
          {
            "ym": "202206",
            "medianManwon": 26000
          },
          {
            "ym": "202212",
            "medianManwon": 30500
          },
          {
            "ym": "202303",
            "medianManwon": 32000
          },
          {
            "ym": "202306",
            "medianManwon": 27600
          },
          {
            "ym": "202309",
            "medianManwon": 29000
          },
          {
            "ym": "202312",
            "medianManwon": 24800
          },
          {
            "ym": "202403",
            "medianManwon": 26000
          },
          {
            "ym": "202406",
            "medianManwon": 25350
          },
          {
            "ym": "202409",
            "medianManwon": 27500
          },
          {
            "ym": "202412",
            "medianManwon": 27500
          },
          {
            "ym": "202503",
            "medianManwon": 26500
          },
          {
            "ym": "202506",
            "medianManwon": 26500
          },
          {
            "ym": "202509",
            "medianManwon": 26200
          },
          {
            "ym": "202512",
            "medianManwon": 23000
          },
          {
            "ym": "202603",
            "medianManwon": 23000
          },
          {
            "ym": "202606",
            "medianManwon": 27500
          }
        ]
      },
      {
        "name": "경성큰마을",
        "dong": "갈마동",
        "sggName": "서구",
        "pyeong": 18,
        "areaM2": 59.9,
        "latestManwon": 29800,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 34500
          },
          {
            "ym": "202206",
            "medianManwon": 31400
          },
          {
            "ym": "202212",
            "medianManwon": 26200
          },
          {
            "ym": "202303",
            "medianManwon": 28000
          },
          {
            "ym": "202306",
            "medianManwon": 29500
          },
          {
            "ym": "202309",
            "medianManwon": 28800
          },
          {
            "ym": "202312",
            "medianManwon": 28250
          },
          {
            "ym": "202403",
            "medianManwon": 28250
          },
          {
            "ym": "202406",
            "medianManwon": 28400
          },
          {
            "ym": "202409",
            "medianManwon": 27500
          },
          {
            "ym": "202412",
            "medianManwon": 27700
          },
          {
            "ym": "202503",
            "medianManwon": 27000
          },
          {
            "ym": "202506",
            "medianManwon": 26500
          },
          {
            "ym": "202509",
            "medianManwon": 24900
          },
          {
            "ym": "202512",
            "medianManwon": 27000
          },
          {
            "ym": "202603",
            "medianManwon": 30500
          },
          {
            "ym": "202606",
            "medianManwon": 29800
          }
        ]
      },
      {
        "name": "향촌",
        "dong": "둔산동",
        "sggName": "서구",
        "pyeong": 19,
        "areaM2": 62.1,
        "latestManwon": 30300,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 33900
          },
          {
            "ym": "202209",
            "medianManwon": 28000
          },
          {
            "ym": "202212",
            "medianManwon": 26000
          },
          {
            "ym": "202303",
            "medianManwon": 24500
          },
          {
            "ym": "202306",
            "medianManwon": 28000
          },
          {
            "ym": "202309",
            "medianManwon": 28500
          },
          {
            "ym": "202312",
            "medianManwon": 27500
          },
          {
            "ym": "202403",
            "medianManwon": 26850
          },
          {
            "ym": "202406",
            "medianManwon": 26500
          },
          {
            "ym": "202409",
            "medianManwon": 26375
          },
          {
            "ym": "202412",
            "medianManwon": 27000
          },
          {
            "ym": "202503",
            "medianManwon": 26500
          },
          {
            "ym": "202506",
            "medianManwon": 27500
          },
          {
            "ym": "202509",
            "medianManwon": 28000
          },
          {
            "ym": "202512",
            "medianManwon": 27000
          },
          {
            "ym": "202603",
            "medianManwon": 26000
          },
          {
            "ym": "202606",
            "medianManwon": 30300
          }
        ]
      },
      {
        "name": "관저어반힐스",
        "dong": "관저동",
        "sggName": "서구",
        "pyeong": 18,
        "areaM2": 59.98,
        "latestManwon": 31950,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 39500
          },
          {
            "ym": "202206",
            "medianManwon": 36600
          },
          {
            "ym": "202209",
            "medianManwon": 35500
          },
          {
            "ym": "202212",
            "medianManwon": 32900
          },
          {
            "ym": "202303",
            "medianManwon": 29500
          },
          {
            "ym": "202306",
            "medianManwon": 31300
          },
          {
            "ym": "202309",
            "medianManwon": 34600
          },
          {
            "ym": "202312",
            "medianManwon": 34300
          },
          {
            "ym": "202403",
            "medianManwon": 33450
          },
          {
            "ym": "202406",
            "medianManwon": 33500
          },
          {
            "ym": "202409",
            "medianManwon": 33600
          },
          {
            "ym": "202412",
            "medianManwon": 33000
          },
          {
            "ym": "202503",
            "medianManwon": 32500
          },
          {
            "ym": "202506",
            "medianManwon": 32000
          },
          {
            "ym": "202509",
            "medianManwon": 32500
          },
          {
            "ym": "202512",
            "medianManwon": 33600
          },
          {
            "ym": "202603",
            "medianManwon": 34350
          },
          {
            "ym": "202606",
            "medianManwon": 31950
          }
        ]
      },
      {
        "name": "열매마을4단지(계룡,현대)",
        "dong": "지족동",
        "sggName": "유성구",
        "pyeong": 18,
        "areaM2": 59.982,
        "latestManwon": 33300,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 36500
          },
          {
            "ym": "202209",
            "medianManwon": 30000
          },
          {
            "ym": "202212",
            "medianManwon": 28900
          },
          {
            "ym": "202303",
            "medianManwon": 29150
          },
          {
            "ym": "202306",
            "medianManwon": 32250
          },
          {
            "ym": "202309",
            "medianManwon": 31000
          },
          {
            "ym": "202312",
            "medianManwon": 32000
          },
          {
            "ym": "202403",
            "medianManwon": 30250
          },
          {
            "ym": "202406",
            "medianManwon": 32500
          },
          {
            "ym": "202409",
            "medianManwon": 32900
          },
          {
            "ym": "202412",
            "medianManwon": 30500
          },
          {
            "ym": "202503",
            "medianManwon": 32700
          },
          {
            "ym": "202506",
            "medianManwon": 32000
          },
          {
            "ym": "202509",
            "medianManwon": 31875
          },
          {
            "ym": "202512",
            "medianManwon": 33100
          },
          {
            "ym": "202603",
            "medianManwon": 34400
          },
          {
            "ym": "202606",
            "medianManwon": 33300
          }
        ]
      },
      {
        "name": "초원",
        "dong": "만년동",
        "sggName": "서구",
        "pyeong": 18,
        "areaM2": 59.8,
        "latestManwon": 34550,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 38900
          },
          {
            "ym": "202206",
            "medianManwon": 36400
          },
          {
            "ym": "202209",
            "medianManwon": 33500
          },
          {
            "ym": "202212",
            "medianManwon": 29500
          },
          {
            "ym": "202303",
            "medianManwon": 28450
          },
          {
            "ym": "202306",
            "medianManwon": 26100
          },
          {
            "ym": "202309",
            "medianManwon": 26450
          },
          {
            "ym": "202312",
            "medianManwon": 27700
          },
          {
            "ym": "202403",
            "medianManwon": 28000
          },
          {
            "ym": "202406",
            "medianManwon": 28330
          },
          {
            "ym": "202409",
            "medianManwon": 28750
          },
          {
            "ym": "202412",
            "medianManwon": 29400
          },
          {
            "ym": "202503",
            "medianManwon": 28900
          },
          {
            "ym": "202506",
            "medianManwon": 31000
          },
          {
            "ym": "202509",
            "medianManwon": 33600
          },
          {
            "ym": "202512",
            "medianManwon": 33000
          },
          {
            "ym": "202603",
            "medianManwon": 33300
          },
          {
            "ym": "202606",
            "medianManwon": 34550
          }
        ]
      },
      {
        "name": "한빛",
        "dong": "어은동",
        "sggName": "유성구",
        "pyeong": 26,
        "areaM2": 84.93,
        "latestManwon": 38000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 45500
          },
          {
            "ym": "202206",
            "medianManwon": 44000
          },
          {
            "ym": "202212",
            "medianManwon": 35000
          },
          {
            "ym": "202303",
            "medianManwon": 33000
          },
          {
            "ym": "202306",
            "medianManwon": 35800
          },
          {
            "ym": "202309",
            "medianManwon": 40600
          },
          {
            "ym": "202312",
            "medianManwon": 39400
          },
          {
            "ym": "202403",
            "medianManwon": 38700
          },
          {
            "ym": "202406",
            "medianManwon": 38500
          },
          {
            "ym": "202409",
            "medianManwon": 39500
          },
          {
            "ym": "202412",
            "medianManwon": 41150
          },
          {
            "ym": "202503",
            "medianManwon": 38900
          },
          {
            "ym": "202506",
            "medianManwon": 36000
          },
          {
            "ym": "202509",
            "medianManwon": 39100
          },
          {
            "ym": "202512",
            "medianManwon": 41000
          },
          {
            "ym": "202603",
            "medianManwon": 37650
          },
          {
            "ym": "202606",
            "medianManwon": 38000
          }
        ]
      },
      {
        "name": "수정타운",
        "dong": "둔산동",
        "sggName": "서구",
        "pyeong": 22,
        "areaM2": 71.52,
        "latestManwon": 41500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 43500
          },
          {
            "ym": "202206",
            "medianManwon": 28500
          },
          {
            "ym": "202212",
            "medianManwon": 25750
          },
          {
            "ym": "202303",
            "medianManwon": 29000
          },
          {
            "ym": "202306",
            "medianManwon": 30800
          },
          {
            "ym": "202309",
            "medianManwon": 33000
          },
          {
            "ym": "202312",
            "medianManwon": 31350
          },
          {
            "ym": "202403",
            "medianManwon": 31950
          },
          {
            "ym": "202406",
            "medianManwon": 31000
          },
          {
            "ym": "202409",
            "medianManwon": 31000
          },
          {
            "ym": "202412",
            "medianManwon": 31450
          },
          {
            "ym": "202503",
            "medianManwon": 30500
          },
          {
            "ym": "202506",
            "medianManwon": 32000
          },
          {
            "ym": "202509",
            "medianManwon": 27900
          },
          {
            "ym": "202512",
            "medianManwon": 31800
          },
          {
            "ym": "202603",
            "medianManwon": 36250
          },
          {
            "ym": "202606",
            "medianManwon": 41500
          }
        ]
      },
      {
        "name": "중앙하이츠빌",
        "dong": "관평동",
        "sggName": "유성구",
        "pyeong": 26,
        "areaM2": 84.9548,
        "latestManwon": 42500,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 43300
          },
          {
            "ym": "202209",
            "medianManwon": 38550
          },
          {
            "ym": "202212",
            "medianManwon": 36500
          },
          {
            "ym": "202303",
            "medianManwon": 33750
          },
          {
            "ym": "202306",
            "medianManwon": 38000
          },
          {
            "ym": "202309",
            "medianManwon": 42500
          },
          {
            "ym": "202312",
            "medianManwon": 45200
          },
          {
            "ym": "202403",
            "medianManwon": 38000
          },
          {
            "ym": "202406",
            "medianManwon": 42000
          },
          {
            "ym": "202409",
            "medianManwon": 43000
          },
          {
            "ym": "202412",
            "medianManwon": 42700
          },
          {
            "ym": "202503",
            "medianManwon": 43000
          },
          {
            "ym": "202506",
            "medianManwon": 42250
          },
          {
            "ym": "202509",
            "medianManwon": 43500
          },
          {
            "ym": "202512",
            "medianManwon": 42600
          },
          {
            "ym": "202603",
            "medianManwon": 44250
          },
          {
            "ym": "202606",
            "medianManwon": 42500
          }
        ]
      },
      {
        "name": "진달래",
        "dong": "월평동",
        "sggName": "서구",
        "pyeong": 26,
        "areaM2": 84.57,
        "latestManwon": 44000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 48700
          },
          {
            "ym": "202206",
            "medianManwon": 45000
          },
          {
            "ym": "202212",
            "medianManwon": 30000
          },
          {
            "ym": "202303",
            "medianManwon": 39300
          },
          {
            "ym": "202306",
            "medianManwon": 38500
          },
          {
            "ym": "202309",
            "medianManwon": 39000
          },
          {
            "ym": "202312",
            "medianManwon": 38700
          },
          {
            "ym": "202403",
            "medianManwon": 38500
          },
          {
            "ym": "202406",
            "medianManwon": 38000
          },
          {
            "ym": "202409",
            "medianManwon": 39800
          },
          {
            "ym": "202412",
            "medianManwon": 38000
          },
          {
            "ym": "202503",
            "medianManwon": 36500
          },
          {
            "ym": "202506",
            "medianManwon": 36800
          },
          {
            "ym": "202509",
            "medianManwon": 36900
          },
          {
            "ym": "202512",
            "medianManwon": 37800
          },
          {
            "ym": "202603",
            "medianManwon": 36500
          },
          {
            "ym": "202606",
            "medianManwon": 44000
          }
        ]
      },
      {
        "name": "엑스포",
        "dong": "전민동",
        "sggName": "유성구",
        "pyeong": 25,
        "areaM2": 84.173,
        "latestManwon": 46000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 45500
          },
          {
            "ym": "202206",
            "medianManwon": 39000
          },
          {
            "ym": "202209",
            "medianManwon": 50000
          },
          {
            "ym": "202212",
            "medianManwon": 31500
          },
          {
            "ym": "202303",
            "medianManwon": 35500
          },
          {
            "ym": "202306",
            "medianManwon": 34500
          },
          {
            "ym": "202309",
            "medianManwon": 32000
          },
          {
            "ym": "202312",
            "medianManwon": 35000
          },
          {
            "ym": "202403",
            "medianManwon": 40500
          },
          {
            "ym": "202406",
            "medianManwon": 35650
          },
          {
            "ym": "202409",
            "medianManwon": 34300
          },
          {
            "ym": "202412",
            "medianManwon": 35800
          },
          {
            "ym": "202503",
            "medianManwon": 34800
          },
          {
            "ym": "202506",
            "medianManwon": 35200
          },
          {
            "ym": "202509",
            "medianManwon": 37950
          },
          {
            "ym": "202512",
            "medianManwon": 41000
          },
          {
            "ym": "202603",
            "medianManwon": 47000
          },
          {
            "ym": "202606",
            "medianManwon": 46000
          }
        ]
      },
      {
        "name": "한라비발디",
        "dong": "도안동",
        "sggName": "서구",
        "pyeong": 26,
        "areaM2": 84.8679,
        "latestManwon": 48000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 61500
          },
          {
            "ym": "202209",
            "medianManwon": 51200
          },
          {
            "ym": "202212",
            "medianManwon": 42900
          },
          {
            "ym": "202303",
            "medianManwon": 45350
          },
          {
            "ym": "202306",
            "medianManwon": 48400
          },
          {
            "ym": "202309",
            "medianManwon": 52700
          },
          {
            "ym": "202312",
            "medianManwon": 54100
          },
          {
            "ym": "202403",
            "medianManwon": 48500
          },
          {
            "ym": "202406",
            "medianManwon": 49000
          },
          {
            "ym": "202409",
            "medianManwon": 51150
          },
          {
            "ym": "202412",
            "medianManwon": 49250
          },
          {
            "ym": "202503",
            "medianManwon": 54500
          },
          {
            "ym": "202506",
            "medianManwon": 48000
          },
          {
            "ym": "202509",
            "medianManwon": 49400
          },
          {
            "ym": "202512",
            "medianManwon": 50400
          },
          {
            "ym": "202603",
            "medianManwon": 48400
          },
          {
            "ym": "202606",
            "medianManwon": 48000
          }
        ]
      },
      {
        "name": "엘드수목토",
        "dong": "도안동",
        "sggName": "서구",
        "pyeong": 26,
        "areaM2": 84.9967,
        "latestManwon": 49400,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 53000
          },
          {
            "ym": "202206",
            "medianManwon": 49500
          },
          {
            "ym": "202209",
            "medianManwon": 41500
          },
          {
            "ym": "202212",
            "medianManwon": 42550
          },
          {
            "ym": "202303",
            "medianManwon": 41850
          },
          {
            "ym": "202306",
            "medianManwon": 45000
          },
          {
            "ym": "202309",
            "medianManwon": 48000
          },
          {
            "ym": "202312",
            "medianManwon": 49000
          },
          {
            "ym": "202403",
            "medianManwon": 47750
          },
          {
            "ym": "202406",
            "medianManwon": 46850
          },
          {
            "ym": "202409",
            "medianManwon": 48400
          },
          {
            "ym": "202412",
            "medianManwon": 49150
          },
          {
            "ym": "202503",
            "medianManwon": 48000
          },
          {
            "ym": "202506",
            "medianManwon": 49050
          },
          {
            "ym": "202509",
            "medianManwon": 49500
          },
          {
            "ym": "202512",
            "medianManwon": 50150
          },
          {
            "ym": "202603",
            "medianManwon": 48700
          },
          {
            "ym": "202606",
            "medianManwon": 49400
          }
        ]
      },
      {
        "name": "샘머리2차",
        "dong": "둔산동",
        "sggName": "서구",
        "pyeong": 26,
        "areaM2": 84.945,
        "latestManwon": 49750,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 49000
          },
          {
            "ym": "202209",
            "medianManwon": 41000
          },
          {
            "ym": "202212",
            "medianManwon": 40000
          },
          {
            "ym": "202303",
            "medianManwon": 39700
          },
          {
            "ym": "202306",
            "medianManwon": 42500
          },
          {
            "ym": "202309",
            "medianManwon": 47900
          },
          {
            "ym": "202312",
            "medianManwon": 43300
          },
          {
            "ym": "202403",
            "medianManwon": 44800
          },
          {
            "ym": "202406",
            "medianManwon": 45750
          },
          {
            "ym": "202409",
            "medianManwon": 47500
          },
          {
            "ym": "202412",
            "medianManwon": 43750
          },
          {
            "ym": "202503",
            "medianManwon": 43445
          },
          {
            "ym": "202506",
            "medianManwon": 44500
          },
          {
            "ym": "202509",
            "medianManwon": 43800
          },
          {
            "ym": "202512",
            "medianManwon": 44000
          },
          {
            "ym": "202603",
            "medianManwon": 44500
          },
          {
            "ym": "202606",
            "medianManwon": 49750
          }
        ]
      },
      {
        "name": "대전노은4지구한화꿈에그린2블록",
        "dong": "지족동",
        "sggName": "유성구",
        "pyeong": 26,
        "areaM2": 84.783,
        "latestManwon": 50200,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 52000
          },
          {
            "ym": "202206",
            "medianManwon": 52000
          },
          {
            "ym": "202209",
            "medianManwon": 54775
          },
          {
            "ym": "202212",
            "medianManwon": 48000
          },
          {
            "ym": "202303",
            "medianManwon": 49000
          },
          {
            "ym": "202306",
            "medianManwon": 48500
          },
          {
            "ym": "202309",
            "medianManwon": 51000
          },
          {
            "ym": "202312",
            "medianManwon": 49000
          },
          {
            "ym": "202403",
            "medianManwon": 47650
          },
          {
            "ym": "202406",
            "medianManwon": 49500
          },
          {
            "ym": "202409",
            "medianManwon": 48650
          },
          {
            "ym": "202412",
            "medianManwon": 49250
          },
          {
            "ym": "202503",
            "medianManwon": 48000
          },
          {
            "ym": "202506",
            "medianManwon": 51200
          },
          {
            "ym": "202509",
            "medianManwon": 50700
          },
          {
            "ym": "202512",
            "medianManwon": 50500
          },
          {
            "ym": "202603",
            "medianManwon": 51500
          },
          {
            "ym": "202606",
            "medianManwon": 50200
          }
        ]
      },
      {
        "name": "도안베르디움",
        "dong": "도안동",
        "sggName": "서구",
        "pyeong": 26,
        "areaM2": 84.9317,
        "latestManwon": 51250,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 59950
          },
          {
            "ym": "202206",
            "medianManwon": 49750
          },
          {
            "ym": "202209",
            "medianManwon": 55000
          },
          {
            "ym": "202212",
            "medianManwon": 49000
          },
          {
            "ym": "202303",
            "medianManwon": 50350
          },
          {
            "ym": "202306",
            "medianManwon": 53300
          },
          {
            "ym": "202309",
            "medianManwon": 57000
          },
          {
            "ym": "202312",
            "medianManwon": 53500
          },
          {
            "ym": "202403",
            "medianManwon": 54300
          },
          {
            "ym": "202406",
            "medianManwon": 52950
          },
          {
            "ym": "202409",
            "medianManwon": 52000
          },
          {
            "ym": "202412",
            "medianManwon": 55650
          },
          {
            "ym": "202503",
            "medianManwon": 52370
          },
          {
            "ym": "202506",
            "medianManwon": 54250
          },
          {
            "ym": "202509",
            "medianManwon": 50850
          },
          {
            "ym": "202512",
            "medianManwon": 52250
          },
          {
            "ym": "202603",
            "medianManwon": 53000
          },
          {
            "ym": "202606",
            "medianManwon": 51250
          }
        ]
      },
      {
        "name": "어울림하트",
        "dong": "원신흥동",
        "sggName": "유성구",
        "pyeong": 26,
        "areaM2": 84.49,
        "latestManwon": 52250,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 60000
          },
          {
            "ym": "202206",
            "medianManwon": 54500
          },
          {
            "ym": "202209",
            "medianManwon": 48500
          },
          {
            "ym": "202212",
            "medianManwon": 46000
          },
          {
            "ym": "202303",
            "medianManwon": 52700
          },
          {
            "ym": "202306",
            "medianManwon": 50700
          },
          {
            "ym": "202309",
            "medianManwon": 53300
          },
          {
            "ym": "202312",
            "medianManwon": 54200
          },
          {
            "ym": "202403",
            "medianManwon": 54000
          },
          {
            "ym": "202406",
            "medianManwon": 58500
          },
          {
            "ym": "202409",
            "medianManwon": 59000
          },
          {
            "ym": "202412",
            "medianManwon": 57400
          },
          {
            "ym": "202503",
            "medianManwon": 54600
          },
          {
            "ym": "202506",
            "medianManwon": 53000
          },
          {
            "ym": "202509",
            "medianManwon": 54300
          },
          {
            "ym": "202512",
            "medianManwon": 54000
          },
          {
            "ym": "202603",
            "medianManwon": 54000
          },
          {
            "ym": "202606",
            "medianManwon": 52250
          }
        ]
      },
      {
        "name": "관저더샵2",
        "dong": "관저동",
        "sggName": "서구",
        "pyeong": 26,
        "areaM2": 84.8064,
        "latestManwon": 52450,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 56750
          },
          {
            "ym": "202206",
            "medianManwon": 51000
          },
          {
            "ym": "202209",
            "medianManwon": 49000
          },
          {
            "ym": "202212",
            "medianManwon": 50000
          },
          {
            "ym": "202303",
            "medianManwon": 47575
          },
          {
            "ym": "202306",
            "medianManwon": 50200
          },
          {
            "ym": "202309",
            "medianManwon": 52300
          },
          {
            "ym": "202312",
            "medianManwon": 53750
          },
          {
            "ym": "202403",
            "medianManwon": 50500
          },
          {
            "ym": "202406",
            "medianManwon": 49150
          },
          {
            "ym": "202409",
            "medianManwon": 50500
          },
          {
            "ym": "202412",
            "medianManwon": 49800
          },
          {
            "ym": "202503",
            "medianManwon": 49700
          },
          {
            "ym": "202506",
            "medianManwon": 51000
          },
          {
            "ym": "202509",
            "medianManwon": 49100
          },
          {
            "ym": "202512",
            "medianManwon": 52500
          },
          {
            "ym": "202603",
            "medianManwon": 51000
          },
          {
            "ym": "202606",
            "medianManwon": 52450
          }
        ]
      },
      {
        "name": "현대아이파크",
        "dong": "도안동",
        "sggName": "서구",
        "pyeong": 26,
        "areaM2": 84.92,
        "latestManwon": 54500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 62250
          },
          {
            "ym": "202206",
            "medianManwon": 62000
          },
          {
            "ym": "202209",
            "medianManwon": 62000
          },
          {
            "ym": "202212",
            "medianManwon": 50000
          },
          {
            "ym": "202303",
            "medianManwon": 56000
          },
          {
            "ym": "202306",
            "medianManwon": 58100
          },
          {
            "ym": "202309",
            "medianManwon": 62100
          },
          {
            "ym": "202312",
            "medianManwon": 59300
          },
          {
            "ym": "202403",
            "medianManwon": 59000
          },
          {
            "ym": "202406",
            "medianManwon": 59250
          },
          {
            "ym": "202409",
            "medianManwon": 59000
          },
          {
            "ym": "202412",
            "medianManwon": 59500
          },
          {
            "ym": "202503",
            "medianManwon": 53000
          },
          {
            "ym": "202506",
            "medianManwon": 57000
          },
          {
            "ym": "202509",
            "medianManwon": 58400
          },
          {
            "ym": "202512",
            "medianManwon": 54700
          },
          {
            "ym": "202603",
            "medianManwon": 50000
          },
          {
            "ym": "202606",
            "medianManwon": 54500
          }
        ]
      },
      {
        "name": "트리풀시티(5단지)",
        "dong": "상대동",
        "sggName": "유성구",
        "pyeong": 26,
        "areaM2": 84.89,
        "latestManwon": 63850,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 63000
          },
          {
            "ym": "202206",
            "medianManwon": 62750
          },
          {
            "ym": "202209",
            "medianManwon": 59800
          },
          {
            "ym": "202212",
            "medianManwon": 53900
          },
          {
            "ym": "202303",
            "medianManwon": 61800
          },
          {
            "ym": "202306",
            "medianManwon": 63500
          },
          {
            "ym": "202309",
            "medianManwon": 64300
          },
          {
            "ym": "202312",
            "medianManwon": 61000
          },
          {
            "ym": "202403",
            "medianManwon": 63500
          },
          {
            "ym": "202406",
            "medianManwon": 64500
          },
          {
            "ym": "202409",
            "medianManwon": 62250
          },
          {
            "ym": "202412",
            "medianManwon": 61000
          },
          {
            "ym": "202503",
            "medianManwon": 63000
          },
          {
            "ym": "202506",
            "medianManwon": 64000
          },
          {
            "ym": "202509",
            "medianManwon": 64000
          },
          {
            "ym": "202512",
            "medianManwon": 63500
          },
          {
            "ym": "202603",
            "medianManwon": 64500
          },
          {
            "ym": "202606",
            "medianManwon": 63850
          }
        ]
      },
      {
        "name": "도안신도시7단지예미지백조의호수",
        "dong": "봉명동",
        "sggName": "유성구",
        "pyeong": 26,
        "areaM2": 84.9686,
        "latestManwon": 67400,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 76000
          },
          {
            "ym": "202206",
            "medianManwon": 65000
          },
          {
            "ym": "202209",
            "medianManwon": 60750
          },
          {
            "ym": "202212",
            "medianManwon": 68000
          },
          {
            "ym": "202303",
            "medianManwon": 62500
          },
          {
            "ym": "202306",
            "medianManwon": 74250
          },
          {
            "ym": "202309",
            "medianManwon": 70000
          },
          {
            "ym": "202312",
            "medianManwon": 69000
          },
          {
            "ym": "202403",
            "medianManwon": 68500
          },
          {
            "ym": "202406",
            "medianManwon": 73000
          },
          {
            "ym": "202409",
            "medianManwon": 68800
          },
          {
            "ym": "202412",
            "medianManwon": 74500
          },
          {
            "ym": "202503",
            "medianManwon": 73000
          },
          {
            "ym": "202506",
            "medianManwon": 71650
          },
          {
            "ym": "202509",
            "medianManwon": 69750
          },
          {
            "ym": "202512",
            "medianManwon": 71500
          },
          {
            "ym": "202603",
            "medianManwon": 68000
          },
          {
            "ym": "202606",
            "medianManwon": 67400
          }
        ]
      },
      {
        "name": "죽동대원칸타빌",
        "dong": "죽동",
        "sggName": "유성구",
        "pyeong": 26,
        "areaM2": 84.989,
        "latestManwon": 68300,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 72900
          },
          {
            "ym": "202206",
            "medianManwon": 69000
          },
          {
            "ym": "202209",
            "medianManwon": 66000
          },
          {
            "ym": "202212",
            "medianManwon": 60250
          },
          {
            "ym": "202303",
            "medianManwon": 59250
          },
          {
            "ym": "202306",
            "medianManwon": 61500
          },
          {
            "ym": "202309",
            "medianManwon": 63000
          },
          {
            "ym": "202312",
            "medianManwon": 64000
          },
          {
            "ym": "202403",
            "medianManwon": 64401
          },
          {
            "ym": "202406",
            "medianManwon": 62250
          },
          {
            "ym": "202409",
            "medianManwon": 65300
          },
          {
            "ym": "202412",
            "medianManwon": 66000
          },
          {
            "ym": "202503",
            "medianManwon": 65500
          },
          {
            "ym": "202506",
            "medianManwon": 64900
          },
          {
            "ym": "202509",
            "medianManwon": 63100
          },
          {
            "ym": "202512",
            "medianManwon": 66750
          },
          {
            "ym": "202603",
            "medianManwon": 65200
          },
          {
            "ym": "202606",
            "medianManwon": 68300
          }
        ]
      },
      {
        "name": "문지효성해링턴플레이스",
        "dong": "문지동",
        "sggName": "유성구",
        "pyeong": 26,
        "areaM2": 84.986,
        "latestManwon": 70500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 67250
          },
          {
            "ym": "202206",
            "medianManwon": 68500
          },
          {
            "ym": "202209",
            "medianManwon": 61000
          },
          {
            "ym": "202212",
            "medianManwon": 57000
          },
          {
            "ym": "202303",
            "medianManwon": 61000
          },
          {
            "ym": "202306",
            "medianManwon": 65000
          },
          {
            "ym": "202309",
            "medianManwon": 65000
          },
          {
            "ym": "202403",
            "medianManwon": 71750
          },
          {
            "ym": "202406",
            "medianManwon": 63500
          },
          {
            "ym": "202409",
            "medianManwon": 64300
          },
          {
            "ym": "202412",
            "medianManwon": 64000
          },
          {
            "ym": "202503",
            "medianManwon": 70500
          },
          {
            "ym": "202506",
            "medianManwon": 69900
          },
          {
            "ym": "202509",
            "medianManwon": 70250
          },
          {
            "ym": "202512",
            "medianManwon": 77500
          },
          {
            "ym": "202603",
            "medianManwon": 70000
          },
          {
            "ym": "202606",
            "medianManwon": 70500
          }
        ]
      }
    ]
  },
  "daegu-premium": {
    "label": "대구 상급지",
    "complexes": [
      {
        "name": "두레타운",
        "dong": "매호동",
        "sggName": "수성구",
        "pyeong": 12,
        "areaM2": 39.9,
        "latestManwon": 9000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 15500
          },
          {
            "ym": "202206",
            "medianManwon": 14800
          },
          {
            "ym": "202209",
            "medianManwon": 11800
          },
          {
            "ym": "202303",
            "medianManwon": 11850
          },
          {
            "ym": "202306",
            "medianManwon": 11050
          },
          {
            "ym": "202309",
            "medianManwon": 11200
          },
          {
            "ym": "202312",
            "medianManwon": 11650
          },
          {
            "ym": "202403",
            "medianManwon": 11000
          },
          {
            "ym": "202406",
            "medianManwon": 10100
          },
          {
            "ym": "202409",
            "medianManwon": 10500
          },
          {
            "ym": "202412",
            "medianManwon": 10100
          },
          {
            "ym": "202503",
            "medianManwon": 9950
          },
          {
            "ym": "202506",
            "medianManwon": 9750
          },
          {
            "ym": "202509",
            "medianManwon": 9150
          },
          {
            "ym": "202512",
            "medianManwon": 10750
          },
          {
            "ym": "202606",
            "medianManwon": 9000
          }
        ]
      },
      {
        "name": "사월보성",
        "dong": "사월동",
        "sggName": "수성구",
        "pyeong": 18,
        "areaM2": 59.97,
        "latestManwon": 14700,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 20450
          },
          {
            "ym": "202206",
            "medianManwon": 20700
          },
          {
            "ym": "202209",
            "medianManwon": 18100
          },
          {
            "ym": "202212",
            "medianManwon": 18000
          },
          {
            "ym": "202306",
            "medianManwon": 17900
          },
          {
            "ym": "202309",
            "medianManwon": 15250
          },
          {
            "ym": "202312",
            "medianManwon": 15150
          },
          {
            "ym": "202403",
            "medianManwon": 16250
          },
          {
            "ym": "202406",
            "medianManwon": 16200
          },
          {
            "ym": "202503",
            "medianManwon": 14700
          },
          {
            "ym": "202506",
            "medianManwon": 13100
          },
          {
            "ym": "202509",
            "medianManwon": 13800
          },
          {
            "ym": "202512",
            "medianManwon": 13700
          },
          {
            "ym": "202603",
            "medianManwon": 13000
          },
          {
            "ym": "202606",
            "medianManwon": 14700
          }
        ]
      },
      {
        "name": "시지청솔타운",
        "dong": "신매동",
        "sggName": "수성구",
        "pyeong": 17,
        "areaM2": 57.39,
        "latestManwon": 14700,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 22500
          },
          {
            "ym": "202209",
            "medianManwon": 21500
          },
          {
            "ym": "202212",
            "medianManwon": 16400
          },
          {
            "ym": "202303",
            "medianManwon": 16350
          },
          {
            "ym": "202309",
            "medianManwon": 14500
          },
          {
            "ym": "202312",
            "medianManwon": 15650
          },
          {
            "ym": "202403",
            "medianManwon": 16000
          },
          {
            "ym": "202406",
            "medianManwon": 15000
          },
          {
            "ym": "202409",
            "medianManwon": 17000
          },
          {
            "ym": "202503",
            "medianManwon": 14750
          },
          {
            "ym": "202506",
            "medianManwon": 13800
          },
          {
            "ym": "202509",
            "medianManwon": 13800
          },
          {
            "ym": "202603",
            "medianManwon": 15100
          },
          {
            "ym": "202606",
            "medianManwon": 14700
          }
        ]
      },
      {
        "name": "시지삼주한라협화",
        "dong": "신매동",
        "sggName": "수성구",
        "pyeong": 18,
        "areaM2": 59.88,
        "latestManwon": 15000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 25450
          },
          {
            "ym": "202206",
            "medianManwon": 24700
          },
          {
            "ym": "202303",
            "medianManwon": 22500
          },
          {
            "ym": "202306",
            "medianManwon": 18500
          },
          {
            "ym": "202309",
            "medianManwon": 18000
          },
          {
            "ym": "202312",
            "medianManwon": 19200
          },
          {
            "ym": "202403",
            "medianManwon": 18850
          },
          {
            "ym": "202406",
            "medianManwon": 17750
          },
          {
            "ym": "202412",
            "medianManwon": 16250
          },
          {
            "ym": "202503",
            "medianManwon": 17400
          },
          {
            "ym": "202506",
            "medianManwon": 17800
          },
          {
            "ym": "202509",
            "medianManwon": 15500
          },
          {
            "ym": "202512",
            "medianManwon": 15000
          },
          {
            "ym": "202603",
            "medianManwon": 15300
          },
          {
            "ym": "202606",
            "medianManwon": 15000
          }
        ]
      },
      {
        "name": "누리타운",
        "dong": "매호동",
        "sggName": "수성구",
        "pyeong": 18,
        "areaM2": 59.97,
        "latestManwon": 16950,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 24000
          },
          {
            "ym": "202212",
            "medianManwon": 20450
          },
          {
            "ym": "202303",
            "medianManwon": 22500
          },
          {
            "ym": "202306",
            "medianManwon": 22500
          },
          {
            "ym": "202309",
            "medianManwon": 19750
          },
          {
            "ym": "202312",
            "medianManwon": 20900
          },
          {
            "ym": "202406",
            "medianManwon": 18400
          },
          {
            "ym": "202409",
            "medianManwon": 19000
          },
          {
            "ym": "202412",
            "medianManwon": 20000
          },
          {
            "ym": "202503",
            "medianManwon": 19850
          },
          {
            "ym": "202506",
            "medianManwon": 17500
          },
          {
            "ym": "202509",
            "medianManwon": 16200
          },
          {
            "ym": "202603",
            "medianManwon": 18150
          },
          {
            "ym": "202606",
            "medianManwon": 16950
          }
        ]
      },
      {
        "name": "하나타운",
        "dong": "매호동",
        "sggName": "수성구",
        "pyeong": 15,
        "areaM2": 49.92,
        "latestManwon": 17000,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 18500
          },
          {
            "ym": "202209",
            "medianManwon": 19500
          },
          {
            "ym": "202212",
            "medianManwon": 18000
          },
          {
            "ym": "202303",
            "medianManwon": 16400
          },
          {
            "ym": "202306",
            "medianManwon": 16400
          },
          {
            "ym": "202312",
            "medianManwon": 18500
          },
          {
            "ym": "202403",
            "medianManwon": 16450
          },
          {
            "ym": "202406",
            "medianManwon": 16650
          },
          {
            "ym": "202409",
            "medianManwon": 17200
          },
          {
            "ym": "202412",
            "medianManwon": 15800
          },
          {
            "ym": "202503",
            "medianManwon": 15500
          },
          {
            "ym": "202506",
            "medianManwon": 15750
          },
          {
            "ym": "202509",
            "medianManwon": 17450
          },
          {
            "ym": "202512",
            "medianManwon": 15600
          },
          {
            "ym": "202603",
            "medianManwon": 17100
          },
          {
            "ym": "202606",
            "medianManwon": 17000
          }
        ]
      },
      {
        "name": "시지대백신화창신맨션",
        "dong": "신매동",
        "sggName": "수성구",
        "pyeong": 18,
        "areaM2": 59.75,
        "latestManwon": 17275,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 24350
          },
          {
            "ym": "202209",
            "medianManwon": 22000
          },
          {
            "ym": "202303",
            "medianManwon": 20750
          },
          {
            "ym": "202306",
            "medianManwon": 20500
          },
          {
            "ym": "202312",
            "medianManwon": 19850
          },
          {
            "ym": "202403",
            "medianManwon": 20000
          },
          {
            "ym": "202406",
            "medianManwon": 18400
          },
          {
            "ym": "202409",
            "medianManwon": 18750
          },
          {
            "ym": "202412",
            "medianManwon": 18000
          },
          {
            "ym": "202503",
            "medianManwon": 18550
          },
          {
            "ym": "202506",
            "medianManwon": 17900
          },
          {
            "ym": "202509",
            "medianManwon": 17000
          },
          {
            "ym": "202603",
            "medianManwon": 17250
          },
          {
            "ym": "202606",
            "medianManwon": 17275
          }
        ]
      },
      {
        "name": "수성보성",
        "dong": "수성동4가",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.98,
        "latestManwon": 38200,
        "series": [
          {
            "ym": "202212",
            "medianManwon": 45500
          },
          {
            "ym": "202303",
            "medianManwon": 45500
          },
          {
            "ym": "202306",
            "medianManwon": 42700
          },
          {
            "ym": "202309",
            "medianManwon": 44400
          },
          {
            "ym": "202312",
            "medianManwon": 36500
          },
          {
            "ym": "202403",
            "medianManwon": 45000
          },
          {
            "ym": "202409",
            "medianManwon": 44500
          },
          {
            "ym": "202412",
            "medianManwon": 43000
          },
          {
            "ym": "202503",
            "medianManwon": 45200
          },
          {
            "ym": "202506",
            "medianManwon": 38750
          },
          {
            "ym": "202509",
            "medianManwon": 40000
          },
          {
            "ym": "202512",
            "medianManwon": 42000
          },
          {
            "ym": "202603",
            "medianManwon": 42000
          },
          {
            "ym": "202606",
            "medianManwon": 38200
          }
        ]
      },
      {
        "name": "수성못코오롱하늘채",
        "dong": "파동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.952,
        "latestManwon": 39400,
        "series": [
          {
            "ym": "202209",
            "medianManwon": 43500
          },
          {
            "ym": "202212",
            "medianManwon": 39000
          },
          {
            "ym": "202303",
            "medianManwon": 38000
          },
          {
            "ym": "202306",
            "medianManwon": 38000
          },
          {
            "ym": "202309",
            "medianManwon": 38900
          },
          {
            "ym": "202312",
            "medianManwon": 36000
          },
          {
            "ym": "202403",
            "medianManwon": 36150
          },
          {
            "ym": "202406",
            "medianManwon": 36500
          },
          {
            "ym": "202409",
            "medianManwon": 38000
          },
          {
            "ym": "202412",
            "medianManwon": 38000
          },
          {
            "ym": "202503",
            "medianManwon": 37350
          },
          {
            "ym": "202506",
            "medianManwon": 37500
          },
          {
            "ym": "202509",
            "medianManwon": 37250
          },
          {
            "ym": "202512",
            "medianManwon": 36750
          },
          {
            "ym": "202606",
            "medianManwon": 39400
          }
        ]
      },
      {
        "name": "시지3차서한이다음",
        "dong": "사월동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.97,
        "latestManwon": 40000,
        "series": [
          {
            "ym": "202303",
            "medianManwon": 40000
          },
          {
            "ym": "202306",
            "medianManwon": 43400
          },
          {
            "ym": "202309",
            "medianManwon": 40500
          },
          {
            "ym": "202403",
            "medianManwon": 40500
          },
          {
            "ym": "202406",
            "medianManwon": 39000
          },
          {
            "ym": "202409",
            "medianManwon": 38700
          },
          {
            "ym": "202412",
            "medianManwon": 40800
          },
          {
            "ym": "202503",
            "medianManwon": 40800
          },
          {
            "ym": "202506",
            "medianManwon": 41700
          },
          {
            "ym": "202509",
            "medianManwon": 41000
          },
          {
            "ym": "202512",
            "medianManwon": 39150
          },
          {
            "ym": "202603",
            "medianManwon": 41700
          },
          {
            "ym": "202606",
            "medianManwon": 40000
          }
        ]
      },
      {
        "name": "수성월드메르디앙",
        "dong": "노변동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.8075,
        "latestManwon": 41350,
        "series": [
          {
            "ym": "202209",
            "medianManwon": 47500
          },
          {
            "ym": "202212",
            "medianManwon": 48700
          },
          {
            "ym": "202303",
            "medianManwon": 51000
          },
          {
            "ym": "202306",
            "medianManwon": 47500
          },
          {
            "ym": "202309",
            "medianManwon": 47700
          },
          {
            "ym": "202312",
            "medianManwon": 43300
          },
          {
            "ym": "202403",
            "medianManwon": 44500
          },
          {
            "ym": "202406",
            "medianManwon": 41750
          },
          {
            "ym": "202409",
            "medianManwon": 42125
          },
          {
            "ym": "202506",
            "medianManwon": 40250
          },
          {
            "ym": "202512",
            "medianManwon": 41000
          },
          {
            "ym": "202603",
            "medianManwon": 41950
          },
          {
            "ym": "202606",
            "medianManwon": 41350
          }
        ]
      },
      {
        "name": "메트로팔레스3",
        "dong": "만촌동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.93,
        "latestManwon": 45500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 58000
          },
          {
            "ym": "202206",
            "medianManwon": 56000
          },
          {
            "ym": "202212",
            "medianManwon": 42000
          },
          {
            "ym": "202303",
            "medianManwon": 42000
          },
          {
            "ym": "202306",
            "medianManwon": 40850
          },
          {
            "ym": "202309",
            "medianManwon": 43000
          },
          {
            "ym": "202312",
            "medianManwon": 48000
          },
          {
            "ym": "202403",
            "medianManwon": 40700
          },
          {
            "ym": "202406",
            "medianManwon": 47200
          },
          {
            "ym": "202409",
            "medianManwon": 42750
          },
          {
            "ym": "202412",
            "medianManwon": 43500
          },
          {
            "ym": "202506",
            "medianManwon": 41000
          },
          {
            "ym": "202509",
            "medianManwon": 41000
          },
          {
            "ym": "202512",
            "medianManwon": 43850
          },
          {
            "ym": "202603",
            "medianManwon": 44800
          },
          {
            "ym": "202606",
            "medianManwon": 45500
          }
        ]
      },
      {
        "name": "캐슬골드파크5단지",
        "dong": "황금동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.97,
        "latestManwon": 48650,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 54900
          },
          {
            "ym": "202209",
            "medianManwon": 51000
          },
          {
            "ym": "202303",
            "medianManwon": 48000
          },
          {
            "ym": "202306",
            "medianManwon": 47000
          },
          {
            "ym": "202309",
            "medianManwon": 48000
          },
          {
            "ym": "202312",
            "medianManwon": 50000
          },
          {
            "ym": "202403",
            "medianManwon": 48000
          },
          {
            "ym": "202406",
            "medianManwon": 48500
          },
          {
            "ym": "202409",
            "medianManwon": 49000
          },
          {
            "ym": "202412",
            "medianManwon": 47750
          },
          {
            "ym": "202503",
            "medianManwon": 48500
          },
          {
            "ym": "202506",
            "medianManwon": 48000
          },
          {
            "ym": "202509",
            "medianManwon": 47500
          },
          {
            "ym": "202512",
            "medianManwon": 47500
          },
          {
            "ym": "202603",
            "medianManwon": 50900
          },
          {
            "ym": "202606",
            "medianManwon": 48650
          }
        ]
      },
      {
        "name": "수성하늘채르레브",
        "dong": "범물동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.9978,
        "latestManwon": 49850,
        "series": [
          {
            "ym": "202209",
            "medianManwon": 46100
          },
          {
            "ym": "202212",
            "medianManwon": 48500
          },
          {
            "ym": "202303",
            "medianManwon": 49000
          },
          {
            "ym": "202306",
            "medianManwon": 50500
          },
          {
            "ym": "202312",
            "medianManwon": 50000
          },
          {
            "ym": "202403",
            "medianManwon": 51000
          },
          {
            "ym": "202406",
            "medianManwon": 50000
          },
          {
            "ym": "202409",
            "medianManwon": 49500
          },
          {
            "ym": "202412",
            "medianManwon": 46000
          },
          {
            "ym": "202503",
            "medianManwon": 49000
          },
          {
            "ym": "202506",
            "medianManwon": 48000
          },
          {
            "ym": "202509",
            "medianManwon": 44000
          },
          {
            "ym": "202512",
            "medianManwon": 50000
          },
          {
            "ym": "202603",
            "medianManwon": 51350
          },
          {
            "ym": "202606",
            "medianManwon": 49850
          }
        ]
      },
      {
        "name": "시지월드메르디앙",
        "dong": "시지동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.9996,
        "latestManwon": 50500,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 57000
          },
          {
            "ym": "202209",
            "medianManwon": 63500
          },
          {
            "ym": "202306",
            "medianManwon": 54700
          },
          {
            "ym": "202309",
            "medianManwon": 52800
          },
          {
            "ym": "202403",
            "medianManwon": 50150
          },
          {
            "ym": "202406",
            "medianManwon": 50650
          },
          {
            "ym": "202412",
            "medianManwon": 53450
          },
          {
            "ym": "202503",
            "medianManwon": 52900
          },
          {
            "ym": "202506",
            "medianManwon": 52600
          },
          {
            "ym": "202509",
            "medianManwon": 50900
          },
          {
            "ym": "202512",
            "medianManwon": 48000
          },
          {
            "ym": "202603",
            "medianManwon": 50650
          },
          {
            "ym": "202606",
            "medianManwon": 50500
          }
        ]
      },
      {
        "name": "캐슬골드파크1단지",
        "dong": "황금동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.97,
        "latestManwon": 56400,
        "series": [
          {
            "ym": "202212",
            "medianManwon": 46500
          },
          {
            "ym": "202303",
            "medianManwon": 51150
          },
          {
            "ym": "202309",
            "medianManwon": 52900
          },
          {
            "ym": "202312",
            "medianManwon": 53750
          },
          {
            "ym": "202403",
            "medianManwon": 51000
          },
          {
            "ym": "202406",
            "medianManwon": 50500
          },
          {
            "ym": "202409",
            "medianManwon": 49700
          },
          {
            "ym": "202412",
            "medianManwon": 51900
          },
          {
            "ym": "202503",
            "medianManwon": 51800
          },
          {
            "ym": "202506",
            "medianManwon": 53550
          },
          {
            "ym": "202509",
            "medianManwon": 55300
          },
          {
            "ym": "202512",
            "medianManwon": 50700
          },
          {
            "ym": "202603",
            "medianManwon": 51400
          },
          {
            "ym": "202606",
            "medianManwon": 56400
          }
        ]
      },
      {
        "name": "캐슬골드파크4단지",
        "dong": "황금동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.97,
        "latestManwon": 57000,
        "series": [
          {
            "ym": "202212",
            "medianManwon": 49500
          },
          {
            "ym": "202303",
            "medianManwon": 54800
          },
          {
            "ym": "202309",
            "medianManwon": 59950
          },
          {
            "ym": "202312",
            "medianManwon": 54500
          },
          {
            "ym": "202403",
            "medianManwon": 57500
          },
          {
            "ym": "202406",
            "medianManwon": 47500
          },
          {
            "ym": "202412",
            "medianManwon": 58500
          },
          {
            "ym": "202503",
            "medianManwon": 55250
          },
          {
            "ym": "202506",
            "medianManwon": 56000
          },
          {
            "ym": "202509",
            "medianManwon": 56000
          },
          {
            "ym": "202512",
            "medianManwon": 57000
          },
          {
            "ym": "202603",
            "medianManwon": 58995
          },
          {
            "ym": "202606",
            "medianManwon": 57000
          }
        ]
      },
      {
        "name": "수성골드클래스더센텀",
        "dong": "중동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.974,
        "latestManwon": 60500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 63000
          },
          {
            "ym": "202206",
            "medianManwon": 63700
          },
          {
            "ym": "202303",
            "medianManwon": 52500
          },
          {
            "ym": "202306",
            "medianManwon": 57500
          },
          {
            "ym": "202309",
            "medianManwon": 56400
          },
          {
            "ym": "202312",
            "medianManwon": 60500
          },
          {
            "ym": "202403",
            "medianManwon": 59750
          },
          {
            "ym": "202406",
            "medianManwon": 56400
          },
          {
            "ym": "202409",
            "medianManwon": 60500
          },
          {
            "ym": "202503",
            "medianManwon": 64700
          },
          {
            "ym": "202506",
            "medianManwon": 64000
          },
          {
            "ym": "202509",
            "medianManwon": 58000
          },
          {
            "ym": "202512",
            "medianManwon": 64750
          },
          {
            "ym": "202603",
            "medianManwon": 60000
          },
          {
            "ym": "202606",
            "medianManwon": 60500
          }
        ]
      },
      {
        "name": "수성효성해링턴플레이스",
        "dong": "중동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.8826,
        "latestManwon": 62000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 67800
          },
          {
            "ym": "202206",
            "medianManwon": 64000
          },
          {
            "ym": "202212",
            "medianManwon": 50000
          },
          {
            "ym": "202303",
            "medianManwon": 55000
          },
          {
            "ym": "202306",
            "medianManwon": 56500
          },
          {
            "ym": "202309",
            "medianManwon": 60000
          },
          {
            "ym": "202312",
            "medianManwon": 54000
          },
          {
            "ym": "202403",
            "medianManwon": 56700
          },
          {
            "ym": "202406",
            "medianManwon": 60800
          },
          {
            "ym": "202409",
            "medianManwon": 58850
          },
          {
            "ym": "202412",
            "medianManwon": 59000
          },
          {
            "ym": "202503",
            "medianManwon": 59000
          },
          {
            "ym": "202506",
            "medianManwon": 62150
          },
          {
            "ym": "202509",
            "medianManwon": 62600
          },
          {
            "ym": "202512",
            "medianManwon": 60450
          },
          {
            "ym": "202603",
            "medianManwon": 61000
          },
          {
            "ym": "202606",
            "medianManwon": 62000
          }
        ]
      },
      {
        "name": "수성동일하이빌레이크시티",
        "dong": "상동",
        "sggName": "수성구",
        "pyeong": 36,
        "areaM2": 118.7664,
        "latestManwon": 76000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 80000
          },
          {
            "ym": "202212",
            "medianManwon": 60500
          },
          {
            "ym": "202303",
            "medianManwon": 71000
          },
          {
            "ym": "202306",
            "medianManwon": 74500
          },
          {
            "ym": "202309",
            "medianManwon": 75000
          },
          {
            "ym": "202403",
            "medianManwon": 71500
          },
          {
            "ym": "202406",
            "medianManwon": 85000
          },
          {
            "ym": "202409",
            "medianManwon": 75000
          },
          {
            "ym": "202412",
            "medianManwon": 73500
          },
          {
            "ym": "202503",
            "medianManwon": 72500
          },
          {
            "ym": "202506",
            "medianManwon": 68400
          },
          {
            "ym": "202509",
            "medianManwon": 87000
          },
          {
            "ym": "202512",
            "medianManwon": 70500
          },
          {
            "ym": "202606",
            "medianManwon": 76000
          }
        ]
      },
      {
        "name": "e편한세상범어",
        "dong": "범어동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.791,
        "latestManwon": 76900,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 68250
          },
          {
            "ym": "202209",
            "medianManwon": 64500
          },
          {
            "ym": "202212",
            "medianManwon": 59750
          },
          {
            "ym": "202303",
            "medianManwon": 60350
          },
          {
            "ym": "202306",
            "medianManwon": 65500
          },
          {
            "ym": "202309",
            "medianManwon": 69000
          },
          {
            "ym": "202312",
            "medianManwon": 64250
          },
          {
            "ym": "202403",
            "medianManwon": 64100
          },
          {
            "ym": "202406",
            "medianManwon": 66500
          },
          {
            "ym": "202409",
            "medianManwon": 69250
          },
          {
            "ym": "202412",
            "medianManwon": 69100
          },
          {
            "ym": "202503",
            "medianManwon": 68500
          },
          {
            "ym": "202506",
            "medianManwon": 68650
          },
          {
            "ym": "202509",
            "medianManwon": 70000
          },
          {
            "ym": "202512",
            "medianManwon": 71300
          },
          {
            "ym": "202603",
            "medianManwon": 76000
          },
          {
            "ym": "202606",
            "medianManwon": 76900
          }
        ]
      },
      {
        "name": "수성롯데캐슬THEFIRST",
        "dong": "수성동1가",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.6508,
        "latestManwon": 77000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 83250
          },
          {
            "ym": "202206",
            "medianManwon": 75000
          },
          {
            "ym": "202209",
            "medianManwon": 65000
          },
          {
            "ym": "202212",
            "medianManwon": 61625
          },
          {
            "ym": "202303",
            "medianManwon": 65000
          },
          {
            "ym": "202306",
            "medianManwon": 69100
          },
          {
            "ym": "202309",
            "medianManwon": 78500
          },
          {
            "ym": "202312",
            "medianManwon": 70000
          },
          {
            "ym": "202406",
            "medianManwon": 68500
          },
          {
            "ym": "202409",
            "medianManwon": 66750
          },
          {
            "ym": "202412",
            "medianManwon": 76000
          },
          {
            "ym": "202503",
            "medianManwon": 74425
          },
          {
            "ym": "202506",
            "medianManwon": 75000
          },
          {
            "ym": "202509",
            "medianManwon": 75750
          },
          {
            "ym": "202512",
            "medianManwon": 73500
          },
          {
            "ym": "202603",
            "medianManwon": 76500
          },
          {
            "ym": "202606",
            "medianManwon": 77000
          }
        ]
      },
      {
        "name": "힐스테이트황금동",
        "dong": "황금동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.9258,
        "latestManwon": 79000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 89900
          },
          {
            "ym": "202206",
            "medianManwon": 85000
          },
          {
            "ym": "202212",
            "medianManwon": 69350
          },
          {
            "ym": "202303",
            "medianManwon": 69000
          },
          {
            "ym": "202306",
            "medianManwon": 69000
          },
          {
            "ym": "202309",
            "medianManwon": 74250
          },
          {
            "ym": "202312",
            "medianManwon": 74000
          },
          {
            "ym": "202403",
            "medianManwon": 72700
          },
          {
            "ym": "202406",
            "medianManwon": 75000
          },
          {
            "ym": "202409",
            "medianManwon": 73700
          },
          {
            "ym": "202412",
            "medianManwon": 73000
          },
          {
            "ym": "202506",
            "medianManwon": 74350
          },
          {
            "ym": "202509",
            "medianManwon": 75400
          },
          {
            "ym": "202512",
            "medianManwon": 74750
          },
          {
            "ym": "202603",
            "medianManwon": 84700
          },
          {
            "ym": "202606",
            "medianManwon": 79000
          }
        ]
      },
      {
        "name": "수성알파시티동화아이위시",
        "dong": "시지동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.9478,
        "latestManwon": 83000,
        "series": [
          {
            "ym": "202209",
            "medianManwon": 76000
          },
          {
            "ym": "202212",
            "medianManwon": 65000
          },
          {
            "ym": "202303",
            "medianManwon": 63300
          },
          {
            "ym": "202306",
            "medianManwon": 68800
          },
          {
            "ym": "202309",
            "medianManwon": 78000
          },
          {
            "ym": "202403",
            "medianManwon": 75500
          },
          {
            "ym": "202406",
            "medianManwon": 76800
          },
          {
            "ym": "202409",
            "medianManwon": 70500
          },
          {
            "ym": "202412",
            "medianManwon": 72500
          },
          {
            "ym": "202503",
            "medianManwon": 75250
          },
          {
            "ym": "202506",
            "medianManwon": 77250
          },
          {
            "ym": "202509",
            "medianManwon": 81250
          },
          {
            "ym": "202512",
            "medianManwon": 73375
          },
          {
            "ym": "202603",
            "medianManwon": 77000
          },
          {
            "ym": "202606",
            "medianManwon": 83000
          }
        ]
      },
      {
        "name": "힐스테이트황금엘포레",
        "dong": "황금동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.9899,
        "latestManwon": 99250,
        "series": [
          {
            "ym": "202303",
            "medianManwon": 70200
          },
          {
            "ym": "202306",
            "medianManwon": 71400
          },
          {
            "ym": "202309",
            "medianManwon": 74100
          },
          {
            "ym": "202312",
            "medianManwon": 72200
          },
          {
            "ym": "202403",
            "medianManwon": 75950
          },
          {
            "ym": "202406",
            "medianManwon": 76950
          },
          {
            "ym": "202409",
            "medianManwon": 84000
          },
          {
            "ym": "202412",
            "medianManwon": 81200
          },
          {
            "ym": "202503",
            "medianManwon": 82950
          },
          {
            "ym": "202506",
            "medianManwon": 80150
          },
          {
            "ym": "202509",
            "medianManwon": 87000
          },
          {
            "ym": "202512",
            "medianManwon": 92750
          },
          {
            "ym": "202603",
            "medianManwon": 98000
          },
          {
            "ym": "202606",
            "medianManwon": 99250
          }
        ]
      },
      {
        "name": "만촌3차화성파크드림",
        "dong": "만촌동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.9558,
        "latestManwon": 101350,
        "series": [
          {
            "ym": "202209",
            "medianManwon": 88450
          },
          {
            "ym": "202212",
            "medianManwon": 82000
          },
          {
            "ym": "202303",
            "medianManwon": 81750
          },
          {
            "ym": "202306",
            "medianManwon": 85000
          },
          {
            "ym": "202309",
            "medianManwon": 89650
          },
          {
            "ym": "202312",
            "medianManwon": 84900
          },
          {
            "ym": "202403",
            "medianManwon": 86800
          },
          {
            "ym": "202406",
            "medianManwon": 89200
          },
          {
            "ym": "202412",
            "medianManwon": 90800
          },
          {
            "ym": "202503",
            "medianManwon": 92850
          },
          {
            "ym": "202506",
            "medianManwon": 94000
          },
          {
            "ym": "202509",
            "medianManwon": 92000
          },
          {
            "ym": "202603",
            "medianManwon": 105000
          },
          {
            "ym": "202606",
            "medianManwon": 101350
          }
        ]
      },
      {
        "name": "범어센트럴푸르지오",
        "dong": "범어동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.955,
        "latestManwon": 125000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 108000
          },
          {
            "ym": "202206",
            "medianManwon": 90000
          },
          {
            "ym": "202212",
            "medianManwon": 88500
          },
          {
            "ym": "202303",
            "medianManwon": 86000
          },
          {
            "ym": "202306",
            "medianManwon": 88900
          },
          {
            "ym": "202309",
            "medianManwon": 97000
          },
          {
            "ym": "202312",
            "medianManwon": 99000
          },
          {
            "ym": "202403",
            "medianManwon": 89000
          },
          {
            "ym": "202406",
            "medianManwon": 95000
          },
          {
            "ym": "202409",
            "medianManwon": 108000
          },
          {
            "ym": "202412",
            "medianManwon": 108800
          },
          {
            "ym": "202503",
            "medianManwon": 99750
          },
          {
            "ym": "202506",
            "medianManwon": 103750
          },
          {
            "ym": "202509",
            "medianManwon": 116500
          },
          {
            "ym": "202512",
            "medianManwon": 120000
          },
          {
            "ym": "202603",
            "medianManwon": 135000
          },
          {
            "ym": "202606",
            "medianManwon": 125000
          }
        ]
      },
      {
        "name": "범어에일린의뜰",
        "dong": "범어동",
        "sggName": "수성구",
        "pyeong": 26,
        "areaM2": 84.9608,
        "latestManwon": 128500,
        "series": [
          {
            "ym": "202212",
            "medianManwon": 65000
          },
          {
            "ym": "202303",
            "medianManwon": 78500
          },
          {
            "ym": "202306",
            "medianManwon": 85000
          },
          {
            "ym": "202309",
            "medianManwon": 89500
          },
          {
            "ym": "202403",
            "medianManwon": 90000
          },
          {
            "ym": "202406",
            "medianManwon": 96000
          },
          {
            "ym": "202409",
            "medianManwon": 101350
          },
          {
            "ym": "202412",
            "medianManwon": 106700
          },
          {
            "ym": "202506",
            "medianManwon": 104900
          },
          {
            "ym": "202509",
            "medianManwon": 114900
          },
          {
            "ym": "202512",
            "medianManwon": 117500
          },
          {
            "ym": "202603",
            "medianManwon": 109900
          },
          {
            "ym": "202606",
            "medianManwon": 128500
          }
        ]
      }
    ]
  },
  "busan-premium": {
    "label": "부산 상급지",
    "complexes": [
      {
        "name": "벽산삼협",
        "dong": "반송동",
        "sggName": "해운대구",
        "pyeong": 18,
        "areaM2": 59.916,
        "latestManwon": 11500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 16850
          },
          {
            "ym": "202206",
            "medianManwon": 15500
          },
          {
            "ym": "202209",
            "medianManwon": 16000
          },
          {
            "ym": "202212",
            "medianManwon": 14500
          },
          {
            "ym": "202303",
            "medianManwon": 15500
          },
          {
            "ym": "202306",
            "medianManwon": 15500
          },
          {
            "ym": "202312",
            "medianManwon": 15700
          },
          {
            "ym": "202403",
            "medianManwon": 14300
          },
          {
            "ym": "202406",
            "medianManwon": 14900
          },
          {
            "ym": "202409",
            "medianManwon": 15800
          },
          {
            "ym": "202412",
            "medianManwon": 13000
          },
          {
            "ym": "202503",
            "medianManwon": 12625
          },
          {
            "ym": "202506",
            "medianManwon": 11800
          },
          {
            "ym": "202509",
            "medianManwon": 12500
          },
          {
            "ym": "202512",
            "medianManwon": 12200
          },
          {
            "ym": "202603",
            "medianManwon": 11500
          },
          {
            "ym": "202606",
            "medianManwon": 11500
          }
        ]
      },
      {
        "name": "비치-그린아파트",
        "dong": "광안동",
        "sggName": "수영구",
        "pyeong": 18,
        "areaM2": 59.76,
        "latestManwon": 22750,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 30500
          },
          {
            "ym": "202212",
            "medianManwon": 25000
          },
          {
            "ym": "202303",
            "medianManwon": 26400
          },
          {
            "ym": "202306",
            "medianManwon": 29000
          },
          {
            "ym": "202309",
            "medianManwon": 28000
          },
          {
            "ym": "202312",
            "medianManwon": 28500
          },
          {
            "ym": "202403",
            "medianManwon": 24800
          },
          {
            "ym": "202406",
            "medianManwon": 22650
          },
          {
            "ym": "202412",
            "medianManwon": 25000
          },
          {
            "ym": "202503",
            "medianManwon": 25700
          },
          {
            "ym": "202506",
            "medianManwon": 25700
          },
          {
            "ym": "202509",
            "medianManwon": 26200
          },
          {
            "ym": "202512",
            "medianManwon": 24000
          },
          {
            "ym": "202603",
            "medianManwon": 26900
          },
          {
            "ym": "202606",
            "medianManwon": 22750
          }
        ]
      },
      {
        "name": "SKVIEW",
        "dong": "좌동",
        "sggName": "해운대구",
        "pyeong": 18,
        "areaM2": 59.91,
        "latestManwon": 23450,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 36950
          },
          {
            "ym": "202206",
            "medianManwon": 37000
          },
          {
            "ym": "202212",
            "medianManwon": 30750
          },
          {
            "ym": "202303",
            "medianManwon": 28400
          },
          {
            "ym": "202306",
            "medianManwon": 28900
          },
          {
            "ym": "202309",
            "medianManwon": 28400
          },
          {
            "ym": "202312",
            "medianManwon": 26250
          },
          {
            "ym": "202403",
            "medianManwon": 26300
          },
          {
            "ym": "202406",
            "medianManwon": 25000
          },
          {
            "ym": "202409",
            "medianManwon": 24500
          },
          {
            "ym": "202503",
            "medianManwon": 25750
          },
          {
            "ym": "202506",
            "medianManwon": 23000
          },
          {
            "ym": "202509",
            "medianManwon": 26600
          },
          {
            "ym": "202512",
            "medianManwon": 26150
          },
          {
            "ym": "202603",
            "medianManwon": 27000
          },
          {
            "ym": "202606",
            "medianManwon": 23450
          }
        ]
      },
      {
        "name": "센텀대림",
        "dong": "반여동",
        "sggName": "해운대구",
        "pyeong": 18,
        "areaM2": 59.99,
        "latestManwon": 23500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 27750
          },
          {
            "ym": "202206",
            "medianManwon": 26000
          },
          {
            "ym": "202303",
            "medianManwon": 25500
          },
          {
            "ym": "202306",
            "medianManwon": 25000
          },
          {
            "ym": "202309",
            "medianManwon": 24700
          },
          {
            "ym": "202312",
            "medianManwon": 22000
          },
          {
            "ym": "202403",
            "medianManwon": 24150
          },
          {
            "ym": "202406",
            "medianManwon": 23000
          },
          {
            "ym": "202409",
            "medianManwon": 23500
          },
          {
            "ym": "202412",
            "medianManwon": 22700
          },
          {
            "ym": "202503",
            "medianManwon": 22700
          },
          {
            "ym": "202506",
            "medianManwon": 23500
          },
          {
            "ym": "202509",
            "medianManwon": 23700
          },
          {
            "ym": "202512",
            "medianManwon": 24000
          },
          {
            "ym": "202603",
            "medianManwon": 24700
          },
          {
            "ym": "202606",
            "medianManwon": 23500
          }
        ]
      },
      {
        "name": "상록",
        "dong": "좌동",
        "sggName": "해운대구",
        "pyeong": 18,
        "areaM2": 59.85,
        "latestManwon": 29850,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 45000
          },
          {
            "ym": "202206",
            "medianManwon": 47000
          },
          {
            "ym": "202209",
            "medianManwon": 39800
          },
          {
            "ym": "202303",
            "medianManwon": 35200
          },
          {
            "ym": "202306",
            "medianManwon": 32000
          },
          {
            "ym": "202309",
            "medianManwon": 33650
          },
          {
            "ym": "202312",
            "medianManwon": 25000
          },
          {
            "ym": "202403",
            "medianManwon": 33250
          },
          {
            "ym": "202406",
            "medianManwon": 30500
          },
          {
            "ym": "202409",
            "medianManwon": 30000
          },
          {
            "ym": "202412",
            "medianManwon": 29500
          },
          {
            "ym": "202503",
            "medianManwon": 27800
          },
          {
            "ym": "202506",
            "medianManwon": 28900
          },
          {
            "ym": "202509",
            "medianManwon": 30000
          },
          {
            "ym": "202512",
            "medianManwon": 30000
          },
          {
            "ym": "202603",
            "medianManwon": 30450
          },
          {
            "ym": "202606",
            "medianManwon": 29850
          }
        ]
      },
      {
        "name": "해운대더샵센텀그린",
        "dong": "반여동",
        "sggName": "해운대구",
        "pyeong": 18,
        "areaM2": 59.9607,
        "latestManwon": 32900,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 45000
          },
          {
            "ym": "202212",
            "medianManwon": 35150
          },
          {
            "ym": "202303",
            "medianManwon": 35000
          },
          {
            "ym": "202306",
            "medianManwon": 30950
          },
          {
            "ym": "202312",
            "medianManwon": 34750
          },
          {
            "ym": "202406",
            "medianManwon": 32000
          },
          {
            "ym": "202409",
            "medianManwon": 32000
          },
          {
            "ym": "202412",
            "medianManwon": 31000
          },
          {
            "ym": "202503",
            "medianManwon": 32450
          },
          {
            "ym": "202506",
            "medianManwon": 31900
          },
          {
            "ym": "202509",
            "medianManwon": 34900
          },
          {
            "ym": "202512",
            "medianManwon": 32500
          },
          {
            "ym": "202603",
            "medianManwon": 32600
          },
          {
            "ym": "202606",
            "medianManwon": 32900
          }
        ]
      },
      {
        "name": "센텀롯데캐슬2차",
        "dong": "반여동",
        "sggName": "해운대구",
        "pyeong": 26,
        "areaM2": 84.97,
        "latestManwon": 34475,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 50250
          },
          {
            "ym": "202212",
            "medianManwon": 34000
          },
          {
            "ym": "202303",
            "medianManwon": 33500
          },
          {
            "ym": "202306",
            "medianManwon": 36400
          },
          {
            "ym": "202309",
            "medianManwon": 37900
          },
          {
            "ym": "202403",
            "medianManwon": 36150
          },
          {
            "ym": "202409",
            "medianManwon": 35800
          },
          {
            "ym": "202412",
            "medianManwon": 36000
          },
          {
            "ym": "202503",
            "medianManwon": 35250
          },
          {
            "ym": "202506",
            "medianManwon": 35000
          },
          {
            "ym": "202509",
            "medianManwon": 35700
          },
          {
            "ym": "202512",
            "medianManwon": 27000
          },
          {
            "ym": "202603",
            "medianManwon": 33600
          },
          {
            "ym": "202606",
            "medianManwon": 34475
          }
        ]
      },
      {
        "name": "대우2",
        "dong": "좌동",
        "sggName": "해운대구",
        "pyeong": 18,
        "areaM2": 59.946,
        "latestManwon": 36300,
        "series": [
          {
            "ym": "202209",
            "medianManwon": 42000
          },
          {
            "ym": "202303",
            "medianManwon": 34000
          },
          {
            "ym": "202306",
            "medianManwon": 37500
          },
          {
            "ym": "202309",
            "medianManwon": 35000
          },
          {
            "ym": "202403",
            "medianManwon": 32700
          },
          {
            "ym": "202406",
            "medianManwon": 31800
          },
          {
            "ym": "202409",
            "medianManwon": 32450
          },
          {
            "ym": "202412",
            "medianManwon": 30750
          },
          {
            "ym": "202503",
            "medianManwon": 30350
          },
          {
            "ym": "202506",
            "medianManwon": 32400
          },
          {
            "ym": "202509",
            "medianManwon": 27500
          },
          {
            "ym": "202512",
            "medianManwon": 33500
          },
          {
            "ym": "202603",
            "medianManwon": 35300
          },
          {
            "ym": "202606",
            "medianManwon": 36300
          }
        ]
      },
      {
        "name": "대우",
        "dong": "좌동",
        "sggName": "해운대구",
        "pyeong": 18,
        "areaM2": 59.946,
        "latestManwon": 39000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 49500
          },
          {
            "ym": "202303",
            "medianManwon": 36375
          },
          {
            "ym": "202306",
            "medianManwon": 40000
          },
          {
            "ym": "202309",
            "medianManwon": 36500
          },
          {
            "ym": "202403",
            "medianManwon": 37950
          },
          {
            "ym": "202406",
            "medianManwon": 35400
          },
          {
            "ym": "202409",
            "medianManwon": 35800
          },
          {
            "ym": "202412",
            "medianManwon": 35200
          },
          {
            "ym": "202503",
            "medianManwon": 35500
          },
          {
            "ym": "202506",
            "medianManwon": 35000
          },
          {
            "ym": "202509",
            "medianManwon": 37700
          },
          {
            "ym": "202512",
            "medianManwon": 38300
          },
          {
            "ym": "202603",
            "medianManwon": 31500
          },
          {
            "ym": "202606",
            "medianManwon": 39000
          }
        ]
      },
      {
        "name": "롯데3차",
        "dong": "좌동",
        "sggName": "해운대구",
        "pyeong": 18,
        "areaM2": 59.76,
        "latestManwon": 40500,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 48500
          },
          {
            "ym": "202212",
            "medianManwon": 34000
          },
          {
            "ym": "202303",
            "medianManwon": 33500
          },
          {
            "ym": "202306",
            "medianManwon": 40000
          },
          {
            "ym": "202309",
            "medianManwon": 40000
          },
          {
            "ym": "202312",
            "medianManwon": 36500
          },
          {
            "ym": "202403",
            "medianManwon": 32900
          },
          {
            "ym": "202406",
            "medianManwon": 35000
          },
          {
            "ym": "202409",
            "medianManwon": 36500
          },
          {
            "ym": "202412",
            "medianManwon": 33000
          },
          {
            "ym": "202503",
            "medianManwon": 37500
          },
          {
            "ym": "202506",
            "medianManwon": 36000
          },
          {
            "ym": "202509",
            "medianManwon": 29000
          },
          {
            "ym": "202512",
            "medianManwon": 38000
          },
          {
            "ym": "202603",
            "medianManwon": 38500
          },
          {
            "ym": "202606",
            "medianManwon": 40500
          }
        ]
      },
      {
        "name": "대림",
        "dong": "좌동",
        "sggName": "해운대구",
        "pyeong": 18,
        "areaM2": 59.816,
        "latestManwon": 42750,
        "series": [
          {
            "ym": "202209",
            "medianManwon": 45000
          },
          {
            "ym": "202303",
            "medianManwon": 34150
          },
          {
            "ym": "202306",
            "medianManwon": 36000
          },
          {
            "ym": "202309",
            "medianManwon": 35000
          },
          {
            "ym": "202312",
            "medianManwon": 35500
          },
          {
            "ym": "202403",
            "medianManwon": 37000
          },
          {
            "ym": "202406",
            "medianManwon": 31500
          },
          {
            "ym": "202412",
            "medianManwon": 37750
          },
          {
            "ym": "202503",
            "medianManwon": 34000
          },
          {
            "ym": "202506",
            "medianManwon": 32500
          },
          {
            "ym": "202509",
            "medianManwon": 34500
          },
          {
            "ym": "202512",
            "medianManwon": 38250
          },
          {
            "ym": "202603",
            "medianManwon": 39750
          },
          {
            "ym": "202606",
            "medianManwon": 42750
          }
        ]
      },
      {
        "name": "메가센텀한화꿈에그린",
        "dong": "반여동",
        "sggName": "해운대구",
        "pyeong": 26,
        "areaM2": 84.9914,
        "latestManwon": 53900,
        "series": [
          {
            "ym": "202212",
            "medianManwon": 44000
          },
          {
            "ym": "202303",
            "medianManwon": 47750
          },
          {
            "ym": "202306",
            "medianManwon": 52500
          },
          {
            "ym": "202309",
            "medianManwon": 51250
          },
          {
            "ym": "202312",
            "medianManwon": 51900
          },
          {
            "ym": "202403",
            "medianManwon": 50500
          },
          {
            "ym": "202406",
            "medianManwon": 51150
          },
          {
            "ym": "202409",
            "medianManwon": 49800
          },
          {
            "ym": "202412",
            "medianManwon": 51100
          },
          {
            "ym": "202503",
            "medianManwon": 52350
          },
          {
            "ym": "202506",
            "medianManwon": 53300
          },
          {
            "ym": "202509",
            "medianManwon": 51450
          },
          {
            "ym": "202512",
            "medianManwon": 51200
          },
          {
            "ym": "202603",
            "medianManwon": 54900
          },
          {
            "ym": "202606",
            "medianManwon": 53900
          }
        ]
      },
      {
        "name": "수영SKVIEW1단지",
        "dong": "망미동",
        "sggName": "수영구",
        "pyeong": 18,
        "areaM2": 59.9694,
        "latestManwon": 55500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 59000
          },
          {
            "ym": "202206",
            "medianManwon": 54500
          },
          {
            "ym": "202209",
            "medianManwon": 49500
          },
          {
            "ym": "202212",
            "medianManwon": 43600
          },
          {
            "ym": "202303",
            "medianManwon": 46000
          },
          {
            "ym": "202306",
            "medianManwon": 43850
          },
          {
            "ym": "202309",
            "medianManwon": 45750
          },
          {
            "ym": "202312",
            "medianManwon": 45000
          },
          {
            "ym": "202403",
            "medianManwon": 44700
          },
          {
            "ym": "202406",
            "medianManwon": 44400
          },
          {
            "ym": "202409",
            "medianManwon": 41300
          },
          {
            "ym": "202412",
            "medianManwon": 46000
          },
          {
            "ym": "202503",
            "medianManwon": 45500
          },
          {
            "ym": "202506",
            "medianManwon": 46950
          },
          {
            "ym": "202509",
            "medianManwon": 47900
          },
          {
            "ym": "202512",
            "medianManwon": 48700
          },
          {
            "ym": "202603",
            "medianManwon": 52500
          },
          {
            "ym": "202606",
            "medianManwon": 55500
          }
        ]
      },
      {
        "name": "센텀동부센트레빌",
        "dong": "재송동",
        "sggName": "해운대구",
        "pyeong": 26,
        "areaM2": 84.9926,
        "latestManwon": 56000,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 68000
          },
          {
            "ym": "202209",
            "medianManwon": 61500
          },
          {
            "ym": "202303",
            "medianManwon": 54500
          },
          {
            "ym": "202306",
            "medianManwon": 56000
          },
          {
            "ym": "202309",
            "medianManwon": 55300
          },
          {
            "ym": "202312",
            "medianManwon": 54500
          },
          {
            "ym": "202403",
            "medianManwon": 47000
          },
          {
            "ym": "202406",
            "medianManwon": 53500
          },
          {
            "ym": "202409",
            "medianManwon": 53500
          },
          {
            "ym": "202412",
            "medianManwon": 54800
          },
          {
            "ym": "202503",
            "medianManwon": 48000
          },
          {
            "ym": "202506",
            "medianManwon": 49700
          },
          {
            "ym": "202512",
            "medianManwon": 55500
          },
          {
            "ym": "202603",
            "medianManwon": 53000
          },
          {
            "ym": "202606",
            "medianManwon": 56000
          }
        ]
      },
      {
        "name": "건영2",
        "dong": "좌동",
        "sggName": "해운대구",
        "pyeong": 26,
        "areaM2": 84.84,
        "latestManwon": 60000,
        "series": [
          {
            "ym": "202303",
            "medianManwon": 54500
          },
          {
            "ym": "202306",
            "medianManwon": 58000
          },
          {
            "ym": "202309",
            "medianManwon": 51700
          },
          {
            "ym": "202312",
            "medianManwon": 51250
          },
          {
            "ym": "202403",
            "medianManwon": 55950
          },
          {
            "ym": "202406",
            "medianManwon": 52500
          },
          {
            "ym": "202409",
            "medianManwon": 53350
          },
          {
            "ym": "202412",
            "medianManwon": 53000
          },
          {
            "ym": "202503",
            "medianManwon": 48000
          },
          {
            "ym": "202506",
            "medianManwon": 52750
          },
          {
            "ym": "202509",
            "medianManwon": 52500
          },
          {
            "ym": "202512",
            "medianManwon": 54500
          },
          {
            "ym": "202603",
            "medianManwon": 59200
          },
          {
            "ym": "202606",
            "medianManwon": 60000
          }
        ]
      },
      {
        "name": "센텀이편한세상",
        "dong": "재송동",
        "sggName": "해운대구",
        "pyeong": 26,
        "areaM2": 84.842,
        "latestManwon": 64000,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 68700
          },
          {
            "ym": "202209",
            "medianManwon": 60000
          },
          {
            "ym": "202303",
            "medianManwon": 64500
          },
          {
            "ym": "202306",
            "medianManwon": 62000
          },
          {
            "ym": "202309",
            "medianManwon": 64150
          },
          {
            "ym": "202312",
            "medianManwon": 61500
          },
          {
            "ym": "202403",
            "medianManwon": 60000
          },
          {
            "ym": "202406",
            "medianManwon": 57000
          },
          {
            "ym": "202412",
            "medianManwon": 68000
          },
          {
            "ym": "202506",
            "medianManwon": 60500
          },
          {
            "ym": "202509",
            "medianManwon": 58900
          },
          {
            "ym": "202512",
            "medianManwon": 67500
          },
          {
            "ym": "202603",
            "medianManwon": 74000
          },
          {
            "ym": "202606",
            "medianManwon": 64000
          }
        ]
      },
      {
        "name": "센텀비스타동원2차",
        "dong": "민락동",
        "sggName": "수영구",
        "pyeong": 26,
        "areaM2": 84.9414,
        "latestManwon": 70750,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 87750
          },
          {
            "ym": "202209",
            "medianManwon": 74500
          },
          {
            "ym": "202212",
            "medianManwon": 63000
          },
          {
            "ym": "202303",
            "medianManwon": 73000
          },
          {
            "ym": "202306",
            "medianManwon": 74500
          },
          {
            "ym": "202309",
            "medianManwon": 75750
          },
          {
            "ym": "202312",
            "medianManwon": 69000
          },
          {
            "ym": "202403",
            "medianManwon": 69500
          },
          {
            "ym": "202406",
            "medianManwon": 73000
          },
          {
            "ym": "202409",
            "medianManwon": 73000
          },
          {
            "ym": "202503",
            "medianManwon": 73000
          },
          {
            "ym": "202506",
            "medianManwon": 80000
          },
          {
            "ym": "202509",
            "medianManwon": 75250
          },
          {
            "ym": "202512",
            "medianManwon": 77000
          },
          {
            "ym": "202603",
            "medianManwon": 72800
          },
          {
            "ym": "202606",
            "medianManwon": 70750
          }
        ]
      },
      {
        "name": "해운대래미안",
        "dong": "중동",
        "sggName": "해운대구",
        "pyeong": 26,
        "areaM2": 84.9843,
        "latestManwon": 86000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 93500
          },
          {
            "ym": "202303",
            "medianManwon": 70400
          },
          {
            "ym": "202306",
            "medianManwon": 74300
          },
          {
            "ym": "202309",
            "medianManwon": 75000
          },
          {
            "ym": "202312",
            "medianManwon": 84500
          },
          {
            "ym": "202406",
            "medianManwon": 75500
          },
          {
            "ym": "202409",
            "medianManwon": 80900
          },
          {
            "ym": "202412",
            "medianManwon": 79000
          },
          {
            "ym": "202503",
            "medianManwon": 76300
          },
          {
            "ym": "202506",
            "medianManwon": 79000
          },
          {
            "ym": "202509",
            "medianManwon": 67475
          },
          {
            "ym": "202512",
            "medianManwon": 74650
          },
          {
            "ym": "202603",
            "medianManwon": 83900
          },
          {
            "ym": "202606",
            "medianManwon": 86000
          }
        ]
      },
      {
        "name": "센텀비스타동원",
        "dong": "민락동",
        "sggName": "수영구",
        "pyeong": 26,
        "areaM2": 84.9316,
        "latestManwon": 90000,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 93500
          },
          {
            "ym": "202209",
            "medianManwon": 75500
          },
          {
            "ym": "202212",
            "medianManwon": 70000
          },
          {
            "ym": "202303",
            "medianManwon": 78000
          },
          {
            "ym": "202306",
            "medianManwon": 80750
          },
          {
            "ym": "202309",
            "medianManwon": 70950
          },
          {
            "ym": "202312",
            "medianManwon": 66000
          },
          {
            "ym": "202403",
            "medianManwon": 77200
          },
          {
            "ym": "202406",
            "medianManwon": 76500
          },
          {
            "ym": "202409",
            "medianManwon": 78400
          },
          {
            "ym": "202412",
            "medianManwon": 73500
          },
          {
            "ym": "202503",
            "medianManwon": 75600
          },
          {
            "ym": "202506",
            "medianManwon": 79500
          },
          {
            "ym": "202509",
            "medianManwon": 86500
          },
          {
            "ym": "202512",
            "medianManwon": 84000
          },
          {
            "ym": "202603",
            "medianManwon": 96250
          },
          {
            "ym": "202606",
            "medianManwon": 90000
          }
        ]
      },
      {
        "name": "부산더샵센텀포레",
        "dong": "민락동",
        "sggName": "수영구",
        "pyeong": 26,
        "areaM2": 84.9112,
        "latestManwon": 91000,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 102000
          },
          {
            "ym": "202209",
            "medianManwon": 77500
          },
          {
            "ym": "202212",
            "medianManwon": 64500
          },
          {
            "ym": "202303",
            "medianManwon": 73000
          },
          {
            "ym": "202306",
            "medianManwon": 83000
          },
          {
            "ym": "202309",
            "medianManwon": 81750
          },
          {
            "ym": "202403",
            "medianManwon": 85000
          },
          {
            "ym": "202406",
            "medianManwon": 72000
          },
          {
            "ym": "202412",
            "medianManwon": 85500
          },
          {
            "ym": "202503",
            "medianManwon": 73850
          },
          {
            "ym": "202506",
            "medianManwon": 78000
          },
          {
            "ym": "202509",
            "medianManwon": 81000
          },
          {
            "ym": "202512",
            "medianManwon": 87250
          },
          {
            "ym": "202603",
            "medianManwon": 106900
          },
          {
            "ym": "202606",
            "medianManwon": 91000
          }
        ]
      },
      {
        "name": "동부올림픽타운",
        "dong": "우동",
        "sggName": "해운대구",
        "pyeong": 26,
        "areaM2": 84.96,
        "latestManwon": 92500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 99000
          },
          {
            "ym": "202212",
            "medianManwon": 108500
          },
          {
            "ym": "202303",
            "medianManwon": 72500
          },
          {
            "ym": "202306",
            "medianManwon": 81000
          },
          {
            "ym": "202309",
            "medianManwon": 81000
          },
          {
            "ym": "202403",
            "medianManwon": 75000
          },
          {
            "ym": "202406",
            "medianManwon": 84500
          },
          {
            "ym": "202409",
            "medianManwon": 88000
          },
          {
            "ym": "202503",
            "medianManwon": 82000
          },
          {
            "ym": "202506",
            "medianManwon": 84000
          },
          {
            "ym": "202509",
            "medianManwon": 81000
          },
          {
            "ym": "202512",
            "medianManwon": 92700
          },
          {
            "ym": "202603",
            "medianManwon": 91000
          },
          {
            "ym": "202606",
            "medianManwon": 92500
          }
        ]
      },
      {
        "name": "남천금호어울림더비치",
        "dong": "남천동",
        "sggName": "수영구",
        "pyeong": 26,
        "areaM2": 84.983,
        "latestManwon": 96250,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 98000
          },
          {
            "ym": "202303",
            "medianManwon": 91000
          },
          {
            "ym": "202306",
            "medianManwon": 90000
          },
          {
            "ym": "202312",
            "medianManwon": 78650
          },
          {
            "ym": "202403",
            "medianManwon": 76000
          },
          {
            "ym": "202406",
            "medianManwon": 77000
          },
          {
            "ym": "202409",
            "medianManwon": 70000
          },
          {
            "ym": "202412",
            "medianManwon": 89700
          },
          {
            "ym": "202503",
            "medianManwon": 85000
          },
          {
            "ym": "202506",
            "medianManwon": 84300
          },
          {
            "ym": "202509",
            "medianManwon": 86000
          },
          {
            "ym": "202512",
            "medianManwon": 81000
          },
          {
            "ym": "202603",
            "medianManwon": 123000
          },
          {
            "ym": "202606",
            "medianManwon": 96250
          }
        ]
      },
      {
        "name": "광안자이",
        "dong": "광안동",
        "sggName": "수영구",
        "pyeong": 26,
        "areaM2": 84.48,
        "latestManwon": 97400,
        "series": [
          {
            "ym": "202303",
            "medianManwon": 83000
          },
          {
            "ym": "202306",
            "medianManwon": 80500
          },
          {
            "ym": "202309",
            "medianManwon": 100000
          },
          {
            "ym": "202312",
            "medianManwon": 80500
          },
          {
            "ym": "202403",
            "medianManwon": 83000
          },
          {
            "ym": "202406",
            "medianManwon": 80000
          },
          {
            "ym": "202409",
            "medianManwon": 80500
          },
          {
            "ym": "202412",
            "medianManwon": 91500
          },
          {
            "ym": "202503",
            "medianManwon": 103000
          },
          {
            "ym": "202506",
            "medianManwon": 102000
          },
          {
            "ym": "202509",
            "medianManwon": 83000
          },
          {
            "ym": "202512",
            "medianManwon": 104500
          },
          {
            "ym": "202603",
            "medianManwon": 93500
          },
          {
            "ym": "202606",
            "medianManwon": 97400
          }
        ]
      },
      {
        "name": "해운대자이2차1단지",
        "dong": "우동",
        "sggName": "해운대구",
        "pyeong": 26,
        "areaM2": 84.988,
        "latestManwon": 102000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 125000
          },
          {
            "ym": "202209",
            "medianManwon": 107000
          },
          {
            "ym": "202212",
            "medianManwon": 86000
          },
          {
            "ym": "202303",
            "medianManwon": 103000
          },
          {
            "ym": "202306",
            "medianManwon": 116000
          },
          {
            "ym": "202309",
            "medianManwon": 92000
          },
          {
            "ym": "202406",
            "medianManwon": 93500
          },
          {
            "ym": "202409",
            "medianManwon": 92000
          },
          {
            "ym": "202412",
            "medianManwon": 95000
          },
          {
            "ym": "202503",
            "medianManwon": 95000
          },
          {
            "ym": "202506",
            "medianManwon": 95250
          },
          {
            "ym": "202509",
            "medianManwon": 100000
          },
          {
            "ym": "202512",
            "medianManwon": 110000
          },
          {
            "ym": "202603",
            "medianManwon": 115400
          },
          {
            "ym": "202606",
            "medianManwon": 102000
          }
        ]
      },
      {
        "name": "삼익비치",
        "dong": "남천동",
        "sggName": "수영구",
        "pyeong": 22,
        "areaM2": 73.92,
        "latestManwon": 103000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 129900
          },
          {
            "ym": "202209",
            "medianManwon": 107000
          },
          {
            "ym": "202303",
            "medianManwon": 88400
          },
          {
            "ym": "202309",
            "medianManwon": 96000
          },
          {
            "ym": "202312",
            "medianManwon": 91700
          },
          {
            "ym": "202403",
            "medianManwon": 85000
          },
          {
            "ym": "202406",
            "medianManwon": 85250
          },
          {
            "ym": "202412",
            "medianManwon": 107050
          },
          {
            "ym": "202503",
            "medianManwon": 96500
          },
          {
            "ym": "202506",
            "medianManwon": 93000
          },
          {
            "ym": "202509",
            "medianManwon": 98000
          },
          {
            "ym": "202512",
            "medianManwon": 105000
          },
          {
            "ym": "202603",
            "medianManwon": 102250
          },
          {
            "ym": "202606",
            "medianManwon": 103000
          }
        ]
      },
      {
        "name": "쌍용예가디오션",
        "dong": "광안동",
        "sggName": "수영구",
        "pyeong": 26,
        "areaM2": 84.9616,
        "latestManwon": 104500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 120000
          },
          {
            "ym": "202206",
            "medianManwon": 114500
          },
          {
            "ym": "202303",
            "medianManwon": 87000
          },
          {
            "ym": "202306",
            "medianManwon": 82000
          },
          {
            "ym": "202309",
            "medianManwon": 100500
          },
          {
            "ym": "202312",
            "medianManwon": 97500
          },
          {
            "ym": "202403",
            "medianManwon": 91000
          },
          {
            "ym": "202406",
            "medianManwon": 90250
          },
          {
            "ym": "202409",
            "medianManwon": 90000
          },
          {
            "ym": "202412",
            "medianManwon": 99500
          },
          {
            "ym": "202503",
            "medianManwon": 100000
          },
          {
            "ym": "202506",
            "medianManwon": 89000
          },
          {
            "ym": "202509",
            "medianManwon": 101500
          },
          {
            "ym": "202512",
            "medianManwon": 107250
          },
          {
            "ym": "202603",
            "medianManwon": 115500
          },
          {
            "ym": "202606",
            "medianManwon": 104500
          }
        ]
      },
      {
        "name": "해운대두산위브더제니스",
        "dong": "우동",
        "sggName": "해운대구",
        "pyeong": 34,
        "areaM2": 111.07,
        "latestManwon": 158650,
        "series": [
          {
            "ym": "202209",
            "medianManwon": 150000
          },
          {
            "ym": "202306",
            "medianManwon": 126000
          },
          {
            "ym": "202309",
            "medianManwon": 144000
          },
          {
            "ym": "202312",
            "medianManwon": 140000
          },
          {
            "ym": "202403",
            "medianManwon": 145000
          },
          {
            "ym": "202406",
            "medianManwon": 151000
          },
          {
            "ym": "202409",
            "medianManwon": 138000
          },
          {
            "ym": "202412",
            "medianManwon": 133250
          },
          {
            "ym": "202503",
            "medianManwon": 175000
          },
          {
            "ym": "202506",
            "medianManwon": 132800
          },
          {
            "ym": "202509",
            "medianManwon": 141250
          },
          {
            "ym": "202512",
            "medianManwon": 145500
          },
          {
            "ym": "202603",
            "medianManwon": 158800
          },
          {
            "ym": "202606",
            "medianManwon": 158650
          }
        ]
      },
      {
        "name": "더샵센텀파크1차",
        "dong": "재송동",
        "sggName": "해운대구",
        "pyeong": 38,
        "areaM2": 126.9004,
        "latestManwon": 160000,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 155000
          },
          {
            "ym": "202209",
            "medianManwon": 180000
          },
          {
            "ym": "202212",
            "medianManwon": 122850
          },
          {
            "ym": "202306",
            "medianManwon": 149145
          },
          {
            "ym": "202309",
            "medianManwon": 165500
          },
          {
            "ym": "202312",
            "medianManwon": 154500
          },
          {
            "ym": "202403",
            "medianManwon": 152000
          },
          {
            "ym": "202406",
            "medianManwon": 160000
          },
          {
            "ym": "202412",
            "medianManwon": 139000
          },
          {
            "ym": "202503",
            "medianManwon": 158000
          },
          {
            "ym": "202506",
            "medianManwon": 148750
          },
          {
            "ym": "202509",
            "medianManwon": 183250
          },
          {
            "ym": "202512",
            "medianManwon": 168000
          },
          {
            "ym": "202606",
            "medianManwon": 160000
          }
        ]
      }
    ]
  },
  "ulsan-premium": {
    "label": "울산 상급지",
    "complexes": [
      {
        "name": "신복현대",
        "dong": "무거동",
        "sggName": "남구",
        "pyeong": 18,
        "areaM2": 59.76,
        "latestManwon": 12200,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 15450
          },
          {
            "ym": "202206",
            "medianManwon": 15500
          },
          {
            "ym": "202209",
            "medianManwon": 14750
          },
          {
            "ym": "202303",
            "medianManwon": 13550
          },
          {
            "ym": "202306",
            "medianManwon": 12200
          },
          {
            "ym": "202309",
            "medianManwon": 12400
          },
          {
            "ym": "202312",
            "medianManwon": 12200
          },
          {
            "ym": "202403",
            "medianManwon": 11650
          },
          {
            "ym": "202406",
            "medianManwon": 12000
          },
          {
            "ym": "202409",
            "medianManwon": 12200
          },
          {
            "ym": "202412",
            "medianManwon": 11725
          },
          {
            "ym": "202503",
            "medianManwon": 11550
          },
          {
            "ym": "202506",
            "medianManwon": 12220
          },
          {
            "ym": "202509",
            "medianManwon": 13400
          },
          {
            "ym": "202512",
            "medianManwon": 12150
          },
          {
            "ym": "202603",
            "medianManwon": 12500
          },
          {
            "ym": "202606",
            "medianManwon": 12200
          }
        ]
      },
      {
        "name": "신선",
        "dong": "야음동",
        "sggName": "남구",
        "pyeong": 14,
        "areaM2": 46.53,
        "latestManwon": 13000,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 13000
          },
          {
            "ym": "202209",
            "medianManwon": 13500
          },
          {
            "ym": "202212",
            "medianManwon": 14745
          },
          {
            "ym": "202303",
            "medianManwon": 13500
          },
          {
            "ym": "202306",
            "medianManwon": 13350
          },
          {
            "ym": "202309",
            "medianManwon": 12450
          },
          {
            "ym": "202312",
            "medianManwon": 12825
          },
          {
            "ym": "202403",
            "medianManwon": 13000
          },
          {
            "ym": "202406",
            "medianManwon": 13000
          },
          {
            "ym": "202409",
            "medianManwon": 12000
          },
          {
            "ym": "202412",
            "medianManwon": 13000
          },
          {
            "ym": "202503",
            "medianManwon": 11850
          },
          {
            "ym": "202506",
            "medianManwon": 12900
          },
          {
            "ym": "202509",
            "medianManwon": 12350
          },
          {
            "ym": "202512",
            "medianManwon": 13000
          },
          {
            "ym": "202603",
            "medianManwon": 12800
          },
          {
            "ym": "202606",
            "medianManwon": 13000
          }
        ]
      },
      {
        "name": "달동주공2단지",
        "dong": "달동",
        "sggName": "남구",
        "pyeong": 12,
        "areaM2": 38.64,
        "latestManwon": 14150,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 17300
          },
          {
            "ym": "202212",
            "medianManwon": 15000
          },
          {
            "ym": "202303",
            "medianManwon": 13000
          },
          {
            "ym": "202306",
            "medianManwon": 15450
          },
          {
            "ym": "202309",
            "medianManwon": 14825
          },
          {
            "ym": "202312",
            "medianManwon": 15000
          },
          {
            "ym": "202403",
            "medianManwon": 14650
          },
          {
            "ym": "202406",
            "medianManwon": 13000
          },
          {
            "ym": "202409",
            "medianManwon": 14250
          },
          {
            "ym": "202503",
            "medianManwon": 13500
          },
          {
            "ym": "202506",
            "medianManwon": 14400
          },
          {
            "ym": "202512",
            "medianManwon": 15000
          },
          {
            "ym": "202603",
            "medianManwon": 11700
          },
          {
            "ym": "202606",
            "medianManwon": 14150
          }
        ]
      },
      {
        "name": "현대문화1차",
        "dong": "삼산동",
        "sggName": "남구",
        "pyeong": 18,
        "areaM2": 59.76,
        "latestManwon": 17800,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 17500
          },
          {
            "ym": "202206",
            "medianManwon": 17500
          },
          {
            "ym": "202209",
            "medianManwon": 17650
          },
          {
            "ym": "202212",
            "medianManwon": 18000
          },
          {
            "ym": "202306",
            "medianManwon": 15675
          },
          {
            "ym": "202309",
            "medianManwon": 16300
          },
          {
            "ym": "202312",
            "medianManwon": 15850
          },
          {
            "ym": "202403",
            "medianManwon": 15375
          },
          {
            "ym": "202409",
            "medianManwon": 16200
          },
          {
            "ym": "202412",
            "medianManwon": 15100
          },
          {
            "ym": "202503",
            "medianManwon": 15550
          },
          {
            "ym": "202506",
            "medianManwon": 16050
          },
          {
            "ym": "202509",
            "medianManwon": 15900
          },
          {
            "ym": "202512",
            "medianManwon": 16250
          },
          {
            "ym": "202603",
            "medianManwon": 17000
          },
          {
            "ym": "202606",
            "medianManwon": 17800
          }
        ]
      },
      {
        "name": "도성",
        "dong": "옥동",
        "sggName": "남구",
        "pyeong": 15,
        "areaM2": 50.25,
        "latestManwon": 20500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 36200
          },
          {
            "ym": "202206",
            "medianManwon": 29900
          },
          {
            "ym": "202212",
            "medianManwon": 21000
          },
          {
            "ym": "202303",
            "medianManwon": 22000
          },
          {
            "ym": "202309",
            "medianManwon": 25250
          },
          {
            "ym": "202312",
            "medianManwon": 25800
          },
          {
            "ym": "202403",
            "medianManwon": 22000
          },
          {
            "ym": "202406",
            "medianManwon": 21000
          },
          {
            "ym": "202409",
            "medianManwon": 20500
          },
          {
            "ym": "202412",
            "medianManwon": 22000
          },
          {
            "ym": "202506",
            "medianManwon": 22000
          },
          {
            "ym": "202509",
            "medianManwon": 21000
          },
          {
            "ym": "202512",
            "medianManwon": 22500
          },
          {
            "ym": "202606",
            "medianManwon": 20500
          }
        ]
      },
      {
        "name": "굴화주공1",
        "dong": "무거동",
        "sggName": "남구",
        "pyeong": 18,
        "areaM2": 59.99,
        "latestManwon": 23000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 24500
          },
          {
            "ym": "202206",
            "medianManwon": 23200
          },
          {
            "ym": "202209",
            "medianManwon": 23000
          },
          {
            "ym": "202212",
            "medianManwon": 21450
          },
          {
            "ym": "202303",
            "medianManwon": 21000
          },
          {
            "ym": "202306",
            "medianManwon": 20500
          },
          {
            "ym": "202309",
            "medianManwon": 20800
          },
          {
            "ym": "202312",
            "medianManwon": 20500
          },
          {
            "ym": "202403",
            "medianManwon": 21650
          },
          {
            "ym": "202406",
            "medianManwon": 21800
          },
          {
            "ym": "202409",
            "medianManwon": 20650
          },
          {
            "ym": "202412",
            "medianManwon": 22800
          },
          {
            "ym": "202503",
            "medianManwon": 20900
          },
          {
            "ym": "202506",
            "medianManwon": 22200
          },
          {
            "ym": "202509",
            "medianManwon": 22200
          },
          {
            "ym": "202512",
            "medianManwon": 25000
          },
          {
            "ym": "202603",
            "medianManwon": 23800
          },
          {
            "ym": "202606",
            "medianManwon": 23000
          }
        ]
      },
      {
        "name": "울산옥현1주공",
        "dong": "무거동",
        "sggName": "남구",
        "pyeong": 18,
        "areaM2": 59.89,
        "latestManwon": 29000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 28000
          },
          {
            "ym": "202206",
            "medianManwon": 28700
          },
          {
            "ym": "202209",
            "medianManwon": 26200
          },
          {
            "ym": "202212",
            "medianManwon": 24000
          },
          {
            "ym": "202303",
            "medianManwon": 24900
          },
          {
            "ym": "202306",
            "medianManwon": 23650
          },
          {
            "ym": "202309",
            "medianManwon": 25300
          },
          {
            "ym": "202312",
            "medianManwon": 25000
          },
          {
            "ym": "202403",
            "medianManwon": 23250
          },
          {
            "ym": "202406",
            "medianManwon": 22850
          },
          {
            "ym": "202409",
            "medianManwon": 23800
          },
          {
            "ym": "202412",
            "medianManwon": 25000
          },
          {
            "ym": "202503",
            "medianManwon": 25400
          },
          {
            "ym": "202506",
            "medianManwon": 27250
          },
          {
            "ym": "202509",
            "medianManwon": 25375
          },
          {
            "ym": "202512",
            "medianManwon": 26300
          },
          {
            "ym": "202603",
            "medianManwon": 31600
          },
          {
            "ym": "202606",
            "medianManwon": 29000
          }
        ]
      },
      {
        "name": "세양청구마을",
        "dong": "삼산동",
        "sggName": "남구",
        "pyeong": 18,
        "areaM2": 59.98,
        "latestManwon": 29000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 25750
          },
          {
            "ym": "202206",
            "medianManwon": 24000
          },
          {
            "ym": "202212",
            "medianManwon": 21500
          },
          {
            "ym": "202303",
            "medianManwon": 21500
          },
          {
            "ym": "202306",
            "medianManwon": 22000
          },
          {
            "ym": "202309",
            "medianManwon": 22200
          },
          {
            "ym": "202312",
            "medianManwon": 21000
          },
          {
            "ym": "202403",
            "medianManwon": 20850
          },
          {
            "ym": "202406",
            "medianManwon": 24550
          },
          {
            "ym": "202409",
            "medianManwon": 23000
          },
          {
            "ym": "202412",
            "medianManwon": 20000
          },
          {
            "ym": "202503",
            "medianManwon": 23400
          },
          {
            "ym": "202506",
            "medianManwon": 24450
          },
          {
            "ym": "202509",
            "medianManwon": 24400
          },
          {
            "ym": "202512",
            "medianManwon": 24300
          },
          {
            "ym": "202603",
            "medianManwon": 26450
          },
          {
            "ym": "202606",
            "medianManwon": 29000
          }
        ]
      },
      {
        "name": "울산옥현주공2",
        "dong": "무거동",
        "sggName": "남구",
        "pyeong": 18,
        "areaM2": 59.89,
        "latestManwon": 30950,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 31000
          },
          {
            "ym": "202206",
            "medianManwon": 29700
          },
          {
            "ym": "202303",
            "medianManwon": 26500
          },
          {
            "ym": "202306",
            "medianManwon": 24500
          },
          {
            "ym": "202309",
            "medianManwon": 24900
          },
          {
            "ym": "202403",
            "medianManwon": 27300
          },
          {
            "ym": "202406",
            "medianManwon": 25450
          },
          {
            "ym": "202409",
            "medianManwon": 25150
          },
          {
            "ym": "202412",
            "medianManwon": 28700
          },
          {
            "ym": "202503",
            "medianManwon": 29500
          },
          {
            "ym": "202506",
            "medianManwon": 29350
          },
          {
            "ym": "202509",
            "medianManwon": 28150
          },
          {
            "ym": "202512",
            "medianManwon": 29200
          },
          {
            "ym": "202603",
            "medianManwon": 30000
          },
          {
            "ym": "202606",
            "medianManwon": 30950
          }
        ]
      },
      {
        "name": "신정현대홈타운1",
        "dong": "야음동",
        "sggName": "남구",
        "pyeong": 18,
        "areaM2": 59.97,
        "latestManwon": 32500,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 30800
          },
          {
            "ym": "202212",
            "medianManwon": 24000
          },
          {
            "ym": "202303",
            "medianManwon": 27350
          },
          {
            "ym": "202306",
            "medianManwon": 26000
          },
          {
            "ym": "202309",
            "medianManwon": 28150
          },
          {
            "ym": "202312",
            "medianManwon": 26800
          },
          {
            "ym": "202403",
            "medianManwon": 28250
          },
          {
            "ym": "202406",
            "medianManwon": 26500
          },
          {
            "ym": "202409",
            "medianManwon": 26400
          },
          {
            "ym": "202412",
            "medianManwon": 28050
          },
          {
            "ym": "202503",
            "medianManwon": 28600
          },
          {
            "ym": "202506",
            "medianManwon": 29700
          },
          {
            "ym": "202509",
            "medianManwon": 29565
          },
          {
            "ym": "202512",
            "medianManwon": 34150
          },
          {
            "ym": "202603",
            "medianManwon": 31500
          },
          {
            "ym": "202606",
            "medianManwon": 32500
          }
        ]
      },
      {
        "name": "옥현으뜸마을주공3",
        "dong": "무거동",
        "sggName": "남구",
        "pyeong": 18,
        "areaM2": 59.78,
        "latestManwon": 34925,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 35000
          },
          {
            "ym": "202206",
            "medianManwon": 33700
          },
          {
            "ym": "202209",
            "medianManwon": 28600
          },
          {
            "ym": "202212",
            "medianManwon": 23300
          },
          {
            "ym": "202303",
            "medianManwon": 29500
          },
          {
            "ym": "202306",
            "medianManwon": 27700
          },
          {
            "ym": "202309",
            "medianManwon": 28000
          },
          {
            "ym": "202312",
            "medianManwon": 27800
          },
          {
            "ym": "202403",
            "medianManwon": 28700
          },
          {
            "ym": "202406",
            "medianManwon": 29700
          },
          {
            "ym": "202409",
            "medianManwon": 29900
          },
          {
            "ym": "202412",
            "medianManwon": 28250
          },
          {
            "ym": "202503",
            "medianManwon": 28850
          },
          {
            "ym": "202506",
            "medianManwon": 28850
          },
          {
            "ym": "202509",
            "medianManwon": 28650
          },
          {
            "ym": "202512",
            "medianManwon": 31600
          },
          {
            "ym": "202603",
            "medianManwon": 33700
          },
          {
            "ym": "202606",
            "medianManwon": 34925
          }
        ]
      },
      {
        "name": "신정현대홈타운3",
        "dong": "신정동",
        "sggName": "남구",
        "pyeong": 26,
        "areaM2": 84.96,
        "latestManwon": 48000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 41900
          },
          {
            "ym": "202206",
            "medianManwon": 41900
          },
          {
            "ym": "202209",
            "medianManwon": 40000
          },
          {
            "ym": "202212",
            "medianManwon": 32000
          },
          {
            "ym": "202303",
            "medianManwon": 34400
          },
          {
            "ym": "202306",
            "medianManwon": 39000
          },
          {
            "ym": "202309",
            "medianManwon": 39700
          },
          {
            "ym": "202312",
            "medianManwon": 38500
          },
          {
            "ym": "202403",
            "medianManwon": 39300
          },
          {
            "ym": "202406",
            "medianManwon": 39350
          },
          {
            "ym": "202412",
            "medianManwon": 39500
          },
          {
            "ym": "202506",
            "medianManwon": 41000
          },
          {
            "ym": "202603",
            "medianManwon": 44000
          },
          {
            "ym": "202606",
            "medianManwon": 48000
          }
        ]
      },
      {
        "name": "신정현대홈타운2",
        "dong": "야음동",
        "sggName": "남구",
        "pyeong": 26,
        "areaM2": 84.96,
        "latestManwon": 48750,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 40875
          },
          {
            "ym": "202206",
            "medianManwon": 40000
          },
          {
            "ym": "202209",
            "medianManwon": 37500
          },
          {
            "ym": "202212",
            "medianManwon": 32150
          },
          {
            "ym": "202303",
            "medianManwon": 34500
          },
          {
            "ym": "202306",
            "medianManwon": 34800
          },
          {
            "ym": "202309",
            "medianManwon": 35900
          },
          {
            "ym": "202312",
            "medianManwon": 37000
          },
          {
            "ym": "202403",
            "medianManwon": 37900
          },
          {
            "ym": "202406",
            "medianManwon": 37800
          },
          {
            "ym": "202409",
            "medianManwon": 38700
          },
          {
            "ym": "202503",
            "medianManwon": 39300
          },
          {
            "ym": "202506",
            "medianManwon": 40175
          },
          {
            "ym": "202509",
            "medianManwon": 40250
          },
          {
            "ym": "202512",
            "medianManwon": 43900
          },
          {
            "ym": "202603",
            "medianManwon": 46500
          },
          {
            "ym": "202606",
            "medianManwon": 48750
          }
        ]
      },
      {
        "name": "대공원호반베르디움",
        "dong": "두왕동",
        "sggName": "남구",
        "pyeong": 26,
        "areaM2": 84.9801,
        "latestManwon": 50300,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 51700
          },
          {
            "ym": "202209",
            "medianManwon": 50000
          },
          {
            "ym": "202303",
            "medianManwon": 40000
          },
          {
            "ym": "202306",
            "medianManwon": 44500
          },
          {
            "ym": "202309",
            "medianManwon": 44000
          },
          {
            "ym": "202312",
            "medianManwon": 44900
          },
          {
            "ym": "202403",
            "medianManwon": 44800
          },
          {
            "ym": "202406",
            "medianManwon": 44750
          },
          {
            "ym": "202409",
            "medianManwon": 41000
          },
          {
            "ym": "202412",
            "medianManwon": 45250
          },
          {
            "ym": "202503",
            "medianManwon": 46500
          },
          {
            "ym": "202506",
            "medianManwon": 48700
          },
          {
            "ym": "202509",
            "medianManwon": 46500
          },
          {
            "ym": "202512",
            "medianManwon": 47700
          },
          {
            "ym": "202603",
            "medianManwon": 51500
          },
          {
            "ym": "202606",
            "medianManwon": 50300
          }
        ]
      },
      {
        "name": "신성미소지움2단지",
        "dong": "신정동",
        "sggName": "남구",
        "pyeong": 26,
        "areaM2": 84.95,
        "latestManwon": 52250,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 54000
          },
          {
            "ym": "202212",
            "medianManwon": 37250
          },
          {
            "ym": "202303",
            "medianManwon": 45000
          },
          {
            "ym": "202306",
            "medianManwon": 45600
          },
          {
            "ym": "202309",
            "medianManwon": 49500
          },
          {
            "ym": "202312",
            "medianManwon": 54500
          },
          {
            "ym": "202403",
            "medianManwon": 47500
          },
          {
            "ym": "202409",
            "medianManwon": 49850
          },
          {
            "ym": "202503",
            "medianManwon": 47600
          },
          {
            "ym": "202506",
            "medianManwon": 54000
          },
          {
            "ym": "202509",
            "medianManwon": 51500
          },
          {
            "ym": "202512",
            "medianManwon": 54300
          },
          {
            "ym": "202603",
            "medianManwon": 56350
          },
          {
            "ym": "202606",
            "medianManwon": 52250
          }
        ]
      },
      {
        "name": "대공원호반베르디움2차",
        "dong": "두왕동",
        "sggName": "남구",
        "pyeong": 26,
        "areaM2": 84.9801,
        "latestManwon": 52500,
        "series": [
          {
            "ym": "202212",
            "medianManwon": 41750
          },
          {
            "ym": "202303",
            "medianManwon": 44500
          },
          {
            "ym": "202306",
            "medianManwon": 41450
          },
          {
            "ym": "202309",
            "medianManwon": 42000
          },
          {
            "ym": "202312",
            "medianManwon": 44900
          },
          {
            "ym": "202403",
            "medianManwon": 42300
          },
          {
            "ym": "202406",
            "medianManwon": 42150
          },
          {
            "ym": "202409",
            "medianManwon": 44350
          },
          {
            "ym": "202412",
            "medianManwon": 44100
          },
          {
            "ym": "202503",
            "medianManwon": 46150
          },
          {
            "ym": "202506",
            "medianManwon": 47800
          },
          {
            "ym": "202509",
            "medianManwon": 50000
          },
          {
            "ym": "202512",
            "medianManwon": 50500
          },
          {
            "ym": "202603",
            "medianManwon": 49750
          },
          {
            "ym": "202606",
            "medianManwon": 52500
          }
        ]
      },
      {
        "name": "신성미소지움1단지",
        "dong": "신정동",
        "sggName": "남구",
        "pyeong": 26,
        "areaM2": 84.95,
        "latestManwon": 59050,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 54000
          },
          {
            "ym": "202209",
            "medianManwon": 50000
          },
          {
            "ym": "202212",
            "medianManwon": 40000
          },
          {
            "ym": "202303",
            "medianManwon": 41500
          },
          {
            "ym": "202306",
            "medianManwon": 47000
          },
          {
            "ym": "202309",
            "medianManwon": 47000
          },
          {
            "ym": "202403",
            "medianManwon": 55000
          },
          {
            "ym": "202406",
            "medianManwon": 47700
          },
          {
            "ym": "202409",
            "medianManwon": 52850
          },
          {
            "ym": "202506",
            "medianManwon": 56600
          },
          {
            "ym": "202509",
            "medianManwon": 52900
          },
          {
            "ym": "202603",
            "medianManwon": 56800
          },
          {
            "ym": "202606",
            "medianManwon": 59050
          }
        ]
      },
      {
        "name": "울산호수공원대명루첸아파트",
        "dong": "야음동",
        "sggName": "남구",
        "pyeong": 22,
        "areaM2": 73.02,
        "latestManwon": 62500,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 55000
          },
          {
            "ym": "202212",
            "medianManwon": 45100
          },
          {
            "ym": "202303",
            "medianManwon": 45250
          },
          {
            "ym": "202306",
            "medianManwon": 47850
          },
          {
            "ym": "202309",
            "medianManwon": 49500
          },
          {
            "ym": "202312",
            "medianManwon": 49250
          },
          {
            "ym": "202403",
            "medianManwon": 53000
          },
          {
            "ym": "202406",
            "medianManwon": 52600
          },
          {
            "ym": "202409",
            "medianManwon": 57000
          },
          {
            "ym": "202506",
            "medianManwon": 58450
          },
          {
            "ym": "202509",
            "medianManwon": 59875
          },
          {
            "ym": "202512",
            "medianManwon": 62000
          },
          {
            "ym": "202603",
            "medianManwon": 60150
          },
          {
            "ym": "202606",
            "medianManwon": 62500
          }
        ]
      },
      {
        "name": "울산신정푸르지오",
        "dong": "신정동",
        "sggName": "남구",
        "pyeong": 26,
        "areaM2": 84.9569,
        "latestManwon": 62900,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 63000
          },
          {
            "ym": "202212",
            "medianManwon": 50000
          },
          {
            "ym": "202303",
            "medianManwon": 54500
          },
          {
            "ym": "202306",
            "medianManwon": 57400
          },
          {
            "ym": "202309",
            "medianManwon": 60500
          },
          {
            "ym": "202312",
            "medianManwon": 57500
          },
          {
            "ym": "202403",
            "medianManwon": 60900
          },
          {
            "ym": "202406",
            "medianManwon": 60850
          },
          {
            "ym": "202409",
            "medianManwon": 61050
          },
          {
            "ym": "202412",
            "medianManwon": 61150
          },
          {
            "ym": "202503",
            "medianManwon": 63725
          },
          {
            "ym": "202506",
            "medianManwon": 61850
          },
          {
            "ym": "202509",
            "medianManwon": 66000
          },
          {
            "ym": "202512",
            "medianManwon": 65400
          },
          {
            "ym": "202603",
            "medianManwon": 67900
          },
          {
            "ym": "202606",
            "medianManwon": 62900
          }
        ]
      },
      {
        "name": "울산번영로두산위브",
        "dong": "야음동",
        "sggName": "남구",
        "pyeong": 26,
        "areaM2": 84.537,
        "latestManwon": 72900,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 68500
          },
          {
            "ym": "202206",
            "medianManwon": 66000
          },
          {
            "ym": "202209",
            "medianManwon": 58000
          },
          {
            "ym": "202212",
            "medianManwon": 51000
          },
          {
            "ym": "202303",
            "medianManwon": 59150
          },
          {
            "ym": "202306",
            "medianManwon": 63000
          },
          {
            "ym": "202309",
            "medianManwon": 66850
          },
          {
            "ym": "202312",
            "medianManwon": 60500
          },
          {
            "ym": "202403",
            "medianManwon": 65500
          },
          {
            "ym": "202406",
            "medianManwon": 67300
          },
          {
            "ym": "202409",
            "medianManwon": 70500
          },
          {
            "ym": "202412",
            "medianManwon": 67075
          },
          {
            "ym": "202503",
            "medianManwon": 68350
          },
          {
            "ym": "202506",
            "medianManwon": 69500
          },
          {
            "ym": "202509",
            "medianManwon": 70000
          },
          {
            "ym": "202512",
            "medianManwon": 70000
          },
          {
            "ym": "202603",
            "medianManwon": 72750
          },
          {
            "ym": "202606",
            "medianManwon": 72900
          }
        ]
      },
      {
        "name": "무거위브자이",
        "dong": "무거동",
        "sggName": "남구",
        "pyeong": 36,
        "areaM2": 119.617,
        "latestManwon": 77000,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 75000
          },
          {
            "ym": "202209",
            "medianManwon": 66500
          },
          {
            "ym": "202212",
            "medianManwon": 64700
          },
          {
            "ym": "202303",
            "medianManwon": 64250
          },
          {
            "ym": "202306",
            "medianManwon": 68800
          },
          {
            "ym": "202309",
            "medianManwon": 73800
          },
          {
            "ym": "202312",
            "medianManwon": 75000
          },
          {
            "ym": "202403",
            "medianManwon": 76300
          },
          {
            "ym": "202406",
            "medianManwon": 70750
          },
          {
            "ym": "202409",
            "medianManwon": 66000
          },
          {
            "ym": "202412",
            "medianManwon": 72400
          },
          {
            "ym": "202503",
            "medianManwon": 72500
          },
          {
            "ym": "202506",
            "medianManwon": 74000
          },
          {
            "ym": "202509",
            "medianManwon": 78000
          },
          {
            "ym": "202512",
            "medianManwon": 76000
          },
          {
            "ym": "202603",
            "medianManwon": 84000
          },
          {
            "ym": "202606",
            "medianManwon": 77000
          }
        ]
      },
      {
        "name": "번영로하늘채센트럴파크",
        "dong": "야음동",
        "sggName": "남구",
        "pyeong": 26,
        "areaM2": 84.961,
        "latestManwon": 78500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 62000
          },
          {
            "ym": "202206",
            "medianManwon": 57200
          },
          {
            "ym": "202209",
            "medianManwon": 57350
          },
          {
            "ym": "202303",
            "medianManwon": 51000
          },
          {
            "ym": "202309",
            "medianManwon": 78500
          },
          {
            "ym": "202406",
            "medianManwon": 73650
          },
          {
            "ym": "202409",
            "medianManwon": 57000
          },
          {
            "ym": "202412",
            "medianManwon": 76000
          },
          {
            "ym": "202503",
            "medianManwon": 69150
          },
          {
            "ym": "202506",
            "medianManwon": 72500
          },
          {
            "ym": "202509",
            "medianManwon": 73900
          },
          {
            "ym": "202512",
            "medianManwon": 78300
          },
          {
            "ym": "202603",
            "medianManwon": 76700
          },
          {
            "ym": "202606",
            "medianManwon": 78500
          }
        ]
      },
      {
        "name": "힐스테이트수암(1단지)",
        "dong": "야음동",
        "sggName": "남구",
        "pyeong": 26,
        "areaM2": 84.7267,
        "latestManwon": 80600,
        "series": [
          {
            "ym": "202212",
            "medianManwon": 58500
          },
          {
            "ym": "202303",
            "medianManwon": 60500
          },
          {
            "ym": "202306",
            "medianManwon": 66500
          },
          {
            "ym": "202309",
            "medianManwon": 64000
          },
          {
            "ym": "202312",
            "medianManwon": 68000
          },
          {
            "ym": "202403",
            "medianManwon": 63275
          },
          {
            "ym": "202406",
            "medianManwon": 69700
          },
          {
            "ym": "202409",
            "medianManwon": 71850
          },
          {
            "ym": "202412",
            "medianManwon": 73500
          },
          {
            "ym": "202503",
            "medianManwon": 69800
          },
          {
            "ym": "202506",
            "medianManwon": 72000
          },
          {
            "ym": "202509",
            "medianManwon": 75000
          },
          {
            "ym": "202512",
            "medianManwon": 84000
          },
          {
            "ym": "202603",
            "medianManwon": 81250
          },
          {
            "ym": "202606",
            "medianManwon": 80600
          }
        ]
      },
      {
        "name": "대명루첸",
        "dong": "신정동",
        "sggName": "남구",
        "pyeong": 25,
        "areaM2": 83.1716,
        "latestManwon": 80700,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 69000
          },
          {
            "ym": "202206",
            "medianManwon": 71000
          },
          {
            "ym": "202209",
            "medianManwon": 63500
          },
          {
            "ym": "202212",
            "medianManwon": 56000
          },
          {
            "ym": "202303",
            "medianManwon": 64500
          },
          {
            "ym": "202306",
            "medianManwon": 68000
          },
          {
            "ym": "202309",
            "medianManwon": 68500
          },
          {
            "ym": "202312",
            "medianManwon": 66900
          },
          {
            "ym": "202406",
            "medianManwon": 72300
          },
          {
            "ym": "202412",
            "medianManwon": 73500
          },
          {
            "ym": "202503",
            "medianManwon": 72500
          },
          {
            "ym": "202506",
            "medianManwon": 75000
          },
          {
            "ym": "202509",
            "medianManwon": 76900
          },
          {
            "ym": "202512",
            "medianManwon": 79000
          },
          {
            "ym": "202603",
            "medianManwon": 80650
          },
          {
            "ym": "202606",
            "medianManwon": 80700
          }
        ]
      },
      {
        "name": "강변센트럴하이츠",
        "dong": "신정동",
        "sggName": "남구",
        "pyeong": 42,
        "areaM2": 140.007,
        "latestManwon": 84750,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 100000
          },
          {
            "ym": "202209",
            "medianManwon": 84500
          },
          {
            "ym": "202306",
            "medianManwon": 72000
          },
          {
            "ym": "202309",
            "medianManwon": 76500
          },
          {
            "ym": "202312",
            "medianManwon": 72500
          },
          {
            "ym": "202403",
            "medianManwon": 71750
          },
          {
            "ym": "202406",
            "medianManwon": 75150
          },
          {
            "ym": "202412",
            "medianManwon": 78200
          },
          {
            "ym": "202503",
            "medianManwon": 75400
          },
          {
            "ym": "202506",
            "medianManwon": 78250
          },
          {
            "ym": "202509",
            "medianManwon": 82500
          },
          {
            "ym": "202512",
            "medianManwon": 84600
          },
          {
            "ym": "202603",
            "medianManwon": 85500
          },
          {
            "ym": "202606",
            "medianManwon": 84750
          }
        ]
      },
      {
        "name": "대현더샵",
        "dong": "야음동",
        "sggName": "남구",
        "pyeong": 26,
        "areaM2": 84.914,
        "latestManwon": 86000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 89500
          },
          {
            "ym": "202209",
            "medianManwon": 71800
          },
          {
            "ym": "202212",
            "medianManwon": 63500
          },
          {
            "ym": "202303",
            "medianManwon": 68000
          },
          {
            "ym": "202306",
            "medianManwon": 74000
          },
          {
            "ym": "202309",
            "medianManwon": 77250
          },
          {
            "ym": "202312",
            "medianManwon": 80500
          },
          {
            "ym": "202403",
            "medianManwon": 74500
          },
          {
            "ym": "202406",
            "medianManwon": 76600
          },
          {
            "ym": "202409",
            "medianManwon": 78600
          },
          {
            "ym": "202412",
            "medianManwon": 77100
          },
          {
            "ym": "202503",
            "medianManwon": 79350
          },
          {
            "ym": "202506",
            "medianManwon": 79350
          },
          {
            "ym": "202509",
            "medianManwon": 80000
          },
          {
            "ym": "202512",
            "medianManwon": 80800
          },
          {
            "ym": "202603",
            "medianManwon": 89200
          },
          {
            "ym": "202606",
            "medianManwon": 86000
          }
        ]
      },
      {
        "name": "문수로2차IPARK2단지",
        "dong": "신정동",
        "sggName": "남구",
        "pyeong": 26,
        "areaM2": 84.9424,
        "latestManwon": 106000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 102000
          },
          {
            "ym": "202212",
            "medianManwon": 78000
          },
          {
            "ym": "202303",
            "medianManwon": 82000
          },
          {
            "ym": "202306",
            "medianManwon": 92500
          },
          {
            "ym": "202309",
            "medianManwon": 85000
          },
          {
            "ym": "202312",
            "medianManwon": 89950
          },
          {
            "ym": "202403",
            "medianManwon": 82500
          },
          {
            "ym": "202406",
            "medianManwon": 89250
          },
          {
            "ym": "202409",
            "medianManwon": 89000
          },
          {
            "ym": "202412",
            "medianManwon": 90400
          },
          {
            "ym": "202503",
            "medianManwon": 92000
          },
          {
            "ym": "202506",
            "medianManwon": 92500
          },
          {
            "ym": "202512",
            "medianManwon": 109500
          },
          {
            "ym": "202606",
            "medianManwon": 106000
          }
        ]
      },
      {
        "name": "대공원한신휴플러스",
        "dong": "옥동",
        "sggName": "남구",
        "pyeong": 26,
        "areaM2": 84.92,
        "latestManwon": 125300,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 107500
          },
          {
            "ym": "202303",
            "medianManwon": 81500
          },
          {
            "ym": "202306",
            "medianManwon": 87000
          },
          {
            "ym": "202309",
            "medianManwon": 92750
          },
          {
            "ym": "202312",
            "medianManwon": 87000
          },
          {
            "ym": "202403",
            "medianManwon": 90700
          },
          {
            "ym": "202406",
            "medianManwon": 90800
          },
          {
            "ym": "202412",
            "medianManwon": 96000
          },
          {
            "ym": "202503",
            "medianManwon": 95750
          },
          {
            "ym": "202506",
            "medianManwon": 97700
          },
          {
            "ym": "202512",
            "medianManwon": 107200
          },
          {
            "ym": "202603",
            "medianManwon": 114500
          },
          {
            "ym": "202606",
            "medianManwon": 125300
          }
        ]
      }
    ]
  },
  "incheon-premium": {
    "label": "인천 상급지",
    "complexes": [
      {
        "name": "승기마을,연수1차시영",
        "dong": "연수동",
        "sggName": "연수구",
        "pyeong": 8,
        "areaM2": 26.82,
        "latestManwon": 10950,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 17500
          },
          {
            "ym": "202206",
            "medianManwon": 16625
          },
          {
            "ym": "202209",
            "medianManwon": 13000
          },
          {
            "ym": "202212",
            "medianManwon": 12500
          },
          {
            "ym": "202303",
            "medianManwon": 12150
          },
          {
            "ym": "202306",
            "medianManwon": 13000
          },
          {
            "ym": "202309",
            "medianManwon": 13200
          },
          {
            "ym": "202312",
            "medianManwon": 12000
          },
          {
            "ym": "202403",
            "medianManwon": 12500
          },
          {
            "ym": "202406",
            "medianManwon": 12425
          },
          {
            "ym": "202409",
            "medianManwon": 11000
          },
          {
            "ym": "202412",
            "medianManwon": 11000
          },
          {
            "ym": "202503",
            "medianManwon": 10000
          },
          {
            "ym": "202506",
            "medianManwon": 11500
          },
          {
            "ym": "202509",
            "medianManwon": 10900
          },
          {
            "ym": "202512",
            "medianManwon": 11000
          },
          {
            "ym": "202603",
            "medianManwon": 11075
          },
          {
            "ym": "202606",
            "medianManwon": 10950
          }
        ]
      },
      {
        "name": "주공3",
        "dong": "연수동",
        "sggName": "연수구",
        "pyeong": 14,
        "areaM2": 44.66,
        "latestManwon": 17400,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 28000
          },
          {
            "ym": "202209",
            "medianManwon": 21800
          },
          {
            "ym": "202212",
            "medianManwon": 17400
          },
          {
            "ym": "202303",
            "medianManwon": 19500
          },
          {
            "ym": "202306",
            "medianManwon": 18025
          },
          {
            "ym": "202309",
            "medianManwon": 18400
          },
          {
            "ym": "202403",
            "medianManwon": 17000
          },
          {
            "ym": "202406",
            "medianManwon": 17300
          },
          {
            "ym": "202409",
            "medianManwon": 16800
          },
          {
            "ym": "202412",
            "medianManwon": 16900
          },
          {
            "ym": "202503",
            "medianManwon": 17000
          },
          {
            "ym": "202506",
            "medianManwon": 17000
          },
          {
            "ym": "202509",
            "medianManwon": 17000
          },
          {
            "ym": "202512",
            "medianManwon": 17950
          },
          {
            "ym": "202603",
            "medianManwon": 17100
          },
          {
            "ym": "202606",
            "medianManwon": 17400
          }
        ]
      },
      {
        "name": "연수주공2차",
        "dong": "연수동",
        "sggName": "연수구",
        "pyeong": 15,
        "areaM2": 49.94,
        "latestManwon": 18950,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 29000
          },
          {
            "ym": "202206",
            "medianManwon": 25500
          },
          {
            "ym": "202209",
            "medianManwon": 23000
          },
          {
            "ym": "202212",
            "medianManwon": 20425
          },
          {
            "ym": "202303",
            "medianManwon": 19000
          },
          {
            "ym": "202306",
            "medianManwon": 19000
          },
          {
            "ym": "202309",
            "medianManwon": 19200
          },
          {
            "ym": "202312",
            "medianManwon": 18150
          },
          {
            "ym": "202403",
            "medianManwon": 18700
          },
          {
            "ym": "202406",
            "medianManwon": 19800
          },
          {
            "ym": "202409",
            "medianManwon": 18900
          },
          {
            "ym": "202503",
            "medianManwon": 20250
          },
          {
            "ym": "202506",
            "medianManwon": 19000
          },
          {
            "ym": "202509",
            "medianManwon": 18650
          },
          {
            "ym": "202512",
            "medianManwon": 17800
          },
          {
            "ym": "202603",
            "medianManwon": 19000
          },
          {
            "ym": "202606",
            "medianManwon": 18950
          }
        ]
      },
      {
        "name": "솔밭마을아파트",
        "dong": "연수동",
        "sggName": "연수구",
        "pyeong": 15,
        "areaM2": 49.56,
        "latestManwon": 21500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 31000
          },
          {
            "ym": "202209",
            "medianManwon": 22750
          },
          {
            "ym": "202303",
            "medianManwon": 20500
          },
          {
            "ym": "202306",
            "medianManwon": 22000
          },
          {
            "ym": "202309",
            "medianManwon": 21900
          },
          {
            "ym": "202312",
            "medianManwon": 20000
          },
          {
            "ym": "202403",
            "medianManwon": 21000
          },
          {
            "ym": "202406",
            "medianManwon": 20600
          },
          {
            "ym": "202409",
            "medianManwon": 20450
          },
          {
            "ym": "202412",
            "medianManwon": 20700
          },
          {
            "ym": "202503",
            "medianManwon": 21700
          },
          {
            "ym": "202506",
            "medianManwon": 21700
          },
          {
            "ym": "202509",
            "medianManwon": 22300
          },
          {
            "ym": "202512",
            "medianManwon": 20000
          },
          {
            "ym": "202603",
            "medianManwon": 20750
          },
          {
            "ym": "202606",
            "medianManwon": 21500
          }
        ]
      },
      {
        "name": "세경",
        "dong": "연수동",
        "sggName": "연수구",
        "pyeong": 16,
        "areaM2": 51.75,
        "latestManwon": 22000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 32500
          },
          {
            "ym": "202212",
            "medianManwon": 22000
          },
          {
            "ym": "202303",
            "medianManwon": 19950
          },
          {
            "ym": "202306",
            "medianManwon": 23000
          },
          {
            "ym": "202309",
            "medianManwon": 21800
          },
          {
            "ym": "202312",
            "medianManwon": 21500
          },
          {
            "ym": "202403",
            "medianManwon": 22000
          },
          {
            "ym": "202406",
            "medianManwon": 23000
          },
          {
            "ym": "202409",
            "medianManwon": 21950
          },
          {
            "ym": "202503",
            "medianManwon": 20450
          },
          {
            "ym": "202506",
            "medianManwon": 22400
          },
          {
            "ym": "202509",
            "medianManwon": 21050
          },
          {
            "ym": "202512",
            "medianManwon": 20700
          },
          {
            "ym": "202603",
            "medianManwon": 22000
          },
          {
            "ym": "202606",
            "medianManwon": 22000
          }
        ]
      },
      {
        "name": "동남",
        "dong": "동춘동",
        "sggName": "연수구",
        "pyeong": 16,
        "areaM2": 52.14,
        "latestManwon": 22900,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 29900
          },
          {
            "ym": "202206",
            "medianManwon": 28900
          },
          {
            "ym": "202209",
            "medianManwon": 25850
          },
          {
            "ym": "202212",
            "medianManwon": 21250
          },
          {
            "ym": "202303",
            "medianManwon": 22000
          },
          {
            "ym": "202306",
            "medianManwon": 21000
          },
          {
            "ym": "202309",
            "medianManwon": 21450
          },
          {
            "ym": "202312",
            "medianManwon": 22350
          },
          {
            "ym": "202403",
            "medianManwon": 22200
          },
          {
            "ym": "202406",
            "medianManwon": 22475
          },
          {
            "ym": "202409",
            "medianManwon": 22450
          },
          {
            "ym": "202503",
            "medianManwon": 21900
          },
          {
            "ym": "202506",
            "medianManwon": 23000
          },
          {
            "ym": "202509",
            "medianManwon": 21600
          },
          {
            "ym": "202512",
            "medianManwon": 21950
          },
          {
            "ym": "202603",
            "medianManwon": 23500
          },
          {
            "ym": "202606",
            "medianManwon": 22900
          }
        ]
      },
      {
        "name": "아주",
        "dong": "동춘동",
        "sggName": "연수구",
        "pyeong": 26,
        "areaM2": 84.78,
        "latestManwon": 27800,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 38500
          },
          {
            "ym": "202206",
            "medianManwon": 40000
          },
          {
            "ym": "202209",
            "medianManwon": 32000
          },
          {
            "ym": "202212",
            "medianManwon": 25500
          },
          {
            "ym": "202303",
            "medianManwon": 25750
          },
          {
            "ym": "202306",
            "medianManwon": 29500
          },
          {
            "ym": "202309",
            "medianManwon": 26000
          },
          {
            "ym": "202403",
            "medianManwon": 29500
          },
          {
            "ym": "202406",
            "medianManwon": 28000
          },
          {
            "ym": "202412",
            "medianManwon": 26500
          },
          {
            "ym": "202503",
            "medianManwon": 27900
          },
          {
            "ym": "202506",
            "medianManwon": 26000
          },
          {
            "ym": "202509",
            "medianManwon": 29000
          },
          {
            "ym": "202512",
            "medianManwon": 26000
          },
          {
            "ym": "202606",
            "medianManwon": 27800
          }
        ]
      },
      {
        "name": "현대2차아파트",
        "dong": "옥련동",
        "sggName": "연수구",
        "pyeong": 18,
        "areaM2": 59.985,
        "latestManwon": 28000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 37800
          },
          {
            "ym": "202212",
            "medianManwon": 28000
          },
          {
            "ym": "202303",
            "medianManwon": 26400
          },
          {
            "ym": "202306",
            "medianManwon": 26750
          },
          {
            "ym": "202309",
            "medianManwon": 28000
          },
          {
            "ym": "202312",
            "medianManwon": 27000
          },
          {
            "ym": "202403",
            "medianManwon": 27050
          },
          {
            "ym": "202406",
            "medianManwon": 24950
          },
          {
            "ym": "202409",
            "medianManwon": 25750
          },
          {
            "ym": "202503",
            "medianManwon": 25150
          },
          {
            "ym": "202506",
            "medianManwon": 26750
          },
          {
            "ym": "202509",
            "medianManwon": 27000
          },
          {
            "ym": "202512",
            "medianManwon": 27400
          },
          {
            "ym": "202603",
            "medianManwon": 27500
          },
          {
            "ym": "202606",
            "medianManwon": 28000
          }
        ]
      },
      {
        "name": "무지개마을",
        "dong": "동춘동",
        "sggName": "연수구",
        "pyeong": 18,
        "areaM2": 59.76,
        "latestManwon": 31800,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 40000
          },
          {
            "ym": "202206",
            "medianManwon": 40000
          },
          {
            "ym": "202303",
            "medianManwon": 29150
          },
          {
            "ym": "202306",
            "medianManwon": 30000
          },
          {
            "ym": "202309",
            "medianManwon": 30150
          },
          {
            "ym": "202312",
            "medianManwon": 28700
          },
          {
            "ym": "202403",
            "medianManwon": 28800
          },
          {
            "ym": "202406",
            "medianManwon": 30000
          },
          {
            "ym": "202409",
            "medianManwon": 33000
          },
          {
            "ym": "202412",
            "medianManwon": 33000
          },
          {
            "ym": "202503",
            "medianManwon": 33500
          },
          {
            "ym": "202506",
            "medianManwon": 31000
          },
          {
            "ym": "202509",
            "medianManwon": 32500
          },
          {
            "ym": "202512",
            "medianManwon": 31350
          },
          {
            "ym": "202603",
            "medianManwon": 32500
          },
          {
            "ym": "202606",
            "medianManwon": 31800
          }
        ]
      },
      {
        "name": "현대4",
        "dong": "옥련동",
        "sggName": "연수구",
        "pyeong": 26,
        "areaM2": 84.6,
        "latestManwon": 33350,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 43500
          },
          {
            "ym": "202209",
            "medianManwon": 40500
          },
          {
            "ym": "202303",
            "medianManwon": 35250
          },
          {
            "ym": "202306",
            "medianManwon": 36350
          },
          {
            "ym": "202309",
            "medianManwon": 32250
          },
          {
            "ym": "202312",
            "medianManwon": 31000
          },
          {
            "ym": "202403",
            "medianManwon": 38100
          },
          {
            "ym": "202409",
            "medianManwon": 31500
          },
          {
            "ym": "202412",
            "medianManwon": 39000
          },
          {
            "ym": "202503",
            "medianManwon": 36000
          },
          {
            "ym": "202506",
            "medianManwon": 37000
          },
          {
            "ym": "202509",
            "medianManwon": 34020
          },
          {
            "ym": "202512",
            "medianManwon": 35000
          },
          {
            "ym": "202603",
            "medianManwon": 35800
          },
          {
            "ym": "202606",
            "medianManwon": 33350
          }
        ]
      },
      {
        "name": "우성2",
        "dong": "연수동",
        "sggName": "연수구",
        "pyeong": 18,
        "areaM2": 59.59,
        "latestManwon": 35000,
        "series": [
          {
            "ym": "202212",
            "medianManwon": 34200
          },
          {
            "ym": "202303",
            "medianManwon": 30500
          },
          {
            "ym": "202306",
            "medianManwon": 34000
          },
          {
            "ym": "202309",
            "medianManwon": 35250
          },
          {
            "ym": "202312",
            "medianManwon": 31900
          },
          {
            "ym": "202403",
            "medianManwon": 33700
          },
          {
            "ym": "202406",
            "medianManwon": 33000
          },
          {
            "ym": "202409",
            "medianManwon": 31500
          },
          {
            "ym": "202412",
            "medianManwon": 32000
          },
          {
            "ym": "202503",
            "medianManwon": 35000
          },
          {
            "ym": "202506",
            "medianManwon": 36000
          },
          {
            "ym": "202509",
            "medianManwon": 34750
          },
          {
            "ym": "202512",
            "medianManwon": 36900
          },
          {
            "ym": "202603",
            "medianManwon": 35500
          },
          {
            "ym": "202606",
            "medianManwon": 35000
          }
        ]
      },
      {
        "name": "한양2",
        "dong": "동춘동",
        "sggName": "연수구",
        "pyeong": 26,
        "areaM2": 84.97,
        "latestManwon": 44600,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 62500
          },
          {
            "ym": "202212",
            "medianManwon": 45000
          },
          {
            "ym": "202303",
            "medianManwon": 39500
          },
          {
            "ym": "202306",
            "medianManwon": 38500
          },
          {
            "ym": "202309",
            "medianManwon": 39450
          },
          {
            "ym": "202312",
            "medianManwon": 41000
          },
          {
            "ym": "202403",
            "medianManwon": 39650
          },
          {
            "ym": "202406",
            "medianManwon": 41000
          },
          {
            "ym": "202409",
            "medianManwon": 43500
          },
          {
            "ym": "202412",
            "medianManwon": 40000
          },
          {
            "ym": "202503",
            "medianManwon": 37900
          },
          {
            "ym": "202506",
            "medianManwon": 39000
          },
          {
            "ym": "202509",
            "medianManwon": 40000
          },
          {
            "ym": "202512",
            "medianManwon": 40500
          },
          {
            "ym": "202603",
            "medianManwon": 40750
          },
          {
            "ym": "202606",
            "medianManwon": 44600
          }
        ]
      },
      {
        "name": "현대1",
        "dong": "동춘동",
        "sggName": "연수구",
        "pyeong": 26,
        "areaM2": 84.97,
        "latestManwon": 47000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 60000
          },
          {
            "ym": "202212",
            "medianManwon": 43250
          },
          {
            "ym": "202303",
            "medianManwon": 42500
          },
          {
            "ym": "202306",
            "medianManwon": 42300
          },
          {
            "ym": "202309",
            "medianManwon": 48000
          },
          {
            "ym": "202312",
            "medianManwon": 46050
          },
          {
            "ym": "202403",
            "medianManwon": 44500
          },
          {
            "ym": "202406",
            "medianManwon": 47000
          },
          {
            "ym": "202409",
            "medianManwon": 47900
          },
          {
            "ym": "202412",
            "medianManwon": 48500
          },
          {
            "ym": "202506",
            "medianManwon": 46500
          },
          {
            "ym": "202509",
            "medianManwon": 49250
          },
          {
            "ym": "202512",
            "medianManwon": 42000
          },
          {
            "ym": "202603",
            "medianManwon": 37500
          },
          {
            "ym": "202606",
            "medianManwon": 47000
          }
        ]
      },
      {
        "name": "송도파크레인동일하이빌",
        "dong": "동춘동",
        "sggName": "연수구",
        "pyeong": 26,
        "areaM2": 84.9948,
        "latestManwon": 50000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 62500
          },
          {
            "ym": "202206",
            "medianManwon": 59000
          },
          {
            "ym": "202209",
            "medianManwon": 55000
          },
          {
            "ym": "202212",
            "medianManwon": 49500
          },
          {
            "ym": "202303",
            "medianManwon": 48150
          },
          {
            "ym": "202306",
            "medianManwon": 50400
          },
          {
            "ym": "202309",
            "medianManwon": 51700
          },
          {
            "ym": "202403",
            "medianManwon": 49000
          },
          {
            "ym": "202406",
            "medianManwon": 50350
          },
          {
            "ym": "202412",
            "medianManwon": 35500
          },
          {
            "ym": "202503",
            "medianManwon": 50000
          },
          {
            "ym": "202506",
            "medianManwon": 50000
          },
          {
            "ym": "202509",
            "medianManwon": 45000
          },
          {
            "ym": "202512",
            "medianManwon": 49500
          },
          {
            "ym": "202603",
            "medianManwon": 50500
          },
          {
            "ym": "202606",
            "medianManwon": 50000
          }
        ]
      },
      {
        "name": "e편한세상송도",
        "dong": "송도동",
        "sggName": "연수구",
        "pyeong": 21,
        "areaM2": 70.5618,
        "latestManwon": 55800,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 70000
          },
          {
            "ym": "202206",
            "medianManwon": 61000
          },
          {
            "ym": "202209",
            "medianManwon": 57500
          },
          {
            "ym": "202212",
            "medianManwon": 47500
          },
          {
            "ym": "202303",
            "medianManwon": 53700
          },
          {
            "ym": "202306",
            "medianManwon": 56000
          },
          {
            "ym": "202309",
            "medianManwon": 59250
          },
          {
            "ym": "202312",
            "medianManwon": 55500
          },
          {
            "ym": "202403",
            "medianManwon": 56150
          },
          {
            "ym": "202406",
            "medianManwon": 54800
          },
          {
            "ym": "202409",
            "medianManwon": 57500
          },
          {
            "ym": "202412",
            "medianManwon": 54800
          },
          {
            "ym": "202503",
            "medianManwon": 52750
          },
          {
            "ym": "202506",
            "medianManwon": 53900
          },
          {
            "ym": "202509",
            "medianManwon": 54900
          },
          {
            "ym": "202512",
            "medianManwon": 55700
          },
          {
            "ym": "202603",
            "medianManwon": 55500
          },
          {
            "ym": "202606",
            "medianManwon": 55800
          }
        ]
      },
      {
        "name": "송도풍림아이원1단지",
        "dong": "송도동",
        "sggName": "연수구",
        "pyeong": 26,
        "areaM2": 84.7167,
        "latestManwon": 56900,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 74900
          },
          {
            "ym": "202206",
            "medianManwon": 68400
          },
          {
            "ym": "202212",
            "medianManwon": 50000
          },
          {
            "ym": "202303",
            "medianManwon": 50800
          },
          {
            "ym": "202306",
            "medianManwon": 56000
          },
          {
            "ym": "202309",
            "medianManwon": 55900
          },
          {
            "ym": "202312",
            "medianManwon": 59000
          },
          {
            "ym": "202403",
            "medianManwon": 54950
          },
          {
            "ym": "202406",
            "medianManwon": 56850
          },
          {
            "ym": "202409",
            "medianManwon": 58800
          },
          {
            "ym": "202412",
            "medianManwon": 55300
          },
          {
            "ym": "202503",
            "medianManwon": 55500
          },
          {
            "ym": "202506",
            "medianManwon": 57450
          },
          {
            "ym": "202509",
            "medianManwon": 58000
          },
          {
            "ym": "202512",
            "medianManwon": 49250
          },
          {
            "ym": "202603",
            "medianManwon": 57900
          },
          {
            "ym": "202606",
            "medianManwon": 56900
          }
        ]
      },
      {
        "name": "송도풍림아이원2단지",
        "dong": "송도동",
        "sggName": "연수구",
        "pyeong": 26,
        "areaM2": 84.94,
        "latestManwon": 58000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 76000
          },
          {
            "ym": "202209",
            "medianManwon": 60000
          },
          {
            "ym": "202212",
            "medianManwon": 52000
          },
          {
            "ym": "202303",
            "medianManwon": 48900
          },
          {
            "ym": "202306",
            "medianManwon": 56000
          },
          {
            "ym": "202309",
            "medianManwon": 57850
          },
          {
            "ym": "202312",
            "medianManwon": 60350
          },
          {
            "ym": "202403",
            "medianManwon": 59500
          },
          {
            "ym": "202406",
            "medianManwon": 56000
          },
          {
            "ym": "202409",
            "medianManwon": 56975
          },
          {
            "ym": "202503",
            "medianManwon": 57000
          },
          {
            "ym": "202506",
            "medianManwon": 58500
          },
          {
            "ym": "202509",
            "medianManwon": 56800
          },
          {
            "ym": "202512",
            "medianManwon": 53250
          },
          {
            "ym": "202603",
            "medianManwon": 59500
          },
          {
            "ym": "202606",
            "medianManwon": 58000
          }
        ]
      },
      {
        "name": "송도오션파크베르디움",
        "dong": "송도동",
        "sggName": "연수구",
        "pyeong": 23,
        "areaM2": 75.9833,
        "latestManwon": 61125,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 90000
          },
          {
            "ym": "202206",
            "medianManwon": 89500
          },
          {
            "ym": "202209",
            "medianManwon": 60000
          },
          {
            "ym": "202212",
            "medianManwon": 50000
          },
          {
            "ym": "202303",
            "medianManwon": 58000
          },
          {
            "ym": "202306",
            "medianManwon": 62150
          },
          {
            "ym": "202312",
            "medianManwon": 63000
          },
          {
            "ym": "202403",
            "medianManwon": 60000
          },
          {
            "ym": "202406",
            "medianManwon": 57500
          },
          {
            "ym": "202409",
            "medianManwon": 59800
          },
          {
            "ym": "202412",
            "medianManwon": 58150
          },
          {
            "ym": "202503",
            "medianManwon": 58700
          },
          {
            "ym": "202506",
            "medianManwon": 59500
          },
          {
            "ym": "202512",
            "medianManwon": 59000
          },
          {
            "ym": "202603",
            "medianManwon": 57900
          },
          {
            "ym": "202606",
            "medianManwon": 61125
          }
        ]
      },
      {
        "name": "송도캐슬&해모로",
        "dong": "송도동",
        "sggName": "연수구",
        "pyeong": 26,
        "areaM2": 84.637,
        "latestManwon": 61650,
        "series": [
          {
            "ym": "202212",
            "medianManwon": 48000
          },
          {
            "ym": "202303",
            "medianManwon": 56000
          },
          {
            "ym": "202306",
            "medianManwon": 60000
          },
          {
            "ym": "202309",
            "medianManwon": 56900
          },
          {
            "ym": "202312",
            "medianManwon": 59250
          },
          {
            "ym": "202403",
            "medianManwon": 62000
          },
          {
            "ym": "202406",
            "medianManwon": 60100
          },
          {
            "ym": "202409",
            "medianManwon": 63500
          },
          {
            "ym": "202412",
            "medianManwon": 63000
          },
          {
            "ym": "202503",
            "medianManwon": 59000
          },
          {
            "ym": "202506",
            "medianManwon": 59700
          },
          {
            "ym": "202509",
            "medianManwon": 59000
          },
          {
            "ym": "202512",
            "medianManwon": 56300
          },
          {
            "ym": "202603",
            "medianManwon": 62000
          },
          {
            "ym": "202606",
            "medianManwon": 61650
          }
        ]
      },
      {
        "name": "베르디움더퍼스트",
        "dong": "송도동",
        "sggName": "연수구",
        "pyeong": 19,
        "areaM2": 63.9487,
        "latestManwon": 63000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 60000
          },
          {
            "ym": "202212",
            "medianManwon": 50500
          },
          {
            "ym": "202303",
            "medianManwon": 52700
          },
          {
            "ym": "202306",
            "medianManwon": 58900
          },
          {
            "ym": "202309",
            "medianManwon": 60000
          },
          {
            "ym": "202312",
            "medianManwon": 60500
          },
          {
            "ym": "202403",
            "medianManwon": 59500
          },
          {
            "ym": "202406",
            "medianManwon": 58250
          },
          {
            "ym": "202409",
            "medianManwon": 60000
          },
          {
            "ym": "202412",
            "medianManwon": 60750
          },
          {
            "ym": "202503",
            "medianManwon": 60000
          },
          {
            "ym": "202506",
            "medianManwon": 59950
          },
          {
            "ym": "202509",
            "medianManwon": 58700
          },
          {
            "ym": "202512",
            "medianManwon": 61100
          },
          {
            "ym": "202603",
            "medianManwon": 65650
          },
          {
            "ym": "202606",
            "medianManwon": 63000
          }
        ]
      },
      {
        "name": "랜드마크시티센트럴더샵",
        "dong": "송도동",
        "sggName": "연수구",
        "pyeong": 26,
        "areaM2": 84.8166,
        "latestManwon": 63350,
        "series": [
          {
            "ym": "202206",
            "medianManwon": 75000
          },
          {
            "ym": "202209",
            "medianManwon": 65000
          },
          {
            "ym": "202303",
            "medianManwon": 66000
          },
          {
            "ym": "202306",
            "medianManwon": 68000
          },
          {
            "ym": "202309",
            "medianManwon": 70000
          },
          {
            "ym": "202312",
            "medianManwon": 66900
          },
          {
            "ym": "202403",
            "medianManwon": 67800
          },
          {
            "ym": "202406",
            "medianManwon": 65900
          },
          {
            "ym": "202409",
            "medianManwon": 67000
          },
          {
            "ym": "202412",
            "medianManwon": 63500
          },
          {
            "ym": "202503",
            "medianManwon": 64500
          },
          {
            "ym": "202506",
            "medianManwon": 64500
          },
          {
            "ym": "202509",
            "medianManwon": 63000
          },
          {
            "ym": "202512",
            "medianManwon": 62500
          },
          {
            "ym": "202603",
            "medianManwon": 64700
          },
          {
            "ym": "202606",
            "medianManwon": 63350
          }
        ]
      },
      {
        "name": "더샵송도마리나베이",
        "dong": "송도동",
        "sggName": "연수구",
        "pyeong": 26,
        "areaM2": 84.9766,
        "latestManwon": 66250,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 78500
          },
          {
            "ym": "202209",
            "medianManwon": 84500
          },
          {
            "ym": "202212",
            "medianManwon": 70500
          },
          {
            "ym": "202303",
            "medianManwon": 71450
          },
          {
            "ym": "202306",
            "medianManwon": 70250
          },
          {
            "ym": "202309",
            "medianManwon": 67400
          },
          {
            "ym": "202312",
            "medianManwon": 80000
          },
          {
            "ym": "202403",
            "medianManwon": 69500
          },
          {
            "ym": "202406",
            "medianManwon": 67750
          },
          {
            "ym": "202409",
            "medianManwon": 80000
          },
          {
            "ym": "202412",
            "medianManwon": 60000
          },
          {
            "ym": "202503",
            "medianManwon": 66250
          },
          {
            "ym": "202506",
            "medianManwon": 73000
          },
          {
            "ym": "202509",
            "medianManwon": 64000
          },
          {
            "ym": "202512",
            "medianManwon": 66750
          },
          {
            "ym": "202603",
            "medianManwon": 69000
          },
          {
            "ym": "202606",
            "medianManwon": 66250
          }
        ]
      },
      {
        "name": "송도에듀포레푸르지오",
        "dong": "송도동",
        "sggName": "연수구",
        "pyeong": 22,
        "areaM2": 72.217,
        "latestManwon": 66900,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 76000
          },
          {
            "ym": "202206",
            "medianManwon": 70000
          },
          {
            "ym": "202209",
            "medianManwon": 58000
          },
          {
            "ym": "202212",
            "medianManwon": 55000
          },
          {
            "ym": "202303",
            "medianManwon": 62400
          },
          {
            "ym": "202309",
            "medianManwon": 71700
          },
          {
            "ym": "202312",
            "medianManwon": 68000
          },
          {
            "ym": "202409",
            "medianManwon": 67200
          },
          {
            "ym": "202412",
            "medianManwon": 64000
          },
          {
            "ym": "202503",
            "medianManwon": 67150
          },
          {
            "ym": "202506",
            "medianManwon": 68000
          },
          {
            "ym": "202509",
            "medianManwon": 70700
          },
          {
            "ym": "202512",
            "medianManwon": 69100
          },
          {
            "ym": "202603",
            "medianManwon": 67000
          },
          {
            "ym": "202606",
            "medianManwon": 66900
          }
        ]
      },
      {
        "name": "송도SKVIEW",
        "dong": "송도동",
        "sggName": "연수구",
        "pyeong": 26,
        "areaM2": 84.6541,
        "latestManwon": 71500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 87750
          },
          {
            "ym": "202206",
            "medianManwon": 83500
          },
          {
            "ym": "202209",
            "medianManwon": 73400
          },
          {
            "ym": "202212",
            "medianManwon": 65000
          },
          {
            "ym": "202303",
            "medianManwon": 69000
          },
          {
            "ym": "202306",
            "medianManwon": 71500
          },
          {
            "ym": "202309",
            "medianManwon": 72000
          },
          {
            "ym": "202312",
            "medianManwon": 69750
          },
          {
            "ym": "202403",
            "medianManwon": 72500
          },
          {
            "ym": "202406",
            "medianManwon": 73800
          },
          {
            "ym": "202409",
            "medianManwon": 73750
          },
          {
            "ym": "202412",
            "medianManwon": 72800
          },
          {
            "ym": "202503",
            "medianManwon": 70000
          },
          {
            "ym": "202506",
            "medianManwon": 71800
          },
          {
            "ym": "202509",
            "medianManwon": 72000
          },
          {
            "ym": "202512",
            "medianManwon": 71000
          },
          {
            "ym": "202603",
            "medianManwon": 71500
          },
          {
            "ym": "202606",
            "medianManwon": 71500
          }
        ]
      },
      {
        "name": "송도글로벌파크베르디움",
        "dong": "송도동",
        "sggName": "연수구",
        "pyeong": 19,
        "areaM2": 63.9721,
        "latestManwon": 74000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 86000
          },
          {
            "ym": "202206",
            "medianManwon": 78000
          },
          {
            "ym": "202209",
            "medianManwon": 60000
          },
          {
            "ym": "202212",
            "medianManwon": 59500
          },
          {
            "ym": "202303",
            "medianManwon": 60800
          },
          {
            "ym": "202306",
            "medianManwon": 65000
          },
          {
            "ym": "202403",
            "medianManwon": 67500
          },
          {
            "ym": "202406",
            "medianManwon": 70000
          },
          {
            "ym": "202409",
            "medianManwon": 70000
          },
          {
            "ym": "202412",
            "medianManwon": 72000
          },
          {
            "ym": "202503",
            "medianManwon": 71900
          },
          {
            "ym": "202506",
            "medianManwon": 70500
          },
          {
            "ym": "202509",
            "medianManwon": 72500
          },
          {
            "ym": "202512",
            "medianManwon": 71200
          },
          {
            "ym": "202603",
            "medianManwon": 67000
          },
          {
            "ym": "202606",
            "medianManwon": 74000
          }
        ]
      },
      {
        "name": "더샵그린워크1차",
        "dong": "송도동",
        "sggName": "연수구",
        "pyeong": 26,
        "areaM2": 84.8682,
        "latestManwon": 83500,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 97300
          },
          {
            "ym": "202209",
            "medianManwon": 68500
          },
          {
            "ym": "202212",
            "medianManwon": 66000
          },
          {
            "ym": "202303",
            "medianManwon": 71000
          },
          {
            "ym": "202306",
            "medianManwon": 72000
          },
          {
            "ym": "202309",
            "medianManwon": 80500
          },
          {
            "ym": "202312",
            "medianManwon": 77000
          },
          {
            "ym": "202403",
            "medianManwon": 78000
          },
          {
            "ym": "202406",
            "medianManwon": 74950
          },
          {
            "ym": "202409",
            "medianManwon": 79850
          },
          {
            "ym": "202503",
            "medianManwon": 77000
          },
          {
            "ym": "202506",
            "medianManwon": 77500
          },
          {
            "ym": "202509",
            "medianManwon": 79900
          },
          {
            "ym": "202512",
            "medianManwon": 83000
          },
          {
            "ym": "202603",
            "medianManwon": 79600
          },
          {
            "ym": "202606",
            "medianManwon": 83500
          }
        ]
      },
      {
        "name": "송도더샵센트럴시티",
        "dong": "송도동",
        "sggName": "연수구",
        "pyeong": 26,
        "areaM2": 84.97,
        "latestManwon": 91000,
        "series": [
          {
            "ym": "202203",
            "medianManwon": 96250
          },
          {
            "ym": "202209",
            "medianManwon": 70000
          },
          {
            "ym": "202212",
            "medianManwon": 70500
          },
          {
            "ym": "202303",
            "medianManwon": 76000
          },
          {
            "ym": "202306",
            "medianManwon": 78500
          },
          {
            "ym": "202309",
            "medianManwon": 82250
          },
          {
            "ym": "202312",
            "medianManwon": 81000
          },
          {
            "ym": "202403",
            "medianManwon": 84200
          },
          {
            "ym": "202406",
            "medianManwon": 81000
          },
          {
            "ym": "202409",
            "medianManwon": 80500
          },
          {
            "ym": "202412",
            "medianManwon": 83500
          },
          {
            "ym": "202503",
            "medianManwon": 80000
          },
          {
            "ym": "202506",
            "medianManwon": 81800
          },
          {
            "ym": "202509",
            "medianManwon": 82400
          },
          {
            "ym": "202512",
            "medianManwon": 85000
          },
          {
            "ym": "202603",
            "medianManwon": 85800
          },
          {
            "ym": "202606",
            "medianManwon": 91000
          }
        ]
      },
      {
        "name": "송도더샵퍼스트파크F13-1BL",
        "dong": "송도동",
        "sggName": "연수구",
        "pyeong": 26,
        "areaM2": 84.9,
        "latestManwon": 104500,
        "series": [
          {
            "ym": "202212",
            "medianManwon": 77500
          },
          {
            "ym": "202303",
            "medianManwon": 83500
          },
          {
            "ym": "202306",
            "medianManwon": 94000
          },
          {
            "ym": "202309",
            "medianManwon": 101000
          },
          {
            "ym": "202403",
            "medianManwon": 97750
          },
          {
            "ym": "202406",
            "medianManwon": 100300
          },
          {
            "ym": "202409",
            "medianManwon": 105000
          },
          {
            "ym": "202412",
            "medianManwon": 101000
          },
          {
            "ym": "202503",
            "medianManwon": 97500
          },
          {
            "ym": "202506",
            "medianManwon": 99000
          },
          {
            "ym": "202509",
            "medianManwon": 96500
          },
          {
            "ym": "202512",
            "medianManwon": 105000
          },
          {
            "ym": "202603",
            "medianManwon": 97250
          },
          {
            "ym": "202606",
            "medianManwon": 104500
          }
        ]
      }
    ]
  }
};
