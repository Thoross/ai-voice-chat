export type ResizeFunction = (entries: ResizeObserverEntry[]) => void;

export const useResizeObserver = (func: ResizeFunction) => {
	const observer = new ResizeObserver((entries) => {
		func(entries);
	});
	return observer;
};
