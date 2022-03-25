import program from './crc-reveng/reveng'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'

import 'xterm/css/xterm.css'
import 'normalize.css/normalize.css'
import './modified.css'

import { LocalShellAddon } from './local-shell'
import { CommandTable } from './local-shell/local-shell'
import { runRevEng } from './crc-reveng'

const commands: CommandTable = {
  clear(term) {
    term.clear()
  },
  reveng(term, argv) {
    return runRevEng(argv, (message) => term.writeln(message))
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
