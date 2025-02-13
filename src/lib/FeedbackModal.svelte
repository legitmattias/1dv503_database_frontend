<script lang="ts">
	import { feedback } from '$lib/stores'; // Store to control modal visibility

	let message = '';
	let type: 'success' | 'error' = 'success';
	let visible = false;

	// Subscribe to feedback store
	feedback.subscribe((value) => {
		if (value) {
			message = value.message;
			type = value.type;
			visible = true;

			// Auto-hide after 1 second
			setTimeout(() => (visible = false), 2000);
		}
	});
</script>

{#if visible}
	<div
		class="fixed left-1/2 top-5 w-80 -translate-x-1/2 transform rounded bg-white p-4 text-center shadow-lg"
		class:border-red-500={type === 'error'}
		class:border-green-500={type === 'success'}
	>
		<p class={type === 'error' ? 'text-red-600' : 'text-green-600'}>{message}</p>
	</div>
{/if}
