import { useState, useEffect, useRef } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { nanoid } from 'nanoid';

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts?.length) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } else {
      firstRender.current = false;
    }
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (contacts.find(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevState => [newContact, ...prevState]);
  };

  const removeContact = id => {
    setContacts(prev => prev.filter(e => e.id !== id));
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFilteredContact = () => {
    if (!filter) {
      return contacts;
    }
    const filterValue = filter.toLowerCase();
    const filterContact = contacts.filter(({ name }) => {
      const nameContact = name.toLowerCase();
      return nameContact.includes(filterValue);
    });
    return filterContact;
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilter} />
      <ContactList
        contacts={getFilteredContact()}
        removeContact={removeContact}
      />
    </div>
  );
}
