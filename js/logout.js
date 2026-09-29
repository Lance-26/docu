const logoutBtn =
    document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', function(){

    SESSION = null;

    sessionStorage.removeItem(SESSION_KEY);

    document.getElementById('app')
        .classList.remove('active');

    document.getElementById('loginScreen')
        .style.display = 'flex';

    document.getElementById('loginForm')
        .reset();

    document.getElementById('loginError')
        .textContent = '';

    document.getElementById('showChangePasswordBtn')
        .style.display = 'none';
});
