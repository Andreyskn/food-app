import React, { Component } from 'react';

export class Container extends Component<{ backgroundColor?: React.CSSProperties['backgroundColor'] }> {
	render() {
		const { backgroundColor, children } = this.props;

		return (
			<div className='story-container' style={{ backgroundColor }}>
				{children}
			</div>
		)
	}
}
