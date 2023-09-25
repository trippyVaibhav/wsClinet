import axios from "axios";
import { Globals, moneyInfo, boardConfigVar, cookieValues } from './Globals';
import { log } from "console";

const axiosApi = axios.create({
	baseURL: 'https://casino-games-server.onrender.com',
	timeout: 8000,
});

const userName = "player11";
const baseUrl ='https://casino-games-server.onrender.com';

// cookieValues.userName = "Player11";


// API Call for GETTING Player information
export const getPlayerCredit = async () => {
	// console.log("Balance  :" + cookieValues.userName);

	
	
	const response = await axios.post(`${baseUrl}/getPlayerCredit`, {userName : cookieValues.userName,userToken :cookieValues.token})
    .then((response) =>{Globals.emitter?.Call("updateBalance",response.data.credits)
		console.log("got Player Balance : " + response.data.credits);
	})
    .catch(function(error) {console.log(error);});

	// Globals.emitter?.Call("updateBalance",1000)
};

export const initialPlayerCredit = async () => {
	const response = await axios.post(`${baseUrl}/getPlayerCredit`, {userName : cookieValues.userName,userToken :cookieValues.token})
    .then((response) =>{moneyInfo.Balance = response.data.credits;
		console.log("got Player Balance : " + response.data.credits);
	})
    .catch(function(error) {console.log(error);});
};


// Api for putting Player Bet and Locking it
export const assignPlayerBet = async () => {
	Globals.emitter?.Call("startSpin");
	// console.log("spini", moneyInfo.Bet, response.data);
	const response = await axios.post(`${baseUrl}/playerBet`, {userName : cookieValues.userName,userToken :cookieValues.token,credits:(-1)*moneyInfo.Bet})
		.then((response) =>{ Globals.emitter?.Call("StartCheck"); })
    .catch(function(error) {console.log(error);});

	// Globals.emitter?.Call("StartCheck");
};


//Api for Getting the Winning Amount for the Player.
export const getwinBalance = async () => {
	console.log("win", moneyInfo.score)
	const response = await axios.post(`${baseUrl}/playerWin`, {userName : cookieValues.userName,userToken :cookieValues.token,credits:moneyInfo.score})
    .then((response) =>{Globals.emitter?.Call("CanSpinNow")
	console.log("Won  : " + response);
})
    .catch(function(error) {console.log(error);});

	// Globals.emitter?.Call("CanSpinNow")
};


//200 for succes 201 for error