import type { Terminal } from 'xterm'

export interface CommandDefiniton {
  procedure(term: Terminal, argv: string[]): Promise<void> | void
  onAutoCompleteHandler?(index: number, tokens: string[]): string[]
}

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
