import * as React from 'react';
import { User, UserManager } from 'oidc-client';
export interface ICallbackProps {
    onSuccess?: (user: User) => void;
    onError?: (err: any) => void;
    userManager: UserManager;
}
declare class Callback extends React.Component<ICallbackProps> {
    componentDidMount(): void;
    render(): {};
}
export default Callback;
