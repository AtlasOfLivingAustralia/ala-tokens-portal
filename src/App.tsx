import { BrowserRouter } from 'react-router-dom';
import { MantineProvider, Global } from '@mantine/core';
import { AuthProvider } from 'react-oidc-context';

// Routes
import Routes from './routes';

// Config helper
import config from './helpers/config';

if (import.meta.env.DEV) {
  console.log(config);
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
      <AuthProvider
        client_id={config.client_id}
        authority={config.authority}
        redirect_uri={config.redirect_uri}
      >
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
