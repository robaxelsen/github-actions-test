const core = require('@actions/core');
const github = require('@actions/github');

try {
    const token = core.getInput('token');
    const title = core.getInput('title');
    const body = core.getInput('body');
    const assignees = core.getInput('assignees');

    const octokit = new github.getOctokit(token, {log: 'console'});

    const response = octokit.issues.create({
        ...github.context.repo,
        title,
        body,
        assignees: ['robaxelsen']
    })

    // assignees: assignees ? assignees.split('\n') : undefined
    core.setOutput('issue', JSON.stringify(response.data))
    // core.setOutput('issue', `token: ${token}, title: ${title}, body: ${body}, assignees: ${assignees}`);
} catch(error) {
    core.setFailed(error.message)
}


