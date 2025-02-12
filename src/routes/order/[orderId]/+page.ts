import type { PageLoad } from './$types';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const load: PageLoad = async ({ fetch, params }) => {
  const response = await fetch(`${API_BASE}/api/orders/confirmation/${params.orderId}`, {
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch order details.');
  }

  const order = await response.json();
  return { order };
};
