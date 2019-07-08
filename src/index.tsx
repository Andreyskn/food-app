import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';

import { Restaurants } from './views';

class App extends Component {
	render() {
		return <Restaurants />
	}
}

ReactDOM.render(<App />, document.getElementById('root'));