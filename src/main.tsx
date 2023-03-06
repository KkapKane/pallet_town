import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2F3C7E'
    },
    secondary: {
      main: '#FBEAEB'
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer position="bottom-left" />
        <App />
      </ThemeProvider>
    </Provider>

);
