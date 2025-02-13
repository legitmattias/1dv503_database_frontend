import type { PageLoad } from './$types';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const load: PageLoad = async ({ fetch, url }) => {
	const page = Number(url.searchParams.get('page')) || 1;
	const limit = 20; // Number of books per page

	try {
		const response = await fetch(`${API_BASE}/api/books?page=${page}&limit=${limit}`, {
			credentials: 'include'
		});
		if (!response.ok) throw new Error('Failed to fetch books.');

		const data = await response.json();
		return {
			books: data.books,
			totalPages: data.totalPages,
			page
		};
	} catch (err) {
		return {
			error: (err as Error).message
		};
	}
};
