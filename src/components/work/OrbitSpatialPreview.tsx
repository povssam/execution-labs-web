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

  return (
    <div className="orbit-preview min-h-dvh overflow-x-hidden bg-[#f5f1e9] text-[#111]">
      <div className="mx-auto flex h-dvh w-full max-w-[1180px] flex-col overflow-hidden px-3 pt-[calc(0.45rem+env(safe-area-inset-top))] sm:px-5 lg:px-8">
        <OrbitTopBar />
        <OrbitNav activeSection={activeSection} goTo={goTo} />

        <main className="mt-4 min-h-0 flex-1 overflow-y-auto pb-8">
          {activeSection === "discover" && (
            <DiscoverSystem
              query={query}
              setQuery={setQuery}
              items={filteredMedia}
              openMedia={(item) => {
                playMedia(item);
                setDetailMedia(item);
              }}
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
              openExperience={() => runHubAction("Experience")}
              playSelected={() => {
                setIsPlaying(true);
                setStatus(`${selectedMedia.title} is playing.`);
              }}
            />
          )}

          {activeSection === "experiences" && (
            <ExperiencesSystem
              filter={experienceFilter}
              setFilter={(nextFilter) => {
                setExperienceFilter(nextFilter);
                const nextExperience = orbitPreviewData.experiences.find((experience) => experience.kind === nextFilter);
                if (nextExperience) setSelectedExperience(nextExperience);
              }}
              experiences={orbitPreviewData.experiences}
              selectedExperience={selectedExperience}
              setSelectedExperience={(experience) => {
                setSelectedExperience(experience);
                setStatus(`${experience.title} selected.`);
              }}
            />
          )}
        </main>

        <MiniPlayer
          track={currentTrack}
          open={playerOpen}
          playing={isPlaying}
          progress={progress}
          setProgress={setProgress}
          toggleOpen={() => setPlayerOpen((value) => !value)}
          togglePlay={() => setIsPlaying((value) => !value)}
        />
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

    </div>
  );
}

function OrbitTopBar() {
  return (
    <header className="flex h-10 items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-black text-[12px] font-semibold text-white">O</span>
        <span className="text-[14px] font-semibold tracking-[0.18em]">ORBIT</span>
      </div>
      <button
        type="button"
        aria-label="Open profile"
        className="grid h-10 w-10 place-items-center rounded-full bg-white text-black shadow-sm ring-1 ring-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
      >
        <User size={17} />
      </button>
    </header>
  );
}

function OrbitNav({ activeSection, goTo }: { activeSection: SectionId; goTo: (section: SectionId) => void }) {
  return (
    <nav className="mx-auto mt-1 flex min-h-10 w-full max-w-[480px] items-center justify-center gap-1 rounded-full bg-white/60 px-1 text-black/54 ring-1 ring-black/10" aria-label="Orbit preview systems">
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => goTo(section.id)}
          className={cn(
            "min-h-9 flex-1 rounded-full px-2 text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 sm:flex-none sm:px-5 sm:text-sm",
            activeSection === section.id ? "bg-black text-white" : "hover:bg-black/[0.04] hover:text-black",
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
  openMedia,
}: {
  query: string;
  setQuery: (value: string) => void;
  items: OrbitMediaItem[];
  openMedia: (item: OrbitMediaItem) => void;
}) {
  return (
    <section className="mx-auto max-w-[980px]">
      <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-black/42">
        <span>products</span>
        <span>experiences</span>
        <span>music</span>
        <span>reels</span>
      </div>

      <label className="relative mt-3 block">
        <span className="sr-only">Search Orbit</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/38" size={17} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          className="h-11 w-full rounded-full border border-black/10 bg-white px-11 text-[15px] text-black outline-none shadow-sm transition focus:border-black/30 focus:ring-2 focus:ring-black/10 lg:max-w-[760px]"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-black/55 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 lg:left-[718px] lg:right-auto"
          >
            <X size={16} />
          </button>
        )}
      </label>

      <div className="relative mt-4 min-h-[620px] lg:min-h-[640px]">
        {items.slice(0, 7).map((item, index) => (
          <MediaCard key={item.id} item={item} index={index} openMedia={openMedia} />
        ))}
      </div>
    </section>
  );
}

