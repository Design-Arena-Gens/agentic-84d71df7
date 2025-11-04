"use client";

import { useState } from "react";

export default function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={
        className ??
        "rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm hover:bg-zinc-100"
      }
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
