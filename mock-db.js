/**
 * Mock Database for Lumina Academy
 * Uses localStorage to simulate a database for Users and Events.
 */

const DB = {
    // Keys
    USERS_KEY: 'lumina_users',
    EVENTS_KEY: 'lumina_events',

    // Initial Data
    init: function () {
        // ALWAYS ensure the Owner 'Anees' exists, even if DB was already created.
        let users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');

        // 1. If DB is empty, seed defaults (including Anees)
        if (users.length === 0) {
            users = [
                { username: 'Anees', password: 'Anees', role: 'owner', name: 'Anees (Owner)' },
                { username: 'admin', password: 'password', role: 'owner', name: 'Super Admin' },
                { username: 'teacher', password: 'password', role: 'staff', name: 'Mr. Anderson' },
                { username: 'student', password: 'password', role: 'student', name: 'Jane Student' }
            ];
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        } else {
            // 2. If DB exists, check if 'Anees' is there. If not, add him.
            const ownerExists = users.find(u => u.username === 'Anees');
            if (!ownerExists) {
                users.push({ username: 'Anees', password: 'Anees', role: 'owner', name: 'Anees (Owner)' });
                localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
            }
        }

        if (!localStorage.getItem(this.EVENTS_KEY)) {
            const initialEvents = [
                { id: 1, day: 5, month: 'NOV', title: 'Annual Inter-House Athletics Meet', tag: 'Sports', time: '09:00 AM - 04:00 PM', location: 'Main Stadium' },
                { id: 2, day: 12, month: 'NOV', title: 'Science Fair Exhibition', tag: 'Academic', time: '10:00 AM - 02:00 PM', location: 'Great Hall' }
            ];
            localStorage.setItem(this.EVENTS_KEY, JSON.stringify(initialEvents));
        }
    },

    // User Methods
    getUsers: function () {
        return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    },

    addUser: function (user) {
        const users = this.getUsers();
        if (users.find(u => u.username === user.username)) {
            return { success: false, message: 'Username already exists!' };
        }
        users.push(user);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        return { success: true, message: 'User registered successfully!' };
    },

    deleteUser: function (username) {
        let users = this.getUsers();
        users = users.filter(u => u.username !== username);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    },

    updateUser: function (oldUsername, updatedData) {
        let users = this.getUsers();
        const index = users.findIndex(u => u.username === oldUsername);
        if (index !== -1) {
            users[index] = { ...users[index], ...updatedData };
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
            return { success: true, message: 'User updated successfully' };
        }
        return { success: false, message: 'User not found' };
    },

    login: function (username, password) {
        const users = this.getUsers();
        const user = users.find(u => u.username === username && u.password === password);
        return user || null;
    },

    // Event Methods
    getEvents: function () {
        return JSON.parse(localStorage.getItem(this.EVENTS_KEY) || '[]');
    },

    addEvent: function (event) {
        const events = this.getEvents();
        event.id = Date.now();
        events.push(event);
        localStorage.setItem(this.EVENTS_KEY, JSON.stringify(events));
    },

    // Website Settings
    SETTINGS_KEY: 'lumina_settings',
    getSettings: function () {
        return JSON.parse(localStorage.getItem(this.SETTINGS_KEY) || '{"schoolName": "Lumina Academy", "announcement": "Welcome to our new portal!"}');
    },
    saveSettings: function (settings) {
        localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    }
};

// Initialize DB on load
DB.init();
