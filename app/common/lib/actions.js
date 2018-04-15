import { getDependencies } from './pluginLoader'

// eslint-disable-next-line import/prefer-default-export
export const forward = () => ({
  isForward: true,
  run: (action, dependencyName) => (context, ...args) => {
    const { dependencies, ...rest } = context
    const dependency = dependencyName ?
      dependencies[dependencyName] :
      Object.values(dependencies)[0]
    const newContext = {
      ...rest,
      current: dependency,
      dependencies: getDependencies(dependency),
    }
    return dependency.rawActions[action](newContext, ...args)
  },
})

export const getDependencyConfig = (plugin, dependencyName) => {
  const dependency = plugin.config.dependencies.find(el => (
    Array.isArray(el) && el[0] === dependencyName
  ))
  return dependency ? dependency[1] : {}
}
