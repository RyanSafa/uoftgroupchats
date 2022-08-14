import React, { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [searchDone, setIsSearchDone] = useState(true);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsSearchDone(true);
    }, delay);
    return () => {
      clearTimeout(handler);
      setIsSearchDone(false);
    };
  }, [value, delay]);

  return [debouncedValue, searchDone];
};

export default useDebounce;
