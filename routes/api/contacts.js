const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");
const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  let contacts;
  try {
    contacts = await listContacts();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(201).json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  let contacts;
  try {
    contacts = await getContactById(req.params.contactId);
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(200).json({ contacts });
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const id = v4().replace(/-/g, "").substring(0, 20);
    const newContact = { id, ...req.body };
    await addContact(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  let contacts;
  try {
    contacts = await removeContact(req.params.contactId);
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(204).json(contacts);
});

router.put("/:contactId", async (req, res, next) => {
  let contacts;
  try {
    contacts = await updateContact(req.params.contactId);
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(204).json(contacts);
});

module.exports = router;