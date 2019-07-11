type UseBEM = (blockName: string) => [string, (modifierName: string | { [key: string]: string | undefined }) => string, (elementName: string) => ReturnType<UseBEM>];
export const useBEM: UseBEM = (blockName) => [
	blockName,
	(modifierName) => {
		if (typeof modifierName === 'object') {
			const [key, value] = Object.entries(modifierName)[0];
			modifierName = `${key}-${value}`;
		}
		return `${blockName}--${modifierName}`;
	},
	(elementName) => useBEM(`${blockName}__${elementName}`),
];

type UseProps = <P>(props: P, defaultProps: Partial<P>) => [(propName: keyof P) => boolean];
export const useProps: UseProps = (props, defaultProps) => [(propName) => defaultProps[propName] === props[propName]];
