import { MantineProvider, Global } from '@mantine/core';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext, AuthContextProps, AuthProvider } from 'react-oidc-context';

// Config helper
import config from './helpers/config';
import Auth from './routes/Auth';
import UI from './routes/Auth/ui';

if (import.meta.env.DEV) {
  console.log(JSON.stringify(config, null, 2));
}

function App(): React.ReactElement {
  return (
    <MantineProvider
      theme={{
        colorScheme: 'dark',
        fontFamily: 'Roboto, sans-serif',
        headings: {
          fontFamily: 'Lato, sans-serif',
        },
        colors: {
          rust: [
            '#000000',
            '#000000',
            '#FDEBE7',
            '#FAC7BC',
            '#F7A392',
            '#F47F67',
            '#F15B3C',
            '#EE3711',
            '#BE2C0E',
            '#8F210A',
          ],
        },
      }}
      withGlobalStyles
    >
      <Global
        styles={(theme) => ({
          body: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
          },
        })}
      />
      <UI config={config} /> 
    </MantineProvider>
  );
}

export default App;
