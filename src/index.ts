import { debounce } from 'ts-debounce'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { runRevEng } from './crc-reveng'
import { LocalShellAddon } from './local-shell'
import { CommandTable } from './local-shell/local-shell'

import 'xterm/css/xterm.css'
import 'normalize.css/normalize.css'
import './modified.css'

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
  const onResize = debounce(() => fitAddon.fit(), 100)
  window.addEventListener('resize', () => onResize())
  term.onResize(() => onResize())
}

setTimeout(() => term.paste('reveng -h\n'), 500)
