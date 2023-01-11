import {Accordion, Box, Container} from '@mantine/core';

function Faq(): React.ReactElement {
    return (
        <div style={{"width":"90%"}}>
          <Accordion>
            <Accordion.Item label="Why do I need a token?">
                ALA aggregates data from many providers, and most of these data are open and freely accessible to all. However, some data are private for their intended audience only, such as for user accounts, location data for sensitive species, and administration/edit access to particular projects. 
                We use access tokens as a secure method of verifying user access to these specific APIs.
            </Accordion.Item>

            <Accordion.Item label="Why do need to register?">
              Access Tokens (JWTs) need to be associated with a registered application and as such, a Client Application must be registered with the ALA. 
              The level of access to resources, i.e. scopes,  an access token has is defined in the Client Application amongst other permissions and restrictions. These attributes will be applied to any and all access tokens generated using the associated Client Id and Secret. 
            </Accordion.Item>

            <Accordion.Item label="How long will it take to receive the Client ID and Secret?">
              Once you’ve submitted the registration form, our team will respond to you as soon as they can. This may take some time if they are working through many requests. 
            </Accordion.Item>
          </Accordion>
          </div>
    );
  }

export default Faq;