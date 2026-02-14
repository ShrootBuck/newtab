"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { SearchIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { shortcuts } from "~/app/shortcuts";
import { getRandomSearchPrompt, SEARCH_PROMPTS } from "~/lib/search-prompts";

const SEARCH_ENDPOINT =
  "https://t3.chat/new?model=glm-5-thinking&search=true&q=";

export function NewTabHome() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(() => SEARCH_PROMPTS[0] ?? "");
  const [canSearch, setCanSearch] = useState(true);
  const [time, setTime] = useState<string>("--:-- AM");

  const handleSearch = useCallback(() => {
    const cleanQuery = searchQuery.trim();
    if (!cleanQuery) {
      return;
    }

    setCanSearch(false);
    router.push(`${SEARCH_ENDPOINT}${encodeURIComponent(cleanQuery)}`);
  }, [router, searchQuery]);

  // Keep the clock updated
  useEffect(() => {
    const update = () => setTime(formatTime(new Date()));
    update();

    const intervalId = window.setInterval(update, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  // Randomize placeholder on the client
  useEffect(() => {
    const prompt = getRandomSearchPrompt();
    if (prompt) {
      setPlaceholder(prompt);
    }
  }, []);

  // Reset search readiness when the tab becomes active again
  useEffect(() => {
    const enableSearch = () => setCanSearch(true);

    document.addEventListener("visibilitychange", enableSearch, {
      passive: true,
    });
    window.addEventListener("pageshow", enableSearch, { passive: true });

    return () => {
      document.removeEventListener("visibilitychange", enableSearch);
      window.removeEventListener("pageshow", enableSearch);
    };
  }, []);

  // Auto-focus the search box on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="h-full w-full bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_0%,hsl(270_70%_50%/0.15),transparent_60%)] dark:bg-[radial-gradient(70%_70%_at_50%_0%,hsl(270_70%_50%/0.10),transparent_60%)]" />
      </div>

      <h1 className="p-12 text-center text-4xl md:text-6xl lg:text-8xl">
        {time}
      </h1>

      <div className="m-auto flex w-full max-w-screen-sm px-4">
        <Input
          ref={inputRef}
          type="text"
          disabled={!canSearch}
          placeholder={placeholder}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <Button
          onClick={handleSearch}
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
            {shortcuts.map((shortcut) => (
              <Tooltip key={shortcut.name}>
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
                    <img
                      src={`/${shortcut.iconUrl}`}
                      width={48}
                      height={48}
                      alt={shortcut.name}
                      draggable={false}
                      loading="eager"
                      decoding="async"
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

function formatTime(now: Date) {
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${minutes} ${ampm}`;
}
