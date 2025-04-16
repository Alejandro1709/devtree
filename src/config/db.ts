import mongoose from 'mongoose'
import colors from 'colors'

export const connectDB = async (uri: string) => {
  try {
    const { connection } = await mongoose.connect(uri)

    console.log(
      colors.bgGreen.white(`Connected to ${connection.host}:${connection.port}`)
    )
  } catch (error) {
    console.log(colors.bgRed.white(error.message))
    process.exit(1)
  }
}
