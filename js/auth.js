function updateAuthUI() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userSpan = document.getElementById('user-name');
    const loginBtn = document.getElementById('btn-login');
    const logoutBtn = document.getElementById('btn-logout');
    const historyBtn = document.getElementById('btn-history');

    if (userSpan && loginBtn && logoutBtn && historyBtn) {
        if (token) {
            userSpan.textContent = `Привет, ${username}!`;
            userSpan.classList.remove('hidden');
            loginBtn.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
            historyBtn.classList.remove('hidden');
        } else {
            userSpan.classList.add('hidden');
            loginBtn.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
            historyBtn.classList.add('hidden');
        }
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

// Логика для страницы login.html
if (document.getElementById('form-auth')) {
    let isRegisterMode = false;
    
    document.getElementById('toggle-auth-mode').addEventListener('click', (e) => {
        e.preventDefault();
        isRegisterMode = !isRegisterMode;
        document.getElementById('modal-title').textContent = isRegisterMode ? 'Регистрация' : 'Вход';
        document.getElementById('btn-submit-auth').textContent = isRegisterMode ? 'Зарегистрироваться' : 'Войти';
        e.target.textContent = isRegisterMode ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться';
    });

    document.getElementById('form-auth').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('auth-username').value;
        const password = document.getElementById('auth-password').value;
        const endpoint = isRegisterMode ? '/register' : '/login';

        const data = await fetchAPI(endpoint, {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });

        if (data.error) return alert(data.error);
        
        if (isRegisterMode) {
            alert('Регистрация успешна! Теперь войдите.');
            document.getElementById('toggle-auth-mode').click();
        } else {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            window.location.href = 'index.html';
        }
    });
}

document.addEventListener('DOMContentLoaded', updateAuthUI);