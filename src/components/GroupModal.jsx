import React, { useState } from 'react';
import '../styles/Modal.css';

export default function GroupModal({ groups, updateGroups, onClose }) {
  const [newGroup, setNewGroup] = useState('');

  const addGroup = () => {
    if (newGroup && !groups.includes(newGroup)) {
      updateGroups([...groups, newGroup]);
      setNewGroup('');
    }
  };

  const removeGroup = (group) => {
    updateGroups(groups.filter((g) => g !== group));
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>그룹 관리</h2>
        <div className='input-con'>
          <input
            type='text'
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
            placeholder='새 그룹 이름'
          />
          <button className='add-button' onClick={addGroup}>
            추가
          </button>
        </div>
        <ul>
          {groups.map((group) => (
            <li key={group}>
              {group}
              <button onClick={() => removeGroup(group)}>삭제</button>
            </li>
          ))}
        </ul>
        <button className='close-button' onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
