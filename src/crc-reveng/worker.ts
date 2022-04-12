import program from './reveng'

self.addEventListener('message', (event) => {
  program({
    thisProgram: 'reveng',
    arguments: event.data,
    print(message) {
      self.postMessage({ event: 'stdout', message })
    },
    printErr(message) {
      self.postMessage({ event: 'stderr', message })
    },
    postRun: [() => postMessage({ event: 'exit' })],
  })
})
