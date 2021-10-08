import { configureStore, createAsyncThunk as _createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import rootReducers from './rootReducers';

const store = configureStore({
  reducer: rootReducers
});

type AppState = ReturnType<typeof rootReducers>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppState = <T extends (state: AppState) => any>(selector: T): ReturnType<T> => useSelector(selector);

export const getAppState = (): AppState => store.getState();

// export const createStoreAsyncThunk = <ThunkArg,ThunkApiConfig extends AsyncThunkConfig = {}, T extends (arg: ThunkArg,) => any>(
//   typePrefix: string,
//   payloadCreator: T,
//   options?: Record<string, any>
// ) => _createAsyncThunk<ReturnType<T>, { a: 1 }, { state: AppState }>(typePrefix, payloadCreator, options);

// const c = _createAsyncThunk<number, { a: 1 }, { state: AppState }>('', (a, api) => {
//   a.a;
//   api.getState();

//   return 0;
// });

// const b = createStoreAsyncThunk('', (aa, api) => {
//   api;

//   return 0 as;
// });

// export const;

export default store;
