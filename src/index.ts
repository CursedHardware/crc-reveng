import { debounce } from 'ts-debounce'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { LocalShellAddon } from './local-shell'
import { commands } from './commands'

import 'xterm/css/xterm.css'
import 'normalize.css/normalize.css'
import './modified.css'

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

setTimeout(() => term.paste('reveng -h\n'), 0)
