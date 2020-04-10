// store.js

import { createStore } from "redux";
import { reducers } from "./reducers";
// import { addTodo } from "./actions";

export const store = createStore(reducers);

// console.log(store);

// console.log(store.getState());

// state 변경 시에 subscribe가 불림(index.js로 코드 이동)
// store.subscribe(() => {
//   console.log(store.getState());
// });

// store.dispatch(addTodo("API 만들기"));
