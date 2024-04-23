import type { Message } from 'ai/svelte';
import { StreamingTextResponse } from 'ai';
import { ChatOpenAI } from '@langchain/openai';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { RunnableSequence } from '@langchain/core/runnables';
import { BytesOutputParser } from '@langchain/core/output_parsers';
import { SECRET_OPENAI_KEY } from '$env/static/private';

export const POST = async ({ request }) => {
	const { messages } = await request.json();

	const chain = RunnableSequence.from([
		new ChatOpenAI({
			temperature: 0.8,
			openAIApiKey: SECRET_OPENAI_KEY
		}),
		new BytesOutputParser()
	]);

	const stream = await chain.stream([
		...messages.map((m: Message) =>
			m.role == 'user' ? new HumanMessage(m.content) : new AIMessage(m.content)
		)
	]);

	return new StreamingTextResponse(stream);
};
