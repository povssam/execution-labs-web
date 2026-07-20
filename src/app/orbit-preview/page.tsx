import type { Metadata } from "next";
import { OrbitSpatialPreview } from "@/components/work/OrbitSpatialPreview";

export const metadata: Metadata = {
  title: "Orbit Spatial UI Preview | Execution Labs",
  description: "Preview-only Orbit product UI with Discover, Feed, radial Hub, Experiences, and persistent playback.",
};

export default function OrbitPreviewPage() {
  return <OrbitSpatialPreview />;
}
