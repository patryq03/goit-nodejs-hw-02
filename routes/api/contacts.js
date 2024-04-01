//
const express = require('express')
const { listContacts } = require('../../models/contacts')

const router = express.Router()

router.get('/api/contacts', async (req, res, next) => {
  res.json(listContacts())
})

router.get('/:contactId', async (req, res, next) => {

  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
