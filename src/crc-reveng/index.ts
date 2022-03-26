type MessageType =
  | { event: 'stdout' | 'stderr'; message: string }
  | { event: 'exit' }

export function runRevEng(argv: string[], print: (message: string) => void) {
  const worker = new Worker(new URL('./worker.ts', import.meta.url))
  return new Promise<void>((resolve) => {
    const handleMessage = (event: MessageEvent) => {
      const data: MessageType = event.data
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
