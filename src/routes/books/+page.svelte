<script lang="ts">
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

	onMount(async () => {
		try {
			const response = await fetch('http://localhost:3000/api/books', {
        credentials: "include"
    });
			if (!response.ok) throw new Error('Failed to fetch books.');
			books = await response.json();
		} catch (err) {
			error = (err as Error).message;
		}
	});

	const addToCart = async (isbn: string) => {
		try {
			const response = await fetch('http://localhost:3000/api/cart', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ isbn, qty: 1 })
			});
			if (!response.ok) throw new Error('Failed to add book to cart.');
			alert('Book added to cart!');
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
				<p class="font-bold text-blue-600">€{book.price.toFixed(2)}</p>
				<button
					class="mt-2 rounded bg-blue-600 px-4 py-2 text-white"
					on:click={() => addToCart(book.isbn)}
				>
					Add to Cart
				</button>
			</div>
		{/each}
	</div>
{/if}
