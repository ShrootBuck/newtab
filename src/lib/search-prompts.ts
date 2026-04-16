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
  "How does a bloom filter give false positives but never false negatives?",
  "What's the weirdest unsolved problem in number theory?",
  "How do GPUs parallelize computation differently from CPUs?",
  "How does the Paxos algorithm achieve consensus?",
  "Why is quicksort faster than mergesort in practice?",
  "What's the difference between a process and a thread?",
  "Why do competitive programmers prefer C++ over Python?",
  "How does a red-black tree stay balanced?",
  "How do compilers unroll loops?",
  "How does LZ77 compression work under the hood?",
  "How does the Go scheduler handle goroutines differently from OS threads?",
  "What's the Collatz conjecture and why is it still unsolved?",
];

export function getRandomSearchPrompt(getRandom: () => number = Math.random) {
  if (SEARCH_PROMPTS.length === 0) {
    return "";
  }

  const index = Math.floor(getRandom() * SEARCH_PROMPTS.length);
  return SEARCH_PROMPTS[index] ?? SEARCH_PROMPTS[0];
}
