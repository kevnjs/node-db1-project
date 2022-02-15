const db = require('../../data/db-config')

const getAll = () => {
 return db('accounts')
}

const getById = id => {
  return db('accounts').where({ id: id})
}

const create = account => {
  return db('accounts').insert({
    ...account
  }).then(acct => {return getById(acct)})
}

const updateById = (id, account) => {
  return db('accounts')
  .where({id: id})
  .update({
    name: account.name.trim(),
    budget: account.budget
  })
  .then(acct => {
    return getById(id)
  })
}

const deleteById = id => {
  return db('accounts')
  .where({id: id})
  .del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
