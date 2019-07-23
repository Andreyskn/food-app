import React, { Fragment } from 'react';
import classnames from 'classnames';
import { useBEM, useProps } from 'utils';
import { Header, HeaderProps } from 'components';

export type RouteProps = {
	noHeader?: boolean;
	noWrapper?: boolean;
	headerProps?: HeaderProps;
	background?: 'accent' | 'white';
}

const [wrapperBlock, wrapperModifier] = useBEM('wrapper');

const Route: React.FC<RouteProps> = (props) => {
	const { children, headerProps, noHeader, noWrapper, background } = props;

	const [isDefaultProp] = useProps(props, Route.defaultProps!)
	const wrapperClass = classnames(
		wrapperBlock,
		{ [wrapperModifier({ background })]: !isDefaultProp('background') },
	)

	const content = (
		<Fragment>
			{!noHeader && <Header {...headerProps} />}
			{children}
		</Fragment>
	)

	return noWrapper ? content : <div className={wrapperClass}>{content}</div>
}

Route.defaultProps = {
	background: 'accent',
}

export const makeRoute = (View: React.FC, props?: RouteProps) => <Route {...props}><View /></Route>;
