// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Wrapper } from './App.styled';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';
import defaultContacts from '../data/contacts.json';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      setContacts(parseContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(defaultContacts));
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const id = nanoid();

    if (
      contacts.find(
        ({ name }) => name.toLowerCase() === data.name.toLowerCase()
      )
    )
      return alert(`${data.name} is alredy in contacts`);

    const todo = { id, ...data };

    setContacts([todo, ...contacts]);
  };

  const addFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    // коментар
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContacts = contactsId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactsId)
    );
  };

  const visibleTodos = addFilterContacts();

  return (
    <Wrapper className="Reviews">
      <Section title={'Phonebook'}>
        <ContactForm onSubmit={formSubmitHandler} />
      </Section>

      <Section title={'Contacts'}>
        <Filter value={filter} onChange={changeFilter} />

        <ContactList
          contacts={visibleTodos}
          onContactsDelete={deleteContacts}
        />
      </Section>
    </Wrapper>
  );
}

// export class App extends Component {
//   state = {
//     contacts: contacts,
//     filter: '',
//   };

//   formSubmitHandler = data => {
//     const { contacts } = this.state;

//     if (
//       contacts.find(
//         ({ name }) => name.toLowerCase() === data.name.toLowerCase()
//       )
//     )
//       return alert(`${data.name} is alredy in contacts`);

//     const todo = { id: nanoid(), ...data };

//     this.setState(({ contacts }) => ({ contacts: [todo, ...contacts] }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   addFilterContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     // коментар
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   deleteContacts = contactsId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactsId),
//     }));
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parseContacts = JSON.parse(contacts);

//     if (parseContacts) {
//       this.setState({ contacts: parseContacts });
//     }
//   }

//   componentDidUpdate(prewState) {
//     if (prewState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     const visibleTodos = this.addFilterContacts();
//     return (
//       <Wrapper className="Reviews">
//         <Section title={'Phonebook'}>
//           <ContactForm onSubmit={this.formSubmitHandler} />
//         </Section>

//         <Section title={'Contacts'}>
//           <Filter value={this.state.filter} onChange={this.changeFilter} />

//           <ContactList
//             contacts={visibleTodos}
//             onContactsDelete={this.deleteContacts}
//           />
//         </Section>
//       </Wrapper>
//     );
//   }
// }
