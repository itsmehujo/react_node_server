exports.currentUser = (req, res) => res.status(200).send(req.user)

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}