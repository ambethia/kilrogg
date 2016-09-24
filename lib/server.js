'use babel'

import http from 'http'
import enableDestroy from 'server-destroy'

module.exports = {
  server: null,

  start () {
    const port = atom.config.get('kilrogg.port')
    const url = `http://0.0.0.0:${port}`

    if (!this.server) {
      this.server = http.createServer((req, res) => {
        // TODO: Serve client app.
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('okay')
      })
      enableDestroy(this.server)
    }

    this.server.on('close', () => {
      atom.notifications.addInfo('The Eye of Kilrogg has closed!', { icon: 'eye' })
    })

    this.server.listen(port, () => {
      atom.notifications.addSuccess('The Eye of Kilrogg is watching!', {
        description: `Visit [${url}](${url})`,
        dismissable: true,
        icon: 'eye'
      })
    })
  },

  stop () {
    if (this.server) {
      this.server.destroy()
    } else {
      atom.notifications.addWarning('The Eye of Kilrogg is missing!', { icon: 'eye' })
    }
  }
}
