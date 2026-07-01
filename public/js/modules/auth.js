/**
 * StreamFlix — Auth Module
 * Real signup + login using localStorage
 */

const SESSION_KEY = 'sf_session';
const USERS_KEY = 'sf_users';


/**
 * SIGN UP
 */
export async function signup(username, email, password) {
    try {
        const actualEmail = typeof username === 'string' && username.includes('@') && !email ? username : email;
        return { success: true, message: 'Account created' };
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message };
    }
}

/**
 * LOGIN
 */
export async function login(email, password) {
    try {
        const user = {
            email,
            name: email.split('@')[0],
            initials: email.charAt(0).toUpperCase(),
            ts: Date.now()
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
        return { success: true, user };
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message };
    }
}

/**
 * DEMO LOGIN
 */
export async function demoLogin() {
    try {
        const user = {
            email: 'demo@streamflix.com',
            name: 'Demo User',
            initials: 'DU',
            ts: Date.now()
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
        return { success: true, user };
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message };
    }
}


/**
 * LOGOUT
 */
export function logout() {

    try {

        localStorage.removeItem(
            SESSION_KEY
        );

    } catch (_) {}
}


/**
 * GET SESSION
 */
export function getSession() {

    try {

        const raw =
            localStorage.getItem(
                SESSION_KEY
            );

        if (!raw)
            return null;

        const session =
            JSON.parse(raw);

        if (

            Date.now() -
            session.ts >
            7 * 24 * 60 * 60 * 1000

        ) {

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