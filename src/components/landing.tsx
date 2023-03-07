import { useState } from 'react';
import {
  Container,
  Center,
  Button,
  Group,
  Card,
  Text,
  Badge,
  Title
  
} from '@mantine/core';


import { Prism } from '@mantine/prism';
import { IconAlertCircle, IconDownload} from '@tabler/icons';
import { User, UserManager } from 'oidc-client-ts';
import { AuthConfig } from '../helpers/config';
import { Link } from 'react-router-dom';

const AuthType:  React.FC<{config: AuthConfig}> = ({config}) => {

  return (
    <Container fluid style={{ width: '60%', minWidth:'600px', maxHeight:'100%'}}>
      <Center>
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Title align="center" order={3} mt={6}>
                Select application/usage type
            </Title>
            <br/>
            <Card shadow="sm" p="lg" radius="md" withBorder>
                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>Basic Usage</Text>
                    <Badge color="green" variant="light">
                        Basic
                    </Badge>
                </Group>

                <Text size="sm" color="dimmed">
                    API Access e.g. Protected APIs at docs.ala.org.au 
                </Text>

                <Link to="/basic">
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                        Select
                    </Button>
                </Link>
            </Card> 
            <br/>
            <Card shadow="sm" p="lg" radius="md" withBorder>
                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>Advanced Usage</Text>
                    <Badge color="green" variant="light">
                        Advanced
                    </Badge>
                </Group>

                <Text size="sm" color="dimmed">
                    Machine to Machine (M2M), Mobile Application, Single Page Application(SPA) 
                </Text>
                <Link to="/advanced">
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                        Select
                    </Button>
                </Link>
              
            </Card> 
        </Card> 

      </Center>
    </Container>
  );

}

export default AuthType;