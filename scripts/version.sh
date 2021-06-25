#!/usr/bin/env sh
if [[ $(git diff --stat) != '' ]]; then
	echo 'please make sure you do not have any changed file'
else
	echo $(date '+%s') >packages/tini-style/time
	echo $(date '+%s') >packages/tini-ui/time
	git add .
	git commit -m 'chore: change package automatically'
	yarn lerna publish minor --yes
fi
