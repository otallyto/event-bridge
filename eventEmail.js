const AWS = require('aws-sdk');

const handler = async (event)=> {
const {email} = JSON.parse(event.body)
  const notify= await notifyMarketingTeam(email)
  return {
    statusCode: 200,
    body: JSON.stringify({notify, message: 'ok deu tudo certo', email})
  }
}

function notifyMarketingTeam(email) {
  const eventBridge = new AWS.EventBridge({ region: 'us-east-1' }); 
 
  return eventBridge.putEvents({
    Entries: [
      {
        EventBusName: 'marketing',
        Source: 'acme.newsletter.campaign',
        DetailType: 'UserSignUp',
        Detail: `{ "E-Mail": "${email}" }`,
    },
    ]
  }).promise()
 }

 module.exports = {handler} 
 