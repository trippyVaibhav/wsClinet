import axios from "axios";
import { Globals, moneyInfo } from "./Globals";
import { log } from "console";

const axiosApi = axios.create({
	baseURL: 'https://casino-games-server.onrender.com',
	timeout: 8000,
});

const userName = "player11";
const password = "player11";
const baseUrl ='https://casino-games-server.onrender.com';


// API Call for GETTING Player information
export const getPlayerCredit = async () => {
	const response = await axios.post(`${baseUrl}/getPlayerCredit`, {userName,password})
    .then((response) =>{Globals.emitter?.Call("updateBalance",response.data.credits)
		// console.log("got Player Balance : " + response.data.credits);
	})
    .catch(function(error) {console.log(error);});
};


// Api for putting Player Bet and Locking it
export const assignPlayerBet = async () => {
	Globals.emitter?.Call("startSpin");
	// console.log("spini", moneyInfo.Bet, response.data);
	const response = await axios.post(`${baseUrl}/playerBet`, {userName,password,credits:(-1)*moneyInfo.Bet})
		.then((response) =>{ Globals.emitter?.Call("StartCheck"); })
    .catch(function(error) {console.log(error);});
};


//Api for Getting the Winning Amount for the Player.
export const getwinBalance = async () => {
	console.log("win", moneyInfo.score)
	const response = await axios.post(`${baseUrl}/playerWin`, {userName,password,credits:moneyInfo.score})
    .then((response) =>{Globals.emitter?.Call("CanSpinNow")})
		// console.log("Won  : " + response);
    .catch(function(error) {console.log(error);});
};


//200 for succes 201 for error