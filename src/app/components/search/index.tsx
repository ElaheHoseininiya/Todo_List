'use client';
import React, { useEffect, useState } from 'react';
import Block from '../layout/block';
type SearchProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search({ searchText, setSearchText }: SearchProps) {
  const [inputValue, setInputValue] = useState(searchText);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setSearchText(inputValue.trimStart());
    }, 200);
    return () => window.clearTimeout(handle);
  }, [inputValue, setSearchText]);

  useEffect(() => {
    setInputValue(searchText);
  }, [searchText]);

  return (
    <Block>
      <input
        type="text"
        placeholder="جستجو..."
        className="border border-gray-300 rounded-md p-2 w-full"
        aria-label="جستجو در وظایف"
        value={inputValue}
        onChange={event => {
          setInputValue(event.target.value);
        }}
      />
    </Block>
  );
}
