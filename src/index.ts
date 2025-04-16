import server from './server'

const PORT = process.env.PORT || 4020

server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})
