"use client";

import { useRouter } from "next/navigation";
import { FlipWords } from "@/components/ui/flip-words"; // Make sure this path is correct
import { Button } from "@/components/ui/moving-border";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export default function Home() {
  const router = useRouter();

  const words = [
    {
      text: "ShaktiKavach",
      className: "text-[var(--blush-dark)] text-6xl md:text-7xl",
    },
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8 bg-background px-4 text-center">
      {/* Typewriter Header */}
      <TypewriterEffect
        words={words}
        className="text-4xl md:text-6xl"
        cursorClassName="bg-[var(--blush-dark)]"
      />

      {/* Flip between two phrases */}
      <FlipWords
        words={["Your safety", "is our responsibility."]}
        className="text-xl md:text-2xl font-bold text-muted-foreground"
        duration={4000}
      />

      {/* Login Button */}
      <Button onClick={() => router.push("/login")}>Login</Button>
    </div>
  );
}