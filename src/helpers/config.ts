export interface AuthConfig {
  authority: string;
  client_id: string;
  redirect_uri: string;
}

const config: AuthConfig = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
};

export default config;
