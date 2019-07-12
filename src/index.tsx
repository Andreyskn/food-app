import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';

import { OrderPlaced } from './views';

class App extends Component {
	render() {
		return <OrderPlaced />
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
