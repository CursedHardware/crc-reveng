const worker = new Worker(new URL('./worker.ts', import.meta.url))

export function runRevEng(argv: string[], print: (message: string) => void) {
  return new Promise<void>((resolve) => {
    const handleMessage = (event: MessageEvent) => {
      type DataType =
        | { event: 'stdout' | 'stderr'; message: string }
        | { event: 'exit' }
      const data = event.data as DataType
      if (data.event === 'exit') {
        worker.removeEventListener('message', handleMessage)
        resolve()
      } else {
        print(data.message)
      }
    }
    worker.addEventListener('message', handleMessage)
    worker.postMessage(argv)
  })
}

// await program({
//   thisProgram: 'reveng',
//   arguments: argv,
//   print(message) {
//     term.writeln(message)
//   },
//   printErr(message) {
//     term.writeln(message)
//   },
// })
