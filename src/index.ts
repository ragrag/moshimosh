import { input } from '@inquirer/prompts';
import { bold, italic, red, white } from 'ansis';

async function run() {
    console.log(bold(italic(white(`moshi${red('moshi')}`))));

    const answer = await input({ message: 'Enter Package Name:' });
    console.log('moshimoshi', answer);
}

run();
