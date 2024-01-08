export interface AuthConfig {
  client_id: string,
  client_secret?: string;
  scope?: string;
  authority: string;
  cognito_logout_uri?: string;
  redirect_uri: string;
  popup_post_logout_redirect_uri?: string; 
  tokens_api?: string;
  userdetails_url?: string;
}

const config: AuthConfig = {
  client_id: import.meta.env.VITE_CLIENT_ID,
  client_secret: import.meta.env.VITE_CLIENT_SECRET,
  scope: import.meta.env.VITE_SCOPE,
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  cognito_logout_uri: import.meta.env.VITE_COGNITO_LOGOUT_URI,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  popup_post_logout_redirect_uri: import.meta.env.VITE_OIDC_LOGOUT_REDIRECT_URI,
  tokens_api:  import.meta.env.VITE_TOKENS_API,
  userdetails_url: import.meta.env.VITE_USERDETAILS_URL,
};

export default config;
