import { StreamingTextResponse, type Message as VercelChatMessage } from 'ai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { SECRET_OLLAMA_ENDPOINT } from '$env/static/private';

export const config = {
	runtime: 'edge'
};

const formatMessage = (message: VercelChatMessage) => {
	return `${message.role}: ${message.content}`;
};

const TEMPLATE = `You are an expert programmer. You are helping a beginner programmer with their TypeScript code
 
Current conversation:
{chat_history}
 
User: {input}
AI:`;

export async function POST({ request }) {
	const body = await request.json();
	const messages = body.messages ?? [];
	const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
	const currentMessageContent = messages[messages.length - 1].content;

	const prompt = PromptTemplate.fromTemplate(TEMPLATE);
	// Convert the async generator into a readable stream
	const model = new ChatOllama({
		baseUrl: SECRET_OLLAMA_ENDPOINT, // Default value
		model: 'codellama'
	});

	const outputParser = new StringOutputParser();
	// Return a StreamingTextResponse, enabling the client to consume the response
	const chain = prompt.pipe(model).pipe(outputParser);

	const stream = await chain.stream({
		chat_history: formattedPreviousMessages.join('\n'),
		input: currentMessageContent
	});

	return new StreamingTextResponse(stream);
}
