"use client";

/* eslint-disable @next/next/no-img-element */

import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Pause,
  Play,
  Plus,
  Radio,
  Repeat2,
  Search,
  Share2,
  ShoppingBag,
  Ticket,
  User,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { type CSSProperties, useEffect, useMemo, useState } from "react";
import {
  orbitPreviewData,
  type OrbitExperience,
  type OrbitExperienceKind,
  type OrbitFeedMode,
  type OrbitMediaItem,
} from "@/data/orbit-preview";
import { cn } from "@/lib/utils";

type SectionId = "discover" | "feed" | "hub" | "experiences";
type HubAction = "Repost" | "Share" | "Add to Orbit" | "Shop" | "Experience";

const sections: { id: SectionId; label: string }[] = [
  { id: "discover", label: "Discover" },
  { id: "feed", label: "Feed" },
  { id: "hub", label: "Orbit" },
  { id: "experiences", label: "Experiences" },
];

const feedModes: OrbitFeedMode[] = ["Reels", "Drops", "Notes"];
const experienceKinds: OrbitExperienceKind[] = ["Shows", "Connect", "Live Stream"];
const hubActions: HubAction[] = ["Repost", "Share", "Add to Orbit", "Shop", "Experience"];

function safeCopy(text: string) {
  if (typeof navigator === "undefined" || !navigator.clipboard) return;
  void navigator.clipboard.writeText(text).catch(() => undefined);
}

