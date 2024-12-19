#!/usr/bin/env bun
import inquirer from 'inquirer';
import cliProgress from "cli-progress"
import packages from "./src/tools/packages"
import { $ } from 'bun';

async function installPackages(selectedPackages: {name: string, command: string}[]) {
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(selectedPackages.length, 0);

    selectedPackages.forEach(async({name, command}, i)=>{
        console.log(`Instalando ${name}...`);
        const { exitCode, stderr, stdout } = await $`${command}`;
        progressBar.update(i + 1);
    });

    progressBar.stop();
    console.log('All selected packages have been installed.');
}

const { interactive } = await inquirer.prompt<{interactive: boolean}>([
    {
        type: 'confirm',
        name: 'interactive',
        message: 'Deseja instalar os pacotes interativamente?',
        default: true,
    },
]);

if (interactive) {
    const { selectedPackages } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'selectedPackages',
            message: 'Select the packages you want to install:',
            choices: packages.map(pkg => ({ name: pkg.name, value: pkg })),
        },
    ]);

    await installPackages(selectedPackages);
} else {
    await installPackages(packages);
}


// const outputDir = join(__dirname, 'dist');
// const outputFile = join(outputDir, 'cli');

// execSync(`mkdir -p ${outputDir}`);
// execSync(`bun build /home/padawan/my-dev-configs/cli.ts --outdir ${outputDir} --outfile cli --minify`);

// writeFileSync(outputFile, `#!/usr/bin/env bun\n${readFileSync(outputFile, 'utf8')}`);
// execSync(`chmod +x ${outputFile}`);

// console.log(`CLI built successfully. You can run it with: ${outputFile}`);