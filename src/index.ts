/// <reference types="vite/client" />
/// <reference types="stimulus" />

type ImportedModules = ReturnType<ImportMeta['globEager']>
type Entry<T> = { [K in keyof T]: [K, T[K]] }[keyof T]

export function registerControllers(application: Stimulus.Application, controllerModules: ImportedModules) {
  application.load(definitionsFromGlob(controllerModules))
}

export function definitionsFromGlob(controllerModules: ImportedModules) : Stimulus.Definition [] {
  return Object.entries(controllerModules).map(definitionFromEntry).filter(value => value) as Stimulus.Definition []
}

function definitionFromEntry([name, controllerModule]: Entry<ImportedModules>) : Stimulus.Definition | undefined {
  const identifier = identifierForGlobKey(name)
  const controllerConstructor = controllerModule.default
  if (identifier && typeof controllerConstructor == "function") {
    return { identifier, controllerConstructor }
  }
}

export function identifierForGlobKey(key: string): string | undefined {
  const logicalName = (key.match(/^(?:\.\/)?(.+)(?:[_-]controller\..+?)$/) || [])[1]
  if (logicalName) {
    return logicalName.replace(/_/g, "-").replace(/\//g, "--")
  }
}
