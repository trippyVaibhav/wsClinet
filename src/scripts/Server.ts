import { json } from "stream/consumers";

import { v4 as uuidv4 } from 'uuid';
// WebSocket client
export class webSocket {
 ws : WebSocket;
 onMessageCallback: ((id: string, data: string) => void) | null = null;
 constructor()
 {
   
   this.ws = new WebSocket('wss://slotwebsocket.onrender.com/');

  //  https://slotwebsocket.onrender.com
   this.socketFunctions();
 }
  socketFunctions()
  {

    this.ws.onopen = () => {
        console.log('Connected to WebSocket server');
      };
      
      // Event listener for messages from the server
      this.ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        // console.log('Received from server:', message);
        console.log(message.id,message.message);
        if (message.id === 'ping') {
          console.log('Received ping from client');
          this.ws.send(JSON.stringify({ id: 'pong', data: {} }));
        }
        if(message.id === "InitData")
          {
            message.message.id
          }
    };
      
      // Event listener for WebSocket connection close
      this.ws.onclose = () => {
        console.log('Connection to WebSocket server closed');
      };
    }   

    // Function to send message from client to backend
    sendMessage(message: string) {
    if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(message);
    } else {
        console.log('WebSocket connection not open. Cannot send message.');
    }
  }

  sendMessageData(id : string, Data :any)
  {
    this.ws.send(JSON.stringify({id,Data}));
  }
}


