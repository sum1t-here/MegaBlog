const conf = {
  appwriteURL: String(import.meta.env.VITE_REACT_APP_APPWRITE),
  appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDbID: String(import.meta.env.VITE_APPWRITE_DB_ID),
  appwriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;
