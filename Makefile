all: app tests

app: npm_modules 
	node src/main.js

tests: npm_modules
	node src/test1.js
	node src/test2.js

npm_modules:
	npm install

clean: 
	rm -rf node_modules
