<script lang="ts">
	const API_BASE = import.meta.env.VITE_BACKEND_URL;

	let email = '';
	let password = '';

	const login = async () => {
		try {
			const response = await fetch(`${API_BASE}/api/members/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});
			if (!response.ok) throw new Error('Invalid email or password.');
			const data = await response.json();
			alert('Login successful!');
			document.cookie = `sessionToken=${data.sessionToken}`;
			window.location.href = '/';
		} catch (err) {
			alert((err as Error).message);
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
