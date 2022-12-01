import { ReactElement, useCallback, useContext, useReducer, useState } from 'react';
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
  Transition,
} from '@mantine/core';

import { Prism } from '@mantine/prism';
import { AuthContext, AuthProvider } from 'react-oidc-context';
import Auth from '.';

import ClientRegistration from './client';


const LOGO_URL =
  'https://www.ala.org.au/app/uploads/2020/06/ALA_Logo_Mark-only.png';

interface AuthProps {
    config: any;
}

const  UI: React.FC<AuthProps> = ({config}) => {

  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [scope, setScope] = useState("openid email profile roles");
  const [active, setActive] = useState(0);
  const [clientFormVisible, setClientFormVisible] = useState(false);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  // If we're waiting for an auth state update
  return (
    <Container fluid style={{ width: '60%' }}>
      <Center>
        <Card shadow="lg" radius="xl" style={{ width: "100%", minHeight: 300 }}>


          <Box px={16} style={{ display: 'flex', flexDirection: 'column' }}>
            <Card.Section
              style={{ display: 'flex', justifyContent: 'center' }}
              py={12}
            >
              <Image src={LOGO_URL} width={75} height={75} />
            </Card.Section>
            <Title align="center" order={3} mt={6}>
                Step by step guide for Client Registration and Token Generation {active}
            </Title>
            <br />

            <Stepper active={active} onStepClick={setActive} breakpoint="sm">
                <Stepper.Step label="Client Registration" description="Register Client Application">
                    <p>Before JSON Web Tokens (JWT) can be generated and used for protected API access, a Client Application must registered with the ALA. Once registered, a Client ID, and optionally, a client Secret will be provided to the resource owner i.e. user. for token generation and refresh.</p>
                    <p>If you do not yet have Client Details,  click 'Register'</p>

                </Stepper.Step>
                <Stepper.Step label="Enter Client Details" description="Enter Client details e.g. Client ID and Secret of the registered application">
                  <TextInput
                      label="ClientID"
                      placeholder="exmaple-client-id"
                      description="Client ID of a registered application"
                      id='client-id'
                      value={clientId} onChange={(event) => setClientId(event.currentTarget.value)} onKeyUp={(event) => setClientId(event.currentTarget.value)}
                      required
                  />

                  <TextInput
                      label="Scope"
                      placeholder="openid email ala"
                      description="Scopes to include for the JWT"
                      value={scope} onChange={(event) => setScope(event.currentTarget.value)}  onKeyUp={(event) => setScope(event.currentTarget.value)}  
                  />

                  <TextInput
                      label="ClientSecret (Optional)"
                      type='password'
                      description="Client secret of a registered application. Only required for clients registered as private client applications(eg. server side web application)."
                      value={clientSecret} onChange={(event) => setClientSecret(event.currentTarget.value)} onKeyUp={(event) => setClientSecret(event.currentTarget.value)}
                  />
                </Stepper.Step>

                <Stepper.Step label="Token Generation" description="Generate a JWT token">
                </Stepper.Step>
            </Stepper>
    
            <Group position="center" mt="xl">
                <Button  variant="default" disabled={(clientFormVisible && active == 0)} onClick={ active  > 0 ? prevStep : function(){setClientFormVisible(!clientFormVisible)}}> {active === 0 ? 'Register' :'Back' }</Button>
                {<Button  disabled={(active === 1  && clientId.length < 1) || active === 2} onClick={function(){nextStep();  setClientFormVisible(false)}}> {active < 1 ? 'I have Client Details' :'Next' } </Button>}
            </Group>
            <br/>

            <Transition mounted={clientFormVisible} transition="scale-y" duration={500} timingFunction="ease">
                {(styles) => <div style={styles}><ClientRegistration/></div>}
              </Transition>


            {/* The AuthContext provided by AuthProvider does not seem to allow updating of the client_id, client_secret, scope which is required for this workflow on the docs portal 
            to allow users to enter their client details. Rendering a new AuthProvider and therefore creating a new context each tome a user reaches the final step of the workflow gets around this issue.  */}

            {active === 2  && 
                        <AuthProvider
                        client_id={clientId}
                        client_secret={clientSecret}
                        authority={config.authority}
                        redirect_uri={config.redirect_uri}
                        scope={scope}
                        onSigninCallback={(user) => {
                          // console.log(user)
                          // window.history.replaceState({ path: '/' }, '', '/');
                        }}
                      >
                         <Auth  />
                    </AuthProvider>
            }
            {/* NOT entirely sure how this work but having This  AuthContext/AuthProvider seems to maintain the authentication state of the ABOVE provider when being redirected to callback url */}
            {active < 1  && 
                      <AuthProvider
                      client_id=""
                      authority={config.authority}
                      redirect_uri={config.redirect_uri}
                      scope={scope}
                      onSigninCallback={(user) => {
                        window.history.replaceState({ path: '/' }, '', '/');
                      }}
                    >
                  </AuthProvider>
          }
          </Box>
        </Card>
      </Center>
    </Container>
  );

}

export default UI;
