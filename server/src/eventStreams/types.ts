import { SystemSocketEvent } from '../socket';
import { DomainEvent } from '../domain';
import { Order } from '../../../shared';

export type DataDomainEvent = Omit<DomainEvent, 'type' | 'payload'> & { payload: Order };

export type ResponseEvent = DataDomainEvent | SystemSocketEvent;
