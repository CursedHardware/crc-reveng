import { runRevEng } from './crc-reveng'
import { CommandTable } from './local-shell/local-shell'

export const commands: CommandTable = {
  clear: {
    procedure: (term) => term.clear(),
  },
  reveng: {
    procedure: (term, argv) =>
      runRevEng(argv, (message) => term.writeln(message)),
    onAutoCompleteHandler(index, tokens) {
      if (index === 0) return []
      const flags = Array.from('?1aAbBcdDefFGhiklLmMpPqrsStuvVwxXyz')
      return flags.map((x) => `-${x}`).filter((x) => !tokens.includes(x))
    },
  },
}
