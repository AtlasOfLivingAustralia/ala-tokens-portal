import { useEffect, useState } from 'react';
import {
  Card,
  Container,
  Center,
  Title,
  Box,
  Button,
  Stepper,
  Group,
  TextInput,
  Transition,
  Header,
  Text,
  Alert,
  Notification,
} from '@mantine/core';


import Auth from './token-generation';

import ClientRegistration from './client-registration';
import { IconCheck, IconInfoCircle } from '@tabler/icons';
import { AuthConfig } from '../helpers/config';
import { useSearchParams } from 'react-router-dom';


const  UI: React.FC<{config: AuthConfig}> = ({config}) => {

  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [scope, setScope] = useState("openid email profile ala/roles");
  const [active, setActive] = useState(0);
  const [clientFormVisible, setClientFormVisible] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // check url param for app `step` and set the visibility of app client registration accordingly.
    const step = searchParams.get('step');
    if(step && step === 'registration' && active === 0){
      setClientFormVisible(true);
      // remove url params after registration visibility state is updated. 
      setSearchParams('');
    }

    if(step && step === 'generation'){
      const clientId = searchParams.get('client_id');
      const clientSecret = searchParams.get('client_secret');
      setActive(1);
      if(clientId){
        setClientId(clientId)
      }
      if(clientSecret){
        setClientSecret(clientSecret)
      }
      // remove url params after registration visibility state is updated. 
      setSearchParams('');
    }

  });

  // return a AuthConfig object and required configs with latest client details to be passed to the Auth component for token generation.
  const clientDetails  = (): AuthConfig => {
      return {client_id:clientId, client_secret: clientSecret, scope, authority: config.authority, redirect_uri: config.redirect_uri, cognito_logout_uri: config.cognito_logout_uri, popup_post_logout_redirect_uri: config.popup_post_logout_redirect_uri}
  }

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  // set registration success state and set  clientFormVisible to false to prevent it from appearing again it after reset
  const updateRegistrationSuccess = (status: boolean) => {
    setRegistrationSuccess(status);
    setClientFormVisible(false);

  }


  // If we're waiting for an auth state update
  return (
    <Container fluid style={{ width: '60%', minWidth:'600px', maxHeight:'100%'}}>
      <Center>
        <Card shadow="lg" radius="xl" style={{ width: "100%", minHeight: 300 }}>


          <Box px={16} style={{ display: 'flex', flexDirection: 'column' }}>
            <Card.Section
              style={{ display: 'flex', justifyContent: 'center' }}
              py={12}
            >
            </Card.Section>
            <Title align="center" order={3} mt={6}>
                Step by step guide for Client Registration and Token Generation 
            </Title>
            <br />

            <Stepper active={active} onStepClick={setActive} breakpoint="sm">
                <Stepper.Step label="Client Registration" description="Register Client Application">
                    <br />
                    <Alert icon={<IconInfoCircle size={16} />} color="blue"> Before JSON Web Tokens (JWT) can be generated and used for protected API access, a Client Application must registered with the ALA. Once registered, a Client ID, and optionally, a Client Secret will be provided to the resource owner i.e. user. for token generation and refresh.</Alert>
                    <p>If you do not yet have Client Details,  click 'Register' and follow the registration process.</p>

                </Stepper.Step>
                <br />
                <Stepper.Step label="Enter Client Details" description="Enter Client details e.g. Client ID and Secret of the registered application">
                  <TextInput
                      label="Client ID"
                      placeholder="example-client-id"
                      description="Client ID of a registered application"
                      id='client-id'
                      value={clientId} onInput={(event) => setClientId(event.currentTarget.value)} 
                      required
                  />
                  <br />  
                  <TextInput
                      label="Scopes"
                      placeholder="openid email ala"
                      description="Scopes (resource permissions) to assign for the access token"
                      value={scope} onInput={(event) => setScope(event.currentTarget.value)}  
                  />
                  <br />
                  <TextInput
                      label="Client Secret (Optional)"
                      placeholder="Client secret"
                      type='password'
                      id='client-secret'
                      description="Client secret of a registered application. Only required for clients registered as private client applications( eg. server side web application)."
                      value={clientSecret} onInput={(event) => setClientSecret(event.currentTarget.value)} 
                  />
                </Stepper.Step>

                <Stepper.Step label="Token Generation" description="Generate a JWT token">
                    <Auth clientDetails={clientDetails()}/>
                </Stepper.Step>
            </Stepper>
    
            <Group position="center" mt="xl">
                 <Button   variant="default"  disabled={(clientFormVisible && active == 0)} onClick={ active  > 0 ? prevStep : function(){setClientFormVisible(!clientFormVisible)}}> {active === 0 ? 'Register' :'Back' }</Button>
                {<Button  disabled={(active === 1  && clientId.length < 1) || active === 2} onClick={function(){nextStep();  setClientFormVisible(false)}}> {active < 1 ? 'Enter Client Details' :'Next' } </Button>}
            </Group>
            <br/>

            <Transition mounted={clientFormVisible && !registrationSuccess} transition="scale-y" duration={100} timingFunction="ease">
                {(styles) => <div style={styles}><ClientRegistration config={config} updateRegistrationSuccess={updateRegistrationSuccess}/></div>}
              </Transition>

              { registrationSuccess  && <Notification disallowClose={true} icon={<IconCheck size={18} />} color="teal" title="Registration submitted successfully">
               ALA support will be in contact with you shortly.
        </Notification> }

          </Box>
        </Card>
      </Center>
    </Container>
  );

}

export default UI;
