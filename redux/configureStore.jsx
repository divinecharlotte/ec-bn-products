import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ProductsReducer from './products';

const rootReducer = combineReducers({
ProductsReducer
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;