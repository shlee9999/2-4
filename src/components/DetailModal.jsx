import React from 'react';
import '../styles/Modal.css';

export default function DetailModal({ contact, onClose }) {
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>연락처 상세 정보</h2>
        <p>이름: {contact.name}</p>
        <p>전화번호: {contact.phone}</p>
        <p>그룹: {contact.group}</p>
        <p>메모: {contact.note}</p>
        <button className='close-button' onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
