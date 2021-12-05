require('dotenv').config()

import mongoose from 'mongoose'

import express from 'express'
import cors from 'cors'

import taskRoutes from './routes/task'

// Configurando o arquivo em formato de classe
class App {

  constructor() {
    this.app = express()
    this.middlewares()
    this.database()
    this.routes()
    this.corsOptions = {
      origin: '*'
    }
  }

  middlewares() {
    this.app.use(cors(this.corsOptions))
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
  }

  routes() {
    this.app.use('/', taskRoutes)
  }

  database() {
    mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    mongoose.connection.once('open', () => console.log('mongoose connected successfully'))
  }
}

export default new App().app 