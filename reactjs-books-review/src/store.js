import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const initStore = (token) =>
  createStore(
    reducers(history),
    {
      token,
    },
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), thunk, promise)
    )
  );

export default initStore;