export function OrbitSpatialPreview() {
  const [activeSection, setActiveSection] = useState<SectionId>("discover");
  const [query, setQuery] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<OrbitMediaItem>(orbitPreviewData.media[0]);
  const [detailMedia, setDetailMedia] = useState<OrbitMediaItem | null>(null);
  const [selectedFeedIndex, setSelectedFeedIndex] = useState(0);
  const [feedMode, setFeedMode] = useState<OrbitFeedMode>("Reels");
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [playerOpen, setPlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [trackIndex, setTrackIndex] = useState(0);
  const [progress, setProgress] = useState(28);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [hubAction, setHubAction] = useState<HubAction>("Add to Orbit");
  const [orbitAdded, setOrbitAdded] = useState(false);
  const [reposts, setReposts] = useState(18);
  const [status, setStatus] = useState("Ready to enter Nia Vale's orbit.");
  const [experienceFilter, setExperienceFilter] = useState<OrbitExperienceKind>("Shows");
  const [selectedExperience, setSelectedExperience] = useState<OrbitExperience>(orbitPreviewData.experiences[0]);
  const [dragStart, setDragStart] = useState<{ x: number; angle: number } | null>(null);

  const currentTrack = orbitPreviewData.tracks[trackIndex];
  const filteredMedia = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return orbitPreviewData.media;
    return orbitPreviewData.media.filter((item) =>
      [item.title, item.artist, item.kind, item.detail].join(" ").toLowerCase().includes(value),
    );
  }, [query]);

  const visibleFeed = orbitPreviewData.feed.filter((item) => item.mode === feedMode);
  const currentFeed = visibleFeed[selectedFeedIndex % visibleFeed.length] ?? orbitPreviewData.feed[0];
  const visibleExperiences = orbitPreviewData.experiences.filter((item) => item.kind === experienceFilter);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setProgress((value) => (value >= 100 ? 0 : value + 1));
    }, 900);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const goTo = (section: SectionId) => {
    setActiveSection(section);
    setDetailMedia(null);
    setPlayerOpen(false);
  };

  const playMedia = (item: OrbitMediaItem) => {
    setSelectedMedia(item);
    const matchingTrackIndex = orbitPreviewData.tracks.findIndex((track) => track.artist === item.artist);
    setTrackIndex(matchingTrackIndex >= 0 ? matchingTrackIndex : 0);
    setIsPlaying(true);
    setStatus(`${item.title} is playing.`);
  };

  const runHubAction = (action: HubAction) => {
    setHubAction(action);
    if (action === "Repost") {
      setReposts((value) => value + 1);
      setStatus("Reposted to your orbit.");
    }
    if (action === "Share") {
      safeCopy("https://orbit.preview/artist/nia-vale");
      setStatus("Share link copied.");
    }
    if (action === "Add to Orbit") {
      setOrbitAdded((value) => !value);
      setStatus(orbitAdded ? "Removed from your orbit." : "Nia Vale is now in your orbit.");
    }
    if (action === "Shop") {
      const product = orbitPreviewData.media.find((item) => item.kind === "product") ?? selectedMedia;
      setSelectedMedia(product);
      setDetailMedia(product);
      setStatus("Artist shop opened.");
    }
    if (action === "Experience") {
      const nextExperience = orbitPreviewData.experiences.find((item) => item.kind === "Live Stream") ?? orbitPreviewData.experiences[0];
      setSelectedExperience(nextExperience);
      setExperienceFilter(nextExperience.kind);
      setActiveSection("experiences");
      setStatus("Live experience selected.");
    }
  };

  const nextTrack = () => {
    setTrackIndex((index) => (index + 1) % orbitPreviewData.tracks.length);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="orbit-preview min-h-dvh overflow-x-hidden bg-[#f5f1e9] text-[#111]">
      <div className="mx-auto flex min-h-dvh w-full max-w-[1180px] flex-col px-3 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-[calc(0.75rem+env(safe-area-inset-top))] sm:px-5 lg:px-8">
        <OrbitTopBar />
        <OrbitNav activeSection={activeSection} goTo={goTo} />

        <main className="mt-4 flex-1">
          {activeSection === "discover" && (
            <DiscoverSystem
              query={query}
              setQuery={setQuery}
              items={filteredMedia}
              selectedMedia={selectedMedia}
              playMedia={playMedia}
              openMedia={(item) => {
                playMedia(item);
                setDetailMedia(item);
              }}
              openHub={() => goTo("hub")}
            />
          )}

          {activeSection === "feed" && (
            <FeedSystem
              mode={feedMode}
              setMode={(nextMode) => {
                setFeedMode(nextMode);
                setSelectedFeedIndex(0);
              }}
              item={currentFeed}
              index={selectedFeedIndex}
              setIndex={setSelectedFeedIndex}
              liked={!!liked[currentFeed.id]}
              saved={!!saved[currentFeed.id]}
              toggleLiked={() => setLiked((value) => ({ ...value, [currentFeed.id]: !value[currentFeed.id] }))}
              toggleSaved={() => setSaved((value) => ({ ...value, [currentFeed.id]: !value[currentFeed.id] }))}
              share={() => {
                safeCopy(`https://orbit.preview/feed/${currentFeed.id}`);
                setStatus(`${currentFeed.title} share link copied.`);
              }}
              play={() => {
                setIsPlaying(true);
                setStatus(`${currentFeed.title} is playing.`);
              }}
            />
          )}

          {activeSection === "hub" && (
            <HubSystem
              angle={orbitAngle}
              action={hubAction}
              status={status}
              reposts={reposts}
              orbitAdded={orbitAdded}
              selectedMedia={selectedMedia}
              dragStart={dragStart}
              setDragStart={setDragStart}
              setAngle={setOrbitAngle}
              rotate={(direction) => {
                setOrbitAngle((angle) => angle + direction * 36);
                setStatus(direction > 0 ? "Orbit rotated clockwise." : "Orbit rotated counter-clockwise.");
              }}
              runAction={runHubAction}
            />
          )}

          {activeSection === "experiences" && (
            <ExperiencesSystem
              filter={experienceFilter}
              setFilter={setExperienceFilter}
              experiences={visibleExperiences}
              selectedExperience={selectedExperience}
              setSelectedExperience={(experience) => {
                setSelectedExperience(experience);
                setStatus(`${experience.title} selected.`);
              }}
            />
          )}
        </main>
      </div>

      <MediaPanel
        item={detailMedia}
        close={() => setDetailMedia(null)}
        play={() => detailMedia && playMedia(detailMedia)}
        add={() => {
          setOrbitAdded(true);
          setStatus(`${detailMedia?.artist ?? "Artist"} added to your orbit.`);
        }}
        openHub={() => goTo("hub")}
      />

      <MiniPlayer
        track={currentTrack}
        open={playerOpen}
        playing={isPlaying}
        progress={progress}
        setProgress={setProgress}
        toggleOpen={() => setPlayerOpen((value) => !value)}
        togglePlay={() => setIsPlaying((value) => !value)}
        next={nextTrack}
      />
    </div>
  );
}

