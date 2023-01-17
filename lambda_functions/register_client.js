const AWS = require("aws-sdk");
var ses = new AWS.SES({ region: "ap-southeast-2" });

const SOURCE_EMAIL= process.env.SOURCE_EMAIL;
const DEST_EMAIL = process.env.DEST_EMAIL;

exports.handler =  async (event, context) => {
    if(!event.appName || !event.resourceOwner || !event.resourceOwnerEmail){
        return {
            statusCode: 400,
            body: JSON.stringify('Bad request'),
        };
    } 
    
   
    const body = `Hello There,   
    
      This is a user generated request from the ALA Docs Portal for Client Application Registration in the ALA Auth System. Please find the details below. 
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
      // using async/await required .promise() to be called as per https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/using-async-await.html
      const result = await ses.sendEmail(emailParams).promise();
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