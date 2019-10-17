import { DomainEvent } from './events';
import { DomainError } from './errors';

export type DomainResult = DomainEvent | DomainError;
