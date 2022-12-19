import { useState } from 'react';
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
} from '@mantine/core';


import Auth, { AuthProps } from './token-generation';

import ClientRegistration from './client-registration';
import { IconInfoCircle } from '@tabler/icons';


const  UI: React.FC<{config: AuthProps}> = ({config}) => {

  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [scope, setScope] = useState("openid email profile");
  const [active, setActive] = useState(0);
  const [clientFormVisible, setClientFormVisible] = useState(false);

  // return a AuthProps object and required configs with latest client details to be passed to the Auth component for token generation.
  const clientDetails  = (): AuthProps => {
      return {client_id:clientId, client_secret: clientSecret, scope, authority: config.authority, redirect_uri: config.redirect_uri, popup_post_logout_redirect_uri: config.popup_post_logout_redirect_uri}
  }

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


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
                    <p>If you do not yet have Client Details,  click 'Register'and follow the registration process.</p>

                </Stepper.Step>
                <br />
                <Stepper.Step label="Enter Client Details" description="Enter Client details e.g. Client ID and Secret of the registered application">
                  <TextInput
                      label="Client ID"
                      placeholder="exmaple-client-id"
                      description="Client ID of a registered application"
                      id='client-id'
                      value={clientId} onInput={(event) => setClientId(event.currentTarget.value)} 
                      required
                  />
                  <br />  
                  <TextInput
                      label="Scopes"
                      placeholder="openid email ala"
                      description="Scopes (resource permission) to assign for the access token"
                      value={scope} onInput={(event) => setScope(event.currentTarget.value)}  
                  />
                  <br />
                  <TextInput
                      label="Client Secret (Optional)"
                      placeholder="Client secret"
                      type='password'
                      description="Client secret of a registered application. Only required for clients registered as private client applications(eg. server side web application)."
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

            <Transition mounted={clientFormVisible} transition="scale-y" duration={500} timingFunction="ease">
                {(styles) => <div style={styles}><ClientRegistration/></div>}
              </Transition>

          </Box>
        </Card>
      </Center>
    </Container>
  );

}

export default UI;
