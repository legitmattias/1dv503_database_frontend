<script lang="ts">
	import '../app.css';
	import { goto } from '$app/navigation';
	import { user, loadUser } from '$lib/stores';
	import { onMount } from 'svelte';
	import FeedbackModal from '$lib/FeedbackModal.svelte';

	const API_BASE = import.meta.env.VITE_BACKEND_URL;

	// Load user when the layout is mounted
	onMount(loadUser);

	const logout = async () => {
		try {
			const response = await fetch(`${API_BASE}/api/members/logout`, {
				method: 'POST',
				credentials: 'include'
			});
			user.set(null); // Clear user session
			if (!response.ok) throw new Error('Failed to logout.');

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

<!-- Feedback Modal -->
<FeedbackModal />

<div class="flex min-h-screen flex-col bg-gray-100">
	<header class="bg-blue-600 p-4 text-white">
		<div class="container mx-auto flex items-center justify-between">
			<!-- Left Side: Title & Subtitle -->
			<a href="/">
				<div>
					<h1 class="text-lg font-bold">The Bookstore</h1>
					<p class="text-sm text-gray-200">Assignment 2 - Database, DV503</p>
					<p class="text-sm text-gray-200">Created by Mattias Ubbesen</p>
				</div>
			</a>

			<!-- Right Side: Welcome Message -->
			{#if $user}
				<p>Welcome, {$user.fname}!</p>
			{/if}
		</div>
	</header>

	<!-- Navigation Bar -->
	<nav class="bg-gray-800 p-2 text-white">
		<div class="container mx-auto flex items-center justify-between">
			<!-- Left Side: Links -->
			<div class="flex gap-4">
				{#if $user}
					<a href="/books" class="text-sm hover:underline">BROWSE BOOKS</a>
					<a href="/books/subject" class="text-sm hover:underline">BROWSE BOOKS BY SUBJECT</a>
				{/if}
			</div>

			<!-- Center: Search Bar (Only When Logged In) -->
			{#if $user}
				<form on:submit|preventDefault={performSearch} class="flex gap-2">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search books..."
						class="rounded border p-1 text-black"
					/>
					<select bind:value={searchType} class="w-24 rounded border p-1 text-black">
						<option value="title">Title</option>
						<option value="author">Author</option>
					</select>
					<button type="submit" class="rounded bg-white px-3 py-1 text-blue-600">Search</button>
				</form>
			{/if}

			<!-- Right Side: Login/Logout -->
			<div class="flex gap-4">
				{#if $user}
					<a href="/order" class="text-sm hover:underline">ORDER HISTORY</a>
					<a href="/cart" class="text-sm hover:underline">MY CART</a>
					<button on:click={logout} class="text-sm text-red-300 hover:underline">LOGOUT</button>
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
