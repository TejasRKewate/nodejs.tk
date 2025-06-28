const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken);
client.studio.v2.flows('FW6d59dbbe08e80505ad61a2fe961311ee')
    .executions
    .create({
        to: '+917517416409',
        from: process.env.TWILIO_PHONE_NUMBER,
    })
    .then(execution => console.log(execution.sid));

function sendCall(to){
    try{
        const call = client.studio.v2.flows('FW6d59dbbe08e80505ad61a2fe961311ee')
        .executions
        .create({
            to: to,
            from: process.env.TWILIO_PHONE_NUMBER,
        })
        .then(execution => console.log(execution.sid));
    }
    catch(error){
        console.log(error)
    }
}

sendCall()