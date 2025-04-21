import colors from 'colors'
import server from './server'

const PORT = process.env.PORT || 4020

server.listen(PORT, () => {
  console.log(colors.bgBlue(`Server is up and running on port ${PORT}`))
})
