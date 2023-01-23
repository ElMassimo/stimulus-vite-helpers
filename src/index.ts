import type { Application, Definition } from '@hotwired/stimulus'
import type { ImportedModules, Entry } from './types'

export const CONTROLLER_FILENAME_REGEX = /^(?:.*?(?:controllers|components|views)\/|\.?\.\/)?(.+)(?:[/_-]controller\..+?)$/

export function registerControllers (application: Application, controllerModules: ImportedModules) {
  application.load(definitionsFromGlob(controllerModules))
}

export function definitionsFromGlob (controllerModules: ImportedModules): Definition [] {
  return Object.entries(controllerModules).map(definitionFromEntry).filter(value => value) as Definition []
}

function definitionFromEntry ([name, controllerModule]: Entry<ImportedModules>): Definition | undefined {
  const identifier = identifierForGlobKey(name)
  const controllerConstructor = controllerModule.default
  if (identifier && typeof controllerConstructor === 'function')
    return { identifier, controllerConstructor }
}

export function identifierForGlobKey (key: string): string | undefined {
  const logicalName = (key.match(CONTROLLER_FILENAME_REGEX) || [])[1]
  if (logicalName)
    return logicalName.replace(/[^\p{L}\p{N}]/gu, '-')
}
