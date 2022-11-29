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
import { useAuth } from 'react-oidc-context';

const LOGO_URL =
  'https://www.ala.org.au/app/uploads/2020/06/ALA_Logo_Mark-only.png';

function Auth(): ReactElement {
  const auth = useAuth();

  const [active, setActive] = useState(0);
  const [clientId, setClientId] = useState("");
  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  
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
        <Card shadow="lg" radius="xl" style={{ width: 700, minHeight: 300 }}>


          <Box px={16} style={{ display: 'flex', flexDirection: 'column' }}>
            <Card.Section
              style={{ display: 'flex', justifyContent: 'center' }}
              py={12}
            >
              <Image src={LOGO_URL} width={75} height={75} />
            </Card.Section>
            <Title align="center" order={3} mt={6}>
              ALA JSON Web Token (JWT) with OAuth2.0 PKCE Workflow
            </Title>
            <br />
            {!auth.isAuthenticated  && 
              <div>
                        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
                          <Stepper.Step label="Client Registration" description="Register Client Application">
                             <p>Before JWT can be generated, a Client Application must be requested and registered with the ALA. Once registered, a Client ID, and optionally, a client secret will be provided to the resource owner i.e. user.</p>
                             <p>Please enter the Client details in the next step or request Client Details</p>

                          </Stepper.Step>
                          <Stepper.Step label="Client Details" description="Enter Client details e.g. Client ID of the registered application">

                            <TextInput
                              label="ClientID"
                              placeholder="exmaple-client-id"
                              description="Client ID of a registered application"
                              id='client-id'
                              value={clientId} onChange={(event) => setClientId(event.currentTarget.value)}
                              required
                            />

                            <TextInput
                              label="ClientSecret (Optional)"
                              type='password'
                              description="Client secret of a registered application. Only required for clients registered as private client applications(eg. server side web application)."
                            />

                          </Stepper.Step>
                        </Stepper>
              
                        <Group position="center" mt="xl">
                          <Button  variant="default" onClick={ active  > 0 ? prevStep : function(){}}>{active === 0 ? 'Request Client Details' :'Back' }</Button>
                          <Button   disabled={(active === 1 && clientId.length < 1)} onClick={ active  < 1 ? nextStep : requestToken}> {active < 1 ? 'I have Client Details' :'Request Access Token' } </Button>
                        </Group>
              </div>
        }
            {auth.isAuthenticated && (
              <div>
              <Prism language="json" style={{ width: 650 }} mt={24}>
                    {JSON.stringify(auth.user, null, 2)}
                  </Prism>
                    <Button
                    color="rust"
                    mt={32}
                    mb={auth.isAuthenticated ? 12 : 0}
                    onClick={signOut}
                  >
                    Sign Out
                  </Button>
                  <Button
                    color="teal"
                    mt={32}
                    mb={auth.isAuthenticated ? 12 : 0}
                    onClick={requestToken}
                  >
                    Request New Token
                  </Button>
              </div>
            )}

          </Box>
        </Card>
      </Center>
    </Container>
  );

}

export default Auth;
