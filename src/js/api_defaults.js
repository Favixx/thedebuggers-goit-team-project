import { keys } from './keys';
import axios from 'axios';
import md5 from 'md5';
export default class MarvelAPI {
  PUBLIC_KEY = 'a8eb5267d3554d948feb51d4d5baa392';
  PRIVATE_KEY = 'b29d496a1b59d6f335fd297e737331f03b528d90';
  constructor() {
    // this.changeKey();
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
      // if (status === 429 && this.changeKey()) return await this.getData(endPoint, params);
      this.totalResults = data.data.total;
      this.perPage = data.data.limit;
      this.currentPage = data.data.offset / data.data.limit + 1;
      this.totalPage = Math.ceil(this.totalResults / data.data.limit);
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

  async getComicsByName(string) {
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

  async getComicCreators(id) {
    return await this.getData(`comics/${id}/creators`);
  }
  async getComicCharacters(id) {
    return await this.getData(`comics/${id}/characters`);
  }

  async getFilteredCharacters(modifiedSince, nameStartsWith, orderBy, comics) {
    const params = {};
    if (modifiedSince)
      params.modifiedSince = new Date(modifiedSince).toDateString();
    if (nameStartsWith) params.nameStartsWith = nameStartsWith;
    if (orderBy) params.orderBy = orderBy;
    if (comics) params.comics = comics;
    this.params = params;
    return await this.getData('characters', params);
  }

  async getCharactersByPage(pageNumber) {
    const params = this.params;
    params.offset = pageNumber * this.limit;
    return await this.getData('characters', params);
  }

  async getComicsByCharacterID(num) {
    return await this.getData(`characters/${num}/comics`);
  }

  setPerPage(perPage = 20) {
    this.perPage = perPage;
    this.marvel.defaults.params['limit'] = perPage;
  }
  // changeKey(){
  //   const newKeys = keys.getNextKey();
  //   console.log(newKeys)
  //   if (newKeys) {
  //     this.PRIVATE_KEY = newKeys.private;
  //     this.PUBLIC_KEY = newKeys.public;
  //     return true;
  //   } else {
  //     return null;
  //   }
  // }
}
