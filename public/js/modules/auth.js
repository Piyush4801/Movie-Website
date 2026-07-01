/**
 * StreamFlix — Auth Module
 * API Integration
 */

const SESSION_KEY = 'sf_session';

// Helper to handle API requests
async function apiRequest(endpoint, method, data) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    const response = await fetch(`/api/auth/${endpoint}`, options);
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.error || result.message || 'API request failed');
    }
    return result;
}

/**
 * SIGN UP
 */
export async function signup(arg1, arg2, arg3) {
    try {
        // Handle varying signatures (app.js passes (email, password) while old signature was (username, email, password))
        let email, password, name;
        if (arg3) {
            name = arg1;
            email = arg2;
            password = arg3;
        } else {
            email = arg1;
            password = arg2;
            name = email.split('@')[0];
        }

        const result = await apiRequest('register', 'POST', {
            name,
            email,
            password
        });
        
        return { success: true, message: 'Account created' };
    } catch (err) {
        console.error(err);
        return { success: false, message: err.message };
    }
}

/**
 * LOGIN
 */
export async function login(email, password) {
    try {
        const result = await apiRequest('login', 'POST', { email, password });
        
        if (result.success) {
            const userObj = {
                ...result.user,
                ts: Date.now()
            };
            localStorage.setItem(SESSION_KEY, JSON.stringify(userObj));
            return { success: true, user: userObj };
        }
        return { success: false, message: 'Login failed' };
    } catch (err) {
        console.error(err);
        return { success: false, message: err.message };
    }
}

/**
 * DEMO LOGIN
 */
export async function demoLogin() {
    try {
        const result = await apiRequest('demo', 'POST');
        if (result.success) {
            const userObj = {
                ...result.user,
                ts: Date.now()
            };
            localStorage.setItem(SESSION_KEY, JSON.stringify(userObj));
            return { success: true, user: userObj };
        }
        return { success: false, message: 'Demo login failed' };
    } catch (err) {
        console.error(err);
        return { success: false, message: err.message };
    }
}

/**
 * LOGOUT
 */
export async function logout() {
    try {
        await apiRequest('logout', 'GET');
    } catch (_) {}
    
    try {
        localStorage.removeItem(SESSION_KEY);
    } catch (_) {}
}

/**
 * GET SESSION
 */
export function getSession() {
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (!raw) return null;

        const session = JSON.parse(raw);

        if (Date.now() - session.ts > 7 * 24 * 60 * 60 * 1000) {
            logout();
            return null;
        }
        return session;
    } catch (_) {
        return null;
    }
}

/**
 * CHECK LOGIN
 */
export function isLoggedIn() {
    return getSession() !== null;
}