function status(request, response) {
  response.status(200).send({ status: 'Ok'})
}

export default status