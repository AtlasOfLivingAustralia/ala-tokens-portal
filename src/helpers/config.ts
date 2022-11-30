export interface AuthConfig {
  authority: string;
  redirect_uri: string;
}

const config: AuthConfig = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
};

export default config;
