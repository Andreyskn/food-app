type UseBEM = (blockName: string) => [string, (modifierName: string) => string, (elementName: string) => ReturnType<UseBEM>];
export const useBEM: UseBEM = (blockName) => [
	blockName,
	(modifierName: string) => `${blockName}--${modifierName}`,
	(elementName: string) => useBEM(`${blockName}__${elementName}`),
];

type UseProps = <P>(props: P, defaultProps: Partial<P>) => [(propName: keyof P) => boolean];
export const useProps: UseProps = (props, defaultProps) => [(propName) => defaultProps[propName] === props[propName]];

export const price = (price: string) => `${price}₽`;
