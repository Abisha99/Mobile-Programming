import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import {
    getDatabase,
    set,
    ref,
    get
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATND5saY3ilhRCt_wkZHshjVdfM8SUTtg",
    authDomain: "contact-5d231.firebaseapp.com",
    projectId: "contact-5d231",
    storageBucket: "contact-5d231.firebasestorage.app",
    messagingSenderId: "847115086205",
    appId: "1:847115086205:web:b923a9331edef54fb50414"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ==========================
// WRITE DATA
// ==========================
function writeUserData(fullname, mobile, email, message) {
    const counterRef = ref(db, "counter");

    get(counterRef)
        .then((snapshot) => {
            let count = snapshot.exists() ? snapshot.val() : 0;

            count++;

            // Save updated counter
            return set(counterRef, count).then(() => count);
        })
        .then((count) => {
            // Save contact data
            return set(ref(db, "contacts/" + count), {
                id: count,
                fullname,
                mobile,
                email,
                message
            }).then(() => count);
        })
        .then((count) => {
            console.log("Message sent successfully with ID:", count);

            console.log("Saved Message Data:");
            console.log({
                id: count,
                fullname,
                mobile,
                email,
                message
            });

            document.getElementById("status").innerText =
                "Message sent successfully!";
        })
        .catch((error) => {
            console.error("Error adding data:", error);

            document.getElementById("status").innerText =
                "Error sending message.";
        });
}

// Make function available in browser
window.writeUserData = writeUserData;

// ==========================
// READ CONTACTS
// ==========================
function readContacts() {
    const contactRef = ref(db, "contacts");

    get(contactRef)
        .then((snapshot) => {
            if (!snapshot.exists()) {
                console.log("No contacts found.");
                return;
            }

            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();

                console.log("ID:", data.id);
                console.log("Full Name:", data.fullname);
                console.log("Mobile:", data.mobile);
                console.log("Email:", data.email);
                console.log("Message:", data.message);
                console.log("---------------------");
            });
        })
        .catch((error) => {
            console.error("Error reading contacts:", error);
        });
}

window.readContacts = readContacts;

// ==========================
// FORM SUBMIT
// ==========================
document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullName").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("gmail").value.trim();
    const message = document.getElementById("message").value.trim();

    writeUserData(fullname, mobile, email, message);

    e.target.reset();
});