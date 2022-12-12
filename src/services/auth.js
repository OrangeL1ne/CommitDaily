import {GithubAuthProvider, signInWithPopup} from "firebase/auth";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";
import {auth} from "../firebase";

const provider = new GithubAuthProvider();

export async function join() {
  try {
    const result = await signInWithPopup(auth, provider);

    if (result) {
      const user = result.user;
      const docRef = doc(db, "user", user.email);

      await updateDoc(docRef, {
        userId: user.reloadUserInfo.screenName,
        profile: user.photoURL
      });

      return {success: true, message: user.email};
    }
  } catch(error) {
    return {success: false, message: error.code};
  }
}
