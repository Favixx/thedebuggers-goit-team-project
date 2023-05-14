import axios from 'axios';
import md5 from 'md5';
export default class MarvelAPI {
  PUBLIC_KEY = 'e8d87ed088b5013742a2a9466816b30e';
  PRIVATE_KEY = 'dbde977f898ea7131460b979ad9d4adf2e774ce4';
  constructor() {
    this.marvel = axios.create({
      baseURL: 'https://gateway.marvel.com/v1/public/',
      params: {
        apikey: this.PUBLIC_KEY,
      },
    });
  }
  async getData(endPoint = 'characters', params = {}) {
    params.ts = new Date().toDateString();
    params.hash = md5(params.ts + this.PRIVATE_KEY + this.PUBLIC_KEY);
    try {
      const { data, status, statusText } = await this.marvel.get(endPoint, {
        params,
      });
      if (status !== 200) console.log(status, statusText);
      return data.data.results;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getCharacters() {
    return await this.getData('characters');
  }

  async getCharacterByID(num) {
    return await this.getData(`characters/${num}`);
  }

  setPaginationParams(page = 1, perPage = 20) {
    this.marvel.defaults.params['offset'] = perPage * (page - 1);
    this.marvel.defaults.params['limit'] = perPage;
  }
}
