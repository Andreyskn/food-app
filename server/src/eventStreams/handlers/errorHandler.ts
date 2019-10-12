import { SystemError } from '../types';

export const errorHandler = (error: SystemError) => {
	console.log(error);
}
