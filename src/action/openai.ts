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
                'IN: Walk over to me\n' +
                'OUT: move to me\n' +
                '\n' +
                'IN: Say Hello world!\n' +
                'OUT: say "Hello world!"\n' +
                '\n' +
                'IN: Get to 0 20 10\n' +
                'OUT: move to 0 20 10\n' +
                '\n' +
                'IN: Walk over to Chungus and say Hello! and say Woo!\n' +
                'OUT: do move to player Chungus then say "Hello!" then say "Woo!" finish\n' +
                '\n' +
                'IN: say awesome sauce and then walk to 0 0\n' +
                'OUT: do say "awesome sauce" then move to 0 0 finish\n' +
                '\n' +
                `IN: ${prompt}\n` +
                'OUT:',
            temperature: 0,
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
