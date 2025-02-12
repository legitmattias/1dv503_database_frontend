export const load = async ({ url, fetch }: { url: URL; fetch: typeof globalThis.fetch }) => {
	const searchParams = new URLSearchParams(url.search);
	const searchType = searchParams.has('author') ? 'author' : 'title';
	const query = searchParams.get(searchType) || '';

	if (!query) return { books: [], query, searchType };

	const API_BASE = import.meta.env.VITE_BACKEND_URL;
	const response = await fetch(`${API_BASE}/api/books/search?${searchType}=${encodeURIComponent(query)}`, {
		credentials: 'include'
	});

	const books = response.ok ? await response.json() : [];

	return { books, query, searchType };
};
