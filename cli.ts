#!/usr/bin/env bun
import inquirer from 'inquirer';
import cliProgress from "cli-progress"
import packages from "./src/tools/packages"
import { $ } from 'bun';

async function installPackages(selectedPackages: {name: string, command: string}[]) {

    const progressBar = new cliProgress.SingleBar({ 
        format: "{collectionName} | {bar} | {percentage}% | {duration_formatted} | {value}/{total}",
        barCompleteChar: "※",
        barIncompleteChar: "⁍"}
    );

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