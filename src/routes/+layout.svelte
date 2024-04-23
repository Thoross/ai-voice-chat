<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import '../app.pcss';

	const metaProps = {
		url: 'https://bbetts.dev',
		title: 'Chat',
		description: 'Ask a TypeScript or programming related question',
		images: [
			{
				url: 'https://bbetts.dev/bbetts_6x6.jpg',
				width: 432,
				height: 432,
				alt: 'Brendan Betts'
			}
		]
	};
</script>

<slot></slot>

<MetaTags
	description="Ask a TypeScript or programming related question"
	openGraph={metaProps}
	twitter={{
		cardType: 'summary_large_image',
		title: metaProps.title,
		image: metaProps.images[0].url,
		imageAlt: metaProps.images[0].alt,
		description: metaProps.description
	}}
/>
