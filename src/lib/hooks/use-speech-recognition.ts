import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export const useSpeechRecognition = (input: Writable<string>) => {
	const isSupported = writable(false);
	const isRecording = writable(false);
	let recognition: SpeechRecognition | null = null;
	if (browser) {
		try {
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

			recognition = new SpeechRecognition();
			recognition.continuous = false;
			recognition.interimResults = true;
			recognition.lang = 'en-US';

			const grammarList = new SpeechGrammarList();

			const grammar = `#JSGF V1.0;`;
			grammarList.addFromString(grammar, 1);
			recognition.grammars = grammarList;
			isSupported.set(true);

			recognition.onresult = (event) => {
				const last = event.results.length - 1;
				input.set(event.results[last][0].transcript);
			};

			recognition.onend = () => {
				const form = document.getElementById('chat-form') as HTMLFormElement | null;
				if (form) {
					isRecording.set(false);
					recognition?.stop();
					const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
					form.requestSubmit(submitButton);
				}
			};

			recognition.onerror = (event) => {
				console.error(`Error occurred in recognition: ${event.error}`);
			};
		} catch (error) {
			console.error('Error occurred in recognition:', error);
		}
	}
	return { isSupported, isRecording, recognition };
};
