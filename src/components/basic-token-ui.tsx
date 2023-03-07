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
  Notification,
  Select,
} from '@mantine/core';


import Auth from './token-generation';

import ClientRegistration from './client-registration';
import { IconCheck, IconInfoCircle } from '@tabler/icons';
import { AuthConfig } from '../helpers/config';


const BasicFlow: React.FC<{config: AuthConfig}> = ({config}) => {

  const [clientId, setClientId] = useState(config.client_id);
  const [clientSecret, setClientSecret] = useState(config.client_secret);
  const [scope, setScope] = useState(config.scope);
  const [active, setActive] = useState(0);
  const [clientFormVisible, setClientFormVisible] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // return a AuthConfig object and required configs with latest client details to be passed to the Auth component for token generation.
  const clientDetails  = (): AuthConfig => {
      return {client_id:clientId, client_secret: clientSecret, scope, authority: config.authority, redirect_uri: config.redirect_uri, popup_post_logout_redirect_uri: config.popup_post_logout_redirect_uri}
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
                Basic Usage - JWT Generation for API Usage
            </Title>
            <br />
                <Select
          label="Select from Client IDs"
          placeholder="Select from one of your OAuth Client Ids against which to generate a access token"
          data={[
              { value: 'react', label: 'Automatically register a new Client' },
              { value: 'ng', label: config.client_id },
              ]}
            />
            <Auth clientDetails={clientDetails()} type="basic"/>
            <br/>

          </Box>
        </Card>
      </Center>
    </Container>
  );

}

export default BasicFlow;
