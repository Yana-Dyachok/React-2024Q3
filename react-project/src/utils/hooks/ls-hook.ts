import { useState, useEffect, useRef } from 'react';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../local-storage/ls-handler';

const useSearchQuery = (key: string) => {
  const [searchQuery, setSearchQuery] = useState(
    getFromLocalStorage(key) || '',
  );
  const initialLoad = useRef(true);

  useEffect(() => {
    const savedQuery = getFromLocalStorage(key);
    if (savedQuery) {
      setSearchQuery(savedQuery);
    }
    initialLoad.current = false;
  }, [key]);

  useEffect(() => {
    if (!initialLoad.current) {
      saveToLocalStorage(key, searchQuery);
    }
  }, [key, searchQuery]);

  return [searchQuery, setSearchQuery] as const;
};

export default useSearchQuery;
