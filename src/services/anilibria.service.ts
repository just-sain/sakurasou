import axios from 'axios';
import { IAnime, IAnimeTitles, IFranchise, ITeam, IYoutube } from '../interfaces';

class AnilibriaService {
	private URL = process.env.NEXT_PUBLIC_ANILIBRIA_API;

	/**
	 * 
	 title request 
	 */

	// get FEW titles
	async getTitlesUpdates() {
		return axios.get<IAnimeTitles>(`${this.URL}/title/updates`);
	}
	async getTitlesChanges() {
		return axios.get<IAnimeTitles>(`${this.URL}/title/changes`);
	}

	// get ONE title
	async getTitle(id: number) {
		return axios.get<IAnime>(`${this.URL}/title?id=${id}`);
	}
	// get ONE random title
	async getRandomTitle() {
		return axios.get<IAnime>(`${this.URL}/title/random`);
	}

	// get 1> franchises
	async getFranchise(id: number) {
		return axios.get<IFranchise[]>(`${this.URL}/title/franchises?id=${id}`);
	}

	/**
	 *
	 *
	 * another request
	 */
	async getGenres() {
		return axios.get<string[]>(`${this.URL}/genres`);
	}
	async getTeam() {
		return axios.get<ITeam>(`${this.URL}/team`);
	}
	async getYoutubeVideos() {
		return axios.get<IYoutube>(`${this.URL}/youtube`);
	}

	/**
	 *
	 *
	 *
	 * search request...
	 */
	async search(text: string) {
		return axios.get<any>(`${this.URL}/title/search?search=${text}&filter=id`);
	}
}

export default new AnilibriaService();
