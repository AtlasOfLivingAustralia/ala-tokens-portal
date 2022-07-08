import { ReactElement } from 'react';

import {
  getClient,
  getToken,
  signInWithRedirect,
  signOut,
  // eslint-disable-next-line import/no-relative-packages
} from '../../../../ala-web-auth/dist';

function Auth(): ReactElement {
  const token = getToken();

  const login = (): void => {
    const client = getClient(
      'oidc-test-client-id',
      ['openid', 'email'],
      'test'
    );
    signInWithRedirect(client, 'http://localhost:3000');
  };

  // If we're waiting for an auth state update
  return token ? (
    <div>
      <div>Auth (Logged In)</div>
      <div>Token: {JSON.stringify(token)}</div>
      <button
        onClick={() => {
          signOut();
          window.location.reload();
        }}
        type="button"
      >
        Logout
      </button>
    </div>
  ) : (
    <div>
      <div>Auth (Logged Out)</div>
      <button onClick={login} type="button">
        Login
      </button>
    </div>
  );
}

export default Auth;
