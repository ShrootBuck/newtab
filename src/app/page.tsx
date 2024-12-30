"use client";

import { SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [canSearch, setCanSearch] = useState(true);
  const [time, setTime] = useState(() => {
    return new Date().toLocaleTimeString([], {
      minute: "2-digit",
      hour: "2-digit",
    });
  });

  const handleSearch = () => {
    const cleanQuery = searchQuery.trim();
    if (cleanQuery !== "") {
      setCanSearch(false);
      router.push(`https://ecosia.org/search?q=${cleanQuery}`);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          minute: "2-digit",
          hour: "2-digit",
        }),
      );
    }, 1000); // Close enough

    return () => clearInterval(intervalId); // Cleanup interval on component unmount (although this is kinda unnecessary)
  }, []);

  return (
    <div>
      <h1 className="p-24 text-center text-4xl md:text-6xl lg:text-8xl">
        {time}
      </h1>
      <div className="m-auto flex w-full max-w-screen-sm px-4">
        <Input
          type="text"
          disabled={!canSearch}
          placeholder="What time is it in New York?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <Button
          onClick={() => {
            handleSearch();
          }}
          disabled={!canSearch}
          className="mx-1"
          size="icon"
        >
          <SearchIcon />
        </Button>
      </div>
    </div>
  );
}
