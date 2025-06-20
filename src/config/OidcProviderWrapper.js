import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  authority: "",
  client_id: "", // Get from AWS
  redirect_uri: "",
  response_type: "code",
  scope: "phone openid email",
};

export default function OidcProviderWrapper({ children }) {
  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
}
