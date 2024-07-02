// Variables for storage of credantials for different modals
let registeredUsername = '';
let registeredPassword = '';
let currentUser = null;
let newsletterEmail = '';

//display modal function
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
}

// hide modal function

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 500);
}

//sign up modal storing entered values
document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();

    registeredUsername = document.getElementById('signUpUsername').value;
    registeredPassword = document.getElementById('signUpPassword').value;

    console.log('User Signed Up:', { registeredUsername, registeredPassword });

    document.getElementById('signUpForm').reset();
    hideModal('signUpModal');
});

// login modal logic for checking vales from signup modal
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (username === registeredUsername && password === registeredPassword) {
        currentUser = username;
        updateNavbar();
        hideModal('loginModal');
    } else {
        alert('Invalid username or password. Please try again.');
    }

    document.getElementById('loginForm').reset();
});

//changes the logout button
document.getElementById('logoutBtn').addEventListener('click', function() {
    currentUser = null;
    updateNavbar();
});

//displayes the currently subscribed email in the unsubscribe modal
document.getElementById('newsletterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    newsletterEmail = document.getElementById('newsletterEmail').value;

    console.log('Subscribed to Newsletter:', { newsletterEmail });

    document.getElementById('newsletterForm').reset();
    hideModal('subscribeModal');
});

//logic for showing aproppriate modal for newsletter
document.getElementById('unsubscribeBtn').addEventListener('click', function() {
    newsletterEmail = '';
    hideModal('unsubscribeModal');
    showModal('subscribeModal');
});

//changes the button from login to logout and displays the currently loggin user
function updateNavbar() {
    const loggedInUser = document.getElementById('loggedInUser');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (currentUser) {
        loggedInUser.textContent = `Logged in as: ${currentUser}`;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    } else {
        loggedInUser.textContent = '';
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    }
}

//logic frr displaying newsletter and and NL unsubscribe modal
document.getElementById('newsletterBtn').addEventListener('click', function() {
    if (newsletterEmail) {
        document.getElementById('currentEmail').textContent = newsletterEmail;
        showModal('unsubscribeModal');
    } else {
        showModal('subscribeModal');
    }
});

//login event listener
document.getElementById('loginBtn').addEventListener('click', function() {
    showModal('loginModal');
});

document.getElementById('showSignUpBtn').addEventListener('click', function() {
    hideModal('loginModal');
    showModal('signUpModal');
});

//closing open modals when clinked on the background
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function(event) {
        const modal = event.target.closest('.modal');
        hideModal(modal.id);
    });
});

window.addEventListener('click', function(event) {
    const modal = document.querySelector('.modal.show');
    if (modal && event.target === modal) {
        hideModal(modal.id);
    }
});

//updates the navbar
updateNavbar();
