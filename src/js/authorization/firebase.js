import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, set, ref, update } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


document.querySelector('body').insertAdjacentHTML('afterbegin', '<button id="exitAccaunt" class="nav__menu__link nav__menu__button">EXIT</button>')

const firebaseConfig = {
    apiKey: "AIzaSyDuOpOUXTiTsdMWdinTg30GHl9LPSWa5gs",
    authDomain: "authorization-9ac0c.firebaseapp.com",
    databaseURL: "https://authorization-9ac0c-default-rtdb.firebaseio.com",
    projectId: "authorization-9ac0c",
    storageBucket: "authorization-9ac0c.appspot.com",
    messagingSenderId: "525140146424",
    appId: "1:525140146424:web:205356401431844c4ea30d"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  let database = getDatabase(app)
  

const formAuthorization = document.querySelector('.authorization');
const btnCloseAuthorization = document.querySelector('.close-form-btn');


const libraryBtn = document.querySelector('#js-library-link');
libraryBtn.addEventListener('click', (evt) =>  {
  if(!auth.currentUser) {
    evt.preventDefault()
    formAuthorization.style.display = 'block'
  }
  return
})

btnCloseAuthorization.addEventListener('click', onClose);

function onClose() {
    formAuthorization.style.display = 'none';
    formAuthorization.removeEventListener('click', onClose)

    document.getElementById('singin').style.display = 'block';
    btnSingUp.classList.add('singup');
    document.querySelector('.authorization-form__title').textContent = "Sing In";
    if (document.querySelector('#login')) {
        document.querySelector('.authorization-input-wrap').removeChild(login)
    } 
}

// const singinAccount = document.querySelector('#js-singin-account')
// if(singinAccount) {
// singinAccount.addEventListener('click', (evt) =>  {

//     evt.preventDefault()
//     formAuthorization.style.display = 'block'

// })
// } else{
//   return
// }

// const gallery = document.querySelector('.gallery-js');
// const watchedTab = document.querySelector('#lib-watched-tab');
// const queueTab = document.querySelector('#lib-queue-tab');



const btnSingUp = document.querySelector('#singup')
btnSingUp.addEventListener('click', onSingUp)

const formSingUp = document.querySelector('.authorization-input-wrap')

function onSingUp() {
  if(btnSingUp.className.includes('singup')){
  const userName = `<input class="authorization-form__input" type="text" name="login" id="login" placeholder="Your name">`;
  formSingUp.insertAdjacentHTML('afterbegin', userName);
  document.getElementById('singin').style.display = 'none';
      btnSingUp.classList.remove('singup');
      document.querySelector('.authorization-form__title').textContent = "Sing Up";
} else {
  const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value
  const login = document.querySelector('#login').value

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    set(ref(database, 'users/' + user.uid), {
        username: login,
        email: email,
        arrWatched: 0,
        arrQueue: 0,
    });
    // Notiflix.Notify.success(`${user.username}successfully registered`)
    location.reload()
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
}

}

const btnSingIn = document.querySelector("#singin");
btnSingIn.addEventListener('click', onSingIn);

function onSingIn() {

  const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const timeSingIn = new Date()
    const user = userCredential.user;
    update(ref(database, 'users/' + user.uid), {
        last_login: timeSingIn,
      });
    alert('user enter')
    
    formAuthorization.style.display = 'none'
    window.location.href = "./library.html";
    exit()
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
}

function exit() {
  document.querySelector('#exitAccaunt').style.display = "block"
}

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
      // textNonAuthorization.style.display = 'none'
      const uid = user.uid;
      console.log(uid)
      
        // let selectedMovieIndex = 0;
        // let arrWatchedUser = [];
        // let arrQueueUser = [];
        // const addWachtedBtn = document.querySelector('#add-watched');
        // const addQueueBtn = document.querySelector('#add-queue')

        // addWachtedBtn.addEventListener('click', addArrWatched)
        // // addQueueBtn.addEventListener('click', addArrQueue)

        // gallery.addEventListener('click', event => { 
        //     let elementIndex = event.path.findIndex(e => e.dataset.id !== undefined);
        //     console.log(elementIndex)
        //     if (elementIndex != -1) {
        //     selectedMovieIndex = event.path[elementIndex].dataset.id;
        //     console.log(selectedMovieIndex)
                
            
            // redrawButtonText();
//   }
// });

        function addArrWatched() {
            if(user) {
            console.log(user)
            arrWatchedUser.push()
            update(ref(database, 'users/' + user.uid), {
            arrWatched: arrWatchedUser,
                arrQueue: arrQueueUser,
         
            })
               
        console.log(user)
    }
}

      // ...
    } else {
      // User is signed out
      // ...
    }
  });

document.querySelector('#exitAccaunt').addEventListener('click', (e) =>  signOut(auth).then(() => {
  document.querySelector('#exitAccaunt').style.display = 'none'
}).catch((error) => {
  // An error happened.
}));

// gallery.addEventListener(eventClick, event => {
//   let elementIndex = event.path.findIndex(e => e.dataset.index != null);
//   if (elementIndex != -1) {
//     selectedMovieIndex = event.path[elementIndex].dataset.index;
//     // redrawButtonText();
//   }
// });




// watchedExists : function(id){
//     return this.indexById(this.watchedArray, id) != -1;
// },
// queueExists : function(id){
//     return this.indexById(this.queueArray, id) != -1;
// },
// indexById : function(array, id){
//     return array.findIndex(movie => movie.id == id);
// },











