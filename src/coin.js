import React from 'react';

export default class Coin extends React.Component{
	constructor(name, props){
		super(props); 
		this.name = name;
		this.state = {
			data: {}
		}
	}

	fill_out_info(info){
		this.state = {
			data: info
		}
	}

	render() { 
		return(
			<div>
				<h1>{this.name}</h1>
				<ul>
					<li>{this.state.data.price}</li>
					<li>{this.state.data.change}</li>
					<li>{this.state.data.last_updated}</li>
				</ul>
			</div>
		);
	}
}