import { MantineProvider, Global, AppShell, Header, MediaQuery, Burger,  Image } from '@mantine/core';
import { Fragment, useState } from 'react';
import AppNavbar from './components/navbar';

import LargeLogo from '../src/ala-logo.png' 

// Config helper
import config from './helpers/config';
import Faq from './components/faq';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import LoginCallback from './components/login-callback';
import LogoutCallback from './components/logout-callback';
import AuthType from './components/landing';
import AdvancedFlow from './components/advanced-token-ui';
import BasicFlow from './components/basic-token-ui';

if (import.meta.env.DEV) {
  console.log(JSON.stringify(config, null, 2));
}

function App(): React.ReactElement {
  const [opened, setOpened] = useState(false);

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/logout" element={<LogoutCallback />} />
          <Route path="/login" element={<LoginCallback />} />
          <Route  element={   
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
                styles={{
                  main: {
                    maxHeight: "100vh",
                    overflowY: "scroll",
                    overflowX: "hidden",
                  },
                }}
                  navbarOffsetBreakpoint="sm"
                  asideOffsetBreakpoint="sm"
                  navbar={ <AppNavbar opened={opened} />
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
                        <Image width={200} style={{margin: '0px 50px 0px 0px'}}  src={LargeLogo} ></Image> <h2>Client Credentials & Tokens</h2>
                      </div>
                    </Header>
                  }
                >
                <Outlet/>
                </AppShell>
              </MantineProvider>}>
                <Route path="/faq" element={<Faq />}/>
                <Route path="/"   element={<AuthType config={config}/>}/>
                <Route path="/advanced" element={<AdvancedFlow config={config}/>}/>
                <Route path="/basic" element={<BasicFlow config={config}/>}/>
            </Route>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
