"use client";

import { Button, Card, CardBody, Image, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    url: "https://console.aws.amazon.com",
    iconUrl: "aws.svg",
  },
  {
    name: "Plane",
    url: "https://app.plane.so",
    iconUrl: "plane.svg",
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
    name: "Hetzner",
    url: "https://console.hetzner.cloud",
    iconUrl: "hetzner.svg",
  },
  {
    name: "Proton Drive",
    url: "https://drive.proton.me",
    iconUrl: "protondrive.svg",
  },
  {
    name: "Khan Academy",
    url: "https://khanacademy.org",
    iconUrl: "khanacademy.svg",
  },
  {
    name: "Clerk",
    url: "https://clerk.com",
    iconUrl: "clerk.svg",
  },
  {
    name: "Posthog",
    url: "https://posthog.com",
    iconUrl: "posthog.svg",
  },
  {
    name: "Stripe",
    url: "https://stripe.com",
    iconUrl: "stripe.svg",
  },
  {
    name: "TenByte",
    url: "https://tenbyte.org/ghost",
    iconUrl: "ghost.svg",
  },
];

export default function HomePage() {
  const [sortedShortcuts, setSortedShortcuts] = useState<Shortcut[]>([]);
  const [randomQuestion, setRandomQuestion] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    // Sort shortcuts alphabetically by name
    const sorted = [...shortcuts].sort((a, b) => a.name.localeCompare(b.name));
    setSortedShortcuts(sorted);
    setRandomQuestion(
      sampleSearchQuestions[
        Math.floor(Math.random() * sampleSearchQuestions.length)
      ] ?? "Enter your search query",
    );
  }, []);

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleSearch = (query: string) => {
    const cleanQuery = query.trim();
    if (cleanQuery !== "") {
      if (getRandomInt(1, 3) === 2) {
        // Ecosia a lil better
        router.push(`https://oceanhero.today/web?q=${cleanQuery}`);
      } else {
        router.push(`https://www.ecosia.org/search?q=${cleanQuery}`);
      }
    }
  };

  return (
    <>
      <h1 className="p-5 pt-10 text-center text-5xl">A Brand New Tab</h1>
      <div className="m-auto flex w-1/2 items-center justify-center p-5">
        <Input
          label={randomQuestion}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(searchQuery);
            }
          }}
          className="flex-grow"
        />
        <Button
          isIconOnly
          aria-label="Search"
          className="ml-5"
          onClick={() => handleSearch(searchQuery)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </Button>
      </div>
      <Card className="m-auto size-1/2">
        <CardBody>
          <div className="grid gap-4 sm:grid-cols-4">
            {sortedShortcuts.map((shortcut, index) => (
              <Card
                className="size-3/4"
                key={`${shortcut.name}-${index}`}
                isPressable
              >
                <Link href={shortcut.url}>
                  <CardBody>
                    <Image
                      alt={shortcut.name}
                      src={shortcut.iconUrl}
                      className="w-full"
                    />
                  </CardBody>
                </Link>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
