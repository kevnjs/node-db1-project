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
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
