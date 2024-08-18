import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class Api {
    // the token for interactive with the API will be stored here.
    static token;
  
    static async request(endpoint, data = {}, method = "get") {
      console.debug("API Call:", endpoint, data, method);
  
      //there are multiple ways to pass an authorization token, this is how you pass it in the header.
      //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
      const url = `${BASE_URL}/${endpoint}`;
      const headers = { Authorization: `Bearer ${Api.token}` };
      const params = (method === "get")
          ? data
          : {};
  
      try {
        return (await axios({ url, method, data, params, headers })).data;
      } catch (err) {
        console.error("API Error:", err.response);
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
      }
    }
  
    // Individual API routes
  
    /** Get details on a company by handle. */


    static async register(info) {
      let res = await this.request('auth/register', info, "post");
      return res.token;
    }

    static async login(info) {
      let res = await this.request('auth/token', info, "post");
      return res.token;
    }

    static async getUser(username) {
      let res = await this.request(`users/${username}`);
      return res.user;
    } 

    static async editUser(username, data) {
      let res = await this.request(`users/${username}`, data, "patch");
      return res.user;
    } 

    static async getBatchCards(data){
      let res = await this.request(`cards/batch`, data, "post");
      return res;
    }

    static async getAllCards(page){
      let res = await this.request(`cards/${page}`);
      return res.data;
    }

    static async getCardsByName(name){
      let res = await this.request(`cards/name/${name}`);
      return res.data;
    }

    static async addCardtoCollection(username, cardId, quantity){
      let res = await this.request(`users/${username}/${cardId}/${quantity}`, {}, "post");
      return res;
    }

    static async deleteFromCollection(username, cardId){
      let res = await this.request(`users/${username}/${cardId}`, {}, "delete");
      return res;
    }
  
  }
  
Api.token = "";


export default Api;