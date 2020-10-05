import React, { StrictMode, FunctionComponent } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Theme from 'components/Theme';
import ToDoProvider from 'provider/ToDoProvider';

const TodosApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <StrictMode>
      <Head>
        <title>Todos</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />

        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <ToDoProvider>
        <Theme>
          <Component { ...pageProps } />
        </Theme>
      </ToDoProvider>
    </StrictMode>
  );
};

export default TodosApp;
