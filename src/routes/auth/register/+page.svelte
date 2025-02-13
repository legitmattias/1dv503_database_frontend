<script lang="ts">
  import { goto } from '$app/navigation';
  import { showFeedback } from '$lib/stores';

	const API_BASE = import.meta.env.VITE_BACKEND_URL;

	let fname = '';
	let lname = '';
	let address = '';
	let city = '';
	let zip: number;
	let phone = '';
	let email = '';
	let password = '';

	const register = async () => {
		try {
			const response = await fetch(`${API_BASE}/api/members/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					fname,
					lname,
					address,
					city,
					zip,
					phone,
					email,
					password
				})
			});

			if (!response.ok) throw new Error('Failed to register.');
      showFeedback('Registration successful! You can now log in.', 'success');
			goto('/');
		} catch (err) {
			if (err instanceof TypeError && err.message.includes('fetch')) {
				showFeedback('Failed to connect to the server. Please check your internet or try again later.', 'error');
      } else {
				showFeedback((err as Error).message, 'error');
			}
		}
	};
</script>

<div class="mx-auto max-w-md rounded bg-white p-6 shadow">
	<h2 class="mb-4 text-lg font-bold">Register</h2>
	<form on:submit|preventDefault={register} class="flex flex-col gap-4">
		<input type="text" bind:value={fname} placeholder="First Name" required class="rounded border p-2" />
		<input type="text" bind:value={lname} placeholder="Last Name" required class="rounded border p-2" />
		<input type="text" bind:value={address} placeholder="Address" required class="rounded border p-2" />
		<input type="text" bind:value={city} placeholder="City" required class="rounded border p-2" />
		<input type="number" bind:value={zip} placeholder="Zip Code" required class="rounded border p-2" />
		<input type="text" bind:value={phone} placeholder="Phone (optional)" class="rounded border p-2" />
		<input type="email" bind:value={email} placeholder="Email" required class="rounded border p-2" />
		<input type="password" bind:value={password} placeholder="Password" required class="rounded border p-2" />
		<button type="submit" class="rounded bg-blue-600 px-4 py-2 text-white">Register</button>
	</form>
</div>
