import { decodeFromUrlSafeBase64, isValidHttpUrl } from "@/lib/utils";
import type { Metadata } from "next";

export const dynamic = "force-static";

type PageParams = { params: { data: string } };

function parsePayload(data: string) {
  try {
    const json = decodeFromUrlSafeBase64(data);
    const obj = JSON.parse(json) as {
      title?: string;
      about?: string;
      items?: { label: string; url: string }[];
      theme?: "light" | "dark";
    };
    return obj;
  } catch {
    return {};
  }
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const payload = parsePayload(params.data);
  return {
    title: payload.title || "Links",
    description: payload.about || "",
    robots: { index: true },
  };
}

export default function BioPage({ params }: PageParams) {
  const payload = parsePayload(params.data);
  const links = (payload.items || []).filter((i) => i.label && isValidHttpUrl(i.url));
  const theme = payload.theme === "dark" ? "dark" : "light";

  return (
    <div className={theme === "dark" ? "mx-auto max-w-md p-6 text-white bg-black min-h-[70vh]" : "mx-auto max-w-md p-6 bg-white min-h-[70vh]"}>
      <div className="text-2xl font-semibold">{payload.title || "Links"}</div>
      {payload.about ? <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{payload.about}</div> : null}
      <div className="mt-5 grid gap-2">
        {links.length === 0 ? (
          <div className="text-sm text-zinc-600">No links provided.</div>
        ) : (
          links.map((i, idx) => (
            <a
              key={idx}
              href={i.url}
              className={
                theme === "dark"
                  ? "rounded-md bg-white px-4 py-2 text-center text-black hover:bg-zinc-200"
                  : "rounded-md bg-black px-4 py-2 text-center text-white hover:bg-zinc-800"
              }
            >
              {i.label}
            </a>
          ))
        )}
      </div>
    </div>
  );
}
