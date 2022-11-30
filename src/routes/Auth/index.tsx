import { ReactElement, useCallback, useState } from 'react';
import {
  Card,
  Container,
  Center,
  Title,
  Image,
  Text,
  Box,
  Button,
  Loader,
  Stepper,
  Group,
  Step,
  Input,
  TextInput,
} from '@mantine/core';

import { Prism } from '@mantine/prism';
import {  useAuth } from 'react-oidc-context';

const LOGO_URL =
  'https://www.ala.org.au/app/uploads/2020/06/ALA_Logo_Mark-only.png';


function Auth(): ReactElement {
  const auth = useAuth();

  
  const requestToken = useCallback(() => {
      auth.signinPopup();
  }, [auth]);

  const signOut = useCallback(() => {
    auth.signoutPopup();
  }, [auth]);

  if (auth.isLoading) {
    return (
      <Container fluid style={{ display: 'flex' }}>
        <Center>
          <Loader color="rust" />
        </Center>
      </Container>
    );
  }

  // If we're waiting for an auth state update
  return (
    
    <Container fluid style={{ display: 'flex' }}>
      <Center>
        <Card shadow="lg" radius="xl" style={{ width: 550, minHeight: 300 }}>


          <Box px={16} style={{ display: 'flex', flexDirection: 'column' }}>
            <br />

            {auth.isAuthenticated && (
              <div>
                <Prism language="json" style={{ width: 650 }} mt={24}>
                    {JSON.stringify(auth.user, null, 2)}
                </Prism>
                <Group position="center">
                  <Button
                    color="rust"
                    mt={32}
                    mb={12}
                    onClick={signOut}
                  >
                    Sign Out
                  </Button>
                  <br />
                  <Button
                    color="teal"
                    mt={32}
                    mb={12}
                    onClick={requestToken}
                  >
                    Re-generate token
                  </Button>                    
                </Group>
              </div>
            )}
            {!auth.isAuthenticated && auth.settings.client_id.length > 0 && (
              <Button
                  color="teal"
                  mt={32}
                  mb={12}
                  onClick={requestToken}
                >
                  Request token
                </Button>                      
            )}            

          </Box>
        </Card>
      </Center>
    </Container>
  );

}

export default Auth;
