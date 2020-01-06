export type UserId = string;
export type UsersOrder = any;

export type UserDeclined = {
	status: 'declined';
	id: UserId;
}

export type UserSelecting = {
	status: 'selecting';
	id: UserId;
}

export type UserOrdered = {
	status: 'ordered';
	id: UserId;
	order: UsersOrder;
}

export type User = UserDeclined | UserSelecting | UserOrdered;

export type UsersState = Record<UserId, User>;
