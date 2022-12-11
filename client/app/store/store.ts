import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { dialogApi } from "./api/dialog-api";
import { friendApi } from "./api/friend-api";
import { postApi } from "./api/post-api";
import { userApi } from "./api/user-api";
import { RootReducer } from "./root-reducer";

const reducer: typeof RootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  } else {
    return RootReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware()
        .concat(dialogApi.middleware)
        .concat(friendApi.middleware)
        .concat(userApi.middleware)
        .concat(postApi.middleware),
  });

export type TypeRootState = ReturnType<typeof RootReducer>;
export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore);
