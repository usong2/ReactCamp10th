# React Concept

## Keyword

+ View 라이브러리
+ Only Rendering & Update
  + Not included another functionality
+ Component Based Development
  + 작업의 단위
+ Virtual DOM
  + 이제는 DOM을 직접 다루지 않음
+ JSX
  + NOT Templates
  + transpile to JS
+ CSR & SSR

<br>

## Component Tree => DOM Tree

![Component Tree => Dom Tree](https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/3927626/component-dom-tree.png)

<br>

## Component?

```html
<!-- HTMLElement -->

<img src="이미지 주소" />

<button class="클래스 이름">버튼</button>

<!-- 내가 만든 컴포넌트 -->

<내가지은이름1 name="Mark" />

<내가지은이름 prop={false}>내용</내가지은이름>

<!-- 
- src, class, name, props 밖에서 넣어주는 데이터
- 문서(HTML), 스타일(cSS), 동작(JS) 를 합쳐서 내가 만든 일종의 태그
-->
```

<br>

## Virtual DOM - diff 로 변경

![Virtual DOM - diff 로 변경](https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/3927639/virtual_dom_diff.png)

<br>

## React Client Side Rendering

![React Client Side Rendering](https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/3943424/CSR.png)

<br>

## React Server Side Rendering

![React Server Side Rendering](https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/3943426/SSR.png)