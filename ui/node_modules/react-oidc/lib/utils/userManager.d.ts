import { UserManagerSettings } from 'oidc-client';
export interface IMockUserManagerOptions extends UserManagerSettings {
    getUserFunction: () => Promise<any>;
    signinRedirectCallback: () => Promise<any>;
    signinRedirectFunction: () => void;
}
declare const _default: any;
export default _default;
