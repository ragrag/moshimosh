import fs from 'node:fs';
import path from 'node:path';
import { confirm, input } from '@inquirer/prompts';
import { bold, italic, magentaBright, white } from 'ansis';
import Speaker from 'speaker';

const speaker = new Speaker({
    channels: 2,
    bitDepth: 16,
    sampleRate: 44100,
});

async function run() {
    const TEMPLATE_FOLDER = path.join(__dirname, '../template');
    const SOUNDS_FOLDER = path.join(__dirname, '../sounds');

    let pkgDir = '';
    try {
        const dir = process.argv[2] || '.';
        let pkgName = '';
        let author = '';
        let repository = '';
        let description = '';
        let apiReferenceUrl = '';
        let githubio = '';
        let githubioStripped = '';

        while (!pkgName) {
            pkgName = await input({ message: 'Package Name:', transformer: i => i.trim() });
        }

        author = await input({ message: 'Author (e.g Kim Da-mi):', transformer: i => i.trim() });
        repository = await input({ message: 'Repository (e.g https://github.com/ragrag/moshimosh):', transformer: i => i.trim() });
        description = await input({ message: 'Description (e.g Sum two numbers):', transformer: i => i.trim() });

        const useGithubio = await confirm({ message: 'Github Action to add docs to GitHub Pages Repo? (requires PAT to be set in repo action secrets)' });
        if (useGithubio) {
            githubio = await input({ message: 'Github Pages Repo (e.g https://github.com/ragrag/ragrag.github.io):', transformer: i => i.trim() });
            githubioStripped = githubio.split('github.com/')[1] || githubio;
            apiReferenceUrl = `${githubio}/${pkgName}`;
        }

        pkgDir = path.join(dir, pkgName);

        fs.mkdirSync(pkgDir, { recursive: true });
        fs.cpSync(TEMPLATE_FOLDER, pkgDir, { recursive: true });
        fs.renameSync(path.join(pkgDir, '_gitignore'), path.join(pkgDir, '.gitignore'));

        const pkgJsonPath = path.join(pkgDir, 'package.json');
        let pkgJson = fs.readFileSync(pkgJsonPath, 'utf-8');
        pkgJson = pkgJson
            .replaceAll('<pkgName>', pkgName)
            .replaceAll('<author>', author)
            .replaceAll('<repository>', repository)
            .replaceAll('<description>', description);
        fs.writeFileSync(pkgJsonPath, pkgJson);

        const readmePath = path.join(pkgDir, 'README.md');
        let readme = fs.readFileSync(readmePath, 'utf-8');
        readme = readme.replaceAll('<pkgName>', pkgName).replaceAll('<description>', pkgName).replaceAll('<apiReferenceUrl>', apiReferenceUrl);
        fs.writeFileSync(readmePath, readme);

        const licensePath = path.join(pkgDir, 'LICENSE');
        let license = fs.readFileSync(licensePath, 'utf-8');
        license = license.replaceAll('<author>', author);
        fs.writeFileSync(licensePath, license);

        const actionUpdateDocsPath = path.join(pkgDir, '.github/workflows/update-docs.yml');
        if (useGithubio) {
            let actionUpdateDocs = fs.readFileSync(actionUpdateDocsPath, 'utf-8');
            actionUpdateDocs = actionUpdateDocs.replaceAll('<githubioStripped>', githubioStripped);
            fs.writeFileSync(actionUpdateDocsPath, actionUpdateDocs);
        } else {
            fs.unlinkSync(actionUpdateDocsPath);
        }

        try {
            fs.createReadStream(path.join(SOUNDS_FOLDER, 'moshimosh.pcm')).pipe(speaker);
        } catch (_) {}

        console.log('\n');
        console.log(bold(white(`≽^•༚•🎀≼ moshi${magentaBright('moshhhh!')}`)));
        console.log(white(`${italic(magentaBright(path.resolve(pkgDir)))}`));
    } catch (err) {
        fs.unlinkSync(pkgDir);
        throw err;
    }
}

run();
