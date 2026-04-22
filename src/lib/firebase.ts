import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishedDate: any; // Firestore Timestamp
  excerpt: string;
  content: string;
  imageUrl: string;
  isPublished: boolean;
}

// Fetch published posts
export const getPublishedPosts = async (): Promise<BlogPost[]> => {
  const postsRef = collection(db, "posts");
  const q = query(
    postsRef, 
    where("isPublished", "==", true)
  );
  
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as BlogPost[];

  // Sort locally by publishedDate (descending) to avoid needing a Firestore composite index
  return posts.sort((a, b) => {
    const dateA = a.publishedDate?.toDate ? a.publishedDate.toDate().getTime() : 0;
    const dateB = b.publishedDate?.toDate ? b.publishedDate.toDate().getTime() : 0;
    return dateB - dateA;
  });
};
