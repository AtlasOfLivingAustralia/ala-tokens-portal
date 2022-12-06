/**
 * Page to handle the callback after being redirected by the OAuth Service upon logout
 */
 import { Fragment, ReactElement} from 'react';
 import { UserManager } from 'oidc-client-ts';
 
 function LogoutCallback(): ReactElement {
     const dummyClientDetails = JSON.parse('{}');
     // call signoutPopupCallback to pass results back to the calling window
     new UserManager(dummyClientDetails).signoutPopupCallback()
     
     return (<Fragment></Fragment>);
 }
 
 export default LogoutCallback;