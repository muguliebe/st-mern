function allAround() {
  return function (req, res, next) {
    const startDate = new Date()
    const end       = res.end

    console.log('\x1b[32m%s\x1b[0m', `${req.method}`, `${req.originalUrl} start`)

    res.end = function () {
      end.apply(res, arguments)
      const elapsed = new Date() - startDate
      console.log(`${req.method} ${req.originalUrl} ended [${elapsed} ms] with`, '\x1b[36m', `${res.statusCode}`)
    }
    next()
  }
}

module.exports = {allAround}
