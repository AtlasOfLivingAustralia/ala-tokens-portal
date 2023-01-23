import {Accordion, Box, Container} from '@mantine/core';

function Faq(): React.ReactElement {
    return (
        <div style={{padding:"0 20% 0 10%"}}>
          <Accordion>
            <Accordion.Item label="Why do I need a token?">
                ALA aggregates data from many providers, and most of these data are open and freely accessible to all. However, some data are private for their intended audience only, such as for user accounts, location data for sensitive species, and administration/edit access to particular projects. 
                We use access tokens as a secure method of verifying user access to these specific APIs.
            </Accordion.Item>

            <Accordion.Item label="Why do need to register?">
              Access Tokens (JWTs) need to be associated with a registered application and as such, a Client Application must be registered with the ALA. 
              <br />
              The level of access to resources, i.e. scopes,  an access token has is defined in the Client Application amongst other permissions and restrictions. These attributes will be applied to any and all access tokens generated using the associated Client Id and Secret. 
            </Accordion.Item>

            <Accordion.Item label="How long will it take to receive the Client ID and Secret?">
              Once you’ve submitted the registration form, our team will respond to you as soon as they can. This may take some time if they are working through many requests. 
              <br />
              Please note, our office hours are Monday to Friday, 9am-5pm Australian Eastern Time, so requests submitted outside of this will not be actioned until the next business day. We also close for Australian public holidays and the holiday period in Dec-Jan each year.
            </Accordion.Item>


            <Accordion.Item label="My Client ID and Secret aren’t working. What steps should I try?">
              The first step is to ensure that the Client ID, Secret, and Scopes being used are correct. To check their validity, please follow the the step-by-step token generation process on this site. 
              <br />
              Since the step-by-step token generation process requires you to authenticate with your ALA account, please ensure that you have an ALA account that it is activated. 
              <br />
              <br />
              If using one of the other methods of tokens generation listed in the Docs Portal e.g. Client Credentials, Authentication Code Flow, Implicit Flow - please ensure the correct authentication domain <b>auth.ala.org.au</b> is being used and  
               follow the Postman <a href="https://www.postman.com/sushantcsiro/workspace/ala-common-apis/collection/23926959-0b42d403-9afd-415d-b431-99b4e37691a4" target="_blank">collection</a>  for usage examples. 
              <br />
              If you're still unable to generate token using the above steps - your Client credentials might no longer be valid or might not have the necessary permissions to generate tokens with the requested scopes.  
              <br />
              <br />
              Please contact ALA Support on support@ala.org.au if you believe these credentials are no longer valid or if you are having issues with you ALA account. 
            </Accordion.Item>

            <Accordion.Item label="I need help with something else..">
              Please reach out to us at suport@ala.org.au with any other questions.  
            </Accordion.Item>
          </Accordion>

          </div>
    );
  }

export default Faq;