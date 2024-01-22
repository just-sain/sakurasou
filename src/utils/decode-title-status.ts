export const decodeTitleStatus = (number: number) => {
	let result = '...';

	if (number === 0) {
		result = 'Ждем релиза :P';
	} else if (number === 1) {
		result = 'Произведение пока в работе :)';
	} else if (number === 2) {
		result = 'Произведение окончена :(';
	}

	return result;
};