function OrbitTopBar() {
  return (
    <header className="flex h-11 items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-black text-[13px] font-semibold text-white">O</span>
        <span className="text-[15px] font-semibold tracking-[0.16em]">ORBIT</span>
      </div>
      <button
        type="button"
        aria-label="Open profile"
        className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-black shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
      >
        <User size={17} />
      </button>
    </header>
  );
}

function OrbitNav({ activeSection, goTo }: { activeSection: SectionId; goTo: (section: SectionId) => void }) {
  return (
    <nav className="mt-3 grid grid-cols-4 gap-1 rounded-full bg-white p-1 shadow-sm ring-1 ring-black/10" aria-label="Orbit preview systems">
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => goTo(section.id)}
          className={cn(
            "min-h-9 rounded-full px-2 text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 sm:text-sm",
            activeSection === section.id ? "bg-black text-white" : "text-black/58 hover:bg-black/[0.04] hover:text-black",
          )}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}

function DiscoverSystem({
  query,
  setQuery,
  items,
  selectedMedia,
  playMedia,
  openMedia,
  openHub,
}: {
  query: string;
  setQuery: (value: string) => void;
  items: OrbitMediaItem[];
  selectedMedia: OrbitMediaItem;
  playMedia: (item: OrbitMediaItem) => void;
  openMedia: (item: OrbitMediaItem) => void;
  openHub: () => void;
}) {
  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
      <div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/42">Good evening</p>
            <h1 className="mt-1 text-[1.7rem] font-semibold leading-none sm:text-4xl">Discover</h1>
          </div>
          <span className="hidden text-sm text-black/48 sm:inline">Nia Vale orbit is active</span>
        </div>

        <label className="relative mt-4 block">
          <span className="sr-only">Search Orbit</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/38" size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search music, reels, artists"
            className="h-11 w-full rounded-full border border-black/10 bg-white px-11 text-[15px] text-black outline-none shadow-sm transition focus:border-black/30 focus:ring-2 focus:ring-black/10"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-black/55 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            >
              <X size={16} />
            </button>
          )}
        </label>

        <div className="mt-4 grid auto-rows-[118px] grid-cols-2 gap-2.5 sm:auto-rows-[150px] lg:auto-rows-[170px] lg:grid-cols-4">
          {items.map((item, index) => (
            <MediaCard key={item.id} item={item} index={index} openMedia={openMedia} />
          ))}
        </div>
      </div>

      <aside className="hidden rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/10 lg:block">
        <img src={selectedMedia.image} alt="" className="aspect-[4/3] w-full rounded-xl object-cover" />
        <p className="mt-3 text-xs uppercase tracking-[0.16em] text-black/42">Now in focus</p>
        <h2 className="mt-1 text-xl font-semibold">{selectedMedia.title}</h2>
        <p className="mt-2 text-sm leading-5 text-black/58">{selectedMedia.detail}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => playMedia(selectedMedia)} className="flex min-h-10 items-center justify-center gap-2 rounded-full bg-black px-3 text-sm text-white">
            <Play size={15} /> Play
          </button>
          <button type="button" onClick={openHub} className="flex min-h-10 items-center justify-center gap-2 rounded-full border border-black/10 px-3 text-sm hover:border-black/30">
            <Plus size={15} /> Orbit
          </button>
        </div>
      </aside>
    </section>
  );
}

