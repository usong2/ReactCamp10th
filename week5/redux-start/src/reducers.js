// reducers.js
import { ADD_TODO, COMPLETE_TODO, START_LOADING, END_LOADING } from "./actions";
import { combineReducers } from "redux";

const initialTodos = [];

export function todoApp(previousState = {}, action) {
  return {
    todos: todos(previousState.todos, action),
    loading: loading(previousState.loading, action),
  };
}

export function todos(previousState = initialTodos, action) {
  //   if (previousState === undefined) {
  //     //최초
  //     return [];
  //   }
  if (action.type === ADD_TODO) {
    return [
      ...previousState,
      {
        text: action.text,
        createAt: new Date().toISOString(),
        done: false,
      },
    ];
  } else if (action.type === COMPLETE_TODO) {
    const { index } = action;
    // 원래 스테이트에 index 번째 있는 객체의 done을 true로 바꾸고, 새로운 배열을 리턴
    const newState = [...previousState];
    newState[index] = {
      ...newState[index],
      done: true,
    };
    return newState;
  }
  return previousState;
}

const initialLoading = false;

export function loading(previousState = initialLoading, action) {
  //   if (previousState === undefined) {
  //     //최초
  //     return [];
  //   }
  if (action.type === START_LOADING) {
    return true;
  } else if (action.type === END_LOADING) {
    return false;
  }
  return previousState;
}

export const reducers = combineReducers({
  todos: todos,
  loading: loading,
});
