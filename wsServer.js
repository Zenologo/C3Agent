// Importing the required modules
const WebSocketServer = require('ws');
const PORT = 6001;
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: PORT})
// Creating connection using websocket
wss.on("connection", ws => {
  console.log('');
  console.log("new client connected");
  console.log('');

  let js = {};        
  js.event = "c3command";
  js.body = {};
  js.body.message = "ETABLISSEMENT COMMUNICATION";
  ws.send(JSON.stringify(js));

    console.log('send message: ');
    console.log(JSON.stringify(js));
    console.log('');

  //on message from client
  ws.on("message", data => {	
    console.log('receive message: ');
    jsonObj = JSON.parse(data);
    console.log(JSON.stringify(jsonObj));
    console.log('');
    js = {};
    // let responseToClient = true;
    
    /*        
    if (jsonObj.event === 'posmessage'){
      js.event = "c3command";
      if (jsonObj.body.message === 'ETABLISSEMENT COMMUNICATION'){
        responseToClient = false;
      }else if (jsonObj.body.message === 'Tapez touche Entree'){
        js.body = {};
        js.body.messge = 'wait...';
      }
    }
    */
    
    if (jsonObj.event === 'c3command'){
      if (jsonObj.body.cOperation === 'A'){
        js.event = "c3response";
        js.protocolversion = "1.0";
        js.body = {};
        js.body.cC3Error = "0000";
        js.body.transactionResult = "C3 error [0000/ ] : success";
        js.body.cUsrData1 = "OT";
        js.body.cUsrData2 = "OT";
      }else if (jsonObj.body.cOperation === 'C') {
        js.event = "c3response";
        js.protocolversion = "1.0";
        js.body = {};
        js.body.cC3Error = "0000";
        js.body.transactionResult = "C3 error [0000/ ] : success";
        js.body.cAmount = jsonObj.body.cAmount;
        js.body.cCurrency = jsonObj.body.cCurrency;
        js.body.cTicketAvailable = "1";
        js.body.cPan = "497010******9548";
        js.body.cAuthorizationNumber ="A 542901";
        js.body.cSignature = "0";
        js.body.cIso2 ="497010******9548=4912901*************";
        js.body.cCardType = "T";
        js.body.cSSCarte = "1";
        js.body.cTransactionDate = "130224";
        js.body.cTransactionTime = "182635";
        js.body.cExpiryDate = "4912";
        js.body.cUsrData1 = "ECR-00008710-20240213-182621";
        js.body.cUsrData2 = "067-PAY_PP_DEBIT";
        js.body.cAxis = "0";
        js.body.authentication = "PinCode";
        js.body.captureEntry = "Chip";
        js.body.cardApplication = "EMV";
        js.body.transactionCondition = "NotForced";
        js.body.cFolderNumber = "000008567579";
        js.body.customerReceipt = "------------------------\r\n SPECIMEN SIMULATION \r\n------------------------\r\n";
        js.body.customerReceipt += "CARTE BANCAIRE \r\n*** INGENICO ***\r\n*** Beyond Payment";
        js.body.customerReceipt += "***\r\nA0000000421010 \r\n CB \r\nle 13/02/24 a 18:26:35 \r\n";
        js.body.customerReceipt += "INGENICO \r\n 75015 Paris \r\n 1999391 \r\n ";
        js.body.customerReceipt += "************9548 \r\n 9327FFF126A7AB17 \r\n 710 006 000907 \r\n";
        js.body.customerReceipt += "C @ \r\n MONTANT= 10,00EUR \r\n DEBIT \r\nCARTE DE TEST\r\n ";
        js.body.customerReceipt += "TICKET CLIENT \r\n A CONSERVER \r\n *** CB5.2 ***\r\n";
        js.body.customerReceipt += "* Paiement proximite *";
        js.body.extTags = {};
        js.body.extTags.tag = "zcb";
        js.body.extTags.val = "1123456700001719318";
        js.body.extTags.lbl = "Payment ID";
      }
    }

    if (jsonObj.event === 'pclutils'){
      if (jsonObj.body.cOperation === 'DEVICES'){
        ws.send('{"event": "pclutils", "cOperation": "A"}'); 
      }
    }
      ws.send(JSON.stringify(js)); 
      console.log('send message: ');
      console.log(JSON.stringify(js));
      console.log('');

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

