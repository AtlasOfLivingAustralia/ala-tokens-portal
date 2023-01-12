const AWS = require("aws-sdk");
var ses = new AWS.SES({ region: "ap-southease-2" });

const SOURCE_EMAIL= process.env.SOURCE_EMAIL;
const DEST_EMAIL = process.env.DEST_EMAIL;

exports.handler = async (event, context) => {
    if(!event.appName || !event.callbackUrl || !event.resourceOwner || !event.scopes || !event.resourceOwnerEmail || !event.additionalInfo){
        return {
            statusCode: 400,
            body: JSON.stringify('Bad request'),
        };
    }
   
    const body = `Hello There, %0d%0a %0d%0a This is a user generated request from the ALA Docs Portal for Client Application Registration  in the ALA Auth System. Please find the details below. %0d%0a
    1. Application Name / Access Reason: ${event.appName} %0d%0a
    2. Callback URL: ${event.callbackUrl} %0d%0a
    3. Resource Owner: ${event.resourceOwner} %0d%0a
    4. Scopes: ${event.scopes} %0d%0a
    5. Resource Owner Contact: ${event.resourceOwnerEmail} %0d%0a
    6. Additional Info: ${event.additionalInfo} %0d%0a "%0d%0aRegards, %0d%0a Auto-generated via ALA Docs Portal "
    `
   
    const emailparams = {
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

      let response;

      try{
        const x = await  ses.sendEmail(emailparams).promise()
        response = {
            statusCode: 200,
            body: "Request submitted successfully!",
        };
          
      } catch(e){
            response = {
                statusCode: 500,
                body: "Unable to submit request",
            };
      } finally{
          return response;
      }
};