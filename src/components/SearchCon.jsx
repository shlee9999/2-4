import React from 'react';

export default function SearchCon({ setSearchTerm }) {
  return (
    <div className='search-container'>
      <input
        type='text'
        placeholder='검색어를 입력 후 엔터를 누르세요'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setSearchTerm('')}>전체리스트 보기</button>
    </div>
  );
}
