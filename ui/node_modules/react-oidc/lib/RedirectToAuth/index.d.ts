import * as React from 'react';
import { UserManager, User } from 'oidc-client';
export interface IRedirectToAuthProps {
    userManager: UserManager;
    onSilentSuccess: (user: User) => void;
    signinArgs?: any;
}
declare class RedirectToAuth extends React.Component<IRedirectToAuthProps> {
    componentDidMount(): Promise<void>;
    render(): {};
    private redirectToSignIn;
    private silentlySignIn;
}
export default RedirectToAuth;
