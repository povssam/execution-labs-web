export type OrbitMediaKind = "music" | "reel" | "artist" | "product" | "experience";

export type OrbitMediaItem = {
  id: string;
  kind: OrbitMediaKind;
  title: string;
  artist: string;
  detail: string;
  image: string;
  accent: string;
  duration: string;
  layout: "hero" | "wide" | "tall" | "compact";
};

export type OrbitFeedMode = "Reels" | "Drops" | "Notes";

export type OrbitFeedItem = {
  id: string;
  mode: OrbitFeedMode;
  title: string;
  artist: string;
  caption: string;
  image: string;
  metric: string;
  context: string;
};

export type OrbitExperienceKind = "Shows" | "Connect" | "Live Stream";

export type OrbitExperience = {
  id: string;
  kind: OrbitExperienceKind;
  title: string;
  artist: string;
  time: string;
  location: string;
  description: string;
  image: string;
  cta: string;
  scale: "wide" | "tall" | "compact";
};

export type OrbitTrack = {
  id: string;
  title: string;
  artist: string;
  image: string;
  length: string;
};

export type OrbitPreviewData = {
  media: OrbitMediaItem[];
  feed: OrbitFeedItem[];
  experiences: OrbitExperience[];
  tracks: OrbitTrack[];
};

const portraitOne =
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=82";
const concertOne =
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=82";
const studioOne =
  "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?auto=format&fit=crop&w=1200&q=82";
const vinylOne =
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=82";
const crowdOne =
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=82";

export const orbitPreviewData: OrbitPreviewData = {
  media: [
    {
      id: "mirror-season",
      kind: "music",
      title: "Mirror Season",
      artist: "Nia Vale",
      detail: "Lead single from the after-hours EP, moving between clean vocal hooks and a close bass line.",
      image: portraitOne,
      accent: "#d8d2c4",
      duration: "3:42",
      layout: "hero",
    },
    {
      id: "late-room",
      kind: "reel",
      title: "Late Room Reel",
      artist: "Saint Vale",
      detail: "A short rehearsal reel cut from the last London run.",
      image: concertOne,
      accent: "#d7c5a4",
      duration: "0:24",
      layout: "tall",
    },
    {
      id: "backstage-pass",
      kind: "experience",
      title: "Backstage Pass",
      artist: "Orbit Presents",
      detail: "Members-only studio walk-through before the live stream.",
      image: studioOne,
      accent: "#bfcbd1",
      duration: "Tonight",
      layout: "wide",
    },
    {
      id: "vinyl-drop",
      kind: "product",
      title: "Smoke Vinyl",
      artist: "Nia Vale",
      detail: "Limited 12-inch pressing with alternate cover notes.",
      image: vinylOne,
      accent: "#c9c0b6",
      duration: "$42",
      layout: "compact",
    },
    {
      id: "new-faces",
      kind: "artist",
      title: "New Faces",
      artist: "Mika North",
      detail: "Rising artist orbit with two unreleased demos.",
      image: crowdOne,
      accent: "#cfd4c5",
      duration: "Follow",
      layout: "compact",
    },
  ],
  feed: [
    {
      id: "feed-1",
      mode: "Reels",
      title: "Soundcheck at Koko",
      artist: "Nia Vale",
      caption: "The hook landed differently when the room was empty.",
      image: concertOne,
      metric: "42k loops",
      context: "Friends saved this before the set list dropped.",
    },
    {
      id: "feed-2",
      mode: "Drops",
      title: "Mirror Season",
      artist: "Nia Vale",
      caption: "First listen is open to orbit members for the next 12 hours.",
      image: portraitOne,
      metric: "3:42",
      context: "Your orbit gets the alternate mix after the main track.",
    },
    {
      id: "feed-3",
      mode: "Notes",
      title: "Tour Note 04",
      artist: "Saint Vale",
      caption: "New cities are being added around smaller rooms and longer nights.",
      image: studioOne,
      metric: "8 replies",
      context: "Managers are collecting city requests from the fan orbit.",
    },
  ],
  experiences: [
    {
      id: "show-london",
      kind: "Shows",
      title: "London Warm Room",
      artist: "Nia Vale",
      time: "Aug 14, 9:00 PM",
      location: "Koko, London",
      description: "A stripped set with the new EP played front to back.",
      image: concertOne,
      cta: "Hold ticket",
      scale: "wide",
    },
    {
      id: "connect-vocal",
      kind: "Connect",
      title: "Two-Minute Voice Note",
      artist: "Mika North",
      time: "Today",
      location: "Direct artist reply",
      description: "Send one question and receive a short voice response inside Orbit.",
      image: portraitOne,
      cta: "Start connect",
      scale: "compact",
    },
    {
      id: "live-studio",
      kind: "Live Stream",
      title: "Studio Window",
      artist: "Saint Vale",
      time: "Fri, 8:30 PM",
      location: "Live from Room B",
      description: "Watch the last vocal takes and vote on the closing mix.",
      image: studioOne,
      cta: "Set reminder",
      scale: "tall",
    },
    {
      id: "show-nyc",
      kind: "Shows",
      title: "Basement 200",
      artist: "Orbit Presents",
      time: "Sep 03, 10:00 PM",
      location: "New York",
      description: "Small-capacity room with rotating guests from the roster.",
      image: crowdOne,
      cta: "Join list",
      scale: "compact",
    },
  ],
  tracks: [
    {
      id: "track-mirror-season",
      title: "Mirror Season",
      artist: "Nia Vale",
      image: portraitOne,
      length: "3:42",
    },
    {
      id: "track-afterimage",
      title: "Afterimage",
      artist: "Saint Vale",
      image: vinylOne,
      length: "2:58",
    },
    {
      id: "track-room-b",
      title: "Room B",
      artist: "Mika North",
      image: studioOne,
      length: "4:06",
    },
  ],
};
