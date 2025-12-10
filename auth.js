/* ===== AUTHENTICATION SYSTEM ===== */

// Admin credentials (stored on website - update these as needed)
const ADMIN_CREDENTIALS = {
    email: 'admin@coffee.com',
    password: 'admin123'
};

const USERS_KEY = 'cs_users_v1';
const CURRENT_USER_KEY = 'cs_current_user_v1';

// Initialize users with default admin account
function initializeUsers() {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const adminExists = users.some(u => u.email === ADMIN_CREDENTIALS.email);
    
    if (!adminExists) {
        users.push({
            id: 'user_admin_' + Math.random().toString(36).slice(2, 9),
            name: 'Admin',
            email: ADMIN_CREDENTIALS.email,
            password: ADMIN_CREDENTIALS.password,
            role: 'admin',
            createdAt: new Date().toISOString()
        });
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
}

// Get all users (for admin to view)
function getAllUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

// Switch between login and signup tabs
function switchToSignup() {
    document.getElementById('login-tab').style.display = 'none';
    document.getElementById('signup-tab').style.display = 'block';
    document.getElementById('auth-title').textContent = 'Sign Up';
}

function switchToLogin() {
    document.getElementById('signup-tab').style.display = 'none';
    document.getElementById('login-tab').style.display = 'block';
    document.getElementById('auth-title').textContent = 'Login';
}

// Update navbar button based on login status
function updateAuthButton() {
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null');
    const authBtn = document.getElementById('auth-btn');
    
    if (currentUser) {
        authBtn.textContent = currentUser.name;
        authBtn.setAttribute('data-bs-toggle', 'modal');
        authBtn.setAttribute('data-bs-target', '#profileModal');
        authBtn.className = 'btn btn-info btn-sm';
    } else {
        authBtn.textContent = 'Login/Sign up';
        authBtn.setAttribute('data-bs-toggle', 'modal');
        authBtn.setAttribute('data-bs-target', '#authModal');
        authBtn.className = 'btn btn-outline-secondary btn-sm';
    }
}

// Handle Login
function setupLoginHandler() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();
        const isAdmin = document.getElementById('login-admin').checked;
        
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            alert('Invalid email or password');
            return;
        }
        
        if (isAdmin && user.role !== 'admin') {
            alert('This account is not an admin account');
            return;
        }
        
        // Store current user
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        
        alert('Login successful!');
        
        // Close modal
        const authModal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
        if (authModal) authModal.hide();
        
        updateAuthButton();
        
        if (isAdmin && user.role === 'admin') {
            setTimeout(() => window.location.href = 'admin.html', 500);
        }
        
        this.reset();
    });
}

// Handle Signup
function setupSignupHandler() {
    const signupForm = document.getElementById('signup-form');
    if (!signupForm) return;
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();
        const confirmPassword = document.getElementById('signup-confirm-password').value.trim();
        const isAdmin = document.getElementById('signup-admin').checked;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }
        
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        
        if (users.some(u => u.email === email)) {
            alert('Email already registered');
            return;
        }
        
        if (isAdmin) {
            const adminKey = prompt('Enter admin registration key:');
            if (adminKey !== 'admin123key') {
                alert('Invalid admin key');
                return;
            }
        }
        
        const newUser = {
            id: 'user_' + Math.random().toString(36).slice(2, 9),
            name: name,
            email: email,
            password: password,
            role: isAdmin ? 'admin' : 'customer',
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
        
        alert('Account created successfully!');
        
        const authModal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
        if (authModal) authModal.hide();
        
        updateAuthButton();
        
        if (isAdmin) {
            setTimeout(() => window.location.href = 'admin.html', 500);
        }
        
        this.reset();
        switchToLogin();
    });
}

// Setup profile modal
function setupProfileModal() {
    const profileModal = document.getElementById('profileModal');
    if (!profileModal) return;
    
    profileModal.addEventListener('show.bs.modal', function() {
        const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null');
        
        if (currentUser) {
            document.getElementById('profile-name').textContent = currentUser.name;
            document.getElementById('profile-email').textContent = currentUser.email;
            document.getElementById('profile-role').textContent = `Role: ${currentUser.role === 'admin' ? 'Administrator' : 'Customer'}`;
            
            document.getElementById('view-admin-btn').style.display = currentUser.role === 'admin' ? 'block' : 'none';
            document.getElementById('view-cart-btn').style.display = currentUser.role === 'customer' ? 'block' : 'none';
        }
    });
}

// Setup action buttons
function setupActionButtons() {
    const adminBtn = document.getElementById('view-admin-btn');
    const cartBtn = document.getElementById('view-cart-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (adminBtn) {
        adminBtn.addEventListener('click', function() {
            window.location.href = 'admin.html';
        });
    }
    
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            const profileModal = bootstrap.Modal.getInstance(document.getElementById('profileModal'));
            if (profileModal) profileModal.hide();
            
            window.scrollTo({top: document.getElementById('order').offsetTop, behavior:'smooth'});
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem(CURRENT_USER_KEY);
            alert('Logged out successfully');
            
            const profileModal = bootstrap.Modal.getInstance(document.getElementById('profileModal'));
            if (profileModal) profileModal.hide();
            
            updateAuthButton();
            location.reload();
        });
    }
}

// Initialize authentication on page load
function initializeAuth() {
    initializeUsers();
    updateAuthButton();
    setupLoginHandler();
    setupSignupHandler();
    setupProfileModal();
    setupActionButtons();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAuth);
} else {
    initializeAuth();
}
