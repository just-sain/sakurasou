import { IAnime } from '@/interfaces';

export const delCopy = (titles: IAnime[]): IAnime[] => {
	const newTitle: IAnime[] = [];

	for (let title in titles) {
		console.log(title);
	}

	return newTitle;
};
