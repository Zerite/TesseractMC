import axios from 'axios';

export const request = async (prompt: string): Promise<string | null> => {
    const response = await axios('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_KEY}`,
        },
        data: {
            prompt:
                'IN: Walk over to me and then say hello\n' +
                'OUT: do move to me and say "Hello!" finish\n' +
                '\n' +
                'IN: Get to 0 20 10 then let me know when you arrive\n' +
                'OUT: do move to 0 20 10 and say "I\'m here!"\n' +
                '\n' +
                'IN: Walk 5 blocks in the x axis and say Hello! then say Woo!\n' +
                'OUT: do move to relative 5 0 and say "Hello!" and say "Woo!" finish\n' +
                '\n' +
                'IN: Go to a spider and attack it then come back\n' +
                'OUT: do move to mob "spider" and attack mob "spider" and move to me finish\n' +
                '\n' +
                `IN: ${prompt}\n` +
                'OUT:',
            temperature: 0.1,
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
};
