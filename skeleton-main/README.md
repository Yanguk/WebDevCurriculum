# 진행 사항 및 주석리스트

---
## pst1 (presentation) 2/24

#### 1. docker 설정관련
docker-compose 설정에있어서 mysql이 연결되고 node.js app이 켜져야 서버가 원활하게 켜지기때문에 도커 실행순서를 보장해주는 과정을 설정하느라 고생하였음.

- docker-compose.yml 에서의 depends_on 옵션
  - 도커를 실행만 시키고 다음으로 넘어가기 때문에 db가 켜지는걸 기다려주진 않음
  - 오픈소스인 wait-for-it.sh 라는 스크립트 를 이용해서 mysql이 켜지는걸 기다린다음 서버를 키는 방식으로 해결 하였음
    > ```bash
    > sh -c "./wait-for-it.sh server-mysql:3306 -t 10 && npm start"
    > ```
    > 위의 커맨드를 compose.yml 파일에 command 옵션으로 주었음
    > [docker-compose.yml](./server/docker-compose.yml)
    > [wait-for-it.sh](./server/app/wait-for-it.sh)
    > [app/Dockerfile](./server/app/Dockerfile)

### 2. 테스트 코드를 작성하기 위한 모듈화 작업
테스트를 원활하게 진행할려면 모듈화를 잘해야 합니다.

그럴러면 모듈간의 의존성을 없애야 했고, 필요한 의존값들은 함수의 인자값으로 넘겨주는 형식으로 하여서 사이드 이펙트가 없는 순수한 함수로써 모듈을 작성하였습니다.
  - db config 설정 및 migration 하는 부분들을 모듈로 분리 하였음
    > [app/libs/db.config.ts](./server/app/libs/db.config.ts)
  - expressApp를 설정하는 부분을 분리
  - httpServer를 여는 부분도 모듈로 분리
    > [app/index.ts](./server/app/index.ts)
    > [app/libs/utils.ts](./server/app/libs/utils.ts)
    > 과정에서 타입을 설정하는데 있어서 어려움을 겪음
    > * 결국에 좋은 코드를 짤려면 타입추론도 하기 쉬운 코드를 짜야하는건지...
    > * 제네릭 타입을 활용한 다형성있는 타입에 대해서는 정의하기가 아직은 힘든 과정임

---
## todo
  - 해야할것
