import type { Terminal } from 'xterm'

export type CommandProcedure = (
  term: Terminal,
  argv: string[],
) => Promise<void> | void

export class CommandNotFoundError extends TypeError {
  constructor(command: string) {
    super(`Command Not Found: ${command}`)
  }
}

export class CommandAlreadyRegisteredError extends Error {
  constructor(command: string) {
    super(`Command Already Registered: ${command}`)
  }
}
