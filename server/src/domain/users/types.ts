export type UserId = string;
export type UserOrder = unknown;

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
	order: UserOrder;
}

export type User = UserDeclined | UserSelecting | UserOrdered;

export type UsersState = Record<UserId, User>;
