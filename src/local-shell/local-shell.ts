import { LocalEchoAddon } from '@gytx/xterm-local-echo'
import toArgv from 'string-to-argv'
import { ITerminalAddon, Terminal } from 'xterm'
import { CommandDefiniton, CommandNotFoundError } from './types'

export type CommandTable = Record<string, CommandDefiniton>

export class LocalShellAddon implements ITerminalAddon {
  private commands: Map<string, CommandDefiniton>
  private echo = new LocalEchoAddon()
  private terminal: Terminal | undefined

  constructor(commands: CommandTable) {
    this.commands = new Map(Object.entries(commands))
  }

  activate(terminal: Terminal) {
    this.terminal = terminal
    this.echo.activate(terminal)
    this.echo.addAutocompleteHandler(this.onAutoCompleteCommandHandler)
    this.echo.addAutocompleteHandler(this.onAutoCompleteArgvHandler)
    this.repl()
  }

  dispose() {
    this.echo.removeAutocompleteHandler(this.onAutoCompleteCommandHandler)
    this.echo.removeAutocompleteHandler(this.onAutoCompleteArgvHandler)
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
    if (this.terminal === undefined) return
    const definition = this.commands.get(command)
    if (!definition) throw new CommandNotFoundError(command)
    return definition.procedure(this.terminal, args)
  }

  private onAutoCompleteCommandHandler = (index: number, tokens: string[]) => {
    if (index !== 0) return []
    return [...this.commands.keys()]
  }

  private onAutoCompleteArgvHandler = (index: number, tokens: string[]) => {
    if (index === 0) return []
    const definition = this.commands.get(tokens[0])
    return definition?.onAutoCompleteHandler?.(index, tokens) ?? []
  }
}
