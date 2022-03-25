import program from './crc-reveng/reveng'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'

import 'xterm/css/xterm.css'
import 'normalize.css/normalize.css'
import './modified.css'

import { LocalShellAddon } from './local-shell'
import { CommandTable } from './local-shell/local-shell'

const commands: CommandTable = {
  async reveng(echo, argv) {
    await program({
      thisProgram: 'reveng',
      arguments: argv,
      print(message) {
        echo.println(message)
      },
      printErr(message) {
        echo.println(message)
      },
    })
  },
}

const term = new Terminal({
  cursorBlink: true,
  macOptionIsMeta: true,
})
term.loadAddon(new LocalShellAddon(commands))
term.open(document.body)
{
  const fitAddon = new FitAddon()
  term.loadAddon(fitAddon)
  fitAddon.fit()
  term.onResize(() => fitAddon.fit())
}

setTimeout(() => term.paste('reveng -h\n'), 500)
