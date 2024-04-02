//
const express = require('express')
const { listContacts, getContactById, removeContact, addContact } = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  let contacts;
  try {
  contacts = await listContacts();
  } catch (err) {
  console.log(err)
  return next(err);
  }
    res.status(201).json({contacts})
})


router.get('/:contactId', async (req, res, next) => {
  let contacts;
  try {
  contacts = await getContactById('AeHIrLTr6JkxGE6SN-0Rw');
  } catch (err) {
  console.log(err)
  return next(err);
  }
    res.status(200).json({contacts})
})


router.post('/', async (req, res, next) => {
  let contacts;
  try {
  contacts = await addContact('Mango', 'mango@gmail.com', '4234-23423-222');
  } catch (err) {
  console.log(err)
  return next(err);
  }
    res.status(201).json({contacts})
})

router.delete('/:contactId', async (req, res, next) => {
    let contacts;
    try {
    contacts = await removeContact('d0dffcac52794e02b6c9');
    } catch (err) {
    console.log(err)
    return next(err);
    }
      res.status(204).json(contacts)
  })

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: ' message' })
})

module.exports = router
