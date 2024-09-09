import React from 'react';
import '../styles/Modal.css';

export default function ContactItem({ contact, onDelete, onDetail }) {
  return (
    <div className='contact-item'>
      <span>
        {contact.name} {contact.phone} {contact.group}
      </span>
      <div>
        <button onClick={onDetail}>세부사항</button>
        <button onClick={onDelete}>삭제</button>
      </div>
    </div>
  );
}
