import Link from "next/link";

export default function Home() {
  return (
    <div className="grid gap-10">
      <section className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Launch affiliate content in minutes
        </h1>
        <p className="mt-4 text-zinc-600">
          Generate short video scripts, captions, hashtags, and a shareable bio link tailored for
          Instagram Reels and YouTube Shorts.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/tools/script" className="rounded-full bg-black px-5 py-3 text-white hover:bg-zinc-800">
            Generate Scripts
          </Link>
          <Link
            href="/tools/captions"
            className="rounded-full border border-zinc-300 px-5 py-3 hover:bg-zinc-100"
          >
            Captions & Hashtags
          </Link>
          <Link href="/builder" className="rounded-full border border-zinc-300 px-5 py-3 hover:bg-zinc-100">
            Bio Link Builder
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h3 className="font-medium">Short Video Scripts</h3>
          <p className="mt-2 text-sm text-zinc-600">10?60s hooks, pain points, benefits, and CTA.</p>
          <Link href="/tools/script" className="mt-3 inline-block text-sm text-black underline">
            Try scripts ?
          </Link>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h3 className="font-medium">Captions & Hashtags</h3>
          <p className="mt-2 text-sm text-zinc-600">Platform-optimized caption with relevant niche hashtags.</p>
          <Link href="/tools/captions" className="mt-3 inline-block text-sm text-black underline">
            Try captions ?
          </Link>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h3 className="font-medium">Bio Link</h3>
          <p className="mt-2 text-sm text-zinc-600">Create a micro landing page with encoded link.</p>
          <Link href="/builder" className="mt-3 inline-block text-sm text-black underline">
            Build bio link ?
          </Link>
        </div>
      </section>
    </div>
  );
}
