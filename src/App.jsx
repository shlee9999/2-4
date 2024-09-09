import React, { useState } from 'react';
import InputCon from './components/InputCon';
import ContactList from './components/ContactList';
import GroupModal from './components/GroupModal';
import DetailModal from './components/DetailModal';
import './styles/App.css';

function App() {
  const initialContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  const initialGroups = JSON.parse(localStorage.getItem('groups')) || ['가족', '친구', '직장', '스터디'];

  const [contacts, setContacts] = useState(initialContacts);
  const [groups, setGroups] = useState(initialGroups);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const addContact = (newContact) => {
    const isDuplicate = contacts.some((contact) => contact.name === newContact.name);
    if (isDuplicate) {
      return { success: false, error: '동일한 이름의 연락처가 존재합니다.' };
    }
    const isDuplicatePhoneNum = contacts.some((contact) => contact.phone === newContact.phone);
    if (isDuplicatePhoneNum) {
      return { success: false, error: '동일한 전화번호가 존재합니다.' };
    }
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    return { success: true };
  };

  const deleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const updateGroups = (newGroups) => {
    setGroups(newGroups);
    localStorage.setItem('groups', JSON.stringify(newGroups));
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.includes(searchTerm) || contact.phone.includes(searchTerm) || contact.group.includes(searchTerm)
  );

  return (
    <div className='app'>
      <h1>연락처 리스트</h1>
      <div className='content'>
        <InputCon addContact={addContact} groups={groups} openGroupModal={() => setIsGroupModalOpen(true)} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={deleteContact}
          setSelectedContact={setSelectedContact}
          setSearchTerm={setSearchTerm}
        />
      </div>
      {isGroupModalOpen && (
        <GroupModal groups={groups} updateGroups={updateGroups} onClose={() => setIsGroupModalOpen(false)} />
      )}
      {selectedContact && <DetailModal contact={selectedContact} onClose={() => setSelectedContact(null)} />}
    </div>
  );
}

export default App;
