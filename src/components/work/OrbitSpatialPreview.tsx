"use client";

/* eslint-disable @next/next/no-img-element */

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Maximize2,
  MessageCircle,
  Minimize2,
  Pause,
  Play,
  Plus,
  Radio,
  Repeat2,
  Search,
  Share2,
  ShoppingBag,
  Ticket,
  X,
} from "lucide-react";
import { type CSSProperties, type RefObject, useEffect, useMemo, useRef, useState } from "react";
import { orbitPreviewData, type OrbitExperience, type OrbitExperienceKind, type OrbitFeedMode, type OrbitMediaItem } from "@/data/orbit-preview";
import { cn } from "@/lib/utils";

type SectionId = "discover" | "feed" | "hub" | "experiences";
type HubAction = "Repost" | "Share" | "Add to Orbit" | "Shop" | "Experience";

const sections: { id: SectionId; label: string }[] = [
  { id: "discover", label: "Discover" },
  { id: "feed", label: "Feed" },
  { id: "hub", label: "Orbit Hub" },
  { id: "experiences", label: "Experiences" },
];

const feedModes: OrbitFeedMode[] = ["Reels", "Drops", "Notes"];
const experienceKinds: OrbitExperienceKind[] = ["Shows", "Connect", "Live Stream"];
const hubActions: HubAction[] = ["Repost", "Share", "Add to Orbit", "Shop", "Experience"];

