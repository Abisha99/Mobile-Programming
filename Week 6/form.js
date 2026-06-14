// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";


// Firebase Configuration
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
const db = getDatabase(app);

console.log(db);



// ================= CREATE =================
function writeUserData(
    userId,
    firstname,
    lastname,
    address,
    age,
    email,
    contact,
    marks,
    DOB,
    Field
) {

    const userRef = ref(db, 'users/' + userId);

    set(userRef, {
        firstname,
        lastname,
        address,
        age,
        email,
        contact,
        marks,
        DOB,
        Field
    })
        .then(() => {

            console.log("User added successfully.");

            // Snapshot after create
            return get(userRef);

        })
        .then((snapshot) => {

            if (snapshot.exists()) {

                console.log("Created User Snapshot:");
                console.log(snapshot.val());

            }

        })
        .catch((error) => {

            console.error("Error adding user:", error);

        });
}

window.writeUserData = writeUserData;



// ================= READ ALL =================
function readUser() {

    const userRef = ref(db, 'users');

    get(userRef)
        .then((snapshot) => {

            if (snapshot.exists()) {

                console.log("All Users:");

                snapshot.forEach((childSnapshot) => {

                    console.log(
                        "User ID:",
                        childSnapshot.key,
                        childSnapshot.val()
                    );

                });

            } else {

                console.log("No users found.");

            }

        })
        .catch((error) => {

            console.error("Error reading users:", error);

        });
}

window.readUser = readUser;



// ================= READ SINGLE USER =================
function readUserById(userId) {

    const userRef = ref(db, 'users/' + userId);

    get(userRef)
        .then((snapshot) => {

            if (snapshot.exists()) {

                console.log("User Found:");
                console.log(snapshot.val());

            } else {

                console.log("User not found.");

            }

        })
        .catch((error) => {

            console.error("Error reading user:", error);

        });
}

window.readUserById = readUserById;



// ================= FETCH USER BEFORE UPDATE =================
function fetchUserForUpdate(userId) {

    const userRef = ref(db, 'users/' + userId);

    get(userRef)
        .then((snapshot) => {

            if (snapshot.exists()) {

                const user = snapshot.val();

                // Load values into update form
                document.getElementById("update-id").value = userId;
                document.getElementById("update-firstname").value = user.firstname || "";
                document.getElementById("update-lastname").value = user.lastname || "";
                document.getElementById("update-address").value = user.address || "";
                document.getElementById("update-age").value = user.age || "";
                document.getElementById("update-email").value = user.email || "";
                document.getElementById("update-contact").value = user.contact || "";
                document.getElementById("update-marks").value = user.marks || "";
                document.getElementById("update-dob").value = user.DOB || "";
                document.getElementById("update-field").value = user.Field || "";

                console.log("Loaded User Into Update Form:");
                console.log(user);

            } else {

                console.log("User not found.");

            }

        })
        .catch((error) => {

            console.error("Error fetching user:", error);

        });
}

window.fetchUserForUpdate = fetchUserForUpdate;



// ================= UPDATE =================
function updateUserData(userId, updatedData) {

    const userRef = ref(db, 'users/' + userId);

    update(userRef, updatedData)

        .then(() => {

            console.log("User updated successfully.");

            // Snapshot after update
            return get(userRef);

        })

        .then((snapshot) => {

            if (snapshot.exists()) {

                console.log("Updated User Snapshot:");
                console.log(snapshot.val());

            }

        })

        .catch((error) => {

            console.error("Error updating user:", error);

        });
}

window.updateUserData = updateUserData;



// ================= DELETE =================
function deleteUserData(userId) {

    const userRef = ref(db, 'users/' + userId);

    // Snapshot before delete
    get(userRef)

        .then((snapshot) => {

            if (snapshot.exists()) {

                console.log("Deleting User:");
                console.log(snapshot.val());

            } else {

                console.log("User not found.");

            }

            return remove(userRef);

        })

        .then(() => {

            console.log("User deleted successfully.");

            // Snapshot after delete
            return get(ref(db, 'users'));

        })

        .then((snapshot) => {

            console.log("Remaining Users:");

            if (snapshot.exists()) {

                snapshot.forEach((childSnapshot) => {

                    console.log(
                        "User ID:",
                        childSnapshot.key,
                        childSnapshot.val()
                    );

                });

            } else {

                console.log("No users remaining.");

            }

        })

        .catch((error) => {

            console.error("Error deleting user:", error);

        });
}

window.deleteUserData = deleteUserData;