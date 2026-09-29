const STORAGE_KEY = 'kalye_luma_3_modules_data_v1';
const SESSION_KEY = 'kalye_luma_session_v1';

function seedData(){
    return {
        users: [
            {
                username: 'admin',
                password: 'admin123',
                role: 'admin'
            },
            {
                username: 'cashier',
                password: 'cashier123',
                role: 'cashier'
            }
        ],
        products: [],
        transactions: []
    };
}

function loadData(){
    const raw = localStorage.getItem(STORAGE_KEY);

    if(!raw){
        const seeded = seedData();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
        return seeded;
    }

    try{
        return JSON.parse(raw);
    }catch(e){
        const seeded = seedData();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
        return seeded;
    }
}

function saveData(){
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(DATA)
    );
}

let DATA = loadData();

let SESSION =
    JSON.parse(
        sessionStorage.getItem(SESSION_KEY) || 'null'
    );

function fmt(n){
    return '₱' + Number(n).toFixed(2);
}

function todayStr(){
    return new Date().toISOString().slice(0,10);
}

function niceDateTime(iso){
    const d = new Date(iso);

    return d.toLocaleString(undefined,{
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showView(name){
    document.querySelectorAll('.view').forEach(function(view){
        view.classList.remove('active');
    });

    const target =
        document.getElementById('view-' + name);

    if(target){
        target.classList.add('active');
    }

    document.querySelectorAll('.nav-link').forEach(function(link){
        link.classList.toggle(
            'active',
            link.dataset.view === name
        );
    });
}

document.querySelectorAll('.nav-link').forEach(function(link){
    link.addEventListener('click', function(){
        showView(link.dataset.view);
    });
});

function renderAll(){
    renderDashboard();
}

function enterApp(){
    document.getElementById('loginScreen').style.display = 'none';

    const signupScreen =
        document.getElementById('signupScreen');

    const changePasswordScreen =
        document.getElementById('changePasswordScreen');

    if(signupScreen){
        signupScreen.style.display = 'none';
    }

    if(changePasswordScreen){
        changePasswordScreen.style.display = 'none';
    }

    document.getElementById('app').classList.add('active');

    const userLabel =
        document.getElementById('userLabel');

    if(userLabel){
        userLabel.textContent =
            SESSION.username + ' · ' + SESSION.role;
    }

    const avatar =
        document.getElementById('userAvatar');

    if(avatar){
        avatar.textContent =
            SESSION.username[0].toUpperCase();
    }

    showView('dashboard');
    renderAll();
}
