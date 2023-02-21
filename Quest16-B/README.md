# Quest 16-B. 컨테이너

## Introduction
* 이번 퀘스트에서는 컨테이너 기술과 그 활용에 대해 알아보겠습니다.

## Topics
* 컨테이너 기술
* Docker
* docker-compose

## Resources
* [#LearnDocker](https://www.docker.com/101-tutorial)
* [Docker Tutorial for Beginners](https://docker-curriculum.com/)
* [docker-compose](https://docs.docker.com/compose/)

## Checklist
* 컨테이너는 어떻게 동작하나요? 다른 배포판을 사용할 수 있게 하는 원리가 무엇일까요?
  > - 컨테이너 이미지를 기반으로 실행이 되며, 이미지에는 애플리케이션 코드, 라이브러리, 의존성 및 설정 파일들이 포함되어있습니다. 컨테이너는 이러한 이미지를 가져와 호스트 운영 체제에서 격리된 실행 환경을 만들고 실행 시킵니다.
  > - 리눅스의 namespace와 cgroup기능으로 만들어진 리눅스의 컨테이너(LXC)를 활용한 기술임
  > - 도커 컨테이너는 호스트 OS의 커널을 공유하며 격리되어있는 프로세스로써 동작함
  > - Windows와 MacOS 용 docker를 설치하면 경량화된 linux 머신이 가상화되어 구동되고, 그 위에서 docker가 구동되는 것이다.
  > - 다른 배포판을 사용할수 있는 이유는 컨테이너 이미지는 운영체제와 무관하게 동작하고, 이미지안에 의존성 패키지가 전부 포함이 되어있기 때문입니다.
* 도커 컨테이너에 호스트의 파일시스템이나 네트워크 포트를 연결하려면 어떻게 해야 할까요?
  >```bash
  > # 파일 시스템 연결 -v 명령어를 통하여 / 호스트:컨테이터 로 실행함
  > $ docker run -v /path/host:/path/container <이미지 이름>
  > # 네트워크 포트 연결 -p 명령어를 통하여 포트연결 / 호스트포트:컨테이터포트
  > $ docker run -p 80:8080 <이미지 이름>
  >```
* 도커 컨테이너에서 런타임에 환경변수를 주입하려면 어떻게 해야 할까요?
  > 1. 이미지 빌드시 환경변수 정의
  >```js
  > # Dockerfile
  > ENV Key=value
  >```
  > 2. 컨테이너 실행시 주입하기
  > ```bash
  > # -e 명령어로 주입
  > $ docker run -e key=value <이미지 이름>
  > ```
  > 3. 파일을 이용해 주입하기
  > ```bash
  > $ docker run --env-file MyFile.txt <이미지 이름>
  > ```
* 도커 컨테이너의 stdout 로그를 보려면 어떻게 해야 할까요?
  > ```bash
  > $ docker logs <컨테이너 이름>
  > $ docker logs -f <컨테이너 이름>
  > $ docker-compose logs <서비스 이름>
  > ```
* 실행중인 도커 컨테이너에 들어가 bash 등의 쉘을 실행하고 로그 등을 보려면 어떻게 해야 할까요?
> 1. docker exec -it <컨테이너 이름 또는 ID> bash
> 2. cat /var/log/messages

## Quest
* 도커를 설치하고 그 사용법을 익혀 보세요.
* 메모장 시스템 서버를 컨테이너 기반으로 띄울 수 있게 수정해 보세요. (docker-compose는 사용하지 않습니다)
* 컨테이너를 Docker Hub에 올리고, 발급받은 학습용 AWS 계정에 EC2 인스턴스를 생성한 뒤, 해당 컨테이너를 띄워서 서비스 해 보세요.
* docker-compose를 사용하여, 이미지 빌드와 서버 업/다운을 쉽게 할 수 있도록 고쳐 보세요.

## Advanced
* 도커 외의 컨테이너 기술의 대안은 어떤 것이 있을까요?
* 맥이나 윈도우에서도 컨테이너 기술을 사용할 수 있는 원리는 무엇일까요?
