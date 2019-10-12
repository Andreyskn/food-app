export type Command =
	| import('./commands').CreateOrder

export type Event =
	| import('./events').OrderCreated

export type Error =
	| import('./errors').UnhandledCommand

export type Result = Event | Error;
