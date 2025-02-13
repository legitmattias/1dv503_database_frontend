<script lang="ts">
	import '../app.css';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores';

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

	// Search functionality
	let searchQuery = '';
	let searchType = 'title'; // Default to title search

	const performSearch = async () => {
		if (!searchQuery.trim()) return;
		goto(`/search?${searchType}=${encodeURIComponent(searchQuery)}`);
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

	<!-- Navigation Bar -->
	<nav class="bg-gray-800 p-2 text-white">
		<div class="container mx-auto flex items-center justify-between">
			<div class="flex gap-4">
				<a href="/books" class="text-sm hover:underline">BROWSE BOOKS</a>
        <a href="/order" class="text-sm hover:underline">ORDER HISTORY</a>
				<a href="/cart" class="text-sm hover:underline">MY CART</a>
			</div>

			<!-- Search Form -->
			<form on:submit|preventDefault={performSearch} class="flex gap-2">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search books..."
					class="rounded border p-1 text-black"
				/>
				<select bind:value={searchType} class="rounded border p-1 text-black">
					<option value="title">Title</option>
					<option value="author">Author</option>
				</select>
				<button type="submit" class="rounded bg-white px-3 py-1 text-blue-600">Search</button>
			</form>

			{#if $user}
				<button on:click={logout} class="text-sm text-red-300 hover:underline">LOGOUT</button>
			{:else}
				<div class="flex gap-4">
					<a href="/auth/login" class="text-sm hover:underline">LOGIN</a>
					<a href="/auth/register" class="text-sm hover:underline">REGISTER MEMBER</a>
				</div>
			{/if}
		</div>
	</nav>

	<main class="container mx-auto flex-grow p-4">
		<slot />
	</main>
</div>
