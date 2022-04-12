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
      const stream = new WritableStream({
        write(chunk) {
          term.writeln(chunk)
        },
      })
      return runRevEng(argv, stream)
    },
  },
}
