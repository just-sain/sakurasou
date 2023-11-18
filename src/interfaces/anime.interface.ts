export interface IAnimeTitles {
	list: IAnime[];
	pagination: IPagination;
}

interface IPagination {
	pages: number;
	current_page: number;
	items_per_page: number;
	total_items: number;
}

// global interfaces
interface INames {
	ru: string;
	en: string;
	alternative: null;
}
interface IPosterResoulution {
	url: string;
	raw_base64_file: null;
}
interface IEpisodes {
	first: number;
	last: number;
	string: string;
}

// let's go...
export interface IAnime {
	id: number;
	code: string;
	names: INames;
	franchises: IFranchise[];
	announce: null;
	status: IStatus;
	posters: IPosters;
	updated: number;
	last_change: number;
	type: IType;
	genres: string[];
	team: ITeam;
	season: ISeason;
	description: string;
	in_favorites: number;
	blocked: IBlocked;
	player: IPlayer;
	torrents: ITorrents;
}

export interface IFranchise {
	franchise: IFranchiseName;
	releases: IRelease[];
}

interface IFranchiseName {
	id: string;
	name: string;
}

interface IRelease {
	id: number;
	code: string;
	ordinal: number;
	names: INames;
}

interface IStatus {
	string: string;
	code: number;
}

interface IPosters {
	small: IPosterResoulution;
	medium: IPosterResoulution;
	original: IPosterResoulution;
}

interface IType {
	full_string: string;
	code: number;
	string: string;
	episodes: number;
	length: number;
}

export interface ITeam {
	voice: string[];
	translator: string[];
	editing: string[];
	decor: string[];
	timing: string[];
}

interface ISeason {
	string: string;
	code: number;
	year: number;
	week_day: number;
}

interface IBlocked {
	blocked: boolean;
	bakanim: boolean;
}

interface IPlayer {
	alternative_player: any;
	host: string;
	is_rutube: boolean;
	episodes: IEpisodes;
	list: { [key: number]: IEpisode };
	rutube: { [key: number]: IEpisode };
}

interface IEpisode {
	episode: number;
	name: string | null;
	uuid: string;
	created_timestamp: number;
	preview: string;
	skips: IEpisodeSkips;
	hls: IEpisodeHls;
}

interface IEpisodeSkips {
	opening: number[];
	ending: number[];
}

interface IEpisodeHls {
	fhd: string;
	hd: string;
	sd: string;
}

interface ITorrents {
	episodes: IEpisodes;
	list: ITorrentList;
}

interface ITorrentList {
	torrent_id: number;
	episodes: IEpisodes;
	quality: ITorrentQuality;
	leechers: number;
	seeders: number;
	downloads: number;
	total_size: number;
	size_string: string;
	url: string;
	magnet: string;
	uploaded_timestamp: number;
	hash: string;
	metadata: null | string;
	raw_base64_file: null;
}

interface ITorrentQuality {
	string: string;
	type: string;
	resolution: string;
	encoder: string;
	lq_audio: null | string;
}
