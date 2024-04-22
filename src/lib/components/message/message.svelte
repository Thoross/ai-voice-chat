<script lang="ts">
	import type { Message } from 'ai/svelte';
	import { cn } from '@/utils';
	import SvelteMarkdown, { type Renderers } from 'svelte-markdown';

	export let message: Message;
	export let renderers: Partial<Renderers>;
</script>

<li
	class={cn(
		'min-w-28 rounded-xl  p-4 ',
		message.role === 'user'
			? 'bg-primary text-primary-foreground'
			: 'border border-primary bg-transparent text-black'
	)}
>
	<p class="font-bold">
		{`${message.role.charAt(0).toLocaleUpperCase()}${message.role.slice(1)}`}:
	</p>
	<SvelteMarkdown source={message.content} {renderers} />
</li>
