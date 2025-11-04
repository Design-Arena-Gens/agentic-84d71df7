"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";

function buildHashtags(niche: string, keywords: string): string[] {
  const base = niche
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  const extra = keywords
    .toLowerCase()
    .split(/[,\s]+/)
    .filter(Boolean);
  const all = Array.from(new Set([...base, ...extra]))
    .slice(0, 8)
    .map((h) => `#${h.replace(/[^a-z0-9]/g, "")}`);
  // Pad with general growth tags
  const boosters = ["#fyp", "#viral", "#reels", "#shorts", "#learnontiktok", "#contentcreator"];
  return [...all, ...boosters].slice(0, 20);
}

function platformCaption(
  platform: string,
  product: string,
  benefit: string,
  pain: string,
  linkHint: string
): string {
  const lines: string[] = [];
  lines.push(`Struggling with ${pain}?`);
  lines.push(`${product} helps you ${benefit} fast.`);
  lines.push(`Tap the ${linkHint} to start.`);
  if (platform.toLowerCase().includes("youtube")) {
    lines.push("Comment \"LINK\" and I?ll reply with it.");
  } else {
    lines.push("Save & share if this helped!");
  }
  return lines.join(" \n");
}

export default function CaptionsTool() {
  const [niche, setNiche] = useState("");
  const [product, setProduct] = useState("");
  const [benefit, setBenefit] = useState("");
  const [pain, setPain] = useState("");
  const [keywords, setKeywords] = useState("");
  const [platform, setPlatform] = useState("Instagram");

  const hashtags = useMemo(() => (niche || keywords ? buildHashtags(niche, keywords) : []), [niche, keywords]);
  const caption = useMemo(() => {
    if (!product || !benefit || !pain) return "Fill inputs to generate a caption.";
    const linkHint = platform.toLowerCase().includes("youtube") ? "link in description" : "link in bio";
    return platformCaption(platform, product, benefit, pain, linkHint);
  }, [platform, product, benefit, pain]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 rounded-xl border border-zinc-200 bg-white p-5">
        <h1 className="text-xl font-semibold">Captions & Hashtags</h1>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span>Niche</span>
            <input
              className="rounded-md border border-zinc-300 px-3 py-2"
              placeholder="fitness, finance, skincare?"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span>Product or Offer</span>
            <input
              className="rounded-md border border-zinc-300 px-3 py-2"
              placeholder="Brand or tool name"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span>Main Benefit</span>
            <input
              className="rounded-md border border-zinc-300 px-3 py-2"
              placeholder="lose fat fast, save time, clear skin?"
              value={benefit}
              onChange={(e) => setBenefit(e.target.value)}
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span>Main Pain Point</span>
            <input
              className="rounded-md border border-zinc-300 px-3 py-2"
              placeholder="no time, low budget, overwhelmed?"
              value={pain}
              onChange={(e) => setPain(e.target.value)}
            />
          </label>
          <label className="grid gap-1 text-sm sm:col-span-2">
            <span>Extra Keywords (comma or space separated)</span>
            <input
              className="rounded-md border border-zinc-300 px-3 py-2"
              placeholder="home workout, meal plan, gym?"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span>Platform</span>
            <select
              className="rounded-md border border-zinc-300 px-3 py-2"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option>Instagram</option>
              <option>YouTube Shorts</option>
              <option>TikTok</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2 rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Caption</h2>
            <CopyButton text={caption} />
          </div>
          <pre className="whitespace-pre-wrap text-sm text-zinc-700">{caption}</pre>
        </div>
        <div className="grid gap-2 rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Hashtags</h2>
            <CopyButton text={hashtags.join(" ")} />
          </div>
          <div className="text-sm text-zinc-700">{hashtags.join(" ") || "Add niche or keywords to generate hashtags."}</div>
        </div>
      </div>
    </div>
  );
}
