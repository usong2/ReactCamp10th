// actions.js

// 액션의 type 정의
// 액션의 타입 => 액션 생성자 이름
// ADD_TODO => addTodo

export const ADD_TODO = "ADD_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";

// 액션 생성자
// 액션의 타입은 미리 정의한 타입으로부터 가져와서 사용하며,
// 사용자가 인자로 주지 않습니다.
export function addTodo(text) {
  return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
}

export function completeTodo(index) {
  return {
    type: COMPLETE_TODO,
    index,
  };
}

export const START_LOADING = "START_LOADING"; // 액션
export const END_LOADING = "END_LOADING"; // 액션

export const startLoading = () => ({ type: START_LOADING }); // 액션 생성자
export const endLoading = () => ({ type: END_LOADING }); // 액션 생성자
