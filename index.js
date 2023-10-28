const { Command } = require('commander');
const { listContacts, getContactById, addContact, removeContact } = require('./contacts');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        const contacts = await listContacts();
        return console.table(contacts);

    case 'get':
        const getContact = await getContactById(id);
        return console.table(getContact);

    case 'add':
        const newContact = await addContact({name, email, phone});
        return console.table(newContact);

    case 'remove':
        const remove = await removeContact(id);
        return console.table(remove);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);