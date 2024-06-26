import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { apiCart } from "./feature/cartSlice";
import { apiProduct } from "./feature/productsSlice";
import { apiUser } from "./feature/usersSlice";
import { apiCheckout } from "./feature/checkoutSlice";

const reducers = combineReducers({
  [apiProduct.reducerPath]: apiProduct.reducer,
  [apiUser.reducerPath]: apiUser.reducer,
  [apiCart.reducerPath]: apiCart.reducer,
  [apiCheckout.reducerPath]: apiCheckout.reducer,
});
export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiProduct.middleware,
      apiUser.middleware,
      apiCart.middleware,
      apiCheckout.middleware,
    ]),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
