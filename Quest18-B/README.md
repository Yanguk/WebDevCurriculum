# Quest 18-B. 서비스의 운영: 로깅과 모니터링

## Introduction
* 이번 퀘스트에서는 서비스의 운영을 위해 로그를 스트리밍하는 법에 대해 다루겠습니다.

## Topics
* ElasticSearch
* AWS ElasticSearch Service
* Grafana

## Resources
* [ElasticSearch](https://www.elastic.co/kr/what-is/elasticsearch)
* [ElasticSearch 101](https://www.elastic.co/kr/webinars/getting-started-elasticsearch)
* [Grafana Panels](https://grafana.com/docs/grafana/latest/panels/)

## Checklist
* ElasticSearch는 어떤 DB인가요? 기존의 RDB와 어떻게 다르고 어떤 장단점을 가지고 있나요?
  > * Apache Lucene(아파치 루씬)기반의 java 오픈소스 분산 검색 엔진 입니다.
  > * NoSQL 데이터베이스의 한 유형으로써 JSON 기반의 문서형 데이터 저장소 입니다.
  >
  > #### 기존의 RDB와의 차이점
  > - 다양한 데이터 유형
  >   - 구조환 데이터뿐만 아니라 비정형 데이터도 처리할 수 있습니다.
  >   - 비정형 데이터로는 로그 같은 데이터가 있는데 logstash, kibana, grafana 등을 같이 사용하여서 로그 데이터를 시각화/통계 분석을 할수 있습니다.
  > - 검색 중심
  >   - 데이터를 검색 및 분석하는데 최적화가 되있어서 빠른 검색 성능을 제공함
  > - 스키마가 없음
  >   - 동적 스키마를 지원하므로 데이터를 검색 및 저장할때 미리 정의된 스키마가 필요 없습니다.
  > - 분산 형 아키텍처
  >   - 데이터를 여러 노드로 분산하여 저장함

  > #### 장점
  > - 빠른검색
  > - 다양한 데이터 유형
  > - 확장성
  > - 오픈소스 검색엔진
  > - 통계 분석
  > #### 단점
  > - 데이터의 일관성 및 무결성
  > - Transaction Rollback을 지원하지 않습니다.
  > - 데이터의 업데이트를 제공하지 않음
  >   - 기존 문서를 삭제하고 생성하는 형식
* AWS의 ElasticSearch Service는 어떤 서비스인가요? ElasticSearch를 직접 설치하거나 elastic.co에서 직접 제공하는 클라우드 서비스와 비교하여 어떤 장단점이 있을까요?
  > ### 차이점
  > - AWS ES는 elastic의 elasticsearch을 사용하는게 아니라 Open Distro for Elasticsearch를 사용합니다.
  > - elastic은 라이센스별로 기능이 있지만  Open Distro for Elasticsearch는 오픈소스라서 모든기능을 사용 할수 있습니다.
  > ### AWS
  > #### 장점
  > - AWS 인프라와 함께 사용하기 좋음
  > - 스냅샷이 자유롭기 때문에 장애시 복구하기에 편리합니다.
  > #### 단점
  > - 한국어 형태소 분석기인 Nori를 제공하지 않음
  > - 커스텀 패키지 설치 불가
  > ### Elastic Cloud
  > #### 장점
  > - 한글 형태소 분석기인 Nori가 제공됩니다.
  > - Elastic 공식 클라우드입니다.
  > - 커스텀 패키지를 설치할 수 있음 (좀더 유연함)
  > #### 단점
  > - 등급에 따라 제공하는 기능이 다르다.
  > - AWS ES와는 달리 사용자가 직접 설치하고 운영해야 합니다.
* Grafana의 Panel 형식에는 어떤 것이 있을까요? 로그를 보기에 적합한 판넬은 어떤 형태일까요?
  > ### 패널의 시각화 종류
  > - 그래프 및 차트
  >   - Time series(시계열)
  >   - 상태 타임라인
  >   - 상태 기록
  >   - 가로 막대형 차트
  >   - 히스토그램
  >   - 열 지도
  >   - 원형 차트
  >   - 원통형
  > - 통계 및 숫자
  >   - 통계
  >   - 계기
  >   - 막대 계기
  > - 기타
  >   - 테이블
  >   - 로그
  >   - 노드 그래프
  >   - Text
  >   - 뉴스
  >   - 경고 목록
  >   - 대시보드 목록
  > ### 로그 보기에 적합한 판넬
  > - Log Panel
  >   - 로그 데이터를 로그 레벨, 로그 메시지, 로그 시간 등을 컬럼으로 지정하여 로그 데이터를 파악할 수 있도록 지원합니서. 로그를 시간 순서대로 정렬해줍니다.
  > [grafana 문서](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/logs/)
## Quest
* 우리의 웹 서버가 stdout으로 적절한 로그를 남기도록 해 보세요.
* ElasticSearch Service 클러스터를 작은 사양으로 하나 만들고, 도커 컨테이너의 stdout으로 출력된 로그가 ElasticSearch로 스트리밍 되도록 해 보세요.
* Grafana를 이용해 ElasticSearch의 로그를 실시간으로 볼 수 있는 페이지를 만들어 보세요.

## Advanced
* ElasticSearch와 Grafana는 어떤 라이센스로 배포되고 있을까요? AWS와 같은 클라우드 제공자들이 이러한 오픈소스를 서비스화 하는 것을 둘러싼 논란은 어떤 논점일까요?
