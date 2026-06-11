  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import{getDatabase,ref,set,get,update,remove} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC1cdwP4XLNMrfB2BY8Vr1do7WukFunr_o",
    authDomain: "mobileprogramming-2a643.firebaseapp.com",
    projectId: "mobileprogramming-2a643",
    storageBucket: "mobileprogramming-2a643.firebasestorage.app",
    messagingSenderId: "240006568425",
    appId: "1:240006568425:web:7af1b507072317adf19378"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
    const db= getDatabase(app)
console.log(db)
//Function to write user data to Firebase Realtime Database
// function writeUserData(userId, firstname, lastname) {
//     // Get the database instance
  
//     // Create a reference/points to 'users/{userId}' and set the data (name and email)
 // Function to add user
function writeUserData(userId, firstname, lastname, address, age, email, contact, marks, DOB, Field) {
  set(ref(db, 'users/' + userId), {
    firstname: firstname,
    lastname: lastname,
    address: address,
    age: age,
    email: email,
    contact: contact,
    marks: marks,
    DOB: DOB,
    Field: Field
  });
}

// Add 10 users
writeUserData(1, "Abisha", "Dhakal", "Bhaktapur", 22, "abisha@gmail.com", "9800000001", 85, "2004-05-10", "IT");

writeUserData(2, "Abinesh", "Dhakal", "Bhaktapur", 18, "abinesh@gmail.com", "9800000002", 78, "2008-02-15", "Management");

writeUserData(3, "Upashana", "Sah", "Tikathali", 22, "upashana@gmail.com", "9800000003", 90, "2004-08-22", "Computer Science");

writeUserData(4, "Ishani", "Giri", "Maitidevi", 20, "ishani@gmail.com", "9800000004", 88, "2006-01-12", "BBA");

writeUserData(5, "Sadichha", "Shakya", "Imadol", 20, "sadichha@gmail.com", "9800000005", 92, "2006-03-18", "IT");

writeUserData(6, "Bipin", "Ghimire", "Goldhunga", 20, "bipin@gmail.com", "9800000006", 75, "2006-07-25", "Engineering");

writeUserData(7, "Diwas", "Khadka", "Kirtipur", 23, "diwas@gmail.com", "9800000007", 81, "2003-11-05", "Cyber Security");

writeUserData(8, "Bipul", "Dahal", "Lokanthali", 6, "bipul@gmail.com", "9800000008", 95, "2020-09-14", "Primary");

writeUserData(9, "Bipsana", "Dahal", "Lokanthali", 11, "bipsana@gmail.com", "9800000009", 89, "2015-06-30", "Secondary");

writeUserData(10, "Sabikshya", "Adhikari", "Gaushala", 17, "sabikshya@gmail.com", "9800000010", 84, "2009-12-20", "Science");
//Snapshots
function readUser() {
    const userRef = ref(db, 'users');
    get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    console.log(childSnapshot.val());
                });
            } else {
                console.log("No users found");
            }
        })
        .catch((error) => {
            console.error("Error reading data:", error);
        });
}
// Call the function
readUser();

//Update
function updateUserData(userId, updatedData) {
  const userRef = ref(db, 'users/' + userId);

  update(userRef, updatedData)
    .then(() => {
      console.log("User updated successfully");
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
}

// Example
updateUserData(2, {
  firstname: "Abisha",
  lastname: "Dhakal",
  address: "Bhaktapur",
  age: 20
});
//Delete USer
function deleteUserData(userId) {
  const userRef = ref(db, 'users/' + userId);
  remove(userRef)
    .then(() => {
      console.log("User deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}

// // // // // // // // Example usage:
deleteUserData(1);



