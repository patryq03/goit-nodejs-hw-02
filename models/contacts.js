const fs = require("fs/promises");
const path = require("node:path");
const contactsPath = path.join(__dirname, "contacts.json");
const { v4 } = require("uuid");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    console.log("listContact:", error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    console.log(contact);
  } catch (error) {
    console.log("getContactById:", error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id !== contactId);
    console.log("Contact removed");
  } catch (error) {
    console.log("removeContact:", error.message);
  }
};
const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContactId = v4().replace(/-/g, "").substring(0, 20);
    const newContact = { id: newContactId, name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact is added!");
  } catch (error) {
    console.log("addContact:", error.message);
  }
};

//const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  //updateContact,
};
