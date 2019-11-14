import boot from './'
console.time('Startup took')

boot().then(message => {
    console.log(message)
    console.timeEnd('Startup took')

    process.on('SIGINT', () => {
        console.info('Shutting down', new Date())
        process.exit(0)
    })
})
