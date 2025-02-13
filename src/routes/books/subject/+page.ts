import type { PageLoad } from './$types';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const load: PageLoad = async ({ fetch, url }) => {
	const subject = url.searchParams.get('subject');
	const page = Number(url.searchParams.get('page')) || 1;
	const limit = 2;

	try {
		// Fetch subjects list (no subject name needed)
		const subjectsRes = await fetch(`${API_BASE}/api/books/subject`, { credentials: 'include' });
		const subjects = subjectsRes.ok ? await subjectsRes.json() : [];

		// Fetch books only if a subject is selected
		let books = [];
		let totalPages = 1;
		if (subject) {
			console.log(`🔍 Fetching books for subject: "${subject}" (page: ${page})`);
			const booksRes = await fetch(
				`${API_BASE}/api/books/subject?name=${encodeURIComponent(subject)}&page=${page}&limit=${limit}`,
				{ credentials: 'include' }
			);
			if (booksRes.ok) {
				const booksData = await booksRes.json();
				books = booksData.books || [];
				totalPages = booksData.totalPages || 1;
			}
		}

		return {
			subjects,
			selectedSubject: subject,
			books,
			page,
			totalPages
		};
	} catch (err) {
		return {
			subjects: [],
			error: (err as Error).message
		};
	}
};
