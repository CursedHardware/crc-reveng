import program from './crc-reveng/reveng'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'

import 'xterm/css/xterm.css'
import 'normalize.css/normalize.css'
import './modified.css'

import { LocalShellAddon } from './local-shell'
import { CommandTable } from './local-shell/local-shell'

const commands: CommandTable = {
  clear(term) {
    term.clear()
  },
  async reveng(term, argv) {
    await program({
      thisProgram: 'reveng',
      arguments: argv,
      print(message) {
        term.writeln(message)
      },
      printErr(message) {
        term.writeln(message)
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
