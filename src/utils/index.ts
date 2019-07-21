export * from './helpers';

type UseBEM = (blockName: string) => [
	string,
	(modifierName: string | { [key: string]: string | undefined }) => string,
	(elementName: string) => [ReturnType<UseBEM>[0], ReturnType<UseBEM>[1]]
];
export const useBEM: UseBEM = (blockName) => [
	blockName,
	(modifierName) => {
		if (typeof modifierName === 'object') {
			const [[key, value]] = Object.entries(modifierName);
			modifierName = `${key}-${value}`;
		}
		return `${blockName}--${modifierName}`;
	},
	(elementName) => {
		const [element, modifier] = useBEM(`${blockName}__${elementName}`);
		return [element, modifier];
	},
];

type UseProps = <P>(props: P, defaultProps: Partial<P>) => [(propName: keyof P) => boolean];
export const useProps: UseProps = (props, defaultProps) => [(propName) => defaultProps[propName] === props[propName]];

export const msToTime = (delta: number) => {
	const ms = delta % 1000;
	delta = (delta - ms) / 1000;
	const seconds = delta % 60;
	delta = (delta - seconds) / 60;
	const minutes = delta % 60;
	const hours = (delta - minutes) / 60;

	return { hours, minutes, seconds };
}
