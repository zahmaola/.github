const axios = require('axios');
const fs = require('fs');

const githubToken = process.env.GITHUB_TOKEN;
const orgName = process.env.ORG_NAME;  // Read from environment variable
const url = `https://api.github.com/orgs/${orgName}/repos`;

axios.get(url, { headers: { Authorization: `token ${githubToken}` } })
.then(response => {
    const repos = response.data.map(repo => `### [${repo.name}](${repo.html_url})\n ${repo.description || 'No description'}`).join('\n');
    console.log(repos);
    // Read TEMPLATE.md
    const template = fs.readFileSync('./TEMPLATE.md', 'utf8');

    // Insert the repo list into the template
    const readmeContent = template.replace('<!-- PLACE_HOLDER_FOR_REPOSITORIES -->', repos);

    // Write README.md
    fs.writeFileSync('./profile/README.md', readmeContent);
  })
  .catch(error => console.error(error));
