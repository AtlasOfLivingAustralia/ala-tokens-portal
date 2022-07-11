import { ReactElement, useState } from 'react';
import {
  Card,
  Container,
  Center,
  Title,
  Image,
  Text,
  Box,
  Button,
} from '@mantine/core';

import { Prism } from '@mantine/prism';

import {
  getClient,
  getToken,
  getAuthUrl,
  signInWithRedirect,
  signOut,
  OIDCAuthResult,
  // eslint-disable-next-line import/no-relative-packages
} from '../../../../ala-web-auth/dist';

function Auth(): ReactElement {
  const [token, setToken] = useState<OIDCAuthResult | null>(getToken());

  const onClick = (): void => {
    if (!token) {
      const client = getClient(
        'oidc-test-client-id',
        ['openid', 'email', 'profile', 'users:read'],
        'test'
      );
      console.log(getAuthUrl(client, 'https://localhost:3000'));
      signInWithRedirect(client, 'http://localhost:3000');
    } else {
      signOut();
      setToken(null);
    }
  };

  console.log(token);

  // If we're waiting for an auth state update
  return (
    <Container fluid style={{ display: 'flex' }}>
      <Center>
        <Card shadow="lg" radius="xl" style={{ width: 500, minHeight: 300 }}>
          <Box px={16} style={{ display: 'flex', flexDirection: 'column' }}>
            <Card.Section
              style={{ display: 'flex', justifyContent: 'center' }}
              py={12}
            >
              <Image
                src="https://www.ala.org.au/app/uploads/2020/06/ALA_Logo_Mark-only.png"
                width={75}
                height={75}
              />
            </Card.Section>
            <Title align="center" order={3} mt={6}>
              ALA SPA Auth
            </Title>
            <Text align="center" color="dimmed" mt={12}>
              {token ? 'You are authenticated' : 'You are not authenticated'}
            </Text>
            {token && (
              <Prism language="json" style={{ width: 435 }} mt={24}>
                {JSON.stringify(token, null, 2)}
              </Prism>
            )}
            <Button color="rust" mt={32} mb={token ? 12 : 0} onClick={onClick}>
              {token ? 'Sign Out' : 'Sign In'}
            </Button>
          </Box>
        </Card>
      </Center>
    </Container>
  );

  //   return token ? (
  //     <div>
  //       <div>Auth (Logged In)</div>
  //       <div>Token: {JSON.stringify(token)}</div>
  //       <button
  //         onClick={() => {
  //           signOut();
  //           window.location.reload();
  //         }}
  //         type="button"
  //       >
  //         Logout
  //       </button>
  //     </div>
  //   ) : (
  //     <div>
  //       <div>Auth (Logged Out)</div>
  //       <button onClick={login} type="button">
  //         Login
  //       </button>
  //     </div>
  //   );
}

export default Auth;
