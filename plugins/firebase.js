import firebase from 'firebase/app'
import "firebase/auth"

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyDk7_h6zzESf8YhKanQ7Oxo9XARrcroPmU",
      authDomain: "twitterpj-2eaf3.firebaseapp.com",
      projectId: "twitterpj-2eaf3",
      storageBucket: "twitterpj-2eaf3.appspot.com",
      messagingSenderId: "625619024575",
      appId: "1:625619024575:web:d9f3948f0e8f04d531a40a",
      measurementId: "G-CYL812V5S8"
    }
  )
}
  
export default firebase