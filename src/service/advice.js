function allAround() {
  return function (req, res, next) {
    const startDate = new Date()
    const end = res.end

    console.log(`${req.method} ${req.originalUrl} start`)

    res.end = function () {
      end.apply(res, arguments)
      const elapsed = new Date() - startDate
      console.log(`${req.method} ${req.originalUrl} ended [${elapsed} ms] with ${res.statusCode}`)
    }
    next()
  }
}

module.exports = {allAround}
