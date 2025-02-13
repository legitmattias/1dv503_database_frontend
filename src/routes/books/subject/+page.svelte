<script lang="ts">
	import { showFeedback } from '$lib/stores';
	export let data: {
		subjects: string[];
		selectedSubject: string | null;
		books: Book[];
		page: number;
		totalPages: number;
	};

	const API_BASE = import.meta.env.VITE_BACKEND_URL;

	type Book = {
		isbn: string;
		title: string;
		author: string;
		price: number;
		subject: string;
	};

	// Update subject selection
	const selectSubject = (subject: string) => {
		window.location.href = `/books/subject?subject=${encodeURIComponent(subject)}&page=1`;
	};

	// Update pagination
	const changePage = (newPage: number) => {
		window.location.href = `/books/subject?subject=${encodeURIComponent(data.selectedSubject!)}&page=${newPage}`;
	};

	// Store quantity for each book (reactively updated when books change)
	let quantities: Record<string, number> = {};

	// Ensure quantities are set whenever `data.books` updates
	$: if (data.books && data.books.length > 0) {
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
</script>

<div class="flex min-h-screen flex-col items-center bg-gray-100 p-6 text-center">
	<h1 class="text-3xl font-bold text-gray-800">Browse by Subject</h1>

	<!-- Ensure subjects are displayed -->
	{#if data.subjects && data.subjects.length > 0}
		<div class="mt-6 flex w-full max-w-3xl flex-wrap justify-center gap-4">
			{#each data.subjects as subject}
				<button
					class="flex items-center justify-center rounded-lg border-2 border-gray-600 bg-gray-50 bg-opacity-50 p-4 text-lg font-semibold text-gray-800 transition hover:bg-gray-600 hover:text-white"
					on:click={() => selectSubject(subject)}
				>
					{subject}
				</button>
			{/each}
		</div>
	{:else}
		<p class="mt-4 text-gray-600">Loading subjects...</p>
	{/if}

	<!-- Ensure books are displayed if a subject is selected -->
	{#if data.selectedSubject}
		<h2 class="mt-8 text-xl font-bold text-gray-700">Books in "{data.selectedSubject}"</h2>

		{#if data.books.length === 0}
			<p class="text-red-600">No books found in this subject.</p>
		{:else}
			<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
				{#each data.books as book}
					<div class="flex flex-col items-center rounded bg-white p-4 text-center shadow">
						<h2 class="text-lg font-semibold">{book.title}</h2>
						<p class="text-sm text-gray-600">by {book.author}</p>
						<p class="font-bold text-blue-600">{book.price.toFixed(2)} kr</p>

						<!-- ✅ Centering Button & Quantity -->
						<div class="mt-2 flex items-center justify-center gap-2">
							<button
								class="rounded bg-blue-600 px-4 py-2 text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
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
			<div class="mt-6 flex justify-center gap-4">
				<button
					on:click={() => changePage(data.page - 1)}
					class="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
					disabled={data.page === 1}
				>
					← Previous
				</button>

				<p class="text-lg font-semibold">Page {data.page} of {data.totalPages}</p>

				<button
					on:click={() => changePage(data.page + 1)}
					class="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
					disabled={data.page === data.totalPages}
				>
					Next →
				</button>
			</div>
		{/if}
	{/if}
</div>
