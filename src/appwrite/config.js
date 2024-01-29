import conf from '../configs/conf.js';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases();
    this.bucket = new Storage();
  }

  //  create post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDbID,
        conf.appwriteCollectionID,
        slug, // used in place of unique Id
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log('Appwrite service :: createPost :: error', error);
    }
  }

  // update post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDbID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log('Appwrite service :: updatePost :: error', error);
    }
  }

  // delete Post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDbID,
        conf.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log('Appwrite service :: deletePost :: error', error);
      return false;
    }
  }

  // get post
  async getPost(slug) {
    try {
      await this.databases.getDocument(
        conf.appwriteDbID,
        conf.appwriteCollectionID,
        slug
      );
    } catch (error) {
      console.log('Appwrite service :: getPost :: error', error);
    }
  }

  // get all post
  async getPosts(queries = [Query.equal('status', 'active')]) {
    // queries is only a variable name
    try {
      return await this.databases.listDocuments(
        conf.appwriteDbID,
        conf.appwriteCollectionID,
        // [
        //     Query.equal('status', 'active'
        // ]
        queries
      );
    } catch (error) {
      console.log('Appwrite service :: getPosts :: error', error);
      return false;
    }
  }

  // file upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log('Appwrite service :: error', error);
      return false;
    }
  }

  // delete file
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketID, fileId);
    } catch (error) {
      console.log('Appwrite service :: deleteFile :: error', error);
      return false;
    }
  }

  // file preview
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketID, fileId);
  }
}

const service = new Service();
export default service;
