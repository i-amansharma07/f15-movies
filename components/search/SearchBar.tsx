"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import {
  PlayIcon,
  InfoIcon,
  StarIcon,
  CalendarIcon,
  UsersIcon,
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const debouncedSearch = useDebouncedCallback((query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }, 350);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex gap-5">
      <div className="relative w-full max-w-xl">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4845]" />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search movies, genres..."
          className="w-full bg-[#1A1A1F] text-[#F0EDE8] placeholder-[#4A4845]
                   pl-12 pr-5 py-4 rounded-full border border-white/5
                   focus:outline-none focus:border-[#E8B84B]/40 focus:shadow-[0_0_0_3px_rgba(232,184,75,0.1)]
                   transition-all duration-300 font-body text-sm"
        />
      </div>
      <Button variant="primary" onClick={() => debouncedSearch(value)}>
        Go
      </Button>
    </div>
  );
}
