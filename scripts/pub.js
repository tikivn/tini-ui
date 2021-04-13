const { execSync, spawn } = require('child_process');
const fs = require('fs');

const packageJson = require(`${process.cwd()}/package.json`);
const { version } = packageJson;
const isRpx = process.argv.splice(2)[0] === '--rpx';

if (isRpx) {
  packageJson.name = '@tikivn/tiny-ui-rpx';
  packageJson.description = 'Tiny UI Rpx version';

  const runner = spawn('npm', ['publish']);

  runner.on('close', () => {});
} else {
  packageJson.name = '@tikivn/tiny-ui';
  packageJson.description = 'Tiny UI';

  const runner = spawn('npm', ['publish']);

  runner.on('close', () => {
    execSync(`git tag ${version}`);
    execSync(`git push origin ${version}:${version}`);
    execSync('git push origin main:main');
  });
}

fs.writeFile(`${process.cwd()}/package.json`, JSON.stringify(packageJson), (err) => {
  if (err) console.error(err);
});
