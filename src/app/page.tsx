"use client";

import { SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import Image from "next/image";
import { type Shortcut, shortcuts } from "./shortcuts";

export default function HomePage() {
  const router = useRouter();

  const [sortedShortcuts, setSortedShortcuts] = useState<Shortcut[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [canSearch, setCanSearch] = useState(true);
  const [time, setTime] = useState("--:-- AM");

  const handleSearch = () => {
    const cleanQuery = searchQuery.trim();
    if (cleanQuery !== "") {
      setCanSearch(false);
      router.push(`https://www.perplexity.ai/?q=${encodeURIComponent(cleanQuery)}`);
    }
  };

  useEffect(() => {
    // Sort shortcuts alphabetically by name
    const sorted = [...shortcuts].sort((a, b) => a.name.localeCompare(b.name));
    setSortedShortcuts(sorted);
  }, []);

  useEffect(() => {
    // Function to update the time
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12; // Convert to 12-hour format without leading zeros

      setTime(`${displayHours}:${minutes} ${ampm}`);
    };

    // Update time immediately when component mounts
    updateTime();

    // Then set up interval for subsequent updates
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Function to reset interactive elements when returning to the page
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setCanSearch(true);
      }
    };

    // Function to handle page show events (specifically for back/forward navigation)
    const handlePageShow = () => {
      setCanSearch(true);
    };

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", handlePageShow);

    // Clean up listeners on unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return (
    <div>
      <h1 className="p-12 text-center text-4xl md:text-6xl lg:text-8xl">
        {time}
      </h1>
      <div className="m-auto flex w-full max-w-screen-sm px-4">
        <Input
          type="text"
          disabled={!canSearch}
          placeholder="What time is it in Chicago, IL?"
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

      <div className="m-auto flex w-full max-w-screen-sm px-4">
        <div className="my-8 grid w-full grid-cols-3 gap-4 sm:grid-cols-6">
          <TooltipProvider>
            {sortedShortcuts.map((shortcut, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-24 w-24"
                    onClick={() => {
                      setCanSearch(false);
                      router.push(shortcut.url);
                    }}
                    disabled={!canSearch}
                  >
                    <Image
                      src={shortcut.iconUrl}
                      width={48}
                      height={48}
                      alt={shortcut.name}
                      draggable={false}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{shortcut.name}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
