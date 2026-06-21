// ════════════════════════════════════════
// FIREBASE
// ════════════════════════════════════════

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBt8oFZNitr4HYy9Ms4nZotXNIia1OQkq0",
  authDomain: "specs-app-dc544.firebaseapp.com",
  projectId: "specs-app-dc544",
  storageBucket: "specs-app-dc544.firebasestorage.app",
  messagingSenderId: "118532086745",
  appId: "1:118532086745:web:bf90d2795e190c9b7cd7c8",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ════════════════════════════════════════
// FIREBASE: LOG ALL DATA TO CONSOLE
// ════════════════════════════════════════
// Fires immediately on page load, then again any time data changes
// (someone submits the form, or data is edited in the Firebase console).

const responsesRef = ref(db, 'responses');

onValue(responsesRef, (snapshot) => {
  console.log('🔥 Full snapshot from Firebase:', snapshot.val());

  if (!snapshot.exists()) {
    console.log('No responses found in Firebase yet.');
    return;
  }

  console.log(`📦 Total responses: ${snapshot.size}`);

  // Loop through each child snapshot (each individual response)
  snapshot.forEach((childSnapshot) => {
    const key  = childSnapshot.key;   // auto-generated unique id
    const data = childSnapshot.val(); // { outfit, personality, occasion }
    console.log(`➡️ Response [${key}]:`, data);
  });
});

// ════════════════════════════════════════
// SCREEN MANAGEMENT
// ════════════════════════════════════════

const screens = {
  welcome: document.getElementById('welcomeScreen'),
  form:    document.getElementById('formScreen'),
  result:  document.getElementById('resultScreen'),
  details: document.getElementById('detailsScreen'),
  about:   document.getElementById('aboutScreen'),
  profile: document.getElementById('profileScreen'),
};

function showScreen(screen) {
  Object.values(screens).forEach((s) => s.classList.remove('active'));
  screen.classList.add('active');
  screen.scrollTop = 0;
}

// ════════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════════

document.getElementById('startBtn').addEventListener('click', () => {
  showScreen(screens.form);
});

document.getElementById('detailsBtn').addEventListener('click', () => {
  showScreen(screens.details);
});

document.getElementById('aboutBtn').addEventListener('click', () => {
  showScreen(screens.about);
});

document.getElementById('goProfileBtn').addEventListener('click', () => {
  showScreen(screens.profile);
});

document.getElementById('profileBtn').addEventListener('click', () => {
  showScreen(screens.profile);
});

document.getElementById('homeBtn').addEventListener('click', () => {
  showScreen(screens.welcome);
});

// ════════════════════════════════════════
// FRAME DATA
// ════════════════════════════════════════

const frameData = {
  formalProfessionalWork: {
    title:       'Rectangle Frame',
    image:       'rectangle-frame.png',
    description: 'Sharp lines, confident presence. Rectangle frames pair naturally with formal attire and office settings — projecting authority without effort.',
    tags:        ['Classic', 'Professional', 'Structured'],
  },
  casualCreativeDaily: {
    title:       'Round Frame',
    image:       'round-frame.png',
    description: 'Soft curves with an artistic soul. Round frames complement creative personalities and effortless everyday looks with a timeless, relaxed energy.',
    tags:        ['Artistic', 'Relaxed', 'Timeless'],
  },
  sportyActiveOutdoor: {
    title:       'Wrap Frame',
    image:       'wrap-frame.png',
    description: 'Built for movement and the elements. Wrap frames deliver full coverage and a secure fit that keeps up with every outdoor adventure.',
    tags:        ['Sporty', 'Durable', 'Active'],
  },
  default: {
    title:       'Classic Rectangle Frame',
    image:       'rectangle-frame.png',
    description: 'A universally flattering silhouette that adapts beautifully to any outfit, personality, and occasion — a wardrobe essential.',
    tags:        ['Versatile', 'Timeless', 'Universal'],
  },
};

// ════════════════════════════════════════
// RECOMMENDATION LOGIC
// ════════════════════════════════════════

let currentFrame = frameData.default;

function getMatchedFrame(outfit, personality, occasion) {
  if (outfit === 'Formal'  && personality === 'Professional' && occasion === 'Work')    return frameData.formalProfessionalWork;
  if (outfit === 'Casual'  && personality === 'Creative'     && occasion === 'Daily')   return frameData.casualCreativeDaily;
  if (outfit === 'Sporty'  && personality === 'Active'       && occasion === 'Outdoor') return frameData.sportyActiveOutdoor;
  return frameData.default;
}

function applyFrameToUI(frame) {
  // Result screen
  document.getElementById('frameImage').src             = frame.image;
  document.getElementById('frameTitle').textContent     = frame.title;
  document.getElementById('frameDescription').textContent = frame.description;

  // Details screen
  document.getElementById('detailImage').src  = frame.image;
  document.getElementById('detailTitle').textContent = frame.title;
  document.getElementById('detailText').textContent  = frame.description;

  // Detail tags
  const tagContainer = document.getElementById('detailTags');
  if (tagContainer && frame.tags) {
    tagContainer.innerHTML = frame.tags
      .map((t) => `<span class="tag-chip">${t}</span>`)
      .join('');
  }
}

// ════════════════════════════════════════
// FIREBASE: SAVE RESPONSE
// ════════════════════════════════════════

function saveResponseToFirebase(outfit, personality, occasion) {
  // Creates a new entry under "responses" with a unique auto-generated key
  const newResponseRef = push(responsesRef);

  set(newResponseRef, {
    outfit:      outfit,
    personality: personality,
    occasion:    occasion,
  })
    .then(() => {
      console.log('Response saved to Firebase ✅');
    })
    .catch((error) => {
      console.error('Error saving response to Firebase:', error);
    });
}

document.getElementById('recommendBtn').addEventListener('click', () => {
  const outfit      = document.getElementById('outfit').value;
  const personality = document.getElementById('personality').value;
  const occasion    = document.getElementById('occasion').value;

  // Validation
  if (!outfit || !personality || !occasion) {
    showValidationError();
    return;
  }

  currentFrame = getMatchedFrame(outfit, personality, occasion);
  applyFrameToUI(currentFrame);

  // Save the user's three form selections to Firebase Realtime Database
  saveResponseToFirebase(outfit, personality, occasion);

  showScreen(screens.result);
});

// ════════════════════════════════════════
// VALIDATION FEEDBACK
// ════════════════════════════════════════

function showValidationError() {
  const selects = ['outfit', 'personality', 'occasion'];
  selects.forEach((id) => {
    const el = document.getElementById(id);
    if (!el.value) {
      el.style.borderColor = '#DC3545';
      el.style.boxShadow   = '0 0 0 3px rgba(220,53,69,0.12)';
      el.addEventListener('change', () => {
        el.style.borderColor = '';
        el.style.boxShadow   = '';
      }, { once: true });
    }
  });
}

// ════════════════════════════════════════
// PROFILE MENU
// ════════════════════════════════════════

document.querySelectorAll('.menu-item[data-action]').forEach((item) => {
  item.addEventListener('click', () => {
    const action = item.dataset.action;

    if (action === 'preferences') {
      showScreen(screens.form);
    }

    if (action === 'about') {
      showScreen(screens.about);
    }

    if (action === 'logout') {
      if (confirm('Are you sure you want to log out?')) {
        showScreen(screens.welcome);
      }
    }
  });
});