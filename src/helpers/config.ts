export interface AuthConfig {
  client_id: string,
  client_secret?: string;
  scope?: string;
  authority: string;
  redirect_uri: string;
  popup_post_logout_redirect_uri?: string; 
}

const config: AuthConfig = {
  client_id: import.meta.env.VITE_CLIENT_ID,
  client_secret: import.meta.env.VITE_CLIENT_SECRET,
  scope: import.meta.env.VITE_SCOPE,
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  popup_post_logout_redirect_uri: import.meta.env.VITE_OIDC_LOGOUT_REDIRECT_URI,
};

export default config;