const actionCopy: Record<HubAction, string> = {
  Repost: "Reposted to your orbit.",
  Share: "Share link copied for this artist orbit.",
  "Add to Orbit": "Nia Vale is now in your orbit.",
  Shop: "The current artist shop is open.",
  Experience: "The next Orbit experience is selected.",
};

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
  const hubRef = useRef<HTMLDivElement>(null);

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

  const playMedia = (item: OrbitMediaItem) => {
    setSelectedMedia(item);
    const matchingTrackIndex = orbitPreviewData.tracks.findIndex((track) => track.artist === item.artist);
    setTrackIndex(matchingTrackIndex >= 0 ? matchingTrackIndex : 0);
    setIsPlaying(true);
    setStatus(`${item.title} is now playing in the mini player.`);
  };

  const rotateHub = (direction: -1 | 1) => {
    setOrbitAngle((angle) => angle + direction * 42);
    setStatus(direction > 0 ? "Orbit rotated clockwise." : "Orbit rotated counter-clockwise.");
  };

  const runHubAction = (action: HubAction) => {
    setHubAction(action);
    if (action === "Repost") setReposts((value) => value + 1);
    if (action === "Share") safeCopy("https://orbit.preview/artist/nia-vale");
    if (action === "Add to Orbit") setOrbitAdded((value) => !value);
    if (action === "Shop") {
      const product = orbitPreviewData.media.find((item) => item.kind === "product") ?? selectedMedia;
      setSelectedMedia(product);
      setDetailMedia(product);
    }
    if (action === "Experience") {
      const nextExperience = orbitPreviewData.experiences.find((item) => item.kind === "Live Stream") ?? orbitPreviewData.experiences[0];
      setSelectedExperience(nextExperience);
      setExperienceFilter(nextExperience.kind);
      setActiveSection("experiences");
    }
    setStatus(action === "Add to Orbit" && orbitAdded ? "Nia Vale was removed from your orbit." : actionCopy[action]);
  };

  const nextTrack = (direction: -1 | 1) => {
    setTrackIndex((index) => (index + direction + orbitPreviewData.tracks.length) % orbitPreviewData.tracks.length);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="orbit-preview min-h-screen bg-[#f5f3ee] text-[#121212]">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-16 bg-black" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pb-36 pt-24 sm:px-6 lg:px-8">
        <header className="grid gap-6 border-b border-black/10 pb-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase text-black/45">Orbit preview</p>
            <h1 className="mt-2 max-w-3xl text-4xl font-semibold leading-[0.95] text-black sm:text-6xl lg:text-7xl">
              Music worlds that keep playing.
            </h1>
          </div>
          <nav className="flex flex-wrap gap-2 pb-1" aria-label="Orbit preview systems">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  setActiveSection(section.id);
                  setDetailMedia(null);
                }}
                className={cn(
                  "min-h-11 shrink-0 rounded-full border px-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
                  activeSection === section.id
                    ? "border-black bg-black text-white"
                    : "border-black/10 bg-white text-black/70 hover:border-black/30",
                )}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </header>

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
            openHub={() => setActiveSection("hub")}
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
              setStatus(`${currentFeed.title} is playing from the feed.`);
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
            hubRef={hubRef}
            dragStart={dragStart}
            setDragStart={setDragStart}
            setAngle={setOrbitAngle}
            rotate={rotateHub}
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
      </div>

      <MediaPanel
        item={detailMedia}
        close={() => setDetailMedia(null)}
        play={() => detailMedia && playMedia(detailMedia)}
        add={() => {
          setOrbitAdded(true);
          setStatus(`${detailMedia?.artist ?? "Artist"} added to your orbit.`);
        }}
        openHub={() => {
          setActiveSection("hub");
          setDetailMedia(null);
        }}
      />

      <MiniPlayer
        track={currentTrack}
        open={playerOpen}
        playing={isPlaying}
        progress={progress}
        setProgress={setProgress}
        toggleOpen={() => setPlayerOpen((value) => !value)}
        togglePlay={() => setIsPlaying((value) => !value)}
        next={() => nextTrack(1)}
        previous={() => nextTrack(-1)}
      />
    </div>
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
    <section className="grid gap-5 lg:grid-cols-[0.72fr_0.28fr]">
      <div>
        <label className="relative block">
          <span className="sr-only">Search Orbit</span>
          <Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-black/40" size={21} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tracks, reels, artists, experiences"
            className="h-16 w-full rounded-full border border-black/10 bg-white px-14 text-base text-black outline-none transition focus:border-black/35 focus:ring-2 focus:ring-black/10"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-black/55 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            >
              <X size={18} />
            </button>
          )}
        </label>

        <div className="mt-5 grid auto-rows-[172px] grid-cols-2 gap-3 sm:auto-rows-[210px] lg:grid-cols-4">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openMedia(item)}
              className={cn(
                "group relative overflow-hidden rounded-[1.35rem] bg-black text-left text-white outline-none ring-1 ring-black/5 transition duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-black",
                item.layout === "hero" && "col-span-2 row-span-2",
                item.layout === "wide" && "col-span-2",
                item.layout === "tall" && "row-span-2",
              )}
            >
              <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-86 transition duration-300 group-hover:scale-[1.03]" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium capitalize text-black">
                {item.kind}
              </span>
              <span className="absolute bottom-4 left-4 right-4">
                <span className="block text-xl font-semibold leading-tight">{item.title}</span>
                <span className="mt-1 flex items-center justify-between gap-3 text-sm text-white/75">
                  <span>{item.artist}</span>
                  <span>{item.duration}</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <aside className="rounded-[1.4rem] border border-black/10 bg-white p-4 lg:sticky lg:top-24 lg:self-start">
        <p className="font-mono text-[11px] uppercase text-black/45">Now in focus</p>
        <div className="mt-4 overflow-hidden rounded-2xl bg-black">
          <img src={selectedMedia.image} alt="" className="aspect-[4/3] w-full object-cover opacity-90" />
        </div>
        <h2 className="mt-4 text-2xl font-semibold">{selectedMedia.title}</h2>
        <p className="mt-2 text-sm leading-6 text-black/58">{selectedMedia.detail}</p>
        <div className="mt-5 grid gap-2">
          <button
            type="button"
            onClick={() => playMedia(selectedMedia)}
            className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-black px-4 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
          >
            <Play size={16} /> Play
          </button>
          <button
            type="button"
            onClick={openHub}
            className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-black/10 px-4 text-sm text-black hover:border-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
          >
            <Plus size={16} /> Add in Orbit Hub
          </button>
        </div>
      </aside>
    </section>
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
    <section className="grid gap-5 lg:grid-cols-[0.22fr_0.56fr_0.22fr]">
      <aside className="order-2 rounded-[1.25rem] border border-black/10 bg-white p-4 lg:order-1">
        <p className="font-mono text-[11px] uppercase text-black/45">Stories</p>
        <div className="mt-4 flex gap-2 lg:grid">
          {orbitPreviewData.feed.map((story) => (
            <button
              key={story.id}
              type="button"
              onClick={() => {
                setMode(story.mode);
                setIndex(0);
              }}
              className={cn(
                "min-h-11 flex-1 rounded-full border px-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 lg:flex-none",
                story.id === item.id ? "border-black bg-black text-white" : "border-black/10 text-black/65 hover:border-black/30",
              )}
            >
              {story.artist}
            </button>
          ))}
        </div>
      </aside>

      <div className="order-1 lg:order-2">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {feedModes.map((nextMode) => (
            <button
              key={nextMode}
              type="button"
              onClick={() => setMode(nextMode)}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
                mode === nextMode ? "border-black bg-black text-white" : "border-black/10 bg-white text-black/65 hover:border-black/30",
              )}
            >
              {nextMode}
            </button>
          ))}
        </div>
        <article className="relative overflow-hidden rounded-[1.6rem] bg-black text-white">
          <img src={item.image} alt="" className="h-[520px] w-full object-cover opacity-85 sm:h-[620px] lg:h-[680px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/10" />
          <div className="absolute left-4 right-4 top-4 flex gap-1">
            {feedModes.map((nextMode) => (
              <span key={nextMode} className={cn("h-1 flex-1 rounded-full", mode === nextMode ? "bg-white" : "bg-white/30")} />
            ))}
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <p className="font-mono text-[11px] uppercase text-white/60">{item.metric}</p>
            <h2 className="mt-2 text-4xl font-semibold leading-none sm:text-6xl">{item.title}</h2>
            <p className="mt-3 max-w-md text-base leading-6 text-white/76">{item.caption}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={play} className="flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm text-black">
                <Play size={16} /> Play
              </button>
              <button type="button" onClick={toggleLiked} className="flex min-h-11 items-center gap-2 rounded-full bg-white/12 px-4 text-sm text-white ring-1 ring-white/16">
                <Heart size={16} fill={liked ? "currentColor" : "none"} /> {liked ? "Liked" : "Like"}
              </button>
              <button type="button" onClick={share} className="flex min-h-11 items-center gap-2 rounded-full bg-white/12 px-4 text-sm text-white ring-1 ring-white/16">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        </article>
      </div>

      <aside className="order-3 rounded-[1.25rem] border border-black/10 bg-white p-4">
        <p className="font-mono text-[11px] uppercase text-black/45">Context</p>
        <p className="mt-4 text-xl font-semibold leading-tight">{item.artist}</p>
        <p className="mt-3 text-sm leading-6 text-black/58">{item.context}</p>
        <div className="mt-5 grid gap-2">
          <button type="button" onClick={toggleSaved} className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-black/10 text-sm hover:border-black/35">
            {saved ? <Check size={16} /> : <Plus size={16} />} {saved ? "Saved" : "Save"}
          </button>
          <button type="button" onClick={() => setIndex(index + 1)} className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-black text-sm text-white">
            Next reel <ChevronRight size={16} />
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
  hubRef,
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
  hubRef: RefObject<HTMLDivElement | null>;
  dragStart: { x: number; angle: number } | null;
  setDragStart: (value: { x: number; angle: number } | null) => void;
  setAngle: (value: number | ((value: number) => number)) => void;
  rotate: (direction: -1 | 1) => void;
  runAction: (action: HubAction) => void;
}) {
  return (
    <section className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
      <div
        ref={hubRef}
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
        className="orbit-hub-stage relative min-h-[560px] overflow-hidden rounded-[1.6rem] border border-black/10 bg-[#ebe8e0] outline-none focus-visible:ring-2 focus-visible:ring-black/30"
      >
        <div className="absolute inset-8 rounded-full border border-black/10" />
        <div className="absolute inset-16 rounded-full border border-black/10" />
        <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-black shadow-2xl">
          <img src={selectedMedia.image} alt="" className="h-full w-full object-cover opacity-90" />
        </div>
        <div className="absolute left-1/2 top-1/2 text-center">
          <div className="-translate-x-1/2 translate-y-[108px]">
            <p className="text-sm font-semibold">Nia Vale</p>
            <p className="text-xs text-black/50">Artist orbit</p>
          </div>
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
                "orbit-action absolute flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
                action === nextAction ? "border-black bg-black text-white" : "border-black/10 bg-white text-black hover:border-black/35",
              )}
              style={{
                left: `calc(50% + ${Math.cos(radians) * 34}%)`,
                top: `calc(50% + ${Math.sin(radians) * 32}%)`,
              } as CSSProperties}
            >
              {nextAction === "Repost" && <Repeat2 size={16} />}
              {nextAction === "Share" && <Share2 size={16} />}
              {nextAction === "Add to Orbit" && (orbitAdded ? <Check size={16} /> : <Plus size={16} />)}
              {nextAction === "Shop" && <ShoppingBag size={16} />}
              {nextAction === "Experience" && <Ticket size={16} />}
              {nextAction === "Add to Orbit" && orbitAdded ? "In Orbit" : nextAction}
            </button>
          );
        })}
      </div>

      <aside className="rounded-[1.25rem] border border-black/10 bg-white p-5">
        <p className="font-mono text-[11px] uppercase text-black/45">Selected action</p>
        <h2 className="mt-3 text-3xl font-semibold">{action}</h2>
        <p className="mt-3 text-sm leading-6 text-black/58">{status}</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-black/[0.04] p-4">
            <p className="text-2xl font-semibold">{reposts}</p>
            <p className="text-xs text-black/50">Reposts</p>
          </div>
          <div className="rounded-2xl bg-black/[0.04] p-4">
            <p className="text-2xl font-semibold">{orbitAdded ? "Yes" : "No"}</p>
            <p className="text-xs text-black/50">In your orbit</p>
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <button type="button" onClick={() => rotate(-1)} aria-label="Rotate hub left" className="flex min-h-11 flex-1 items-center justify-center rounded-full border border-black/10 hover:border-black/35">
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={() => runAction(action)} className="flex min-h-11 flex-[2] items-center justify-center rounded-full bg-black px-4 text-sm text-white">
            Run action
          </button>
          <button type="button" onClick={() => rotate(1)} aria-label="Rotate hub right" className="flex min-h-11 flex-1 items-center justify-center rounded-full border border-black/10 hover:border-black/35">
            <ChevronRight size={18} />
          </button>
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
      <div className="flex gap-2 overflow-x-auto pb-4">
        {experienceKinds.map((kind) => (
          <button
            key={kind}
            type="button"
            onClick={() => setFilter(kind)}
            className={cn(
              "flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
              filter === kind ? "border-black bg-black text-white" : "border-black/10 bg-white text-black/65 hover:border-black/30",
            )}
          >
            {kind === "Live Stream" ? <Radio size={16} /> : kind === "Connect" ? <MessageCircle size={16} /> : <Ticket size={16} />}
            {kind}
          </button>
        ))}
      </div>

      <div className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {experiences.map((experience) => (
          <button
            key={experience.id}
            type="button"
            onClick={() => setSelectedExperience(experience)}
            className={cn(
              "group relative overflow-hidden rounded-[1.35rem] bg-black text-left text-white outline-none ring-1 ring-black/5 focus-visible:ring-2 focus-visible:ring-black",
              experience.scale === "wide" && "sm:col-span-2",
              experience.scale === "tall" && "sm:row-span-2",
            )}
          >
            <img src={experience.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-300 group-hover:scale-[1.03]" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black">
              {experience.kind}
            </span>
            <span className="absolute bottom-4 left-4 right-4">
              <span className="block text-2xl font-semibold leading-none">{experience.title}</span>
              <span className="mt-2 block text-sm text-white/72">{experience.time} / {experience.location}</span>
            </span>
          </button>
        ))}
      </div>

      <aside className="mt-5 grid gap-4 rounded-[1.25rem] border border-black/10 bg-white p-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="font-mono text-[11px] uppercase text-black/45">{selectedExperience.kind}</p>
          <h2 className="mt-2 text-3xl font-semibold">{selectedExperience.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/58">{selectedExperience.description}</p>
        </div>
        <button
          type="button"
          onClick={() => setSelectedExperience(selectedExperience)}
          className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-black px-5 text-sm text-white"
        >
          {selectedExperience.kind === "Live Stream" ? <Radio size={16} /> : selectedExperience.kind === "Connect" ? <MessageCircle size={16} /> : <Ticket size={16} />}
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
    <aside className="fixed bottom-24 right-4 z-40 w-[min(24rem,calc(100vw-2rem))] rounded-[1.3rem] border border-black/10 bg-white p-4 text-black shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase text-black/45">{item.kind}</p>
          <h2 className="mt-1 text-2xl font-semibold">{item.title}</h2>
        </div>
        <button type="button" onClick={close} aria-label="Close media detail" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-black/5">
          <X size={18} />
        </button>
      </div>
      <p className="mt-2 text-sm leading-6 text-black/58">{item.detail}</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <button type="button" onClick={play} className="flex min-h-11 items-center justify-center rounded-full bg-black text-white">
          <Play size={16} />
        </button>
        <button type="button" onClick={add} className="flex min-h-11 items-center justify-center rounded-full border border-black/10 hover:border-black/35">
          <Plus size={16} />
        </button>
        <button type="button" onClick={openHub} className="flex min-h-11 items-center justify-center rounded-full border border-black/10 hover:border-black/35">
          <Ticket size={16} />
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
  previous,
}: {
  track: (typeof orbitPreviewData.tracks)[number];
  open: boolean;
  playing: boolean;
  progress: number;
  setProgress: (progress: number) => void;
  toggleOpen: () => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[#f5f3ee]/96 px-4 py-3 text-black shadow-[0_-16px_45px_-32px_rgba(0,0,0,0.6)] backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <img src={track.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{track.title}</p>
            <p className="truncate text-xs text-black/52">{track.artist} / {track.length}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button type="button" onClick={previous} aria-label="Previous track" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30">
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={togglePlay} aria-label={playing ? "Pause track" : "Play track"} className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30">
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button type="button" onClick={next} aria-label="Next track" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30">
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <input
            aria-label="Track progress"
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(event) => setProgress(Number(event.target.value))}
            className="orbit-range w-full"
          />
          <button type="button" onClick={toggleOpen} aria-label={open ? "Collapse player" : "Expand player"} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30">
            {open ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mx-auto mt-3 grid max-w-7xl gap-2 border-t border-black/10 pt-3 text-xs text-black/55 sm:grid-cols-3">
          <span>Persistent player remains while browsing.</span>
          <span>Progress, previous, next, play and pause are stateful.</span>
          <span>Current orbit: Nia Vale / Mirror Season.</span>
        </div>
      )}
    </div>
  );
}
