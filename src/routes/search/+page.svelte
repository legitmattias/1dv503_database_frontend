<script lang="ts">
	import { showFeedback } from '$lib/stores';

	export let data: { books: Book[]; query: string; searchType: string; page: number; totalPages: number };

	const API_BASE = import.meta.env.VITE_BACKEND_URL;

	type Book = {
		isbn: string;
		title: string;
		author: string;
		price: number;
		subject: string;
	};

	// Store quantity for each book (reactively updated when books change)
	let quantities: Record<string, number> = {};

	// Ensure quantities are set whenever `data.books` updates
	$: if (data.books) {
		data.books.forEach((book) => {
			if (!quantities[book.isbn]) {
				quantities[book.isbn] = 1;
			}
		});
	}

	const addToCart = async (isbn: string, title: string) => {
		try {
			const qty = quantities[isbn] || 1;
			const response = await fetch(`${API_BASE}/api/cart`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ isbn, qty })
			});

			if (!response.ok) {
				const errorMessage = await response.text();
				throw new Error(errorMessage || 'Failed to add book to cart.');
			}

			showFeedback(`Added ${qty} of "${title}" to cart!`, 'success');
		} catch (err) {
			showFeedback((err as Error).message, 'error');
		}
	};

	// Handle pagination
	const changePage = (newPage: number) => {
		window.location.href = `/search?${data.searchType}=${encodeURIComponent(data.query)}&page=${newPage}`;
	};
</script>

<h2 class="mb-4 text-xl font-bold">Search Results for "{data.query}" ({data.searchType})</h2>

{#if data.books.length === 0}
	<p class="text-gray-600">No books found.</p>
{:else}
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
		{#each data.books as book}
			<div class="rounded bg-white p-4 shadow flex flex-col items-center text-center">
				<h2 class="text-lg font-semibold">{book.title}</h2>
				<p class="text-sm text-gray-600">by {book.author}</p>
				<p class="font-bold text-blue-600">{book.price.toFixed(2)} kr</p>

				<!-- Button and Quantity Selection -->
				<div class="mt-2 flex items-center justify-center gap-2">
					<button
						class="rounded bg-blue-600 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-blue-700 hover:scale-105"
						on:click={() => addToCart(book.isbn, book.title)}
					>
						Add to Cart
					</button>

					<input
						id="qty-{book.isbn}"
						type="number"
						bind:value={quantities[book.isbn]}
						min="1"
						class="h-[40px] w-16 rounded border p-2 text-center text-black"
					/>
				</div>
			</div>
		{/each}
	</div>

	<!-- Pagination Controls -->
	<div class="flex justify-center mt-6 gap-4">
		<button
			on:click={() => changePage(data.page - 1)}
			class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
			disabled={data.page === 1}
		>
			← Previous
		</button>

		<p class="text-lg font-semibold">Page {data.page} of {data.totalPages}</p>

		<button
			on:click={() => changePage(data.page + 1)}
			class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
			disabled={data.page === data.totalPages}
		>
			Next →
		</button>
	</div>
{/if}
