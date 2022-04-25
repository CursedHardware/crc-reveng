type MessageType =
  | { event: 'stdout' | 'stderr'; message: string }
  | { event: 'exit' }

const worker = new Worker(new URL('./worker.ts', import.meta.url))

export function runRevEng(argv: string[], stream: WritableStream<string>) {
  const writer = stream.getWriter()
  return new Promise<void>((resolve) => {
    const handleMessage = ({ data }: MessageEvent<MessageType>) => {
      if (data.event === 'exit') {
        worker.removeEventListener('message', handleMessage)
        resolve()
      } else {
        writer.write(data.message)
      }
    }
    worker.addEventListener('message', handleMessage)
    worker.postMessage(argv)
  })
}
