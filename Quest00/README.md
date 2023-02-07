# Quest 00. 형상관리 시스템

## Introduction
* git은 2021년 현재 개발 생태계에서 가장 각광받고 있는 버전 관리 시스템입니다. 이번 퀘스트를 통해 git의 기초적인 사용법을 알아볼 예정입니다.

## Topics
* git
  * `git clone`, `git add`, `git commit`, `git push`, `git pull`, `git branch`, `git stash` 명령
  * `.git` 폴더
* GitHub

## Resources
* [Resources to learn Git](https://try.github.io)
* [Learn Git Branching](https://learngitbranching.js.org/?locale=ko)
* [Inside Git: .Git directory](https://githowto.com/git_internals_git_directory)

## Checklist
* 형상관리 시스템은 왜 나오게 되었을까요?
  > * 소프트웨어는 무형의 산출물이므로 가시성이 없어서 프로젝트의 관리및 개발 과정의 추적이 어렵습니다. 그래서 나오게 된 것이 형상관리 시스템으로, 소프트웨어의 변경사항을 관리 및 추적을 용이하게 할 수가 있습니다.
* git은 어떤 형상관리 시스템이고 어떤 특징을 가지고 있을까요? 분산형 형상관리 시스템이란 무엇일까요?
  * git은 어떻게 개발되게 되었을까요? git이 분산형 시스템을 채택한 이유는 무엇일까요?
  > * Linux를 만든 리누스 토발즈가 BitKeeper라는 분산 버전관리 시스템을 사용하다가 라이센스가 제한이 되었고, BitKeeper를 사용하면서 얻은 교훈으로 만든것이 git입니다. 그래서 BitKeeper의 분산형 시스템에서 개선하여서 만들어졌습니다.
* git과 GitHub은 어떻게 다를까요?
  > * 깃은 로컬 저장소를 사용하는 버전관리 프로그램이고,
  > * github는 깃 저장소를 관리하는 원격 저장소입니다. 클라우드 기반으로 다른사람과 공유를 할수가 있습니다.
* git의 clone/add/commit/push/pull/branch/stash 명령은 무엇이며 어떨 때 이용하나요? 그리고 어떻게 사용하나요?
  > * clone: 원격 저장소에 있는 레포짓을 로컬로 가져올때 사용합니다.
  > * add: 깃을 커밋하기 이전에 수정사항을 스테이지에 올리는 역할입니다.
  > * commit: 스테이지에 올라온 수정파일들을 기록하여서 저장할때 사용합니다.
  > * push: 로컬에 있는 내용들을 원격으로 옮길때 사용합니다.
  > * pull: git fetch 와 git merge가 합쳐진 방식으로 원격에 있는 깃기록을 가져올때 사용합니다.
  > * branch: 로컬에서 브랜치들을 관리할때 쓰는 명령어 입니다.
  > * stash: 수정사항들을 임시저장하는 용도로 사용할때 사용합니다.
* git의 Object, Commit, Head, Branch, Tag는 어떤 개념일까요? git 시스템은 프로젝트의 히스토리를 어떻게 저장할까요?
  > * Object: 모든 변경이나 파일을 포함하는 대상은 오브젝트로 표현되며, 내부적으로 commit, tree, blob, tag 4가지의 오브젝트가  있으며, .git/objects에 개별적인 파일로 존재합니다.
  > * Tag: 무엇을 표시하기위한 기능으로, 특정 커밋을 가리키는 링크라고도 할수있고, 읽기전용 같은 커밋 개념입니다. 소프트웨어 버젼을 릴리즈 할때 주요 사용됩니다.
  > * Branch: 원래 코드와 상관없이 독립적으로 개발하기위한 단위 및 개념을 브랜치라고 할수 있을 것 같습니다.
  > * HEAD: 현재 로컬 저장소가 가르키고있는 브랜치를 말합니다.
* 리모트 git 저장소에 원하지 않는 파일이 올라갔을 때 이를 되돌리려면 어떻게 해야 할까요?
  > * git rm [filename] 명령어를 통해서 지울수는 있지만 히스토리까지는 못지움
  > * git filter-branch 를 통하여 해당 파일이 있는 히스토리를 지워서 브랜치를 재성립하고 push -f 로 강제로 히스토리를 바꿀수 있지만, 원격 저장소 기록을 바꿔버릴수 있는 위험한 작업이라 안 하는것이 좋아보입니다.

## Quest
* GitHub에 가입한 뒤, [이 커리큘럼의 GitHub 저장소](https://github.com/KnowRe-Dev/WebDevCurriculum)의 우상단의 Fork 버튼을 눌러 자신의 저장소에 복사해 둡니다.
* Windows의 경우 같이 설치된 git shell을, MacOSX의 경우 터미널을 실행시켜 커맨드라인에 들어간 뒤, 명령어를 이용하여 복사한 저장소를 clone합니다.
  * 앞으로의 git 작업은 되도록 커맨드라인을 통해 하는 것을 권장합니다.
* 이 문서가 있는 폴더 바로 밑에 있는 sandbox 폴더에 파일을 추가한 후 커밋해 보기도 하고, 파일을 삭제해 보기도 하고, 수정해 보기도 하면서 각각의 단계에서 커밋했을 때 어떤 것들이 저장되는지를 확인합니다.
* `clone`/`add`/`commit`/`push`/`pull`/`branch`/`stash` 명령을 충분히 익혔다고 생각되면, 자신의 저장소에 이력을 push합니다.

## Advanced
* Mercurial은 어떤 형상관리 시스템일까요? 어떤 장점이 있을까요?
  > * git과 마찬가지로 분산버전관리 시스템
  > * git에 비해 다양한 기능들이 존재하고, 설정없이 바로 시작할수 있는 환경을 제공합니다. 다만 git에 비해 확장명령을 만들기가 어렵다는점이 있습니다.
* 실리콘밸리의 테크 대기업들은 어떤 형상관리 시스템을 쓰고 있을까요?
  > * 제 추측인데 깃허브와의 연동성때문에 깃을 많이 쓰지 않나 생각합니다.
