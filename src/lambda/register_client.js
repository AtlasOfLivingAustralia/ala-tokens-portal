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
    
   
    const registrationBody = `
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
        
        <br>
        <p>Regards,</p>
        <p>ALA Systems Team</p>
    `
    
    
    const confirmationBody = `
        <p>Dear User, </p>
     
        <p>This is an auto-generated response from the Atlas of Living Australia's (ALA) Tokens Application</p>

        <p>We'd like to let you know that your Client Application Registration request has been submitted to ALA. Our team will review your request and respond to you as soon as they can.</p>
        

        <br>
        <p>Regards,</p>
        <p>ALA Systems Team</p>
        <p><a href="https://ala.org.au">ala.org.au</a></p>
        
        <p style="font-size: small">This email address <strong>(${event.resourceOwnerEmail}) </strong> was provided to us via the ALA Tokens App at <a href="https://tokens.ala.org.au">tokens.ala.org.au</a>. If you <strong>did not</strong> submit a request in relation to API access, please email us at support@ala.org.au as soon as possible.
        </p>
    `

    // send email from ALA SRC_EMAIL to ALA DEST_EMAIL - this should create a ticket in service desk
    const registrationEmailParams = {
        Destination: {
          ToAddresses: [DEST_EMAIL]
        },
        Message: {
          Body: {
            Html: { Data: registrationBody}
          },
    
          Subject: { Data: "Request for ALA Client Application Registration" },
        },
        Source: SOURCE_EMAIL,
      };

      // send a confirmation email from from the public DEST_EMAIL  to requesting user
      const confirmationEmailParams = {
        Destination: {
          ToAddresses: [event.resourceOwnerEmail]
        },
        Message: {
          Body: {
            Html: { Data: confirmationBody}
          },
    
          Subject: { Data: "Request for ALA Client Application Registration" },
        },
        Source: DEST_EMAIL,
      };
      
  
    try {
      const registrationCommand  = new SendEmailCommand(registrationEmailParams)
      const confirmationCommand  = new SendEmailCommand(confirmationEmailParams)
      await client.send(registrationCommand)
      await client.send(confirmationCommand)
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