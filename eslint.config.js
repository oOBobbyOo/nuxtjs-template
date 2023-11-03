import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu(
  {
    ignores: ['src/**/china.json'],
  },
  unocss.configs.flat,
  {
    rules: {
      'ts/ban-types': 'off',
      'import/no-mutable-exports': 'off',
      'node/prefer-global/process': 'off',
      'prefer-spread': 'off',
      'no-console': 'off',
    },
  },
)
