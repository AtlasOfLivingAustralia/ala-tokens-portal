import { MantineProvider, Global, AppShell, Header,  Text, MediaQuery, Burger,  Image } from '@mantine/core';
import { useState } from 'react';
import TokensNavbar from './components/Navbar';

import LargeLogo from '../src/ala-logo.png' 

// Config helper
import config from './helpers/config';
import UI from './routes/Auth/ui';
import ClientDetails from './routes/Auth/client';

if (import.meta.env.DEV) {
  console.log(JSON.stringify(config, null, 2));
}

const LOGO_URL =
  'https://docs.ala.org.au/images/logo-b37380e1.png';

function App(): React.ReactElement {
  const [opened, setOpened] = useState(false);

  return (
    <MantineProvider 
      theme={{
        colorScheme: 'light',
        fontFamily: 'Roboto, sans-serif',
        headings: {
          fontFamily: 'Lato, sans-serif',
        },
        primaryColor:'rust',
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
      withGlobalStyles withNormalizeCSS
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


    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={ <TokensNavbar opened={opened} />
      }
      header={
        <Header height="10" p="sm">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={"red"}
                mr="xl"
              />
            </MediaQuery>
            <Image width={200} style={{margin: '0px 50px 0px 0px'}}  src={LargeLogo} ></Image> <h3>Client Credentials & Tokens</h3>
          </div>
        </Header>
      }
    >
     <UI config={config} /> 
    </AppShell>
  </MantineProvider>
  );
}

export default App;
