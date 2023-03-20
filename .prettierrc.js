module.exports = {
	semi: true,
	printWidth: 130,
	tabWidth: 2,
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	bracketSameLine: true,
	bracketSpacing: true,
	arrowParens: 'avoid',
	endOfLine: 'auto',
	plugins: [
		// https://github.com/prettier/prettier-vscode/issues/2259#issuecomment-952950119
		require.resolve('prettier-plugin-organize-attributes')
	],
	attributeGroups: [
		// prettier-plugin-organize-attribute
		'$ANGULAR_STRUCTURAL_DIRECTIVE',
		'$ANGULAR_ELEMENT_REF',
		'$ANGULAR_INPUT',
		'$ANGULAR_TWO_WAY_BINDING',
		'$ANGULAR_OUTPUT',
		'$ANGULAR_ANIMATION',
		'$ANGULAR_ANIMATION_INPUT',
		'$ID',
		'$DEFAULT',
		'$CLASS'
	],
	overrides: [
		{
			files: [ '*.js', '*.ts' ],
			options: { parser: 'typescript' }
		},
		{
			files: [ '*.json', '.prettierrc', '.stylelintrc' ],
			options: { parser: 'json' }
		},
		{
			files: [ 'package.json', 'ng-package.json' ],
			options: { parser: 'json-stringify' }
		},
		{
			files: [ '*.less' ],
			options: { parser: 'less' }
		},
		{
			files: [ '*.scss' ],
			options: { parser: 'scss' }
		},
		{
			files: [ '*.component.html', '*.template.html' ],
			options: { parser: 'angular' }
		},
		{
			files: [ '*.svg' ],
			options: { parser: 'xml' }
		},
		{
			// @prettier/plugin-xml
			files: [ '*.xml' ],
			options: { parser: 'xml' }
		},
		{
			files: [ '*.yml', '*.yaml' ],
			options: { parser: 'yaml', tabWidth: 2 }
		},
		{
			files: [ '*.md' ],
			options: { parser: 'markdown', tabWidth: 2 }
		}
	]
};
