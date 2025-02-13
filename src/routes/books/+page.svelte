<script lang="ts">
	const API_BASE = import.meta.env.VITE_BACKEND_URL;

	import { onMount } from 'svelte';

	type Book = {
		isbn: string;
		title: string;
		author: string;
		price: number;
		subject: string;
	};

	let books: Book[] = [];
	let error: string | null = null;

	// Store quantity for each book
	let quantities: Record<string, number> = {};

	onMount(async () => {
		try {
			const response = await fetch(`${API_BASE}/api/books`, {
				credentials: 'include'
			});
			if (!response.ok) throw new Error('Failed to fetch books.');
			books = await response.json();

			// Initialize quantities with default value of 1 for each book
			books.forEach(book => {
				quantities[book.isbn] = 1;
			});
		} catch (err) {
			error = (err as Error).message;
		}
	});

	const addToCart = async (isbn: string) => {
		const qty = quantities[isbn] || 1; // Ensure at least 1 is sent
		try {
			const response = await fetch(`${API_BASE}/api/cart`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ isbn, qty })
			});
			if (!response.ok) throw new Error('Failed to add book to cart.');
			alert(`Added ${qty} to cart!`);
		} catch (err) {
			alert((err as Error).message);
		}
	};
</script>

{#if error}
	<p class="text-red-600">{error}</p>
{:else}
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
		{#each books as book}
			<div class="rounded bg-white p-4 shadow">
				<h2 class="text-lg font-semibold">{book.title}</h2>
				<p class="text-sm text-gray-600">by {book.author}</p>
				<p class="font-bold text-blue-600">{book.price.toFixed(2)} kr</p>
				
        <!-- Button and Quantity Selection -->
				<div class="flex items-center gap-2 mt-2">
          <button
            class="rounded bg-blue-600 px-4 py-2 text-white"
            on:click={() => addToCart(book.isbn)}
          >
            Add to Cart
          </button>
        
          <input
            id="qty-{book.isbn}"
            type="number"
            bind:value={quantities[book.isbn]}
            min="1"
            class="w-16 p-2 border rounded text-black text-center h-[40px]"
          />
        </div>

			</div>
		{/each}
	</div>
{/if}
