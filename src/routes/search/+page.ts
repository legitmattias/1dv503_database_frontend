import type { PageLoad } from './$types';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const load: PageLoad = async ({ url, fetch }) => {
	const searchParams = new URLSearchParams(url.search);
	const searchType = searchParams.has('author') ? 'author' : 'title';
	const query = searchParams.get(searchType) || '';
	const page = Number(searchParams.get('page')) || 1;
	const limit = 3; // Maximum 3 books per page

	if (!query) return { books: [], query, searchType, page, totalPages: 1 };

	try {
		const response = await fetch(
			`${API_BASE}/api/books/search?${searchType}=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
			{ credentials: 'include' }
		);

		if (!response.ok) throw new Error('Failed to fetch search results.');

		const data = await response.json();

		return {
			books: data.books,
			query,
			searchType,
			page,
			totalPages: data.totalPages || 1
		};
	} catch (err) {
		return {
			books: [],
			query,
			searchType,
			page,
			totalPages: 1,
			error: (err as Error).message
		};
	}
};
