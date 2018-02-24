const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const error = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}

const tokenExtractor = (request, response, next) => {
  console.log('paskaa middlewarea')
  const authorization = request.get('authorization')
  console.log('auth', authorization)
  if (authorization === undefined) {
    console.log('paska middleware on undef')
    next()
    return null
  }
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log('ihme tapahtuu ei olekaan undef')
    console.log('returnaus ', authorization.substring(7))
    request.token = authorization.substring(7)
    next()
    return request.token

  }
  console.log('päästään loppuun asti woopwop')
  return null
  next()
}

module.exports = {
  logger,
  error,
  tokenExtractor
}