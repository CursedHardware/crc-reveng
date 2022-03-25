import toArgv from 'string-to-argv'
import { ITerminalAddon, Terminal } from 'xterm'
import { LocalEchoAddon } from '@gytx/xterm-local-echo'
import { CommandProcedure, CommandNotFoundError } from './types'

export type CommandTable = Record<string, CommandProcedure>

export class LocalShellAddon implements ITerminalAddon {
  private commands: Map<string, CommandProcedure>
  private echo = new LocalEchoAddon()

  constructor(commands: CommandTable) {
    this.commands = new Map(Object.entries<CommandProcedure>(commands))
  }

  activate(terminal: Terminal) {
    this.echo.activate(terminal)
    this.echo.history.entries.push(...this.commands.keys())
    this.repl()
  }

  dispose() {
    this.echo.dispose()
  }

  private async repl() {
    const argv = toArgv(await this.echo.read('$ '))
    try {
      await this.run(argv[0], argv.slice(1))
    } catch (err) {
      if (err instanceof Error) {
        this.echo.println(err.message)
      }
    }
    // Loop
    this.repl()
  }

  private async run(command: string | undefined, args: string[]) {
    if (command === undefined) return
    const procedure = this.commands.get(command)
    if (!procedure) throw new CommandNotFoundError(command)
    return procedure(this.echo, args)
  }
}
