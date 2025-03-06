// Importing the required modules
const WebSocketServer = require('ws');
const PORT = 6001;
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: PORT})
// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");

    // sending message to client
    ws.send('Welcome, you are connected!');

    //on message from client
    ws.on("message", data => {	
        console.log('receive message: ');
        jsonObj = JSON.parse(data);
        console.log(JSON.stringify(jsonObj));
        let js = {};
        let responseToClient = true;
        if (jsonObj.event === 'posmessage'){
          js.event = "c3command";
          if (jsonObj.body.message === 'ETABLISSEMENT COMMUNICATION'){
            responseToClient = false;
          }else if (jsonObj.body.message === 'Tapez touche Entree'){
            js.body = {};
            js.body.messge = 'wait...';
          }
        }
        
        if (jsonObj.event === 'c3command'){
          if (jsonObj.body.cOperation === 'A'){
            js.event = "c3command";
            js.requestid = "172327";
            js.protocolversion = "1.0";
            js.body = {};
            js.body.cC3Error = "0000";
            js.body.transactionResult = "C3 error [0000/ ] : success";
            js.body.cUsrData1 = "OT";
            js.body.cUsrData2 = "OT";
          }
        }

        if (jsonObj.event === 'pclutils'){
          if (jsonObj.body.cOperation === 'DEVICES'){
            ws.send('{"event": "pclutils", "cOperation": "A"}'); 
          }
        }

        if (responseToClient){
          ws.send(JSON.stringify(js)); 
          console.log('send: ' + JSON.stringify(js));
        }
    });

    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has closed");
    });

    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port " + PORT);
