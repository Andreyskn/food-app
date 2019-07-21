import React from 'react';
// import classnames from 'classnames';
import './styles';
import { useBEM } from 'utils';

export type InputProps = {
	placeholder?: string;
}

const [inputBlock] = useBEM('input');

export const Input: React.FC<InputProps> = (props) => {
	const { placeholder } = props;

	return <input className={inputBlock} type='text' spellCheck={false} autoComplete='off' placeholder={placeholder} />;
}

Input.defaultProps = {

}
