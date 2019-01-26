/**
 * Created by sirius on 11/17/17.
 */


const cloudHost = 'https://hashvich.herokuapp.com/';
const cloudWebSocketPort = '80';
let email = localStorage.getItem('email');
let password = localStorage.getItem('password');
let client = new Paho.MQTT.Client(cloudHost, cloudWebSocketPort, "Client" + parseInt(Math.random() * 100, 10));

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
let options = {
	/*useSSL: true,*/
	userName: email,
	password: password,
	onSuccess: onConnect,
	onFailure: doFail
};

function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log("onConnect");
	client.subscribe(email+'/sub');
}

function doFail(e) {
	console.log(e);
}

function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("onConnectionLost:" + responseObject.errorMessage);
		if(responseObject.errorMessage.indexOf("closed")>=0){
			client = new Paho.MQTT.Client(cloudHost, cloudWebSocketPort, "Client" + parseInt(Math.random() * 100, 10));
		}
	}
}

function onMessageArrived(message) {
	let md = message.destinationName.split("/")[0];
	console.log('md -> ',md);
}
// connect the client
client.connect(options);

module.exports = client;
