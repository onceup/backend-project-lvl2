install:
	npm install

gendiff:
	node bin/genDiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .