export class WebsocketClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    
    // connect to the server
    this.socket.onopen = () => {
      console.log("Connected to the server");
    };

    // listen messages
    this.socket.onmessage = (message) => {
      console.log("Message received: ", message.data);
    };

    // close the connection
    this.socket.onclose = () => {
      console.log("Disconnected from the server");
    };
  }
}