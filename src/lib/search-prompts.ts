export const SEARCH_PROMPTS: readonly string[] = [
  "What time is it in Miami?",
  "What's the latest mission update from SpaceX?",
  "Why does Java get so much hate from programmers?",
  "What are the newest features in Next.js?",
  "How does quantum computing actually work?",
  "What makes Rust memory-safe without garbage collection?",
  "Why is everyone switching to Bun from Node.js?",
  "What's the difference between P and NP problems?",
  "Is TypeScript really better than JavaScript?",
  "How does the Linux kernel scheduler work?",
  "What are monads in functional programming?",
  "Why do people love Neovim so much?",
  "What were Maxwell's contributions to electromagnetism?",
  "What's the acceptance rate at Stanford for CS majors?",
  "Should I learn Kotlin or stick with Java?",
  "What's the difference between Dijkstra's and Bellman-Ford?",
  "Why is Zig gaining popularity among systems programmers?",
  "How do CRDTs enable conflict-free replication?",
  "What's the difference between gRPC and REST APIs?",
  "How does Nix package manager achieve reproducibility?",
  "Why do embedded systems prefer RTOS over Linux?",
  "How does the V8 engine optimize JavaScript execution?",
  "What makes Haskell's type system so powerful?",
];

export function getRandomSearchPrompt(getRandom: () => number = Math.random) {
  if (SEARCH_PROMPTS.length === 0) {
    return "";
  }

  const index = Math.floor(getRandom() * SEARCH_PROMPTS.length);
  return SEARCH_PROMPTS[index] ?? SEARCH_PROMPTS[0];
}
