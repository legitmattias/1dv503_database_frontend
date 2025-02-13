import { writable } from 'svelte/store';

// Function to check if running in the browser
const isBrowser = typeof window !== 'undefined';

// Load user from localStorage only in the browser
const storedUser = isBrowser ? localStorage.getItem('user') : null;

export const user = writable<{ userid: number; fname: string; lname: string; email: string } | null>(
	storedUser ? JSON.parse(storedUser) : null
);

// Function to fetch user from localStorage on page load
export const loadUser = () => {
	if (isBrowser) {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			user.set(JSON.parse(storedUser));
		}
	}
};

// Subscribe to store and update localStorage only in the browser
user.subscribe((value) => {
	if (isBrowser) {
		if (value) {
			localStorage.setItem('user', JSON.stringify(value));
		} else {
			localStorage.removeItem('user');
		}
	}
});

// Store for feedback messages
export const feedback = writable<{ message: string; type: 'success' | 'error' } | null>(null);

// Function to trigger feedback
export const showFeedback = (message: string, type: 'success' | 'error') => {
	feedback.set({ message, type });

	// Clear after 3 seconds
	setTimeout(() => feedback.set(null), 3000);
};
