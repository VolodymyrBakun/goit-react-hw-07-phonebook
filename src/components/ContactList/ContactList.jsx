import { Contact } from 'components/Contact/Contact';
import { List } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContactsThunk } from 'redux/contactsSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts.items);
  const toFilter = useSelector(state => state.contacts.filter);

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const contactsToRender = () => {
    if (contacts < 0) {
      return [];
    }
    const normalizedFilter = toFilter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const contactsData = contactsToRender();

  return (
    <>
      <List>
        {contactsData.length > 0 &&
          contactsData.map(contact => {
            return <Contact contact={contact} key={contact.id} />;
          })}
      </List>
    </>
  );
};