function MediaCard({ item, index, openMedia }: { item: OrbitMediaItem; index: number; openMedia: (item: OrbitMediaItem) => void }) {
  const layout = [
    "col-span-2 row-span-2",
    "",
    "",
    "row-span-2",
    "",
    "",
    "col-span-2",
  ][index % 7];

  return (
    <button
      type="button"
      onClick={() => openMedia(item)}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-black text-left text-white outline-none shadow-sm transition duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-black",
        layout,
      )}
    >
      <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.025]" />
      <span className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent" />
      <span className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-medium capitalize text-black">{item.kind}</span>
      <span className="absolute bottom-3 left-3 right-3">
        <span className="block text-[17px] font-semibold leading-tight sm:text-xl">{item.title}</span>
        <span className="mt-0.5 flex items-center justify-between gap-2 text-xs text-white/75 sm:text-sm">
          <span className="truncate">{item.artist}</span>
          <span>{item.duration}</span>
        </span>
      </span>
    </button>
  );
}

function FeedSystem({
  mode,
  setMode,
  item,
  index,
  setIndex,
  liked,
  saved,
  toggleLiked,
  toggleSaved,
  share,
  play,
}: {
  mode: OrbitFeedMode;
  setMode: (mode: OrbitFeedMode) => void;
  item: (typeof orbitPreviewData.feed)[number];
  index: number;
  setIndex: (value: number) => void;
  liked: boolean;
  saved: boolean;
  toggleLiked: () => void;
  toggleSaved: () => void;
  share: () => void;
  play: () => void;
}) {
  return (
    <section className="grid gap-3 lg:grid-cols-[14rem_minmax(0,1fr)_16rem]">
      <aside className="order-2 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/10 lg:order-1">
        <p className="text-xs uppercase tracking-[0.16em] text-black/42">Stories</p>
        <div className="mt-3 flex gap-2 overflow-x-auto lg:grid">
          {orbitPreviewData.feed.map((story) => (
            <button
              key={story.id}
              type="button"
              onClick={() => {
                setMode(story.mode);
                setIndex(0);
              }}
              className={cn(
                "min-h-10 min-w-28 rounded-full border px-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 lg:min-w-0",
                story.id === item.id ? "border-black bg-black text-white" : "border-black/10 text-black/62 hover:border-black/30",
              )}
            >
              {story.artist}
            </button>
          ))}
        </div>
      </aside>

      <div className="order-1 lg:order-2">
        <FilterRow values={feedModes} active={mode} setActive={setMode} />
        <article className="relative mt-3 overflow-hidden rounded-2xl bg-black text-white">
          <img src={item.image} alt="" className="h-[min(64dvh,560px)] min-h-[430px] w-full object-cover opacity-90 lg:h-[680px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-black/5" />
          <div className="absolute left-4 right-4 top-4 flex gap-1">
            {feedModes.map((nextMode) => (
              <span key={nextMode} className={cn("h-1 flex-1 rounded-full", mode === nextMode ? "bg-white" : "bg-white/30")} />
            ))}
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/62">{item.metric}</p>
            <h2 className="mt-1 text-4xl font-semibold leading-[0.95] sm:text-5xl">{item.title}</h2>
            <p className="mt-2 max-w-md text-sm leading-5 text-white/76 sm:text-base">{item.caption}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <IconButton onClick={play} label="Play" icon={<Play size={15} />} light />
              <IconButton onClick={toggleLiked} label={liked ? "Liked" : "Like"} icon={<Heart size={15} fill={liked ? "currentColor" : "none"} />} />
              <IconButton onClick={share} label="Share" icon={<Share2 size={15} />} />
            </div>
          </div>
        </article>
      </div>

      <aside className="order-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/10">
        <p className="text-xs uppercase tracking-[0.16em] text-black/42">Context</p>
        <p className="mt-3 text-xl font-semibold">{item.artist}</p>
        <p className="mt-2 text-sm leading-5 text-black/58">{item.context}</p>
        <div className="mt-4 grid gap-2">
          <button type="button" onClick={toggleSaved} className="flex min-h-10 items-center justify-center gap-2 rounded-full border border-black/10 text-sm hover:border-black/30">
            {saved ? <Check size={15} /> : <Plus size={15} />} {saved ? "Saved" : "Save"}
          </button>
          <button type="button" onClick={() => setIndex(index + 1)} className="flex min-h-10 items-center justify-center gap-2 rounded-full bg-black text-sm text-white">
            Next <ChevronRight size={15} />
          </button>
        </div>
      </aside>
    </section>
  );
}

