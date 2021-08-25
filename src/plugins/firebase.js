import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-database'
import 'firebase/firebase-firestore'
import 'firebase/firebase-storage'
import firebaseConfig from '../../firebaseConfig'
import store from '../store/'

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged((user) => store.commit('setFireUser', user))

Vue.prototype.$firebase = firebase
