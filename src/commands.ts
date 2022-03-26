import { runRevEng } from './crc-reveng'
import { CommandTable } from './local-shell/local-shell'

export const commands: CommandTable = {
  clear: {
    procedure(term) {
      term.clear()
    },
  },
  reveng: {
    procedure(term, argv) {
      return runRevEng(argv, (message) => term.writeln(message))
    },
  },
}
