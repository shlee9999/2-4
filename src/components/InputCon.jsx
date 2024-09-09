import React, { useState, useRef, useEffect } from 'react';
import '../styles/InputCon.css';

export default function InputCon({ addContact, groups, openGroupModal }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [group, setGroup] = useState(groups[0]);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  const validateName = (name) => /^[가-힣]{2}($|[가-힣\w\s])/.test(name);
  const validatePhone = (phone) => /^010-\d{4}-\d{4}$/.test(phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateName(name)) {
      setError('이름은 한글로 두 글자 이상이어야 하며, 동명이인이 있을 경우 뒤에 문자, 숫자, 띄어쓰기가 가능합니다.');
      return;
    }
    if (!validatePhone(phone)) {
      setError('전화번호는 010-0000-0000 형식이어야 합니다.');
      return;
    }
    setError('');

    const result = addContact({ name, phone, group, note });
    if (result.success) {
      setName('');
      setPhone('');
      setGroup(groups[0]);
      setNote('');
      setError('');
      nameInputRef.current.focus();
    } else {
      setError(result.error);
    }
  };

  return (
    <div className='input-container'>
      <form onSubmit={handleSubmit}>
        <div className='input-item'>
          <label>이름:</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} ref={nameInputRef} required />
        </div>
        <div className='input-item'>
          <label>전화번호:</label>
          <input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className='input-item'>
          <label>그룹:</label>
          <div className='group-con'>
            <select value={group} onChange={(e) => setGroup(e.target.value)}>
              {groups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <button type='button' onClick={openGroupModal}>
              조직 추가
            </button>
          </div>
        </div>
        <div className='input-item'>
          <label>간단한 기록:</label>
          <input type='text' value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        {error && <p className='error-message'>{error}</p>}
        <button type='submit'>저장</button>
      </form>
    </div>
  );
}
