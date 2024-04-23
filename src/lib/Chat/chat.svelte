<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { type Renderers } from 'svelte-markdown';
	import Paragraph from './renderers/paragraph.svelte';
	import Ul from './renderers/ul.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import VoiceInput from '@/components/voice-input/voice-input.svelte';
	import Code from './renderers/code.svelte';
	import InlineCode from './renderers/inline-code.svelte';
	import { onMount } from 'svelte';
	import { useResizeObserver } from '@/hooks/use-resize-observer';
	import Message from '@/components/message/message.svelte';

	const onError = (error: Error) => {
		console.log('error');
		console.log(error);
	};

	const { messages, handleSubmit, input, isLoading } = useChat({
		onError,
		api: '/api/chat/openai'
	});

	const renderers = {
		paragraph: Paragraph,
		list: Ul,
		code: Code,
		codespan: InlineCode
	} satisfies Partial<Renderers>;

	onMount(() => {
		const messageContainer = document.getElementById('message-container') as HTMLDivElement;
		const observer = useResizeObserver((entries) => {
			const element = entries[0].target;
			element.scrollIntoView(false);
			element.scrollTop = element.getBoundingClientRect().bottom;
		});
		observer.observe(messageContainer);
	});
</script>

<section
	class="container relative mx-auto flex min-h-dvh max-w-4xl flex-col gap-10 px-4 pt-4"
	id="message-container"
>
	<div class="min-h-[calc(95vh-60px)] w-full overflow-y-scroll">
		<ul class="flex flex-col justify-end gap-y-4" id="message-content">
			{#each $messages as message}
				<Message {message} {renderers} />
			{/each}
		</ul>
	</div>

	<form
		on:submit={handleSubmit}
		class="sticky bottom-0 flex w-full gap-4 bg-white pb-4"
		id="chat-form"
	>
		<Input
			bind:value={$input}
			disabled={$isLoading}
			placeholder={$isLoading
				? 'Fetching results...'
				: 'Ask a TypeScript or programming related question'}
		/>
		<Button type="submit" id="submit" disabled={$isLoading}>
			{#if $isLoading}
				<span class="icon-[bx--loader-alt] animate-spin"></span>
			{:else}
				Send
			{/if}
		</Button>
		<VoiceInput {input} {isLoading} />
	</form>
</section>
