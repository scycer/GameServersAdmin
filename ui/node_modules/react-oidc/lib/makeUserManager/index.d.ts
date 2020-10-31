import { UserManager, UserManagerSettings } from 'oidc-client';
declare function makeUserManager(config: UserManagerSettings & {
    domain?: string;
    audience?: string;
}, umClass?: any): UserManager;
export default makeUserManager;
