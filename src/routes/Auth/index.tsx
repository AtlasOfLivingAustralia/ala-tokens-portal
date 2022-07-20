import { ReactElement, useCallback } from 'react';
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
} from '@mantine/core';

import { Prism } from '@mantine/prism';
import { useAuth } from 'react-oidc-context';

const LOGO_URL =
  'https://www.ala.org.au/app/uploads/2020/06/ALA_Logo_Mark-only.png';

function Auth(): ReactElement {
  const auth = useAuth();
  const onClick = useCallback(() => {
    if (auth.isAuthenticated) {
      auth.signoutRedirect();
    } else {
      auth.signinRedirect();
    }
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
        <Card shadow="lg" radius="xl" style={{ width: 500, minHeight: 300 }}>
          <Box px={16} style={{ display: 'flex', flexDirection: 'column' }}>
            <Card.Section
              style={{ display: 'flex', justifyContent: 'center' }}
              py={12}
            >
              <Image src={LOGO_URL} width={75} height={75} />
            </Card.Section>
            <Title align="center" order={3} mt={6}>
              ALA SPA Auth
            </Title>
            <Text align="center" color="dimmed" mt={12}>
              {auth.isAuthenticated
                ? 'You are authenticated'
                : 'You are not authenticated'}
            </Text>
            {auth.isAuthenticated && (
              <Prism language="json" style={{ width: 435 }} mt={24}>
                {JSON.stringify(auth.user, null, 2)}
              </Prism>
            )}
            <Button
              color="rust"
              mt={32}
              mb={auth.isAuthenticated ? 12 : 0}
              onClick={onClick}
            >
              {auth.isAuthenticated ? 'Sign Out' : 'Sign In'}
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
