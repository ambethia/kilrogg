'use babel'

import { allowUnsafeEval } from 'loophole'
import enableDestroy from 'server-destroy'
const express = allowUnsafeEval(() => require('express'))

export default {
  server: null,

  start () {
    const port = atom.config.get('kilrogg.port')
    const url = `http://0.0.0.0:${port}`

    if (!this.server) {
      const app = express()

      if (atom.inDevMode()) {
        // TODO: Use Webpack
      } else {
        // TODO: Serve static app
      }

      this.server = app.listen(port, () => {
        atom.notifications.addSuccess('The Eye of Kilrogg is watching...', {
          description: `Visit [${url}](${url})`,
          // dismissable: true,
          icon: 'eye'
        })
      })
      enableDestroy(this.server)
    }
  },

  stop () {
    if (this.server) {
      this.server.destroy(() => {
        atom.notifications.addInfo('The Eye of Kilrogg has closed!', { icon: 'eye' })
        this.server = null
      })
    }
  }
}
