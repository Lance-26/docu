const loginForm =
    document.getElementById('loginForm');

const showPasswordBtn =
    document.getElementById('showPasswordBtn');

const showChangePasswordBtn =
    document.getElementById('showChangePasswordBtn');

loginForm.addEventListener('submit', function(event){
    event.preventDefault();

    const username =
        document.getElementById('loginUser').value.trim();

    const password =
        document.getElementById('loginPass').value;

    const error =
        document.getElementById('loginError');

    const user =
        DATA.users.find(function(account){
            return account.username.toLowerCase() ===
                username.toLowerCase();
        });

    if(!user){
        error.textContent = 'Username not found.';
        showChangePasswordBtn.style.display = 'none';
        return;
    }

    if(user.password !== password){
        error.textContent = 'Incorrect password.';
        showChangePasswordBtn.style.display = 'block';
        return;
    }

    error.textContent = '';
    showChangePasswordBtn.style.display = 'none';

    SESSION = {
        username: user.username,
        role: user.role
    };

    sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify(SESSION)
    );

    enterApp();
});

showPasswordBtn.addEventListener('click', function(){
    const password =
        document.getElementById('loginPass');

    if(password.type === 'password'){
        password.type = 'text';
        showPasswordBtn.textContent = 'HIDE';
    }else{
        password.type = 'password';
        showPasswordBtn.textContent = 'SHOW';
    }
});

const signupScreen =
    document.getElementById('signupScreen');

const showSignupBtn =
    document.getElementById('showSignupBtn');

const signupForm =
    document.getElementById('signupForm');

const backToLoginFromSignupBtn =
    document.getElementById('backToLoginFromSignupBtn');

showSignupBtn.addEventListener('click', function(){
    document.getElementById('loginScreen').style.display = 'none';
    signupScreen.style.display = 'flex';
    signupForm.reset();
});

backToLoginFromSignupBtn.addEventListener('click', function(){
    signupScreen.style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
    signupForm.reset();
});

signupForm.addEventListener('submit', function(event){
    event.preventDefault();

    const username =
        document.getElementById('signupUser').value.trim();

    const password =
        document.getElementById('signupPass').value;

    const confirmPassword =
        document.getElementById('signupConfirmPass').value;

    const role =
        document.getElementById('signupRole').value;

    const error =
        document.getElementById('signupError');

    if(username.length < 3){
        error.textContent =
            'Username must be at least 3 characters.';
        return;
    }

    if(password.length < 6){
        error.textContent =
            'Password must be at least 6 characters.';
        return;
    }

    if(password !== confirmPassword){
        error.textContent =
            'Passwords do not match.';
        return;
    }

    const exists =
        DATA.users.find(function(user){
            return user.username.toLowerCase() ===
                username.toLowerCase();
        });

    if(exists){
        error.textContent =
            'Username is already registered.';
        return;
    }

    DATA.users.push({
        username: username,
        password: password,
        role: role
    });

    saveData();

    signupForm.reset();
    signupScreen.style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';

    document.getElementById('loginError').textContent =
        'Account created successfully.';
});

const changePasswordScreen =
    document.getElementById('changePasswordScreen');

const backToLoginBtn =
    document.getElementById('backToLoginBtn');

const changePasswordForm =
    document.getElementById('changePasswordForm');

showChangePasswordBtn.addEventListener('click', function(){
    document.getElementById('loginScreen').style.display = 'none';
    changePasswordScreen.style.display = 'flex';
});

backToLoginBtn.addEventListener('click', function(){
    changePasswordScreen.style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
    changePasswordForm.reset();
});

changePasswordForm.addEventListener('submit', function(event){
    event.preventDefault();

    const username =
        document.getElementById('changeUser').value.trim();

    const newPassword =
        document.getElementById('newPassword').value;

    const confirmPassword =
        document.getElementById('confirmPassword').value;

    const code =
        document.getElementById('twoFactorCode').value.trim();

    const error =
        document.getElementById('changePasswordError');

    const user =
        DATA.users.find(function(account){
            return account.username.toLowerCase() ===
                username.toLowerCase();
        });

    if(!user){
        error.textContent = 'Username not found.';
        return;
    }

    if(newPassword.length < 6){
        error.textContent =
            'Password must be at least 6 characters.';
        return;
    }

    if(newPassword !== confirmPassword){
        error.textContent =
            'Passwords do not match.';
        return;
    }

    if(code !== 'KALYE-482917'){
        error.textContent =
            'Invalid 2FA code.';
        return;
    }

    user.password = newPassword;

    saveData();

    changePasswordForm.reset();
    changePasswordScreen.style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';

    document.getElementById('loginError').textContent =
        'Password changed successfully.';

    showChangePasswordBtn.style.display = 'none';
});

if(SESSION){
    enterApp();
}
