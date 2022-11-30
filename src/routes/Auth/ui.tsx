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
} from '@mantine/core';

import { Prism } from '@mantine/prism';
import { AuthContext, AuthProvider } from 'react-oidc-context';
import Auth from '.';


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
  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

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
            </Stepper>
    
            <Group position="center" mt="xl">
                <Button  variant="default" onClick={ active  > 0 ? prevStep : function(){}}>{active === 0 ? 'Request Client Details' :'Back' }</Button>
                {active < 3 && <Button   disabled={(active === 1  && clientId.length < 1) ||  active === 2} onClick={nextStep}> {active < 1 ? 'I have Client Details' :'Next' } </Button>}
            </Group>

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
                          window.history.replaceState({ path: '/' }, '', '/');
                        }}
                      >
                         <Auth  />
                    </AuthProvider>
            }
            {/* NOT entirely sure how this work but having This  AuthContext/AuthProvider seems to maintain the authentication state of the ABOVE provider when being redirected to callback url */}
            {active !== 2  && 
                      <AuthProvider
                      client_id=""
                      authority={config.authority}
                      redirect_uri={config.redirect_uri}
                      scope={scope}
                      onSigninCallback={(user) => {
                        window.history.replaceState({ path: '/' }, '', '/');
                      }}
                    >
                       <Auth  />
                  </AuthProvider>
          }
          </Box>
        </Card>
      </Center>
    </Container>
  );

}

export default UI;
