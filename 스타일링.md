# reactise css 참고

- 모바일 대응 반응형으로 만들어야 한다.
- dribble.com 들어다면 디자인 많이 있음. 참고하기

- padding(안쪽 여백 필수)

- 폰트는 2개만 쓰자. 제목, 내용
  - 한글 폰트는 불러오는 시간이 오래걸림.
  - 따라서 한글의 경우 폰트를 여러개 안쓰는게 좋음
  - 폰트는 font squerrer 들어가면 폰트들 쭉 보여줌

- 줄바꿈은 word-break: keep-all 로 주어 단어단위로 줄바꿈하여 어색하지 않게 보이게 하자.

- 로고만들때 font squerrer들어가서 로고로 쓸만한거 찾아서 로고 디자인 하면 아이콘 필요없이 로고만들 수 있음.

- gradient를 글자에 주게되면(그라데이션) 이쁘다. 마치 애플처럼

- 제목은 16px 이상, 내용은 16px 이하
  - letter spacing 즉 자간 간격 조절하면 이쁨

- 이미지의 width height 동시 조절 금지
  - 이미지를 백그라운드 이미지로 넣으면 사이즈조절 따로 안해도됨

- 테두리를 주고 싶으면 옅은 회색을 넣으면 좋음. border을 1px solid #ddd 로 주면 될듯.

- div들을 가로로 정렬하러면 flex를 쓰고
  - 세로로 정렬하려면 flex column을 씀.
  - 다만 1차원 적임.
  - grid는 2차원적으로 한번에 row와 column을 세팅할 수 있음

```css
display: grid
grid-template-columns: repeat(5, 20%)
또는
grid-template-columns: repeat(5, 1fr)
row는
grid-auto-rows: minmax(150px, auto)
```

- 이렇게하면 기본크기는 150px을 사용하되, 내용물이 많아서 150px을 넘게되면 자동 조정한다.
  - grid-gap 10px 20px 이런식으로 갭을 줄수도 있다. padding 을 써도 됨.
  - grid 라인은 시작점을 기준으로 1234로 가도 되고
  - 맨끝을 기준으로 -1 -2해도 된다.
  - 따라서 특정한 아이템만 크기를 다르게 하고 싶은면 그리드 라인을 가지고

```css
grid-column-start :2
grid-column-end :4
grid-row-start :1
grid-row-end : 3
```

- 이런식의 옵션을 주면 된다.
  - 이를 더 쉽게 아래와 같이 표현가능하다.

```css
grid-column :2 / 4
grid-row :1 / 3
```

- 지역을 지정해줄수도 있다.

```
a a a
b c c
b d e
```

- 이런식으로 지정을 원하면

```css
grid-template-areas:
  "a a a"
  "b c c"
  "b d e";
```

- 그리고 엘리먼트 css에서
  - grid-area : a 이런식으로 하면 된다.

- div에 크기를 줄때 px 단위로 하면 반응형이 안되니 % 단위로 한다.
  - 한줄이 5개를 넣을거면 20% 이런식으로 말이다.

- 상대크기는 rem, em을 사용한다.
  - rem은 html 폰트크기를 기준으로 상대적용하고
  - em은 해당 엘리먼트의 폰트크기를 기준으로 상대적용한다.
  - 따라서 em을 쓰는게 세부조정이 가능하고
    rem을 쓰면 통일성이 있지 않을까?
  - 통상적으로 rem을 많이 쓴다.

- 테두리는 border이다.
  - border : 테두리크기 solid 색깔
  - solid는 단선이다. dotted 하면 도트이다.

- 여러 div 엘리먼트가 서로다른 border 크기를 가질때, 이 박스들의 width랑 height를 맞춰서 이쁘게 하고 싶다면 box-sizing:border-box를 주면된다.

## css 인터렉션

:hover → 마우스를 올렸을 때
:active → 마우스를 클릭하고 있을 때
:focus → input, button 등이 포커스를 받았을 때
:focus-visible → 포커스가 키보드 접근 등으로 의미 있을 때만 (브라우저가 자동 판단)
:visited → 방문한 링크
:link → 방문하지 않은 링크
:checked → 체크박스/라디오 버튼이 선택된 상태
:disabled → 비활성화된 form 요소
:enabled → 활성화된 form 요소
:valid / :invalid → form validation 결과에 따라
:hover → 마우스 올림
:active → 마우스 클릭 중
:focus → 입력 포커스
:focus-within → 자식 요소가 focus 상태일 때 부모에 적용
:target → 앵커 링크(#id)로 이동했을 때
[인터렉티브 설명](https://lold2424.tistory.com/m/265)
[인타렉티브 예제 및 코드](http://rwdb.kr/cssjs-%EA%B0%81%EC%A2%85-%EC%9D%B8%ED%84%B0%EB%A0%89%EC%85%98-%EB%B0%8F-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%ED%9A%A8%EA%B3%BC-%EC%A0%95%EB%A6%AC/)

## 사용할 플러그인

> 명령어 검색해서 몇개 외우고 진행
> [emmet](https://inpa.tistory.com/entry/HTML-%F0%9F%8E%A8-Emmet-%EB%AC%B8%EB%B2%95-%EC%A0%95%EB%A6%AC)
