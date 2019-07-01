import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';

import { HomeView } from './views';

class App extends Component {
	render() {
		return <HomeView />
	}
}

ReactDOM.render(<App />, document.getElementById('root'));