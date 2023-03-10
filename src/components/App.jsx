import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import initialContacts from "../contacts.json"

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsFromLocalStorage = localStorage.getItem('contactList'); 
      if (contactsFromLocalStorage !== null) {
      const parsedContacts = JSON.parse(contactsFromLocalStorage)
        return parsedContacts;
    }
    return initialContacts;
  });
  const [filter, setFilter] = useState('');


  useEffect(() => {
    localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]);


  const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
  };


  const handleSubmit = e => {
    const id = nanoid();
    const name = e.name;
    const number = e.number;
    const contactsLists = [...contacts];

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      contactsLists.push({ name, id, number });
    }
    setContacts(contactsLists);
  };

  const handleDelete = e => {
   setContacts(contacts.filter(contact => contact.id !== e));
  };

  const getFilteredContacts = () => {
    const filterContactsList = contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(filter.toLowerCase());
    });

    return filterContactsList;
  };

   return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={handleSubmit} />
        <h2> Contacts</h2>
        <Filter filter={filter} handleChange={handleChange} />
        <ContactList
          contacts={getFilteredContacts()}
          handleDelete={handleDelete}
        />
      </div>
    );
}
