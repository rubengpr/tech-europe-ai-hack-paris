import Link from "next/link";
import { ArrowUpRight, Bell, Map, Volume2 } from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Live parcel map",
    text: "See every parcel in one map with the latest field, weather, and sensor data.",
  },
  {
    icon: Volume2,
    title: "Daily voice briefing",
    text: "Hear the most important farm events each morning, summarized by AI voice.",
    chip: "AI-powered",
  },
  {
    icon: Bell,
    title: "Official alerts",
    text: "Get urgent warnings from official sources without checking their websites every week.",
    chip: "AI-powered",
  },
];

export default function Home() {
  return (
    <main className="landing-serif relative min-h-screen overflow-hidden bg-[#f8f7f2] text-[#11120f]">
      <div className="landing-starfield" aria-hidden="true" />
      <section className="relative mx-auto flex min-h-screen max-w-[1280px] flex-col items-center justify-center overflow-hidden px-6 py-12 text-center lg:px-10">
        <h1 className="relative z-10 max-w-full text-5xl font-medium leading-[0.98] tracking-normal md:text-7xl lg:whitespace-nowrap lg:text-[76px] xl:text-[84px]">
          Run your farm like it&apos;s{" "}
          <span className="text-[#2f6f3e]">2044</span>
        </h1>

        <p className="relative z-10 mt-8 max-w-3xl text-xl leading-8 text-[#4f5149] md:text-2xl">
          Almond turns parcel data into clear daily decisions for farmers.
        </p>

        <Link
          href="/map"
          className="group relative z-10 mt-10 inline-flex items-center gap-3 rounded-full bg-[#11120f] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#2a2c26]"
        >
          Open farm demo
          <span className="flex size-7 items-center justify-center rounded-full bg-white text-[#11120f] transition duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-12">
            <ArrowUpRight className="size-4 transition duration-300 ease-out group-hover:scale-110" aria-hidden="true" />
          </span>
        </Link>

        <div className="relative z-10 mt-16 grid w-full gap-3 text-left md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-[8px] border border-[#11120f]/10 bg-[#fbfaf6]/72 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-full border border-[#11120f]/10 bg-white/70 text-[#2f6f3e]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex items-center gap-2">
                    {feature.chip ? (
                      <span className="rounded-full border border-[#2f6f3e]/15 bg-[#2f6f3e]/8 px-3 py-1 text-xs font-semibold text-[#2f6f3e]">
                        {feature.chip}
                      </span>
                    ) : null}
                    <p className="text-sm font-semibold text-[#2f6f3e]">
                      0{index + 1}
                    </p>
                  </div>
                </div>
                <h2 className="mt-8 text-2xl font-medium leading-tight">
                  {feature.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-[#56584f]">
                  {feature.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
