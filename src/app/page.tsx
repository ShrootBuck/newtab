"use client";

import { SearchIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
import { shortcuts } from "./shortcuts";
export default function HomePage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [canSearch, setCanSearch] = useState(true);
  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    [],
  );
  const [time, setTime] = useState(() => timeFormatter.format(new Date()));

  const sortedShortcuts = useMemo(
    () => [...shortcuts].sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  const handleSearch = () => {
    const cleanQuery = searchQuery.trim();
    if (cleanQuery !== "") {
      setCanSearch(false);
      router.push(`https://chatgpt.com/?q=${encodeURIComponent(cleanQuery)}`);
    }
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof window.setTimeout> | undefined;

    const tick = () => {
      const now = new Date();
      setTime(timeFormatter.format(now));

      const millisecondsUntilNextMinute =
        60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

      timeoutId = window.setTimeout(tick, millisecondsUntilNextMinute);
    };

    tick();

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [timeFormatter]);

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
