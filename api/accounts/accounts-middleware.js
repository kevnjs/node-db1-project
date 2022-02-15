const accounts = require('../accounts/accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body;
  const { body } = req;
  if(!("name" in body) || !("budget" in body))
  return res.status(400).json({message: "name and budget are required"})

  if(name.trim().length < 3 || name.trim().length > 100)
  return res.status(400).json({message: "name of account must be between 3 and 100"})

  if(typeof budget !== "number")
  return res.status(400).json({message: "budget of account must be a number"})

  if(budget < 3 || budget > 1000000)
  return res.status(400).json({message: "budget of account is too large or too small"})

  next()
}


exports.checkAccountNameUnique = (req, res, next) => {
  const { name } = req.body
  accounts.getAll().then(allAccts => {
    allAccts.forEach(acct => {
      if(acct.name.trim() === name?.trim())
      return res.status(400).json({message: "that name is taken"})
    })
    next()
  })
}

exports.checkAccountId = (req, res, next) => {
  accounts.getById(req.params.id).then(acct => {
    if(acct.length === 0) return res.status(404).json({message: "account not found"})
    next()
  })
}
