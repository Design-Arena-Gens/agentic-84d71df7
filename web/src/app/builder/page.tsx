"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import { encodeToUrlSafeBase64, isValidHttpUrl } from "@/lib/utils";

interface LinkItem {
  label: string;
  url: string;
}

export default function BuilderPage() {
  const [title, setTitle] = useState("My Recommended Tools");
  const [about, setAbout] = useState("I share daily tips and tools I actually use.");
  const [items, setItems] = useState<LinkItem[]>([
    { label: "Main Offer", url: "https://example.com/?aff=123" },
  ]);
  const [theme, setTheme] = useState("light");

  const encoded = useMemo(() => {
    const validItems = items.filter((i) => i.label && isValidHttpUrl(i.url));
    const payload = { title, about, items: validItems, theme };
    const json = JSON.stringify(payload);
    return encodeToUrlSafeBase64(json);
  }, [title, about, items, theme]);

  const shareUrl = `/b/${encoded}`;

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 rounded-xl border border-zinc-200 bg-white p-5">
        <h1 className="text-xl font-semibold">Bio Link Builder</h1>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span>Title</span>
            <input className="rounded-md border border-zinc-300 px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="grid gap-1 text-sm">
            <span>Theme</span>
            <select className="rounded-md border border-zinc-300 px-3 py-2" value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm sm:col-span-2">
            <span>About</span>
            <input className="rounded-md border border-zinc-300 px-3 py-2" value={about} onChange={(e) => setAbout(e.target.value)} />
          </label>
        </div>
        <div className="mt-2 grid gap-2">
          <div className="text-sm font-medium">Links</div>
          {items.map((it, idx) => (
            <div key={idx} className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[1fr,1fr,auto]">
              <input
                className="rounded-md border border-zinc-300 px-3 py-2"
                placeholder="Label"
                value={it.label}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...next[idx], label: e.target.value };
                  setItems(next);
                }}
              />
              <input
                className="rounded-md border border-zinc-300 px-3 py-2"
                placeholder="https://your-affiliate-link"
                value={it.url}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...next[idx], url: e.target.value };
                  setItems(next);
                }}
              />
              <button
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100"
                onClick={() => setItems(items.filter((_, i) => i !== idx))}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="mt-1 w-fit rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm hover:bg-zinc-100"
            onClick={() => setItems([...items, { label: "New Link", url: "" }])}
          >
            + Add link
          </button>
        </div>
      </div>

      <div className="grid gap-3 rounded-xl border border-zinc-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Shareable URL</h2>
          <CopyButton text={typeof window !== "undefined" ? window.location.origin + shareUrl : shareUrl} />
        </div>
        <div className="flex items-center gap-3">
          <code className="rounded bg-zinc-100 px-2 py-1 text-sm">{shareUrl}</code>
          <Link href={shareUrl} className="text-sm text-black underline" target="_blank">
            Open
          </Link>
        </div>
      </div>

      <div className="grid gap-3 rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="font-medium">Preview</h2>
        <div className="rounded-xl border border-zinc-200 p-5">
          <div className="text-lg font-semibold">{title}</div>
          <div className="mt-1 text-sm text-zinc-600">{about}</div>
          <div className="mt-4 grid gap-2">
            {items.filter((i) => i.label && isValidHttpUrl(i.url)).map((i, idx) => (
              <a
                key={idx}
                href={i.url}
                className="rounded-md bg-black px-4 py-2 text-center text-white hover:bg-zinc-800"
                target="_blank"
              >
                {i.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
