import type { Application, Definition } from '@hotwired/stimulus'
import type { ImportedModules, Entry } from './types'

export const CONTROLLER_FILENAME_REGEX = /^(?:.*?(?:controllers|components)\/|\.?\.\/)?(.+)(?:[/_-]controller\..+?)$/

export function registerControllers (application: Application, controllerModules: ImportedModules, options: { nestedMode: boolean }): void {
  const { nestedMode } = options
  application.load(definitionsFromGlob(controllerModules, nestedMode))
}

export function definitionsFromGlob (controllerModules: ImportedModules, nestedMode: boolean): Definition [] {
  return Object.entries(controllerModules).map(entry => definitionFromEntry(entry, nestedMode)).filter(Boolean) as Definition[]
}

function definitionFromEntry ([name, controllerModule]: Entry<ImportedModules>, nestedMode: boolean): Definition | undefined {
  const identifier = identifierForGlobKey(name, nestedMode)
  const controllerConstructor = controllerModule.default
  if (identifier && typeof controllerConstructor === 'function')
    return { identifier, controllerConstructor }
}

export function identifierForGlobKey (key: string, nestedMode: boolean): string | undefined {
  const logicalName = (key.match(CONTROLLER_FILENAME_REGEX) || [])[1]

  if (!logicalName) return undefined

  const fullName = logicalName.replace(/_/g, '-').replace(/\//g, '--')

  if (!nestedMode) return fullName

  const nameParts = fullName.split('--')
  const lastPartIndex = nameParts.length - 1

  if (nameParts.length >= 2 && nameParts[lastPartIndex] === nameParts[lastPartIndex - 1])
    nameParts.pop()

  return nameParts.join('--')
}