function HubSystem({
  angle,
  action,
  status,
  reposts,
  orbitAdded,
  selectedMedia,
  dragStart,
  setDragStart,
  setAngle,
  rotate,
  runAction,
}: {
  angle: number;
  action: HubAction;
  status: string;
  reposts: number;
  orbitAdded: boolean;
  selectedMedia: OrbitMediaItem;
  dragStart: { x: number; angle: number } | null;
  setDragStart: (value: { x: number; angle: number } | null) => void;
  setAngle: (value: number | ((value: number) => number)) => void;
  rotate: (direction: -1 | 1) => void;
  runAction: (action: HubAction) => void;
}) {
  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-black/42">Artist orbit</p>
            <h1 className="mt-1 text-[1.7rem] font-semibold leading-none sm:text-4xl">Nia Vale</h1>
          </div>
          <div className="flex gap-1.5">
            <button type="button" onClick={() => rotate(-1)} aria-label="Rotate hub left" className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/10">
              <ChevronLeft size={16} />
            </button>
            <button type="button" onClick={() => rotate(1)} aria-label="Rotate hub right" className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/10">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          role="application"
          aria-label="Interactive Orbit Hub"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") rotate(-1);
            if (event.key === "ArrowRight") rotate(1);
            if (event.key === "Enter") runAction(action);
          }}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragStart({ x: event.clientX, angle });
          }}
          onPointerMove={(event) => {
            if (!dragStart) return;
            setAngle(dragStart.angle + (event.clientX - dragStart.x) * 0.35);
          }}
          onPointerUp={() => setDragStart(null)}
          className="relative mt-4 aspect-square min-h-[350px] overflow-hidden rounded-[1.4rem] bg-[#e9e3d8] outline-none ring-1 ring-black/10 focus-visible:ring-2 focus-visible:ring-black/30 lg:aspect-auto lg:h-[560px] lg:min-h-0"
        >
          <div className="absolute inset-[8%] rounded-full border border-black/18" />
          <div className="absolute inset-[16%] rounded-full border border-black/10" />
          <div className="absolute inset-[29%] rounded-full border border-black/8" />
          <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-black shadow-[0_24px_80px_-36px_rgba(0,0,0,0.65)] sm:h-60 sm:w-60 lg:h-56 lg:w-56">
            <img src={selectedMedia.image} alt="" className="h-full w-full object-cover opacity-95" />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[78%] text-center">
            <p className="text-sm font-semibold">Nia Vale</p>
            <p className="text-xs text-black/48">{selectedMedia.title}</p>
          </div>
          {hubActions.map((nextAction, index) => {
            const step = (360 / hubActions.length) * index + angle;
            const radians = ((step - 90) * Math.PI) / 180;
            return (
              <button
                key={nextAction}
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => runAction(nextAction)}
                className={cn(
                  "orbit-action absolute flex min-h-10 items-center gap-1.5 rounded-full border px-3 text-xs font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 sm:min-h-11 sm:px-4 sm:text-sm",
                  action === nextAction ? "border-black bg-black text-white" : "border-black/10 bg-white text-black hover:border-black/30",
                )}
                style={{
                  left: `calc(50% + ${Math.cos(radians) * 37}%)`,
                  top: `calc(50% + ${Math.sin(radians) * 37}%)`,
                } as CSSProperties}
              >
                {nextAction === "Repost" && <Repeat2 size={15} />}
                {nextAction === "Share" && <Share2 size={15} />}
                {nextAction === "Add to Orbit" && (orbitAdded ? <Check size={15} /> : <Plus size={15} />)}
                {nextAction === "Shop" && <ShoppingBag size={15} />}
                {nextAction === "Experience" && <Ticket size={15} />}
                {nextAction === "Add to Orbit" && orbitAdded ? "In Orbit" : nextAction}
              </button>
            );
          })}
        </div>
      </div>

      <aside className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/10 lg:mt-[4.9rem]">
        <p className="text-xs uppercase tracking-[0.16em] text-black/42">Selected action</p>
        <h2 className="mt-2 text-3xl font-semibold">{action}</h2>
        <p className="mt-2 text-sm leading-5 text-black/58">{status}</p>
        <button type="button" onClick={() => runAction(action)} className="mt-4 flex min-h-11 w-full items-center justify-center rounded-full bg-black px-4 text-sm text-white">
          Run action
        </button>
        <div className="mt-4 hidden grid-cols-2 gap-2 sm:grid">
          <Stat label="Reposts" value={String(reposts)} />
          <Stat label="In orbit" value={orbitAdded ? "Yes" : "No"} />
        </div>
      </aside>
    </section>
  );
}

