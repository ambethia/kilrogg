'use babel'

import { CompositeDisposable } from 'atom'
import server from './server'

export default {
  subscriptions: null,
  isRunning: false,
  config: {
    port: {
      type: 'integer',
      default: 4242
    }
  },

  activate (state) {
    const init = () => {
      this.subscriptions = new CompositeDisposable()
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'kilrogg:toggle': () => this.toggle()
      }))
    }

    if (atom.inDevMode()) {
      try {
        init()
      } catch (error) {
        atom.notifications.addError(error)
      }
    } else {
      init()
    }
  },

  deactivate () {
    this.stop()
    this.subscriptions.dispose()
  },

  serialize () {
    return {}
  },

  toggle () {
    this.isRunning = !this.isRunning
    this.isRunning ? server.start() : server.stop()
  },

  consumeAutoreload (reloader) {
    atom.notifications.addInfo('Reloading')
    reloader({
      pkg: 'kilrogg',
      files: ['package.json'],
      folders: ['lib/']
    })
  }
}
