import { DomainCommand } from './types';

export const createError = (message: string) => (command: DomainCommand['name']) => {
	return new Error(`Domain error: ${message} [at command - ${command}]`);
}
