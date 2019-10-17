import { RestaurantId, Timestamp } from '../order';
import { UserId } from '../users';

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

export type DomainCommand =
	| CreateOrder
	| SetUserDeclinedStatus
	| AddParticipant
