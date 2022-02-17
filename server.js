const express = require('express');
const app = express(); 
const port = process.env.PORT || 4000;

// CoinMarket Cap Axios Instance 
const axios = require('axios'); 

let instance = axios.create({
	baseURL: 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes',
	headers: {
		'X-CMC_PRO_API_KEY' :  ''
	}
});


app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req,res) =>{
	res.send( { express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' } );
});

app.get('/on_start', (req,res)=>{

	let response = null;

	new Promise(async (resolve,reject) => {
		try{
			response = await instance.get('/latest?id=1,1027');
		}
		catch{
			response = null;
			res.send( {  "Call_Status" : "Failed to Retrieve Coins" } );
			console.log(ex);
			reject(ex);
		}
		if(response){
			let desired_data = {};
			const reply = response.data;
			const last_updated = reply.status.time_stamp;
			const coins = reply.data;

			for (let coin in coins){
				console.log(coin);
				let coin_data = {};
				let name = coins[coin].name;
				coin_data.name = name;
				coin_data.last_updated = coins[coin].quote.USD.last_updated; 
				coin_data.price = coins[coin].quote.USD.price;
				coin_data.change = coins[coin].quote.USD.percent_change_24h;
				desired_data[coin] = coin_data;
			}

			console.log(desired_data);

			res.send(desired_data);
		}
	});
});
