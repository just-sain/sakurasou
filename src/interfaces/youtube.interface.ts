export interface IYoutube {
	list: IList[];
	pagination: IPagination;
}

interface IList {
	id: number;
	title: string;
	preview: IPreview;
	youtube_id: string;
	comments: number;
	views: number;
	timestamp: number;
}
interface IPreview {
	src: string;
	thumbnail: string;
}

interface IPagination {
	pages: number;
	current_page: number;
	items_per_page: number;
	total_items: number;
}
