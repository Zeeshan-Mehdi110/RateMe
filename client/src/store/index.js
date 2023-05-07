import { applyMiddleware, compose, createStore } from "redux";
import rootReducers from "./reducers/rootReducer";
import thunk from "redux-thunk";

let middleware = null;
if(process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__ )
{
  middleware = compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__());
}else {
  middleware = applyMiddleware(thunk)
}

const store = createStore(rootReducers,middleware);
export default store;