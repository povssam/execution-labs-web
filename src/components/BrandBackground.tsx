// Fixed, slowly drifting prismatic background pulled from the brand banner.
// Pure CSS, ambient, sits behind all content. No JS, no gating.
export function BrandBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="brand-blob blob-a"
        style={{ top: "-12rem", left: "-10rem", background: "radial-gradient(circle, #e83ede, transparent 60%)" }}
      />
      <div
        className="brand-blob blob-b"
        style={{ top: "-14rem", right: "-12rem", background: "radial-gradient(circle, #9333ea, transparent 60%)" }}
      />
      <div
        className="brand-blob blob-c"
        style={{ bottom: "-14rem", left: "-8rem", background: "radial-gradient(circle, #14c8aa, transparent 60%)" }}
      />
      <div
        className="brand-blob blob-d"
        style={{ top: "28%", right: "-14rem", background: "radial-gradient(circle, #fb8c28, transparent 62%)" }}
      />
    </div>
  );
}
