type Error<N, P> = {
	type: 'error';
	name: N;
	payload: P;
}

export type UnhandledCommand = Error<
	'Unhandled command',
	import('./main').Command['name']
>
