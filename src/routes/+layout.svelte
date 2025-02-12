<script lang="ts">
	import '../app.css';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores'; // Import the global store

	const API_BASE = import.meta.env.VITE_BACKEND_URL;

	const logout = async () => {
		try {
			const response = await fetch(`${API_BASE}/api/members/logout`, {
				method: 'POST',
				credentials: 'include'
			});
			if (!response.ok) throw new Error('Failed to logout.');

			user.set(null); // Clear session
			goto('/');
		} catch (err) {
			console.error('Logout failed:', err);
		}
	};
</script>

<div class="flex min-h-screen flex-col bg-gray-100">
	<header class="bg-blue-600 p-4 text-white">
		<div class="container mx-auto flex items-center justify-between">
			<h1 class="text-lg font-bold">Assignment 2 - Bookstore</h1>
			{#if $user}
				<p>Welcome, {$user.fname}!</p>
			{/if}
		</div>
	</header>

	<nav class="bg-gray-800 p-2 text-white">
		<div class="container mx-auto flex gap-4">
			<a href="/books" class="text-sm hover:underline">BROWSE BOOKS</a>
			<a href="/cart" class="text-sm hover:underline">MY CART</a>
			{#if $user}
				<button on:click={logout} class="text-sm hover:underline text-red-300">LOGOUT</button>
			{:else}
				<a href="/auth/login" class="text-sm hover:underline">LOGIN</a>
				<a href="/auth/register" class="text-sm hover:underline">REGISTER MEMBER</a>
			{/if}
		</div>
	</nav>

	<main class="container mx-auto flex-grow p-4">
		<slot />
	</main>
</div>
