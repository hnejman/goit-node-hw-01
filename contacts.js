const { v4: uuidv4 } = require('uuid');
const fs = require("fs").promises;
const path = require("node:path");

function listContacts() {
  const contactsPath = path.format({
    root: "C:UsersUserDocumentsGitHubGRUPA-11-GOITgoit-node-hw-01",
    dir: "db",
    base: "contacts.json",
  });
  fs.readFile(contactsPath)
    .then((data) => {
        console.log(data.toString())
    })
    .catch((error) => {
      console.log("error:");
      console.log(error.message);
    });
}

function getContactById(contactId) {
  const contactsPath = path.format({
    root: "C:UsersUserDocumentsGitHubGRUPA-11-GOITgoit-node-hw-01",
    dir: "db",
    base: "contacts.json",
  });
  fs.readFile(contactsPath)
  .then((data) => {
    data = data.toString();
    data = data.split("}");
    data[0]=data[0].slice(1);
    data.forEach(el=>{
        if(el.includes(contactId)){
            console.log(el + "}");
        }
    })
})
.catch((error) => {
  console.log("error:");
  console.log(error.message);
});
}

function removeContact(contactId) {
  const contactsPath = path.format({
    root: "C:UsersUserDocumentsGitHubGRUPA-11-GOITgoit-node-hw-01",
    dir: "db",
    base: "contacts.json",
  });
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
      const updatedData = JSON.stringify(updatedContacts, null, 2);
      fs.writeFile(contactsPath, updatedData)
        .then(() => {
          console.log(`Contact with ID ${contactId} removed successfully.`);
        })
        .catch((error) => {
          console.log("error:");
          console.log(error.message);
        });
    })
    .catch((error) => {
      console.log("error:");
      console.log(error.message);
    });
}

function addContact(name, email, phone) {
  const contactsPath = path.format({
    root: "C:UsersUserDocumentsGitHubGRUPA-11-GOITgoit-node-hw-01",
    dir: "db",
    base: "contacts.json",
  });
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const newContact = {
        id: uuidv4(),
        name: name,
        email: email,
        phone: phone,
      };
      contacts.push(newContact);
      const updatedData = JSON.stringify(contacts, null, 2);
      fs.writeFile(contactsPath, updatedData)
        .then(() => {
          console.log(`Contact added successfully: ${JSON.stringify(newContact)}`);
        })
        .catch((error) => {
          console.log("error:");
          console.log(error.message);
        });
    })
    .catch((error) => {
      console.log("error:");
      console.log(error.message);
    });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
