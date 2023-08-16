import { test, expect } from 'vitest'
import { definitionsFromGlob } from 'stimulus-vite-helpers'

const mod = { default () { } }
const controllerConstructor = mod.default
const withoutDefaultExport = { }

const modules = {
  '../components/ui/home_component/home_component_controller.js': mod,
  '../components/button_component/button_component_controller.js': mod,
  '../components/home_controller.js': mod,
  '../components/page/controller.js': mod,
  '../controllers/hello_controller.js': mod,
  '../controllers/image/reveal_controller.js': mod,
  './controllers/dashboard_controller.ts': mod,
  './controllers/fake_controller.ts': withoutDefaultExport,
  './image/reveal_controller.ts': mod,
  '../image/blur_controller.ts': mod,
}

test('definitionsFromGlob', () => {
  expect(definitionsFromGlob(modules)).toEqual([
    { identifier: 'ui--home-component--home-component', controllerConstructor },
    { identifier: 'button-component--button-component', controllerConstructor },
    { identifier: 'home', controllerConstructor },
    { identifier: 'page', controllerConstructor },
    { identifier: 'hello', controllerConstructor },
    { identifier: 'image--reveal', controllerConstructor },
    { identifier: 'dashboard', controllerConstructor },
    { identifier: 'image--reveal', controllerConstructor },
    { identifier: 'image--blur', controllerConstructor },
  ])
})

test('definitionsFromGlob with nestedMode', () => {
  expect(definitionsFromGlob(modules, true)).toEqual([
    { identifier: 'ui--home-component', controllerConstructor },
    { identifier: 'button-component', controllerConstructor },
    { identifier: 'home', controllerConstructor },
    { identifier: 'page', controllerConstructor },
    { identifier: 'hello', controllerConstructor },
    { identifier: 'image--reveal', controllerConstructor },
    { identifier: 'dashboard', controllerConstructor },
    { identifier: 'image--reveal', controllerConstructor },
    { identifier: 'image--blur', controllerConstructor },
  ])
})

