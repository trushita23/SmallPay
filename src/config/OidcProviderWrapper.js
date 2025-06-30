import { AuthProvider } from "react-oidc-context";
import { CLIENT_ID } from "../config";

const oidcConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_KHNJs8370",
  client_id: CLIENT_ID,
  redirect_uri: "http://localhost:3000",
  response_type: "code",
  scope: "phone openid email",
};

export default function OidcProviderWrapper({ children }) {
  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
}
