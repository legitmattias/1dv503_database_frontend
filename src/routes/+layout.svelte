<script lang="ts">
	import '../app.css';
	import { goto } from '$app/navigation';
	import { user, loadUser } from '$lib/stores';
  import { onMount } from 'svelte';

	const API_BASE = import.meta.env.VITE_BACKEND_URL;

  // Load user when the layout is mounted
  onMount(loadUser);

	const logout = async () => {
		try {
			const response = await fetch(`${API_BASE}/api/members/logout`, {
				method: 'POST',
				credentials: 'include'
			});
			if (!response.ok) throw new Error('Failed to logout.');

			user.set(null); // Clear user session
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
		<div class="container mx-auto flex justify-between items-center">
			<!-- Left Side: Links -->
			<div class="flex gap-4">
				{#if $user}
					<a href="/books" class="text-sm hover:underline">BROWSE BOOKS</a>
					<a href="/order" class="text-sm hover:underline">ORDER HISTORY</a>
					<a href="/cart" class="text-sm hover:underline">MY CART</a>
				{/if}
			</div>

			<!-- Center: Search Bar (Only When Logged In) -->
			{#if $user}
				<form on:submit|preventDefault={performSearch} class="flex gap-2">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search books..."
						class="border p-1 rounded text-black"
					/>
					<select bind:value={searchType} class="border w-24 p-1 rounded text-black">
						<option value="title">Title</option>
						<option value="author">Author</option>
					</select>
					<button type="submit" class="bg-white text-blue-600 px-3 py-1 rounded">Search</button>
				</form>
			{/if}

			<!-- Right Side: Login/Logout -->
			<div class="flex gap-4">
				{#if $user}
					<button on:click={logout} class="text-sm hover:underline text-red-300">LOGOUT</button>
				{:else}
					<a href="/auth/login" class="text-sm hover:underline">LOGIN</a>
					<a href="/auth/register" class="text-sm hover:underline">REGISTER MEMBER</a>
				{/if}
			</div>
		</div>
	</nav>

	<main class="container mx-auto flex-grow p-4">
		<slot />
	</main>
</div>
