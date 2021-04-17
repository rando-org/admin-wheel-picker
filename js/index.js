// FIREBASE
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC4bGdEReoQzmNmf8UXioN_PErYO2BxLWs",
  authDomain: "rando-wheel-org.firebaseapp.com",
  databaseURL: "https://rando-wheel-org-default-rtdb.firebaseio.com",
  projectId: "rando-wheel-org",
  storageBucket: "rando-wheel-org.appspot.com",
  messagingSenderId: "1053125924493",
  appId: "1:1053125924493:web:65eeaeec28709e091474c4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();

// UTILITY METHODS
function randomNumber (start, length) {
  return Math.floor(Math.random() * length + start)
}
let wheelSpinning = false;

let colors = ["#FF9AA2", "#C7CEEA", "#FFB7B2", "#B5EAD7", "#FFDAC1", "#E2F0CB"]
let rollIndex = 0;

let app = new Vue({
  el: '#app',
  data: {
    rolls: [],
    choiceTarget: null,
    choices: [],
    spinning: false,
  },
  created () {
    $("#loader").hide()
  },
  methods: {
    targetSegmentText (rollIndex) {
      return this.choices[rollIndex]
    },
    changeOutcome () {
      let rollIndex = this.choices.indexOf(this.choiceTarget)
      this.rolls[0] = rollIndex
      database.ref('rolls').set(this.rolls)
    }
  }
})

database.ref('choices').on('value', (snapshot) => {
  app.choices = snapshot.val()
})

database.ref('rolls').on('value', (snapshot) => {
  app.rolls = snapshot.val()
  app.choiceTarget = app.targetSegmentText(app.rolls[0])
})

database.ref('spinning').on('value', (snapshot) => {
  app.spinning = snapshot.val() === "true" ? true : false
  $("#changeOutcome").prop('disabled', app.spinning ? true : null)
  $("#choices").prop('disabled', app.spinning ? true : null)
})