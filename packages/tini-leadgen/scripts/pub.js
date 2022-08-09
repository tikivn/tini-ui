const { execSync, spawn } = require('child_process');
// const fs = require('fs');

const packageJson = require(`${process.cwd()}/package.json`);
const { version } = packageJson;

packageJson.name = '@tiki.vn/tini-leadgen';
packageJson.description = 'Tini Leadgen';

const runner = spawn('npm', ['publish']);

runner.on('close', () => {
  execSync(`git tag ${version}`);
  execSync(`git push origin ${version}:${version}`);
  execSync('git push origin main:main');
});

// fs.writeFile(`${process.cwd()}/package.json`, JSON.stringify(packageJson), (err) => {
//   if (err) console.error(err);
// });
