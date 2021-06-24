const { execSync, spawn } = require('child_process');

const packageJson = require(`${process.cwd()}/package.json`);
const { version } = packageJson;

packageJson.name = '@tiki.vn/tini-style';
packageJson.description = 'Tini Style';

const runner = spawn('npm', ['publish']);

runner.on('close', () => {
  execSync(`git tag ${version}`);
  execSync(`git push origin ${version}:${version}`);
  execSync('git push origin master:master');
});
