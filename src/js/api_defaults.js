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
    params.ts = new Date().getTime();
    params.hash = md5(params.ts + this.PRIVATE_KEY + this.PUBLIC_KEY);
    try {
      const { data, status, statusText } = await this.marvel.get(endPoint, {
        params,
      });
      if (status !== 200) console.log(status, statusText);
      this.totalResults = data.data.total;
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

  async getNameStartWith(string) {
    return await this.getData('characters', { nameStartsWith: string });
  }

  async getByComics(string) {
    return await this.getData('comics', { titleStartsWith: string });
  }

  async getFiveCharacters(arr) {
    const promises = arr.map(e => {
      const params = {
        offset: e,
        limit: 1,
      };
      return this.getData('characters', params);
    });
    const data = await Promise.all(promises);
    return data.map(e => e[0]);
  }

  async getFilteredCharacters(modifiedSince, nameStartsWith, orderBy, comics) {
    const params = {};
    if (modifiedSince)
      params.modifiedSince = new Date(modifiedSince).toDateString();
    if (nameStartsWith) params.nameStartsWith = nameStartsWith;
    if (orderBy) params.orderBy = orderBy;
    if (comics) params.comics = comics;
    console.log(params);
    return await this.getData('characters', params);
  }

  setPaginationParams(page = 1, perPage = 20) {
    this.marvel.defaults.params['offset'] = perPage * (page - 1);
    this.marvel.defaults.params['limit'] = perPage;
  }
}
