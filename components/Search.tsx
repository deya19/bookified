'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search as SearchIcon, X } from 'lucide-react';
import { useTransition, useState, useEffect, useRef } from 'react';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const query = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(query);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(false);

  // Sync input value with URL query only when not actively typing
  useEffect(() => {
    if (!isTypingRef.current) {
      setInputValue(query);
    }
  }, [query]);

  // Handle input change with debounce
  const handleInputChange = (value: string) => {
    setInputValue(value);
    isTypingRef.current = true;

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      isTypingRef.current = false;
      startTransition(() => {
        if (value.trim()) {
          router.push(`/?query=${encodeURIComponent(value.trim())}`);
        } else {
          router.push('/');
        }
      });
    }, 300);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleClear = () => {
    setInputValue('');
    startTransition(() => {
      router.push('/');
    });
  };

  return (
    <div className="library-search-wrapper">
      <SearchIcon className="w-5 h-5 text-[var(--text-muted)] ml-4" />
      <input
        type="text"
        placeholder="Search by title or author..."
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        className="library-search-input"
      />
      {query && (
        <button
          onClick={handleClear}
          className="mr-3 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
