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

export type UserConfirmed = {
	status: 'confirmed';
	id: UserId;
	order: UserOrder;
}

export type User = UserDeclined | UserSelecting | UserConfirmed;

export type UsersState = Record<UserId, User>;
