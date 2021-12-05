import app from './app'

// corrigir isso dps
const port = process.env.PORT
app.listen(port, () => console.log('server is running: ', process.env.port))