function ExperiencesSystem({
  filter,
  setFilter,
  experiences,
  selectedExperience,
  setSelectedExperience,
}: {
  filter: OrbitExperienceKind;
  setFilter: (filter: OrbitExperienceKind) => void;
  experiences: OrbitExperience[];
  selectedExperience: OrbitExperience;
  setSelectedExperience: (experience: OrbitExperience) => void;
}) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-black/42">Live access</p>
          <h1 className="mt-1 text-[1.7rem] font-semibold leading-none sm:text-4xl">Experiences</h1>
        </div>
      </div>
      <div className="mt-4">
        <FilterRow values={experienceKinds} active={filter} setActive={setFilter} />
      </div>

      <div className="mt-4 grid auto-rows-[150px] grid-cols-2 gap-2.5 lg:auto-rows-[210px] lg:grid-cols-4">
        {experiences.map((experience, index) => (
          <button
            key={experience.id}
            type="button"
            onClick={() => setSelectedExperience(experience)}
            className={cn(
              "group relative overflow-hidden rounded-2xl bg-black text-left text-white outline-none shadow-sm ring-1 ring-black/5 focus-visible:ring-2 focus-visible:ring-black",
              index === 0 && "col-span-2 row-span-2",
              experience.scale === "wide" && index !== 0 && "col-span-2",
              experience.scale === "tall" && index !== 0 && "row-span-2",
            )}
          >
            <img src={experience.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.025]" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/18 to-transparent" />
            <span className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-medium text-black">{experience.kind}</span>
            <span className="absolute bottom-3 left-3 right-3">
              <span className="block text-xl font-semibold leading-tight sm:text-2xl">{experience.title}</span>
              <span className="mt-1 block text-xs text-white/74 sm:text-sm">{experience.time} / {experience.location}</span>
            </span>
          </button>
        ))}
      </div>

      <aside className="mt-3 grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-black/42">{selectedExperience.kind}</p>
          <h2 className="mt-1 text-2xl font-semibold">{selectedExperience.title}</h2>
          <p className="mt-1 max-w-2xl text-sm leading-5 text-black/58">{selectedExperience.description}</p>
        </div>
        <button type="button" onClick={() => setSelectedExperience(selectedExperience)} className="flex min-h-10 items-center justify-center gap-2 rounded-full bg-black px-4 text-sm text-white">
          {selectedExperience.kind === "Live Stream" ? <Radio size={15} /> : selectedExperience.kind === "Connect" ? <MessageCircle size={15} /> : <Ticket size={15} />}
          {selectedExperience.cta}
        </button>
      </aside>
    </section>
  );
}

