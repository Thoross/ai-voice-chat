<script lang="ts">
	import { Highlight } from 'svelte-highlight';
	import githubDark from 'svelte-highlight/styles/github-dark';
	import { typescript } from 'svelte-highlight/languages';
	export let text: string;
</script>

<svelte:head>
	{@html githubDark}
</svelte:head>

<div class="mb-4 rounded-sm">
	<Highlight code={text} language={typescript} class="rounded" />
</div>
