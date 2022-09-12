import { test, expect } from 'vitest'
import { definitionsFromGlob } from 'stimulus-vite-helpers'

const mod = { default () { } }
const controllerConstructor = mod.default
const withoutDefaultExport = { }

const modules = {
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
    { identifier: 'home', controllerConstructor },
    { identifier: 'page', controllerConstructor },
    { identifier: 'hello', controllerConstructor },
    { identifier: 'image--reveal', controllerConstructor },
    { identifier: 'dashboard', controllerConstructor },
    { identifier: 'image--reveal', controllerConstructor },
    { identifier: 'image--blur', controllerConstructor },
  ])
})
