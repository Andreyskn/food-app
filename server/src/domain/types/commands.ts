import { RestaurantId, Timestamp, Minutes } from '../order';
import { UserId, UsersOrder } from '../users';

type Command<N, P> = {
	name: N;
	payload: P;
}

type CreateOrder = Command<
	'Create order',
	{
		restaurantId: RestaurantId;
		hostId: UserId;
		timestamp: Timestamp;
	}
>
type SetUserDeclinedStatus = Command<'Set user declined status', UserId>;
type AddParticipant = Command<'Add participant', UserId>;
type TakeUserOrder = Command<'Take user order', { userId: UserId; usersOrder: UsersOrder; }>;
type StartDelivery = Command<'Start delivery', { deliveryTime: Minutes; }>;

export type DomainCommand =
	| CreateOrder
	| SetUserDeclinedStatus
	| AddParticipant
	| TakeUserOrder
	| StartDelivery
