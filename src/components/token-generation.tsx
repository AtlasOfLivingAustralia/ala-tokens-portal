import { useState } from 'react';
import {
  Container,
  Center,
  Box,
  Button,
  Loader,
  Group,
  Alert,
  
} from '@mantine/core';


import { Prism } from '@mantine/prism';
import { IconAlertCircle, IconDownload} from '@tabler/icons';
import { User, UserManager } from 'oidc-client-ts';
import { AuthConfig } from '../helpers/config';

const Auth: React.FC<{clientDetails : AuthConfig}> = ({clientDetails}) => {
  // set and empty user state on initial setup.
  const [user, setUser] = useState(new User({access_token:"", token_type:"", profile: {sub:"", aud:"", exp:0, iat: 0, iss:""}}));
  // loading state
  const [isLoading, setIsLoading] = useState(false);
  // load values from prop clientDetails into OIDC UserManager
  const userManager = new UserManager(clientDetails);

  const [hasError, setHasError] = useState(false);


  const signIn = async () =>{
    /**
     *  NOTE  on the OAuth Flow.
     * 1. userManager.signinPopup() opens the authentication endpoint i.e. 'authority' in a popup window. 
     * 2. upon successful authentication, the popup window redirects to redirect_uri e.g. '/callback' with a response from auth server.
     * 3. '/callback' page initializes a new UserManager and calls signinPopupCallback in order to pass the data back to this page i.e. calling page when then closes the popup.
     * 4. Once the data is passed back, the below promise will resolve.
     * 
     *  */ 
    setHasError(false);
    setIsLoading(true);
    try{
      const  user = await userManager.signinPopup();
      setUser(user);
    } catch (e) {
       setHasError(true);
    } finally {
      setIsLoading(false);
    }    

  }

  const signOut = async () =>{
    // successful signoutPopup will  log out current user.
    await userManager.signoutPopup();
    // reset user info from current component state
    resetUser(); 
  }

  // reset the user object
  const resetUser  = () =>{setUser(new User({access_token:"", token_type:"", profile: {sub:"", aud:"", exp:0, iat: 0, iss:""}}))}

  const handleDownload = () =>{
    // create file in browser
    const fileName = "auth";
    const json = JSON.stringify(user, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTML element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }

  if (isLoading) {
    return (
      <Container fluid style={{ display: 'flex' }}>
        <Center>
          <Loader color="rust" />
        </Center>
      </Container>
    );
  }

  return (
    <Container fluid size="xs" px="xs">
      <Center>
      <Box px={1} style={{ display: 'flex', flexDirection: 'column'}}>
            {user.access_token && (
                <div >
                  <Group position="center">
                    <div style={{textAlign: 'center', width: 550}}>
                      <Alert icon={<IconAlertCircle size={16} />} title="" color="green">
                        The JWT i.e. <strong>access_token</strong>  below can now be used for protected API requests. For more details on advanced server-side usage of this token please download the token and see usage examples <a target="_blank" href="https://github.com/AtlasOfLivingAustralia/jwt-usage-examples">here</a>.
                      </Alert> 
                      </div>
                  </Group>
                  <br />
                  
                  <Prism language="json" style={{width: 550}} mt={12}  >
                      {JSON.stringify(user, null, 2)}
                  </Prism>

                  <Group position="center">
                      <Button
                        color="teal"
                        mt={32}
                        mb={12}
                        onClick={signIn}
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

                    <Group position="center">     
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
            {(!!hasError ) && (
              <Alert icon={<IconAlertCircle size={16} />} title="Error! Unable to generate access token" color="red">
                  Please ensure that your Credentials and Scope are correct and still valid.
                  
              </Alert>
            )}  
            
            {(!user.access_token) && (
              <Button
                  color="teal"
                  mt={32}
                  mb={12}
                  onClick={signIn}
                >
                  Request token
                </Button>                      
            )}  
            </Box>
        </Center>
    </Container>
  );

}

export default Auth;
