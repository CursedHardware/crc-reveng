import type { LocalEchoAddon } from '@gytx/xterm-local-echo'

export type CommandProcedure = (
  echo: LocalEchoAddon,
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
