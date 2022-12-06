/**
 * Page to handle the callback after being redirected by the OAuth Service upon login
 */
import { Fragment, ReactElement} from 'react';
import { UserManager } from 'oidc-client-ts';

function LoginCallback(): ReactElement {
    const dummyClientDetails = JSON.parse('{}');
    // call signinPopupCallback to pass results back to the calling window
    new UserManager(dummyClientDetails).signinPopupCallback()
    
    return (<Fragment></Fragment>);
}

export default LoginCallback;