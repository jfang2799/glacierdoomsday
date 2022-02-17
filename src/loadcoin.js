import React, { Component } from "react";
import Coin from "./coin";

export default class Coindashboard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            items: [],
            DataisLoaded: false
        }
    }
    componentDidMount() {
        this.loadBackEndData()
            .then(res=> 
                this.setState({ 
                items: res,
                DataisLoaded: true
            }))
            .catch(err => console.log(err));
    }

    loadBackEndData = async() => {
        const response = await fetch('/on_start');
        const body = await response.json();

        if (response.status != 200){
            throw Error(body.message);
        }
        
        return body;
    }

    render(){
        for (let item in this.state.items){
            let crypto = new Coin(this.state.items[item].name);
            crypto.fill_out_info(this.state.items[item]);
            return crypto.render();
        }

        return <h1>Something went wrong!</h1>
    }
}
