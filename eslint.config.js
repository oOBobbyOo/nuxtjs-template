import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu(
  {},
  unocss.configs.flat,
  {
    rules: {
      'ts/ban-types': 'off',
      'import/no-mutable-exports': 'off',
    },
  },
)
