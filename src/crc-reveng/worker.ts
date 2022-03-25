import program from './reveng'

self.addEventListener('message', async (event) => {
  const module = await program({
    thisProgram: 'reveng',
    arguments: event.data,
    print(message) {
      postMessage({ event: 'stdout', message })
    },
    printErr(message) {
      postMessage({ event: 'stderr', message })
    },
    postRun: [() => postMessage({ event: 'exit' })],
  })
})
