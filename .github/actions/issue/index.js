const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('token');
    const title = core.getInput('title');
    const body = core.getInput('body');
    const assignees = core.getInput('assignees');

    const octokit = new github.getOctokit(token, {log: 'console'});

    const response = await octokit.issues.create({
      ...github.context.repo,
      title,
      body,
      assignees: assignees ? assignees.split('\n') : undefined
    })

    console.log('[===MY DEBUG===] START output from JS')
    console.log('response.data', response.data)
    console.log('JSON.stringify(response.data): ', JSON.stringify(response.data));
    console.log('[===MY DEBUG===] END output from JS')

    core.setOutput('issue', JSON.stringify(response.data))
  } catch(error) {
    core.setFailed(error.message)
  }
}

run();
