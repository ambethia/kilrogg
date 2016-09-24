'use babel'

import { CompositeDisposable } from 'atom'

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
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.kilroggView.destroy()
  },

  serialize () {
    return {
      kilroggViewState: this.kilroggView.serialize()
    }
  },

  toggle () {
    this.isRunning = !this.isRunning
    if (this.isRunning) {
      // TODO: Start Server
      atom.notifications.addSuccess('The Eye of Killrog is watching.', { icon: 'eye' })
    } else {
      // TODO: Kill Server
      atom.notifications.addInfo('The Eye of Killrog has closed!', { icon: 'eye' })
    }
  },

  consumeAutoreload (reloader) {
    reloader({
      pkg: 'kilrogg',
      files: ['package.json'],
      folders: ['lib/']
    })
  }
}
