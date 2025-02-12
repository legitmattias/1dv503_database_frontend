<script lang="ts">
	export let data: { books: Book[]; query: string; searchType: string };

  const API_BASE = import.meta.env.VITE_BACKEND_URL;

	type Book = {
		isbn: string;
		title: string;
		author: string;
		price: number;
		subject: string;
	};
  const addToCart = async (isbn: string) => {
		try {
			const response = await fetch(`${API_BASE}/api/cart`, {
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

<h2 class="mb-4 text-xl font-bold">Search Results for "{data.query}" ({data.searchType})</h2>

{#if data.books.length === 0}
	<p class="text-gray-600">No books found.</p>
{:else}
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
		{#each data.books as book}
			<div class="rounded bg-white p-4 shadow">
				<h2 class="text-lg font-semibold">{book.title}</h2>
				<p class="text-sm text-gray-600">by {book.author}</p>
				<p class="font-bold text-blue-600">{book.price.toFixed(2)} kr</p>
        <button class="mt-2 rounded bg-blue-600 px-4 py-2 text-white" on:click={() => addToCart(book.isbn)}>
					Add to Cart
				</button>
			</div>
		{/each}
	</div>
{/if}