function MediaPanel({
  item,
  close,
  play,
  add,
  openHub,
}: {
  item: OrbitMediaItem | null;
  close: () => void;
  play: () => void;
  add: () => void;
  openHub: () => void;
}) {
  if (!item) return null;
  return (
    <aside className="fixed inset-x-3 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-40 mx-auto max-w-md rounded-2xl bg-white p-4 text-black shadow-2xl ring-1 ring-black/10 lg:inset-x-auto lg:right-6 lg:w-96">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-black/42">{item.kind}</p>
          <h2 className="mt-1 text-2xl font-semibold">{item.title}</h2>
        </div>
        <button type="button" onClick={close} aria-label="Close media detail" className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5">
          <X size={17} />
        </button>
      </div>
      <p className="mt-2 text-sm leading-5 text-black/58">{item.detail}</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <button type="button" onClick={play} aria-label="Play media" className="grid min-h-10 place-items-center rounded-full bg-black text-white">
          <Play size={15} />
        </button>
        <button type="button" onClick={add} aria-label="Add to orbit" className="grid min-h-10 place-items-center rounded-full border border-black/10 hover:border-black/30">
          <Plus size={15} />
        </button>
        <button type="button" onClick={openHub} aria-label="Open orbit hub" className="grid min-h-10 place-items-center rounded-full border border-black/10 hover:border-black/30">
          <Ticket size={15} />
        </button>
      </div>
    </aside>
  );
}

function MiniPlayer({
  track,
  open,
  playing,
  progress,
  setProgress,
  toggleOpen,
  togglePlay,
  next,
}: {
  track: (typeof orbitPreviewData.tracks)[number];
  open: boolean;
  playing: boolean;
  progress: number;
  setProgress: (progress: number) => void;
  toggleOpen: () => void;
  togglePlay: () => void;
  next: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(0.55rem+env(safe-area-inset-bottom))] text-black">
      {open && (
        <div className="mx-auto mb-2 max-w-md rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-black/10 lg:max-w-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-black/42">Now playing</p>
              <h2 className="mt-1 text-2xl font-semibold">{track.title}</h2>
              <p className="text-sm text-black/58">{track.artist}</p>
            </div>
            <button type="button" onClick={toggleOpen} aria-label="Collapse player" className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5">
              <ChevronDown size={18} />
            </button>
          </div>
          <input
            aria-label="Track progress"
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(event) => setProgress(Number(event.target.value))}
            className="orbit-range mt-5 w-full"
          />
        </div>
      )}
      <div className="mx-auto flex h-20 max-w-[1180px] items-center gap-3 rounded-[1.35rem] bg-white/96 px-3 shadow-[0_16px_60px_-34px_rgba(0,0,0,0.8)] ring-1 ring-black/10 backdrop-blur">
        <button type="button" onClick={toggleOpen} className="flex min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30" aria-label="Expand player">
          <img src={track.image} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">{track.title}</span>
            <span className="block truncate text-xs text-black/52">{track.artist}</span>
          </span>
        </button>
        <button type="button" onClick={togglePlay} aria-label={playing ? "Pause track" : "Play track"} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-black text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30">
          {playing ? <Pause size={17} /> : <Play size={17} />}
        </button>
        <button type="button" onClick={next} aria-label="Next track" className="grid h-10 w-10 shrink-0 place-items-center rounded-full hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function FilterRow<T extends string>({ values, active, setActive }: { values: readonly T[]; active: T; setActive: (value: T) => void }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto">
      {values.map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => setActive(value)}
          className={cn(
            "min-h-10 shrink-0 rounded-full border px-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
            active === value ? "border-black bg-black text-white" : "border-black/10 bg-white text-black/62 hover:border-black/30",
          )}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

function IconButton({ onClick, label, icon, light = false }: { onClick: () => void; label: string; icon: ReactNode; light?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-10 items-center gap-2 rounded-full px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
        light ? "bg-white text-black" : "bg-white/14 text-white ring-1 ring-white/16",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-black/[0.04] p-3">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs text-black/50">{label}</p>
    </div>
  );
}
