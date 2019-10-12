export type DomainEvent = Omit<import('../domain').Event, 'type'>;

export type DomainError = Omit<import('../domain').Error, 'type'>;

export type SystemError = DomainError;

export type ResponseEvent = DomainEvent | import('../socket').UserConnectedEvent;
