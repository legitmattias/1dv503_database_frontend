<script lang="ts">
	import { goto } from '$app/navigation';
	import { user, showFeedback } from '$lib/stores';

	const API_BASE = import.meta.env.VITE_BACKEND_URL;

	let email = '';
	let password = '';
	let error: string | null = null;

	const login = async () => {
	try {
		const response = await fetch(`${API_BASE}/api/members/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({ email, password })
		});

		if (!response.ok) {
			// Try to read server error message
			const errorMessage = await response.text();
			throw new Error(errorMessage || 'Invalid email or password.');
		}

		const data = await response.json();
		user.set(data.user); // Store user data in global store
		showFeedback(`Login successful. Welcome ${data.user.fname}`, 'success');

		goto('/');
	} catch (err) {
		if (err instanceof TypeError && err.message.includes('fetch')) {
			showFeedback('Failed to connect to the server. Please check your internet or try again later.', 'error');
		} else {
			showFeedback('Wrong e-mail or password. Please try again.', 'error');
		}
	}
};

</script>

<div class="mx-auto max-w-md rounded bg-white p-6 shadow">
	<h2 class="mb-4 text-lg font-bold">Login</h2>
	<form on:submit|preventDefault={login} class="flex flex-col gap-4">
		<input type="email" bind:value={email} placeholder="Email" required class="rounded border p-2" />
		<input type="password" bind:value={password} placeholder="Password" required class="rounded border p-2" />
		<button type="submit" class="rounded bg-blue-600 px-4 py-2 text-white">Login</button>
	</form>
</div>
