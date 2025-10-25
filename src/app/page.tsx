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
import { type Shortcut, shortcuts } from "./shortcuts";

type TimeInfo = {
  time: string;
  greeting: string;
  date: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const getGreeting = (hours: number) => {
  if (hours < 5) return "Late night legend";
  if (hours < 12) return "Good morning, trailblazer";
  if (hours < 17) return "Good afternoon, creator";
  if (hours < 21) return "Good evening, visionary";
  return "Moonlight mode engaged";
};

const formatTimeInfo = (date: Date): TimeInfo => {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return {
    time: `${displayHours}:${minutes} ${ampm}`,
    greeting: getGreeting(hours),
    date: dateFormatter.format(date),
  };
};

export default function HomePage() {
  const router = useRouter();

  const sortedShortcuts = useMemo(
    () => [...shortcuts].sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [canSearch, setCanSearch] = useState(true);
  const [timeInfo, setTimeInfo] = useState<TimeInfo>(() => formatTimeInfo(new Date()));

  const handleSearch = () => {
    const cleanQuery = searchQuery.trim();
    if (cleanQuery !== "") {
      setCanSearch(false);
      router.push(`https://grok.com/?q=${encodeURIComponent(cleanQuery)}`);
    }
  };

  useEffect(() => {
    const updateTime = () => {
      setTimeInfo(formatTimeInfo(new Date()));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setCanSearch(true);
      }
    };

    const handlePageShow = () => {
      setCanSearch(true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_60%)]" />
        <div className="absolute inset-x-0 top-[-35%] flex justify-center">
          <div className="h-[48rem] w-[48rem] rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-cyan-400/30 blur-3xl animate-aurora" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:140px_140px] opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] animate-grid" />
        <div
          className="absolute -bottom-40 left-[-10%] h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-fuchsia-500/25 via-purple-500/15 to-transparent blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute -bottom-48 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-cyan-400/25 via-sky-500/15 to-transparent blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-70" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-muted-foreground/80 backdrop-blur-md">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span>Focus Mode</span>
          </div>
          <h1 className="mt-10 text-5xl font-semibold tracking-tight md:text-7xl lg:text-8xl">
            {timeInfo.time}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            {timeInfo.greeting}
            <span className="mx-2 text-muted-foreground/50">•</span>
            {timeInfo.date}
          </p>
        </div>

        <div className="relative mt-12 w-full max-w-2xl">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-violet-500/25 via-fuchsia-500/10 to-cyan-400/20 opacity-70 blur-3xl" />
          <div className="relative flex items-center gap-3 rounded-[2rem] border border-white/10 bg-background/80 px-4 py-4 shadow-[0_30px_90px_rgba(76,29,149,0.3)] backdrop-blur-2xl sm:px-6">
            <Input
              type="text"
              aria-label="Search Grok"
              disabled={!canSearch}
              placeholder="Summon Grok with anything you're curious about..."
              value={searchQuery}
              className="h-14 flex-1 rounded-[1.5rem] border-transparent bg-transparent px-3 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-primary/50 md:px-6 md:text-lg"
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
              size="icon"
              className="group relative h-12 w-12 shrink-0 rounded-[1.25rem] border border-white/20 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-white shadow-[0_18px_60px_rgba(99,102,241,0.35)] transition-transform duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <span className="pointer-events-none absolute inset-0 rounded-[1.1rem] bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <SearchIcon className="relative size-5" />
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground sm:text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
                Grok
              </span>
              <span className="text-muted-foreground/80">
                Search the web with conversational superpowers.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="rounded-md border border-white/20 bg-white/10 px-2 py-1 text-[0.65rem] font-medium tracking-wide text-muted-foreground/80">
                Enter
              </kbd>
              <span>launches search</span>
            </div>
          </div>
        </div>

        <div className="relative mt-16 w-full">
          <div className="absolute inset-0 -top-20 rounded-[2.5rem] bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-70 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/5 bg-white/[0.04] p-6 shadow-[0_28px_90px_rgba(49,46,129,0.35)] backdrop-blur-3xl">
            <TooltipProvider>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {sortedShortcuts.map((shortcut) => (
                  <Tooltip key={shortcut.name}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="group relative flex h-32 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.12] hover:shadow-[0_20px_55px_rgba(99,102,241,0.35)] focus-visible:ring-2 focus-visible:ring-primary/60 disabled:opacity-60"
                        onClick={() => {
                          setCanSearch(false);
                          router.push(shortcut.url);
                        }}
                        disabled={!canSearch}
                      >
                        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-60">
                          <span className="absolute inset-0 h-full w-full rounded-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.35),transparent_55%)]" />
                        </span>
                        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-shine" />
                        <Image
                          src={shortcut.iconUrl}
                          width={48}
                          height={48}
                          alt={shortcut.name}
                          draggable={false}
                          className="relative size-12 transition-transform duration-300 group-hover:scale-110"
                        />
                        <span className="relative mt-4 text-[0.75rem] font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                          {shortcut.name}
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">{shortcut.name}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
