import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { definitionsFromGlob } from '../dist/index.js'

const mod = { default () { } }
const withoutDefaultExport = { }

const modules = {
  '../components/home_controller.js': mod,
  '../controllers/hello_controller.js': mod,
  '../controllers/image/reveal_controller.js': mod,
  './controllers/dashboard_controller.ts': mod,
  './controllers/fake_controller.ts': withoutDefaultExport,
  './image/reveal_controller.ts': mod,
}

test('definitionsFromGlob', () => {
  assert.is(definitionsFromGlob(modules), [
    { identifier: 'home' },
    { identifier: 'hello' },
    { identifier: 'image--reveal' },
    { identifier: 'dashboard' },
    { identifier: 'image--reveal' },
  ])
});

test.run()
