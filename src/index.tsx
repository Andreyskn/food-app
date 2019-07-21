import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/index';

// @ts-ignore
import { Home, Restaurants, OrderStarted, OrderPlaced, Waiting, Declined, Delivered } from './views';

class App extends Component {
	render() {
		return <Delivered />
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
