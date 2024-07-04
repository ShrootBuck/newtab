"use client";

import { Card, CardBody, Image, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const sampleSearchQuestions: string[] = [
  "What color is the sky?",
  "What is the capital of France?",
  "Who wrote Romeo and Juliet?",
  "What is the largest planet in our solar system?",
  "What is the smallest prime number?",
  "What is the square root of 64?",
  "What is the capital of Canada?",
  "What is the chemical symbol for gold?",
  "What is the largest mammal on Earth?",
  "What is the smallest country in the world?",
];

type Shortcut = {
  name: string;
  url: string;
  iconUrl: string;
};

const shortcuts: Shortcut[] = [
  {
    name: "YouTube",
    url: "https://youtu.be",
    iconUrl: "youtube.svg",
  },
  {
    name: "AWS",
    url: "https://aws.amazon.com",
    iconUrl: "aws.svg",
  },
  {
    name: "Linear",
    url: "https://linear.app",
    iconUrl: "linear.svg",
  },
  {
    name: "Lichess",
    url: "https://lichess.org",
    iconUrl: "lichess.svg",
  },
  {
    name: "GitHub",
    url: "https://github.com",
    iconUrl: "github.svg",
  },
  {
    name: "Epic Games",
    url: "https://dev.epicgames.com",
    iconUrl: "epic.svg",
  },
  {
    name: "Proton Drive",
    url: "https://drive.proton.me",
    iconUrl: "protondrive.svg",
  },
  {
    name: "Exercism",
    url: "https://exercism.org",
    iconUrl: "exercism.svg",
  },
  {
    name: "Cloudflare",
    url: "https://cloudflare.com",
    iconUrl: "cloudflare.svg",
  },
  {
    name: "Vercel",
    url: "https://vercel.com",
    iconUrl: "vercel.svg",
  },
  {
    name: "Posthog",
    url: "https://posthog.zaydkrunz.com",
    iconUrl: "posthog.svg",
  },
  {
    name: "Gitea",
    url: "https://gitea.zaydkrunz.com",
    iconUrl: "gitea.svg",
  },
];

export default function HomePage() {
  const [randomShortcuts, setRandomShortcuts] = useState<Shortcut[]>([]);
  const [randomQuestion, setRandomQuestion] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    setRandomShortcuts(shuffleArray(shortcuts));
    setRandomQuestion(
      sampleSearchQuestions[
        Math.floor(Math.random() * sampleSearchQuestions.length)
      ] ?? "Enter your search query",
    );
  }, []);

  const handleSearch = (query: string) => {
    // Ecosia!!!
    router.push(
      `https://www.ecosia.org/search?q=${query}&method=tab.zaydkrunz.com`,
    );
  };

  return (
    <>
      <h1 className="p-5 pt-10 text-center text-5xl">A Brand New Tab</h1>
      <Input
        label={randomQuestion}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(searchQuery);
          }
        }}
        className="m-auto w-1/2 p-5"
      />
      <Card className="m-auto size-1/2">
        <CardBody>
          <div className="grid gap-4 sm:grid-cols-4">
            {randomShortcuts.map((shortcut, index) => (
              <Card
                className="size-3/4"
                key={`${shortcut.name}-${index}`}
                isPressable
              >
                <a href={shortcut.url}>
                  <CardBody>
                    <Image
                      alt={shortcut.name}
                      src={shortcut.iconUrl}
                      className="w-full"
                    />
                  </CardBody>
                </a>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
