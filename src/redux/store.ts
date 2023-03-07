import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './pokemonService';
import displayReducer from './slices/displaySlice';
import playerReducer from "./slices/playerSlice"
import dialogReducer from "./slices/dialogSlice"

export const store = configureStore({
  reducer: {
    // Redux
    display: displayReducer,
    player: playerReducer,
    dialog: dialogReducer,
    // Services
    [pokemonApi.reducerPath]: pokemonApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
