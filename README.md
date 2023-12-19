<h2 align='center'><samp>stimulus-vite-helpers</samp></h2>

<p align='center'>Helpers to easily load all your Stimulus controllers when using Vite.js</p>

<p align='center'>
  <a href='https://www.npmjs.com/package/stimulus-vite-helpers'>
    <img src='https://img.shields.io/npm/v/stimulus-vite-helpers?color=222&style=flat-square'>
  </a>
  <a href='https://github.com/ElMassimo/vite_ruby/blob/master/LICENSE.txt'>
    <img src='https://img.shields.io/badge/license-MIT-blue.svg'>
  </a>
</p>

<br>

[import.meta.glob]: https://vitejs.dev/guide/features.html#glob-import
[jumpstart]: https://github.com/ElMassimo/jumpstart-vite
[stimulus handbook]: https://stimulus.hotwire.dev/handbook/installing
[stimulus]: https://github.com/hotwired/stimulus
[vite_rails]: https://vite-rails.netlify.app
[vite-plugin-stimulus-hmr]: https://github.com/ElMassimo/vite-plugin-stimulus-hmr

This plugin was extracted out of [Jumpstart Rails with Vite.js][jumpstart], a starter
template that you can use to start your next Rails app.

If you are looking for a simple way to integrate Vite.js in Rails, check out <kbd>[vite_rails]</kbd>.

If you would like to enable HMR for your Stimulus controllers, check out <kbd>[vite-plugin-stimulus-hmr]</kbd>.

## Installation 💿

```bash
npx ni stimulus-vite-helpers
```

## Usage 🚀

You can now register your Stimulus controllers using Vite's [import.meta.glob] and the `registerControllers` helper:

```ts
import { Application } from 'stimulus'
import { registerControllers } from 'stimulus-vite-helpers'

const application = Application.start()
const controllers = import.meta.glob('./**/*_controller.js', { eager: true })
registerControllers(application, controllers)
```

For more information, check the [Stimulus handbook].

## Special Thanks

- [Stimulus]

## License

This library is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
