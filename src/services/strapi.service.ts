import { IAuth, ILoginParams, IRegisterParams, IUser } from '@/interfaces';
import axios from 'axios';

class StrapiService {
	private URL = 'http://localhost:1337/api';

	async Login(data: ILoginParams) {
		return axios.post<IAuth>(`${this.URL}/auth/local`, data);
	}

	async Register(data: IRegisterParams) {
		return axios.post<IAuth>(`${this.URL}/auth/local/register`, data);
	}

	async AuthMe(jwt: string) {
		return axios.get<IUser>(`${this.URL}/users/me`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});
	}
}

export default new StrapiService();
