# 진행 사항 및 주석리스트

---
## 2/24
#### 1.  elasticSearch + grafana 로 서버의 로그 확인하기
- 도커를 통하여 port 9200 에 elasticSearch 띄우고 nodejs랑 @elastic/elasticsearch 라이브러리로 연결
- 도커로 grafana 실행시키고 databaseSource에 elasticSearch 추가
- grafana 에서 판넬을 추가하고 lucence Query문으로 데이터 가져와서 시각화 가능

> - lucene Query
> - Logstash
> - morgan, winston, elasticSearch
#### 2. docker 설정관련
docker-compose 설정에있어서 mysql이 연결되고 node.js app이 켜져야 서버가 원활하게 켜지기때문에 도커 실행순서를 보장해주는 과정을 설정하느라 고생하였음.

- docker-compose.yml 에서의 depends_on 옵션
  - 도커를 실행만 시키고 다음으로 넘어가기 때문에 db가 켜지는걸 기다려주진 않음
  - 오픈소스인 wait-for-it.sh 라는 스크립트 를 이용해서 mysql이 켜지는걸 기다린다음 서버를 키는 방식으로 해결 하였음
    > ```bash
    > sh -c "wait-for-it.sh server-mysql:3306 && npm start"
    > ```
    > 위의 커맨드를 compose.yml 파일에 command 옵션으로 주었음
    > [docker-compose.yml](./server/docker-compose.yml)
    > [wait-for-it.sh](./server/app/wait-for-it.sh)
    > [app/Dockerfile](./server/app/Dockerfile)

### 3. 테스트 코드를 작성하기 위한 모듈화 작업
테스트를 원활하게 진행할려면 모듈화를 잘해야 합니다.

그럴러면 모듈간의 의존성을 없애야 했고, 필요한 의존값들은 함수의 인자값으로 넘겨주는 형식으로 하여서 사이드 이펙트가 없는 순수한 함수로써 모듈을 작성하였습니다.
  - db config 설정 및 migration 하는 부분들을 모듈로 분리 하였음
    > [app/libs/db.config.ts](./server/app/libs/db.config.ts)
  - expressApp를 설정하는 부분을 분리
  - httpServer를 여는 부분도 모듈로 분리
    > [app/index.ts](./server/app/index.ts)
    > [app/libs/utils.ts](./server/app/libs/utils.ts)
  - 과정에서 type들을 지정해주는 부분에서 제네릭을 활용하는 방법에 있어서 어려움을 겪음

### 4. 토큰
Authorization: <**type**> <토큰>

- Basic
  - 사용자 아이디와 암호를 Base64로 인코딩한 값을 토큰으로 사용
- Bearer
  - JWT 혹은 OAuth에 대한 토큰 사용
- Digest
  - 난수 데이터 문자열
- HOBA
  - 전자 서명 기반 인증
- Mutual
  - 암호를 이용한 클라리언트-서버 상호 인증
- AWS4-HMAC-SHA256
  - AWS 전자 서명 기반 인증

---
## todo
  - 해야할것
