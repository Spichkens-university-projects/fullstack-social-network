import { combineReducers } from "redux";
import { dialogApi } from "./api/dialog-api";
import { friendApi } from "./api/friend-api";
import { postApi } from "./api/post-api";
import { userApi } from "./api/user-api";
import { authSlice } from "./auth/auth.slice";

export const RootReducer = combineReducers({
  [dialogApi.reducerPath]: dialogApi.reducer,
  [friendApi.reducerPath]: friendApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  auth: authSlice.reducer,
});
