import { Contact } from 'components/Contact/Contact';
import { List } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContactsThunk } from 'redux/contactsSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const toFilter = useSelector(state => state.contacts.filter);

  useEffect(() => {
  dispatch(fetchContactsThunk())
},[contacts, dispatch])

  const contactsToRender = () => {
    const normalizedFilter = toFilter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const contactsData = contactsToRender();

  return (
    <>
      <List>
        {contactsData.map(contact => {
          return <Contact contact={contact} key={contact.id} />;
        })}
      </List>
    </>
  );
};
