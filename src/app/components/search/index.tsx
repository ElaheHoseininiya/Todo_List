'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Block from '../layout/block';
import { z } from 'zod';

const searchInputSchema = z.string().max(200).trim();

type SearchProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const Search: React.FC<SearchProps> = ({ searchText, setSearchText }) => {
  const [inputValue, setInputValue] = useState<string>(searchText);
  const [error, setError] = useState<string>('');

  const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = useCallback(
    (event) => {
      const value = event.target.value;
      try {
        const validated = searchInputSchema.parse(value);
        setInputValue(validated);
        setError('');
      } catch (err) {
        if (err instanceof z.ZodError) {
          setError('متن جستجو باید کمتر از ۲۰۰ کاراکتر باشد');
        }
        setInputValue(value);
      }
    },
    []
  );

  useEffect(() => {
    const handle = window.setTimeout(() => {
      try {
        const validated = searchInputSchema.parse(inputValue);
        setSearchText(validated);
        setError('');
      } catch (err) {
        // Silently handle validation errors in debounce
      }
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
        onChange={handleChange}
        maxLength={200}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </Block>
  );
};

export default React.memo(Search);
