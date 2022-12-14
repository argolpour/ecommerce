import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'
//-----------------------------------------------------------firebase initial config------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyArWtQB-GetGV-AsCSRuW__eL7n1PJ6ZkY",
  authDomain: "crown-clothing-db-990ae.firebaseapp.com",
  projectId: "crown-clothing-db-990ae",
  storageBucket: "crown-clothing-db-990ae.appspot.com",
  messagingSenderId: "663585432289",
  appId: "1:663585432289:web:a0642768f4d98369a5cda0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
})
//------------------------------------------------sign in with google --------------------------------------------------------------------------------
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)
//------------------------------------creation of our database by using firestore------------------------------------------------------------------
//create a refrerence to firestore database
export const db = getFirestore();
//create a category collection along with all data into firestorm
export const addCollectionAndDocument = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)
  objectToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object)
  });

  await batch.commit()
  console.log('done');
}
//create a document inside of our database by using user athentication info gotten by athentication methode object 
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  //create document named users 
  if (!userAuth) return
  //creation of users collection along with each user document base on uid given by google
  const userDocRef = doc(db, 'users', userAuth.uid);
  // check whether user snapshot exist in firestore database or not
  const userSnapShot = await getDoc(userDocRef)
  console.log(userSnapShot.exists());
  // create user object if it does not existx
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }

  }
  return userDocRef;
}
//--------------------------------------------------------------creat user by email & password--------------------------------------------------------
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}
//----------------------------------------------------------------sign in by email & password--------------------------------------------------------
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}
//----------------------------------------------------------------sign out user----------------------------------------------------------------------
export const signOutUser = async () => {
  await signOut(auth);
}
//----------------------------------------------------------------on auth change----------------------------------------------------------------------
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
//----------------------------------------------------------------get document from ------------------------------------------------------------------
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySanpShot = await getDocs(q);
  const categoryMap = querySanpShot.docs.reduce((acc, docSnapShot) => {
    const { title, items } = docSnapShot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
  return categoryMap;
}