// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCz4yaqRHTxUvn2f78S4qSSgMgb4WTNzNU",
  authDomain: "blog-application-df821.firebaseapp.com",
  projectId: "blog-application-df821",
  storageBucket: "blog-application-df821.appspot.com",
  messagingSenderId: "1096193759835",
  appId: "1:1096193759835:web:927f8f016b014b23c13d7e",
  measurementId: "G-QPFCPC7TFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider=new GoogleAuthProvider();
const auth = getAuth(app);

export {provider,auth} ;