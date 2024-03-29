# 개발자 포트폴리오 공유 웹서비스

이 프로젝트는 자신의 포트폴리오를 작성하고, 다른 사람의 포트폴리오를 확인할 수 있는 웹 서비스입니다. 각자의 포트폴리오를 확인하고 교류하며 각종 스터디, 프로젝트, 공모전, 해커톤 등을 수행할 인원을 찾고 개발자 네트워크를 강화합니다. 궁극적으로 개발자 전용 링크드인처럼 기능할 수 있도록, 활발한 상호 교류가 진행되는 커뮤니티를 지향합니다.

웹 구현 예시: http://34.64.140.205/

> 위 IP 주소는 프로젝트 진행 기간에만 유효합니다.

**5개 MVP**로 구성됩니다.

- User (회원가입, 로그인 등 사용자 관련)
- Award (포트폴리오 중 상장 이력 관련)
- Certificate (포트폴리오 중 자격증 관련)
- Project (포트폴리오 중 프로젝트 관련)
- Education (포트폴리오 중 교육, 학교 관련)

## 주요 사용 기술

1. 프론트엔드

- React (create-react-app으로 구현되었습니다.)
- React Bootstrap
- Axios

2. 백엔드

- Express (nodemon, babel-node로 실행됩니다.)
- MongoDB, Mongoose

## 설치 방법

1. 프론트 엔드 서버 실행

```bash
cd front
yarn
yarn start
```

2. 백엔드 서버 실행

```bash
back 폴더 내부 README 참고
```
