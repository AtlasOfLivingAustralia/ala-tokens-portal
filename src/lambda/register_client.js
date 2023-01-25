const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const client = new SESClient({ region: "ap-southeast-2" });


const SOURCE_EMAIL= process.env.SOURCE_EMAIL;
const DEST_EMAIL = process.env.DEST_EMAIL;

exports.handler =  async (event, context) => {
    if(!event.appName || !event.resourceOwner || !event.resourceOwnerEmail){
        return {
            statusCode: 400,
            body: JSON.stringify('Bad request'),
        };
    } 
    
   
    const body = `
        <h4>ATTN: ALA Support </br>This is a user generated request from the Atlas of Living Australia's (ALA) Tokens Application</h4>

        <p>Please find the Client application registration details below: </p>
        <ul style="list-style-type: decimal">
        <li>
        <strong> Application Name / Access Reason: </strong>     ${event.appName} 
        </li>
        <li>
        <strong>Callback URL: </strong> ${event.callbackUrl} 
        </li>
        <li>
        <strong>Resource Owner: </strong> ${event.resourceOwner} 
        </li>
        <li>
        <strong> Scopes: </strong> ${event.scopes} 
        </li>
        <li>
        <strong> Resource Owner Contact: </strong> ${event.resourceOwnerEmail}
        </li>
        <li>
        <strong> Additional Info: </strong> ${event.additionalInfo}
        </li>
        </ul>
        
        <p>Regards,</br>
        ALA Systems Team
        </p>
        
        <p style="font-size: small">This email address <strong>(${event.resourceOwnerEmail}) </strong> included in the CC was provided to us via the ALA Tokens App at <a href="https://tokens.ala.org.au">tokens.ala.org.au</a>. If you <strong>did not</strong> submit a request in relation to API access, please email us at support@ala.org.au as soon as possible.
        </p>
    
    `
    const emailParams = {
        Destination: {
          ToAddresses: [DEST_EMAIL],
          CcAddresses: [event.resourceOwnerEmail]
        },
        Message: {
          Body: {
            Html: { Data: body}
          },
    
          Subject: { Data: "Request for ALA Client Application Registration" },
        },
        Source: SOURCE_EMAIL,
      };
      
  
    try {
      const command  = new SendEmailCommand(emailParams)
      await client.send(command)
      return {
        statusCode: 200,
        body: "Request submitted successfully!"
      };
    } catch (e) {
      console.log(e)
        return {
          statusCode: 500,
          body: "Error. Unable to submit request to ALA Support"
        };
    }
    
};