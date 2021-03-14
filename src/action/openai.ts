import axios from 'axios';
import { ExecutionContext } from '@tesseract/action/task';

// const orderRegex = /run repeat(?<internals>.+\s(and|then)+\s.+)endRepeat endRun/gi;

export const request = async (context: ExecutionContext, prompt: string): Promise<string | null> => {
    const response = await axios('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_KEY}`,
        },
        data: {
            prompt:
                '#Text to script\n' +
                'IN: How could you be so cruel?\n' +
                'OUT: say "I\'m sorry for being so cruel, I will stop that."\n' +
                '\n' +
                `IN: Follow me\n` +
                `OUT: repeat { move to player ${context.executor.username} }\n` +
                '\n' +
                `IN: Stop.\n` +
                `OUT: stop\n` +
                '\n' +
                'IN: Get to 0 20 10 then let me know when you arrive\n' +
                'OUT: run { move to 0 20 10 then say "I\'m here!" }\n' +
                '\n' +
                'IN: Keep walking towards KodingDev until you are at 50 20 -40 and greet the players\n' +
                'OUT: run { repeat until at 50 20 -40 { move to player KodingDev } then say "Hello everyone! I\'ve arrived!" }\n' +
                '\n' +
                'IN: Go to a cow and attack it 5 times, then go to a pig and keep hitting it while informing me\n' +
                'OUT: run { repeat 5 times { attack mob "cow" } then repeat { run { attack mob "pig" and say "Got them!" } } }\n' +
                '\n' +
                `IN: ${prompt}\n` +
                'OUT:',
            temperature: 0.2,
            stop: ['\nIN:', 'IN:', '\nOUT:', 'OUT:'],
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        },
    });

    const text = response.data.choices[0]?.text?.trim();
    if (!text || text === '') return null;
    return text;
    // return text.replace(orderRegex, 'repeat run$1endRun endRepeat');
};
