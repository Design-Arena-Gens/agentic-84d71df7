"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { randomChoice } from "@/lib/utils";

const DURATIONS = [60, 30, 15, 7] as const;

type Duration = (typeof DURATIONS)[number];

function generateScript(
  niche: string,
  product: string,
  benefit: string,
  pain: string,
  platform: string,
  seconds: Duration
): string {
  const hooks = [
    `Stop scrolling! ${pain}?`,
    `If you ${pain}, this is for you?`,
    `${niche} hack: ${benefit} in minutes`,
    `I wish I knew this ${niche} trick sooner`,
    `You?re losing money without this ${niche} tip`,
  ];
  const bridges = [
    `Here?s how I do it with ${product}.`,
    `This is the exact tool: ${product}.`,
    `The secret is using ${product}.`,
  ];
  const bodies = [
    `${product} helps you ${benefit} so you can stop ${pain}.`,
    `It takes less than 5 minutes to set up and you?ll start to ${benefit}.`,
    `I tried other options, but ${product} is the fastest way to ${benefit}.`,
  ];
  const ctas = [
    `Tap the link in bio to try ${product} today.`,
    `Grab the link and start ${benefit} now.`,
    `Use my link to get started in minutes.`,
  ];

  const platformCTA = platform.toLowerCase().includes("youtube")
    ? `Link in description.`
    : `Link in bio.`;

  const hook = randomChoice(hooks);
  const bridge = randomChoice(bridges);
  const body = randomChoice(bodies);
  const cta = randomChoice(ctas);

  if (seconds <= 10) {
    return [hook, body, `${cta} ${platformCTA}`].join(" \n");
  }
  if (seconds <= 20) {
    return [hook, bridge, body, `${cta} ${platformCTA}`].join(" \n");
  }
  return [hook, bridge, body, `Bonus: ${benefit} without ${pain}.`, `${cta} ${platformCTA}`].join(" \n");
}

export default function ScriptTool() {
  const [niche, setNiche] = useState("");
  const [product, setProduct] = useState("");
  const [benefit, setBenefit] = useState("");
  const [pain, setPain] = useState("");
  const [platform, setPlatform] = useState("Instagram Reels");

  const scripts = useMemo(() => {
    if (!niche || !product || !benefit || !pain) return {} as Record<Duration, string>;
    const out: Record<Duration, string> = {
      60: generateScript(niche, product, benefit, pain, platform, 60),
      30: generateScript(niche, product, benefit, pain, platform, 30),
      15: generateScript(niche, product, benefit, pain, platform, 15),
      7: generateScript(niche, product, benefit, pain, platform, 7),
    };
    return out;
  }, [niche, product, benefit, pain, platform]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 rounded-xl border border-zinc-200 bg-white p-5">
        <h1 className="text-xl font-semibold">Short Video Script Generator</h1>
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
          <label className="grid gap-1 text-sm">
            <span>Platform</span>
            <select
              className="rounded-md border border-zinc-300 px-3 py-2"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option>Instagram Reels</option>
              <option>YouTube Shorts</option>
              <option>TikTok</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {DURATIONS.map((d) => (
          <div key={d} className="grid gap-3 rounded-xl border border-zinc-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{d}s Script</h2>
              <CopyButton text={(scripts as any)[d] ?? ""} />
            </div>
            <pre className="whitespace-pre-wrap text-sm text-zinc-700">
              {(scripts as any)[d] ?? "Fill inputs to generate a script."}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
