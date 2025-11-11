## install

- 폴더명은 탐색기를 이용해서 바꾸는게 속편하다.
- 자바와 달리 루트 디렉토리명이 크게 영향을 끼치지 않는다.
- `git clone https://github.com/liveforone/reactise.git 패키지명`
- .git삭제
- npm install
- package.json의 name, version, description을 변경한다.
- `npx npm-check-updates -u -f "/react*/"`
- devDependencies를 제외하고는 `npm i 패키지명@latest`을 해준다.
- devDependecies는 [react package.json](https://github.com/facebook/react/blob/main/package.json)을 참고하여 업데이트한다.
- 이후 각 readme를 확인한다.

## Caution

- 왜 그러는지 모르겠는데, users dir에 withdraw를 넣으면 파일을 못찾는 에러가 계속 발생한다. 따라서 account 폴더를 만들고 따로 관리중이다.

## dependencies

- `npm install @heroicons/react`
- `npm i axios`
- `npm i react-hot-toast`

## 아이콘 참고

- 아이콘에는 반드시 w-x / h-x 를 주어야함. 안그러면 안보임
- [아이콘 검색](https://heroicons.com/)

## routing

- routing은 routes.ts파일에서 진행한다.
- v7부터 기존의 react-router-dom은 사용하지 않는다.
- 라우팅에 대한 문서를 참고하고 싶으면 react-router docs에 들어가서 버전을 꼭 v7로 설정하고 봐야한다.
- useNavigate()를 안쓰고 window.location으로 바꾸면 spa의 장점을 전혀 살리지 못하고 개발하고 있는 것이다. 페이지 새로고침 없이 페이지 전환을 할 수 있게 해준다.

## useEffect 설명

- [] 빈의존성 배열은 처음 마운트 될때만 hook이 실행됨.
- 의존성 배열에 특정값이 있을때에는 해당 값이 변경되면 hook이 실행됨
- 의존성 배열을 생략하면 매 랜더링마다 실행된다.

### strict mode에서 dev상태로 실행시 useEffect 이중 실행

- 개발(dev)모드에서는 react가 strict 모드로 실행시 useEffect가 이중실행된다.
- 이에 따라 toast같은 기능이나, alert를 useEffect안에서 실행하면 이중실행되는 것으로 화면에 나타난다.
- 그러나 이는 의도된 동작으로 배포시에는 이렇게 화면에 뜨지 않는다.
