import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useHistory } from "react-router-dom";

const Callback = () => {
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    // Manually trigger sign-in callback processing
    auth.signinCallback().then(() => {
      history.replace("/"); // redirect after successful login
    });
  }, []);

  return <div>Signing in...</div>;
};

export default Callback;
