module.exports = {
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // 构建相关
        'chore', // 琐事/杂事/构建过程或辅助工具的变动
        'ci', // 持续集成相关，Continuous integration
        'docs', // 文档更新相关
        'feat', // 新特性相关
        'fix', // 修复 bug 相关
        'merge', // 分支合并相关
        'perf', // 性能相关
        'refactor', // 代码重构相关
        'revert', // 还原
        'style', // 代码格式修改，注意不是 css 修改
        'test' // 测试用例相关
      ]
    ]
  },

  extends: ['@commitlint/config-conventional']
}
