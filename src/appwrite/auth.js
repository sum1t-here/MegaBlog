/* eslint-disable no-useless-catch */
import conf from '../configs/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log('Appwrite service error :: createAccount :: error', error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.create.createEmailSession(email, password);
    } catch (error) {
      console.log('Appwrite service error :: login :: error', error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('Appwrite service error :: getCurrentUser :: error', error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log('Appwrite service Error :: logout', error);
    }
  }
}

const authService = new AuthService();

export default authService;
