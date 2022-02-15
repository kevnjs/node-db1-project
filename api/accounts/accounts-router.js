const router = require('express').Router()
const accounts = require('../accounts/accounts-model')
const midWare = require('../accounts/accounts-middleware')

router.get('/', (req, res, next) => {
  accounts.getAll().then(allAccts => res.status(200).json(allAccts))
})

router.get('/:id', midWare.checkAccountId, (req, res, next) => {
  accounts.getById(req.params.id).then(acctById => res.status(200).json(...acctById))
})

router.post('/', midWare.checkAccountNameUnique, midWare.checkAccountPayload, (req, res) => {
  accounts.create({
    name: req.body.name.trim(),
    budget: req.body.budget
  }).then(acct => res.status(201).json(...acct))
})

router.put('/:id', midWare.checkAccountId, midWare.checkAccountPayload, (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  accounts.updateById(id, body).then(acctUpdate => res.status(200).json(...acctUpdate))
});

router.delete('/:id', midWare.checkAccountId, (req, res, next) => {
  accounts.getById(req.params.id).then(acct => {
    accounts.deleteById(acct.id)
    .then(delAcct => res.status(200).json(...delAcct))
  })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
