export const gh_cli = { 
    name: 'GitHub CLI', 
    command: 
        `(type -p wget >/dev/null || (sudo apt update && sudo apt-get install wget -y)) \
	    && sudo mkdir -p -m 755 /etc/apt/keyrings \
        && out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg \
        && cat $out | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
	    && sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
	    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
	    && sudo apt update \
	    && sudo apt install gh -y` 
};	

export const docker = { 
    name: 'Docker', 
    command: `
        sudo apt-get update
        sudo apt-get install ca-certificates curl -y
        sudo install -m 0755 -d /etc/apt/keyrings -y
        sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
        sudo chmod a+r /etc/apt/keyrings/docker.asc

        # Add the repository to Apt sources:
        echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
        $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
        sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
        sudo apt-get update -y

        sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y` 
};

export const volta = { name: 'Volta', command: 'curl -fsSL https://get.volta.sh | bash' };

export const nodejs = { name: 'Node.js', command: 'volta install node' };

export const bun = { name: 'Bun', command: 'volta install bun' };

export const starship = { name: 'Starship', command: 'curl -fsSL https://starship.rs/install.sh | bash' };

export const gcloud = { 
    name: 'Google Cloud SDK', 
    command: 
    `curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-linux-x86_64.tar.gz &&
    tar -xf google-cloud-cli-linux-x86_64.tar.gz` 
};


export default [gh_cli, docker, volta, nodejs, bun, starship, gcloud];