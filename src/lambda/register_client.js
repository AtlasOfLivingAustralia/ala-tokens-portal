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
    
   
    const body = `Hi There,  
    This is a user generated request from the ALA Docs Portal for Client Application Registration in the ALA Auth System. 
    Please find the details below. 
        1. Application Name / Access Reason: ${event.appName} 
        2. Callback URL: ${event.callbackUrl} 
        3. Resource Owner: ${event.resourceOwner} 
        4. Scopes: ${event.scopes} 
        5. Resource Owner Contact: ${event.resourceOwnerEmail} 
        6. Additional Info: ${event.additionalInfo}

Regards,
Auto-generated via ALA Docs Portal 

    `
    const emailParams = {
        Destination: {
          ToAddresses: [DEST_EMAIL],
          CcAddresses: [event.resourceOwnerEmail]
        },
        Message: {
          Body: {
            Text: { Data: body}
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