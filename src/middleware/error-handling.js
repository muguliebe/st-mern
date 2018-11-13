const errorLogger = (err, req, res, next) => {
  if (err.message) console.log(err.message)
  if (err.stack) console.log(err.stack)
  next(err)
}

const genericErrorHandler = (err, req, res, next) => {
  res.sendStatus(500)
  next()
}

module.exports = errorHandlingMiddleware = (app) => {
  app.use([errorLogger, genericErrorHandler])
}
