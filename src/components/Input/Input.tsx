import React from 'react';
import './input.scss';
import { useBEM } from 'alias/utils';

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