function MediaCard({ item, index, openMedia }: { item: OrbitMediaItem; index: number; openMedia: (item: OrbitMediaItem) => void }) {
  const layout = [
    "left-0 top-0 h-[116px] w-[34%] rounded-[1rem] lg:left-[4%] lg:top-0 lg:h-[150px] lg:w-[18%]",
    "left-[40%] top-0 h-[126px] w-[34%] rounded-[1.25rem] lg:left-[34%] lg:top-8 lg:h-[170px] lg:w-[22%]",
    "right-0 top-0 h-[108px] w-[20%] rounded-[0.85rem] lg:right-[12%] lg:top-6 lg:h-[145px] lg:w-[14%]",
    "left-[7%] top-[160px] h-[92px] w-[25%] rounded-full lg:left-[10%] lg:top-[240px] lg:h-[150px] lg:w-[150px]",
    "left-[42%] top-[165px] h-[130px] w-[35%] rounded-[0.9rem] lg:left-[39%] lg:top-[235px] lg:h-[190px] lg:w-[22%]",
    "left-[4%] top-[330px] h-[145px] w-[33%] rounded-[1.1rem] lg:left-[18%] lg:top-[440px] lg:h-[170px] lg:w-[18%]",
    "right-[4%] top-[330px] h-[205px] w-[49%] rounded-[1.35rem] lg:right-[10%] lg:top-[390px] lg:h-[230px] lg:w-[30%]",
  ][index % 7];
  const showMedia = index !== 3;
  const showTag = index === 0 || index === 2 || index === 4;

  return (
    <button
      type="button"
      onClick={() => openMedia(item)}
      className={cn(
        "group absolute overflow-hidden bg-black text-left text-white outline-none shadow-sm transition duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-black",
        layout,
        !showMedia && "bg-black/[0.08] text-black ring-1 ring-black/10",
      )}
    >
      {showMedia && <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.025]" />}
      {showMedia && <span className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/10 to-transparent" />}
      {showTag && (
        <span className="absolute left-3 top-3 rounded-full bg-white/88 px-2 py-0.5 text-[10px] font-medium capitalize text-black">{item.kind}</span>
      )}
      {!showMedia && <span className="absolute inset-0 grid place-items-center text-[11px] uppercase tracking-[0.16em] text-black/46">music</span>}
      <span className={cn("absolute bottom-3 left-3 right-3 flex flex-col", !showMedia && "hidden")}>
        <span className="block text-[15px] font-semibold leading-tight sm:text-lg">{item.title}</span>
        <span className="mt-0.5 flex items-center justify-between gap-2 text-xs text-white/75">
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
  const previous = orbitPreviewData.feed[(index + orbitPreviewData.feed.length - 1) % orbitPreviewData.feed.length];
  const next = orbitPreviewData.feed[(index + 1) % orbitPreviewData.feed.length];

  return (
    <section className="mx-auto max-w-[980px]">
      <div className="flex items-center justify-between gap-3">
        <FilterRow values={feedModes} active={mode} setActive={setMode} />
        <div className="hidden gap-2 sm:flex">
          <button type="button" onClick={() => setIndex(index - 1)} aria-label="Previous story" className="grid h-10 w-10 place-items-center rounded-full bg-white ring-1 ring-black/10">
            <ChevronLeft size={16} />
          </button>
          <button type="button" onClick={() => setIndex(index + 1)} aria-label="Next story" className="grid h-10 w-10 place-items-center rounded-full bg-white ring-1 ring-black/10">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="relative mt-3 min-h-[660px] overflow-hidden lg:min-h-[650px]">
        <button type="button" onClick={() => setIndex(index - 1)} aria-label="Previous story preview" className="absolute left-0 top-16 h-[380px] w-[13%] overflow-hidden rounded-[1.25rem] bg-black opacity-55 ring-1 ring-black/10 lg:left-[2%] lg:h-[470px] lg:w-[13%]">
          <img src={previous.image} alt="" className="h-full w-full object-cover" />
        </button>
        <button type="button" onClick={() => setIndex(index + 1)} aria-label="Next story preview" className="absolute right-0 top-16 h-[380px] w-[13%] overflow-hidden rounded-[1.25rem] bg-black opacity-70 ring-1 ring-black/10 lg:right-[2%] lg:h-[470px] lg:w-[13%]">
          <img src={next.image} alt="" className="h-full w-full object-cover" />
        </button>

        <div className="mx-auto w-[74%] max-w-[610px]">
          <div className="mx-auto flex h-7 max-w-[360px] items-center justify-center gap-2">
            {orbitPreviewData.feed.map((story, storyIndex) => (
              <button
                key={story.id}
                type="button"
                onClick={() => {
                  setMode(story.mode);
                  setIndex(storyIndex);
                }}
                aria-label={`Open ${story.title}`}
                className={cn("h-2.5 rounded-full transition-all", story.id === item.id ? "w-9 bg-black" : "w-2.5 bg-black/22 hover:bg-black/45")}
              />
            ))}
          </div>

          <article className="relative mt-2 overflow-hidden rounded-[1.1rem] bg-black text-white">
            <img src={item.image} alt="" className="h-[300px] w-full object-cover opacity-90 sm:h-[360px] lg:h-[420px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/62">{item.metric}</p>
              <h2 className="mt-1 max-w-[15rem] text-3xl font-semibold leading-[0.95] sm:max-w-md sm:text-5xl">{item.title}</h2>
              <p className="mt-2 max-w-md text-sm leading-5 text-white/74">{item.caption}</p>
            </div>
          </article>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <button type="button" onClick={play} className="flex min-h-10 items-center justify-center gap-2 rounded-full bg-black px-3 text-sm text-white">
              <Play size={15} /> Play
            </button>
            <button type="button" onClick={toggleLiked} className="flex min-h-10 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-3 text-sm hover:border-black/30">
              <Heart size={15} fill={liked ? "currentColor" : "none"} /> {liked ? "Liked" : "Like"}
            </button>
            <button type="button" onClick={share} className="flex min-h-10 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-3 text-sm hover:border-black/30">
              <Share2 size={15} /> Share
            </button>
          </div>

          <div className="mt-3 grid gap-2 rounded-[1rem] bg-white/70 p-3 ring-1 ring-black/10 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-black/40">{item.artist}</p>
              <p className="mt-1 text-sm leading-5 text-black/62">{item.context}</p>
            </div>
            <button type="button" onClick={toggleSaved} className="flex min-h-10 items-center justify-center gap-2 rounded-full border border-black/10 px-4 text-sm hover:border-black/30">
              {saved ? <Check size={15} /> : <Plus size={15} />} {saved ? "Saved" : "Save"}
            </button>
          </div>

          <div className="mx-auto mt-4 flex max-w-[240px] items-center justify-center gap-2">
            {orbitPreviewData.feed.map((story) => (
            <button
              key={story.id}
              type="button"
              onClick={() => {
                setMode(story.mode);
                setIndex(0);
              }}
              className={cn(
                "min-h-8 rounded-full border px-3 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
                story.id === item.id ? "border-black bg-black text-white" : "border-black/10 text-black/62 hover:border-black/30",
              )}
            >
              {story.artist}
            </button>
          ))}
          </div>
        </div>
      </div>
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
  openExperience,
  playSelected,
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
  openExperience: () => void;
  playSelected: () => void;
}) {
  return (
    <section className="mx-auto max-w-[980px]">
      <div>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-black/42">Orbit</p>
            <h1 className="mt-1 text-[2rem] font-semibold leading-none tracking-[0.14em] sm:text-4xl">ORBIT</h1>
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

        <div className="relative mt-3 h-40 lg:h-28">
          <button type="button" onClick={playSelected} className="absolute left-[3%] top-2 h-24 w-28 overflow-hidden rounded-[48%] bg-black text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 lg:left-[11%] lg:h-24 lg:w-32">
            <img src={selectedMedia.image} alt="" className="h-full w-full object-cover opacity-90" />
            <span className="absolute left-3 top-3 text-[10px] uppercase tracking-[0.14em] text-white/70">music</span>
          </button>
          <button type="button" onClick={openExperience} className="absolute right-[2%] top-0 h-28 w-36 overflow-hidden rounded-[46%] bg-black text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 lg:right-[13%] lg:h-28 lg:w-40">
            <img src={orbitPreviewData.experiences[0].image} alt="" className="h-full w-full object-cover opacity-85" />
            <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.14em] text-white/70">experience</span>
          </button>
          <button type="button" onClick={playSelected} className="absolute bottom-2 left-1/2 flex h-10 w-[86%] -translate-x-1/2 items-center gap-3 rounded-full border border-black/10 bg-white px-3 text-left shadow-sm hover:border-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 lg:w-[58%]">
            <Play size={14} />
            <span className="min-w-0 flex-1 truncate text-sm">Nia Vale - {selectedMedia.title}</span>
            <span className="h-1 w-20 rounded-full bg-black/10"><span className="block h-full w-1/3 rounded-full bg-black" /></span>
          </button>
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
          className="relative mx-auto mt-1 aspect-square min-h-[340px] max-w-[620px] overflow-visible outline-none focus-visible:ring-2 focus-visible:ring-black/30 lg:h-[380px] lg:min-h-0"
        >
          <div className="absolute inset-[10%] rounded-full border border-black/32" />
          <div className="absolute inset-[20%] rounded-full border border-black/14" />
          <div className="absolute inset-[33%] rounded-full border border-black/8" />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[38%] origin-left bg-black/34"
            style={{ transform: `rotate(${(360 / hubActions.length) * hubActions.indexOf(action) + angle - 90}deg)` }}
          />
          <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-black shadow-[0_24px_80px_-36px_rgba(0,0,0,0.65)] sm:h-52 sm:w-52 lg:h-56 lg:w-56">
            <img src={selectedMedia.image} alt="" className="h-full w-full object-cover opacity-95" />
            <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/72 to-transparent" />
            <span className="absolute inset-x-4 bottom-4 text-center text-white">
              <span className="block text-sm font-semibold leading-tight">Nia Vale</span>
              <span className="block truncate text-xs text-white/70">{selectedMedia.title}</span>
            </span>
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
                  left: `calc(50% + ${Math.cos(radians) * 34}%)`,
                  top: `calc(50% + ${Math.sin(radians) * 34}%)`,
                  transform: "translate(-50%, -50%)",
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

        <HubActionPanel action={action} status={status} orbitAdded={orbitAdded} reposts={reposts} runAction={runAction} openExperience={openExperience} />
      </div>
    </section>
  );
}

function HubActionPanel({
  action,
  status,
  orbitAdded,
  reposts,
  runAction,
  openExperience,
}: {
  action: HubAction;
  status: string;
  orbitAdded: boolean;
  reposts: number;
  runAction: (action: HubAction) => void;
  openExperience: () => void;
}) {
  return (
    <section className="mt-3 rounded-xl bg-white p-3 ring-1 ring-black/10 sm:p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-black/42">Selected action</p>
      <div className="mt-2 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h2 className="text-2xl font-semibold">{action}</h2>
          <p className="mt-1 text-sm leading-5 text-black/58">{status}</p>
        </div>
        <button type="button" onClick={() => runAction(action)} className="flex min-h-9 items-center justify-center rounded-full bg-black px-4 text-sm text-white sm:min-h-10">
          {action === "Add to Orbit" && (orbitAdded ? "Update Orbit" : "Add artist")}
          {action === "Share" && "Copy link"}
          {action === "Repost" && "Repost again"}
          {action === "Shop" && "Open item"}
          {action === "Experience" && "View events"}
        </button>
      </div>

      {action === "Add to Orbit" && (
        <div className="mt-3 flex gap-2 overflow-x-auto sm:mt-4 sm:grid sm:grid-cols-3">
          {["Core rotation", "After-hours", "Release watch"].map((collection) => (
            <button key={collection} type="button" onClick={() => runAction("Add to Orbit")} className="min-h-9 shrink-0 rounded-full border border-black/10 px-3 text-sm hover:border-black/30 sm:min-h-10">
              {orbitAdded ? <Check className="mr-1 inline" size={14} /> : <Plus className="mr-1 inline" size={14} />}
              {collection}
            </button>
          ))}
        </div>
      )}

      {action === "Share" && (
        <div className="mt-3 flex gap-2 overflow-x-auto sm:mt-4 sm:grid sm:grid-cols-3">
          <button type="button" onClick={() => runAction("Share")} className="min-h-9 shrink-0 rounded-full border border-black/10 px-3 text-sm hover:border-black/30 sm:min-h-10">Copy artist link</button>
          <button type="button" onClick={() => runAction("Share")} className="min-h-9 shrink-0 rounded-full border border-black/10 px-3 text-sm hover:border-black/30 sm:min-h-10">Share track</button>
          <button type="button" onClick={() => runAction("Share")} className="min-h-9 shrink-0 rounded-full border border-black/10 px-3 text-sm hover:border-black/30 sm:min-h-10">Send to orbit</button>
        </div>
      )}

      {action === "Repost" && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-black/58 sm:mt-4">
          <span className="rounded-full bg-black/[0.04] px-3 py-1.5 sm:py-2">{reposts} reposts</span>
          <button type="button" onClick={() => runAction("Repost")} className="min-h-9 rounded-full border border-black/10 px-4 text-black hover:border-black/30 sm:min-h-10">Repost with note</button>
        </div>
      )}

      {action === "Shop" && (
        <div className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-2">
          {orbitPreviewData.media.filter((item) => item.kind === "product").map((item) => (
            <button key={item.id} type="button" onClick={() => runAction("Shop")} className="flex min-h-12 items-center justify-between rounded-xl bg-black/[0.04] px-3 text-left text-sm hover:bg-black/[0.07]">
              <span>
                <span className="block font-medium">{item.title}</span>
                <span className="text-xs text-black/50">{item.detail}</span>
              </span>
              <ShoppingBag size={16} />
            </button>
          ))}
        </div>
      )}

      {action === "Experience" && (
        <div className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-2">
          {orbitPreviewData.experiences.slice(0, 2).map((experience) => (
            <button key={experience.id} type="button" onClick={openExperience} className="flex min-h-12 items-center justify-between rounded-xl bg-black/[0.04] px-3 text-left text-sm hover:bg-black/[0.07]">
              <span>
                <span className="block font-medium">{experience.title}</span>
                <span className="text-xs text-black/50">{experience.time}</span>
              </span>
              <Ticket size={16} />
            </button>
          ))}
        </div>
      )}
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
  const shows = experiences.filter((experience) => experience.kind === "Shows");
  const connect = experiences.find((experience) => experience.kind === "Connect") ?? experiences[0];
  const live = experiences.find((experience) => experience.kind === "Live Stream") ?? experiences[0];
  const activeItems = experiences.filter((experience) => experience.kind === filter);

  return (
    <section className="mx-auto max-w-[980px]">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-black/42">Experiences</p>
          <h1 className="mt-1 text-[1.7rem] font-semibold leading-none sm:text-4xl">All access</h1>
        </div>
      </div>
      <div className="mt-4">
        <FilterRow values={experienceKinds} active={filter} setActive={setFilter} />
      </div>

      <div className="mt-4 grid min-h-[520px] grid-cols-[0.9fr_1.18fr_0.9fr] gap-2.5 lg:min-h-[560px] lg:gap-4">
        <div className={cn("grid content-start gap-2.5 transition-opacity", filter !== "Shows" && "opacity-45")}>
          <button type="button" onClick={() => setFilter("Shows")} className="w-fit rounded-full border border-black/10 bg-white px-3 py-1 text-sm">Shows</button>
          {shows.map((experience, index) => (
            <ExperienceTile key={experience.id} experience={experience} active={selectedExperience.id === experience.id} className={index === 0 ? "h-32 lg:h-40" : "h-44 lg:h-56"} onClick={() => setSelectedExperience(experience)} />
          ))}
        </div>

        <div className={cn("grid content-start gap-2.5 transition-opacity", filter !== "Connect" && "opacity-70")}>
          <button type="button" onClick={() => setFilter("Connect")} className="w-fit rounded-full border border-black/10 bg-white px-3 py-1 text-sm">Connect</button>
          <button
            type="button"
            onClick={() => setSelectedExperience(connect)}
            className={cn(
              "min-h-[178px] rounded-[1.15rem] border bg-white p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 lg:min-h-[210px]",
              selectedExperience.id === connect.id ? "border-black" : "border-black/10 hover:border-black/30",
            )}
          >
            <p className="text-xs uppercase tracking-[0.16em] text-black/42">Direct artist access</p>
            <h2 className="mt-2 text-xl font-semibold leading-tight">{connect.title}</h2>
            <p className="mt-2 text-sm leading-5 text-black/58">Two minute reply from {connect.artist}. Available today inside Orbit.</p>
            <span className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-full bg-black px-4 text-sm text-white">
              <MessageCircle size={15} /> {connect.cta}
            </span>
          </button>
          {activeItems.filter((experience) => experience.kind === "Connect").map((experience) => (
            <ExperienceTile key={`${experience.id}-image`} experience={experience} active={selectedExperience.id === experience.id} className="h-40 lg:h-52" onClick={() => setSelectedExperience(experience)} />
          ))}
        </div>

        <div className={cn("grid content-start gap-2.5 transition-opacity", filter !== "Live Stream" && "opacity-45")}>
          <button type="button" onClick={() => setFilter("Live Stream")} className="w-fit rounded-full border border-black/10 bg-white px-3 py-1 text-sm">Live Stream</button>
          <ExperienceTile experience={live} active={selectedExperience.id === live.id} className="h-48 lg:h-64" onClick={() => setSelectedExperience(live)} />
          <button type="button" onClick={() => setFilter("Live Stream")} className="min-h-20 rounded-[1rem] border border-black/10 bg-white p-3 text-left text-sm hover:border-black/30">
            <Radio className="mb-2" size={16} />
            Reminder window opens Friday.
          </button>
        </div>
      </div>

      <aside className="mt-3 grid gap-3 rounded-xl bg-white/80 p-4 ring-1 ring-black/10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-black/42">{selectedExperience.kind}</p>
          <h2 className="mt-1 text-2xl font-semibold">{selectedExperience.title}</h2>
          <p className="mt-1 max-w-2xl text-sm leading-5 text-black/58">{selectedExperience.description}</p>
          {selectedExperience.kind === "Connect" && (
            <p className="mt-2 text-sm text-black/54">2 minute reply / Available today / Direct artist access</p>
          )}
          {selectedExperience.kind === "Live Stream" && (
            <p className="mt-2 text-sm text-black/54">Live room access / Reminder enabled after selection</p>
          )}
        </div>
        <button type="button" onClick={() => setSelectedExperience(selectedExperience)} className="flex min-h-10 items-center justify-center gap-2 rounded-full bg-black px-4 text-sm text-white">
          {selectedExperience.kind === "Live Stream" ? <Radio size={15} /> : selectedExperience.kind === "Connect" ? <MessageCircle size={15} /> : <Ticket size={15} />}
          {selectedExperience.cta}
        </button>
      </aside>
    </section>
  );
}

function ExperienceTile({ experience, active, className, onClick }: { experience: OrbitExperience; active: boolean; className: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-[1rem] bg-black text-left text-white outline-none ring-1 transition focus-visible:ring-2 focus-visible:ring-black",
        active ? "ring-black" : "ring-black/5",
        className,
      )}
    >
      <img src={experience.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-88 transition duration-300 group-hover:scale-[1.025]" />
      <span className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/12 to-transparent" />
      <span className="absolute bottom-3 left-3 right-3">
        <span className="block text-base font-semibold leading-tight lg:text-xl">{experience.title}</span>
        <span className="mt-1 block text-xs text-white/72">{experience.time}</span>
      </span>
    </button>
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
    <aside className="fixed inset-x-3 bottom-[calc(5.6rem+env(safe-area-inset-bottom))] z-40 mx-auto max-w-md rounded-xl bg-white p-4 text-black shadow-2xl ring-1 ring-black/10 lg:inset-x-auto lg:right-6 lg:w-96">
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
}: {
  track: (typeof orbitPreviewData.tracks)[number];
  open: boolean;
  playing: boolean;
  progress: number;
  setProgress: (progress: number) => void;
  toggleOpen: () => void;
  togglePlay: () => void;
}) {
  return (
    <div className="z-50 shrink-0 pb-[calc(0.35rem+env(safe-area-inset-bottom))] text-black">
      {open ? (
        <div className="mx-auto max-w-md rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/10 lg:max-w-none lg:rounded-t-xl lg:rounded-b-none">
          <div className="flex items-center gap-3">
            <img src={track.image} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover lg:h-12 lg:w-12" />
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-[0.16em] text-black/42">Now playing</p>
              <h2 className="mt-0.5 truncate text-xl font-semibold lg:text-2xl">{track.title}</h2>
              <p className="truncate text-sm text-black/58">{track.artist}</p>
            </div>
            <button type="button" onClick={togglePlay} aria-label={playing ? "Pause track" : "Play track"} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-black text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30">
              {playing ? <Pause size={17} /> : <Play size={17} />}
            </button>
            <button type="button" onClick={toggleOpen} aria-label="Collapse player" className="grid h-10 w-10 shrink-0 place-items-center rounded-full hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30">
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
            className="orbit-range mt-4 w-full"
          />
        </div>
      ) : (
        <div className="mx-auto flex h-[76px] w-full max-w-md items-center gap-2 rounded-full bg-white/96 px-3 shadow-sm ring-1 ring-black/10 backdrop-blur lg:h-11 lg:max-w-none lg:rounded-t-xl lg:rounded-b-none lg:px-3">
          <button type="button" onClick={toggleOpen} className="flex min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30" aria-label="Expand player">
            <img src={track.image} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover lg:h-8 lg:w-8" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{track.title}</span>
              <span className="block truncate text-xs text-black/52">{track.artist}</span>
            </span>
          </button>
          <button type="button" onClick={togglePlay} aria-label={playing ? "Pause track" : "Play track"} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-black text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 lg:h-8 lg:w-8">
            {playing ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <button type="button" onClick={toggleOpen} aria-label="Expand player" className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30">
            <ChevronDown size={16} className="rotate-180" />
          </button>
        </div>
      )}
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
