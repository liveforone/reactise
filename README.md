## 보일러플레이트 개발 가이드

- 이전 프론트 보일러 플레이트 코드는 styled-component로 스타일링을 진행했다.
- 현재는 tailwind css를 쓴다. 따라서 코드를 복붙 하는게 전부이나,
- gpt에게 tailwind css스타일로 코드를 변경해달라고 요구하고, 추가로 범용적인 스타일로 변경한다.
- backend가 필요하면 chan-node의 chan-nest를 사용하기
- 현재 계정은 test12@gmail.com / 1111이다.
- 왜 그러는지 모르겠는데, users dir에 withdraw를 넣으면 파일을 못찾는 에러가 계속 발생한다.

## 앞으로 적용해볼것

- 공용 헤더를 만드는 것. 다만 너무 복잡도가 증가하고, 헤더마다 디자인이 너무 천차만별인 경우가 있어, 일단은 헤더가 필요하면 home에서 복붙한 후 따로 수정해서 사용하고 있음.
- 디자인의 경우 각 프로젝트 마다 추구하는 바가 다르므로 이쁘게 잘 꾸며볼것. 구조는 다 완성되어서 복붙 + 수정이 전부임.
- 디자인이 어려우므로 보일러플레이트를 사용할 땐 아마 디자인 작업만 하지 않을까

## dependencies

- `npm install @heroicons/react`
- `npm i axios`

## routing

- routing은 routes.ts파일에서 진행한다.
- v7부터 기존의 react-router-dom은 사용하지 않는다.
- 라우팅에 대한 문서를 참고하고 싶으면 react-router docs에 들어가서 버전을 꼭 v7로 설정하고 봐야한다.
- useNavigate()를 안쓰고 window.location으로 바꾸면 spa의 장점을 전혀 살리지 못하고 개발하고 있는 것이다. 페이지 새로고침 없이 페이지 전환을 할 수 있게 해준다.

## 아이콘 참고

> 아이콘에는 반드시 w-x / h-x 를 주어야함. 안그러면 안보임

- [아이콘 검색](https://heroicons.com/)

#### 메세지 아이콘 + 링크

```tsx
<Link
  to="/chat"
  className="inline-flex items-center bg-gray-700 text-white px-2 py-2 rounded text-lg mb-4 hover:bg-gray-500 transition-colors"
>
  <ChatBubbleLeftIcon className="w-5 h-5" />
</Link>
```
