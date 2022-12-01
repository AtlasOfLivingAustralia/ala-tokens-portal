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
  Tooltip,
  Alert,
} from '@mantine/core';

import { Prism } from '@mantine/prism';
import {  useAuth } from 'react-oidc-context';
import { IconAlertCircle, IconDownload} from '@tabler/icons';


function Auth(): ReactElement {
  const auth = useAuth();

  // keep track of whether token was recently requested. Workaround for auth.error (which does not show error final token request fails e.g. 401.)
  const [tokenRequested, setTokenRequested] = useState(false);
  
  const requestToken = useCallback(() => {
      auth.signinPopup();
      setTokenRequested(true)
  }, [auth]);

  const regenerateToken = useCallback(() => {
      setTokenRequested(false);
      auth.signinPopup();
}, [auth]);

  const signOut = useCallback(() => {
    auth.signoutPopup();
    setTokenRequested(false);
  }, [auth]);

  const handleDownload = () =>{
    // create file in browser
    const fileName = "auth";
    const json = JSON.stringify(auth.user, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }

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
          <Box px={16} style={{ display: 'flex', flexDirection: 'column' }}>
            <br />

            {auth.isAuthenticated && (
              <div>
                <Prism language="json" style={{ width: 650 }} mt={24}  >
                    {JSON.stringify(auth.user, null, 2)}
                </Prism>
                <Group position="center">
                  <Button
                    color="teal"
                    mt={32}
                    mb={12}
                    onClick={regenerateToken}
                  >
                    Re-generate token
                  </Button>
                   
                  <Button
                    rightIcon={<IconDownload size={18} />}
                    color="blue"
                    mt={32}
                    mb={12}
                    onClick={handleDownload}
                  >
                    Download as JSON
                  </Button>                   
                </Group>
                <Group position='center'>
                  <Button
                      color="red"
                      mt={32}
                      mb={12}
                      onClick={signOut}
                    >
                      Logout
                    </Button>
                </Group>
              </div>
            )}
            {(!auth.isAuthenticated && auth.settings.client_id.length > 0) && (
              <Button
                  color="teal"
                  mt={32}
                  mb={12}
                  onClick={requestToken}
                >
                  Request token
                </Button>                      
            )}  
            {(!!tokenRequested && !auth.isLoading &&  !auth.user) && (
            <Alert icon={<IconAlertCircle size={16} />} title="Error! Unable to generate access token" color="red">
                Please ensure that your Credentials and Scope are correct and still valid.
            </Alert>   
            )}       

          </Box>
      </Center>
    </Container>
  );

}

export default Auth;
