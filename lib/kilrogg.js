'use babel'

import KilroggView from './kilrogg-view'
import { CompositeDisposable } from 'atom'

export default {

  kilroggView: null,
  modalPanel: null,
  subscriptions: null,

  activate (state) {
    this.kilroggView = new KilroggView(state.kilroggViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.kilroggView.getElement(),
      visible: false
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'kilrogg:toggle': () => this.toggle()
    }))
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
    console.log('Kilrogg was toggled!')
    return (
      this.modalPanel.isVisible()
      ? this.modalPanel.hide()
      : this.modalPanel.show()
    )
  }
}
