module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true
	},
	extends: 'eslint:recommended',
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		ecmaVersion: 2018
	},
	rules: {
		'no-unused-vars': ['error', { args: 'none' }],
		'arrow-parens': ['error', 'always'],
		'array-element-newline': ['error', { multiline: true }],
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
		'no-shadow': [
			'error',
			{
				builtinGlobals: true,
				hoist: 'functions',
				allow: [
					'done',
					'next',
					'callback',
					'cb',
					'res',
					'req',
					'err',
					'error',
					'ok',
					'resolve',
					'response',
					'reject',
					'e',
					'event',
					'data',
					'status',
					'info',
					'test',
					'pies'
				]
			}
		]
	}
};
