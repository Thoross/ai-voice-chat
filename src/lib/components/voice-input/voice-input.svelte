<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { type Writable, type Readable } from 'svelte/store';
	import { useSpeechRecognition } from '$lib/hooks/use-speech-recognition';
	import * as Tooltip from '../ui/tooltip';

	export let input: Writable<string>;
	export let isLoading: Readable<boolean | undefined>;

	const { recognition, isSupported, isRecording } = useSpeechRecognition(input);
	const handleSpeech = () => {
		if (recognition === null) return;
		if ($isRecording) {
			isRecording.set(false);
			recognition.stop();
		} else {
			isRecording.set(true);
			recognition.start();
		}
	};
</script>

{#if !isSupported || recognition === null}
	<div>
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<Button builders={[builder]} variant="outline"
					><span
						class="icon-[bx--microphone-off] text-xl data-[recording=active]:text-white"
					/></Button
				>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Your browser does not support speech recognition.</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</div>
{:else if $isLoading}
	<Button variant="outline">
		<span class="icon-[bx--loader-alt] animate-spin"></span>
	</Button>
{:else}
	<div>
		<Button
			variant="outline"
			on:click={handleSpeech}
			data-recording={$isRecording ? 'active' : 'inactive'}
			class="data-[recording=active]:animate-pulse data-[recording=active]:bg-red-600"
		>
			<span
				data-recording={$isRecording ? 'active' : 'inactive'}
				class="icon-[bx--microphone] text-xl data-[recording=active]:text-white"
			/></Button
		>
	</div>
{/if}
