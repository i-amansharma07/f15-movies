"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import Button from "@/components/ui/Button";

export default function SearchBar({
  initialValue = "",
}: {
  initialValue?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue || "");
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit(query: string) {
    if (query && query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex gap-5">
      <div className="relative w-full max-w-xl">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C8C4BE]" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search movies, genres..."
          className="w-full bg-[#4A4A55] text-[#F0EDE8] placeholder-[#B0ACA6]
                   pl-12 pr-5 py-4 rounded-full border-2 border-white/40
                   focus:outline-none focus:border-[#E8B84B] focus:shadow-[0_0_0_4px_rgba(232,184,75,0.3)]
                   transition-all duration-300 font-body text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit(value);
            }
          }}
        />
      </div>
      <Button variant="primary" onClick={() => handleSubmit(value)}>
        Go
      </Button>
    </div>
  );
}
