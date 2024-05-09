import "../styles/style.css";
import { App } from "./App";
import { Globals } from "./Globals";
import { webSocket } from "./Server";
const test = require("./test");

Globals.App = new App();
const ws = new webSocket();


 // Function to set callback for incoming messages with ID and data
export function sendMessage(id : string , data : any)
{
    ws.sendMessageData(id,data);
}