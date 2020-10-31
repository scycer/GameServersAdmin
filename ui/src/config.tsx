import { UserManagerSettings } from "oidc-client";

const userManagerConfig: UserManagerSettings = {
  authority:
    "https://login.microsoftonline.com/58b78a72-3261-46db-86b7-47da69a7cc79/v2.0",
  redirect_uri: `https://${window.location.host}/callback`,
  response_type: "code", // Automatically uses Auth Code PKCE flow
  client_id: "",
  scope: " ",
  automaticSilentRenew: true,
};

export default userManagerConfig;
