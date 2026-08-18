import styles from "./SystemVisual.module.css";

export type SystemVisualVariant =
  | "ai-agents"
  | "internal-tools"
  | "mvp-software"
  | "product-systems"
  | "motion-design"
  | "automation"
  | "orbit-artist-group"
  | "media-scaling"
  | "soniq"
  | "dividends-total-returns";

type Geometry = {
  paths: string[];
  nodes: Array<[number, number, number, "core" | "quiet" | "accent"]>;
  plates?: Array<[number, number, number, number]>;
  rings?: Array<[number, number, number, number]>;
};

const geometries: Record<SystemVisualVariant, Geometry> = {
  "ai-agents": {
    paths: [
      "M120 240 C300 240 350 450 570 450 C760 450 790 230 1080 230",
      "M120 450 C310 450 370 450 570 450 C770 450 810 450 1080 450",
      "M120 660 C300 660 350 450 570 450 C760 450 790 670 1080 670",
    ],
    nodes: [[120,240,10,"quiet"],[120,450,10,"quiet"],[120,660,10,"quiet"],[570,450,30,"core"],[1080,230,12,"accent"],[1080,450,12,"accent"],[1080,670,12,"quiet"]],
    rings: [[570,450,108,108],[570,450,185,185]],
  },
  "internal-tools": {
    paths: [
      "M180 250 H1020",
      "M180 450 H1020",
      "M180 650 H1020",
      "M340 180 V720",
      "M760 180 V720",
    ],
    nodes: [[180,250,9,"quiet"],[340,250,14,"core"],[760,250,9,"accent"],[1020,250,9,"quiet"],[180,450,9,"quiet"],[340,450,9,"accent"],[760,450,14,"core"],[1020,450,9,"quiet"],[180,650,9,"quiet"],[340,650,9,"quiet"],[760,650,9,"accent"],[1020,650,14,"core"]],
    plates: [[205,295,108,108],[395,495,285,108],[805,295,180,108]],
  },
  "mvp-software": {
    paths: [
      "M125 450 C260 450 280 450 390 450 C520 450 550 450 680 450 C810 450 840 450 1070 450",
      "M270 345 C320 305 350 280 410 250",
      "M735 555 C790 610 840 630 920 650",
    ],
    nodes: [[125,450,10,"quiet"],[390,450,18,"core"],[680,450,18,"core"],[1070,450,18,"accent"],[410,250,9,"quiet"],[920,650,9,"quiet"]],
    plates: [[185,315,160,270],[470,260,160,380],[755,315,160,270]],
  },
  "product-systems": {
    paths: [
      "M150 300 H480 C560 300 550 450 630 450 H1050",
      "M150 600 H480 C560 600 550 450 630 450",
      "M630 180 V720",
    ],
    nodes: [[150,300,10,"quiet"],[150,600,10,"quiet"],[480,300,12,"accent"],[480,600,12,"accent"],[630,450,24,"core"],[820,450,10,"quiet"],[1050,450,14,"accent"]],
    plates: [[210,220,205,160],[210,520,205,160],[730,315,260,270]],
    rings: [[630,450,84,84]],
  },
  "motion-design": {
    paths: [
      "M120 510 C250 210 360 700 500 390 C620 125 735 690 870 365 C950 175 1020 270 1090 225",
      "M120 590 C275 315 365 745 520 490 C665 250 740 735 900 450 C990 290 1040 350 1090 325",
    ],
    nodes: [[120,510,8,"quiet"],[500,390,14,"core"],[870,365,14,"accent"],[1090,225,9,"quiet"],[120,590,8,"quiet"],[520,490,9,"quiet"],[900,450,9,"accent"]],
    plates: [[230,205,230,390],[480,255,230,390],[730,305,230,390]],
  },
  automation: {
    paths: [
      "M110 240 C250 240 220 430 370 430 C520 430 500 620 650 620 C810 620 780 350 930 350 C1030 350 1040 230 1090 230",
      "M650 620 C760 620 800 720 930 720",
    ],
    nodes: [[110,240,12,"quiet"],[370,430,16,"core"],[650,620,16,"core"],[930,350,16,"accent"],[1090,230,12,"accent"],[930,720,12,"quiet"]],
    rings: [[370,430,62,62],[650,620,62,62],[930,350,62,62]],
  },
  "orbit-artist-group": {
    paths: [
      "M125 220 H1075",
      "M125 340 H1075",
      "M125 460 H1075",
      "M125 580 H1075",
      "M125 700 H1075",
      "M700 150 V750",
    ],
    nodes: [[180,220,14,"quiet"],[405,220,9,"accent"],[700,220,12,"core"],[915,220,9,"quiet"],[250,340,14,"quiet"],[555,340,9,"accent"],[700,340,12,"core"],[980,340,9,"quiet"],[150,460,14,"quiet"],[480,460,9,"quiet"],[700,460,12,"core"],[860,460,9,"accent"],[315,580,14,"quiet"],[610,580,9,"accent"],[700,580,12,"core"],[1030,580,9,"quiet"],[210,700,14,"quiet"],[520,700,9,"quiet"],[700,700,12,"core"],[940,700,9,"accent"]],
    plates: [[760,175,245,95],[760,415,180,95],[760,655,265,95]],
  },
  "media-scaling": {
    paths: [
      "M100 230 C260 230 320 330 505 400 C690 470 760 450 1090 450",
      "M100 360 C285 360 325 410 505 440 C690 470 760 450 1090 335",
      "M100 500 C285 500 340 470 505 460 C690 450 760 450 1090 565",
      "M100 635 C270 635 320 550 505 490 C680 430 760 450 1090 680",
    ],
    nodes: [[100,230,9,"quiet"],[100,360,9,"quiet"],[100,500,9,"quiet"],[100,635,9,"quiet"],[505,400,10,"accent"],[505,440,10,"quiet"],[505,460,10,"core"],[505,490,10,"quiet"],[760,450,26,"core"],[1090,335,12,"accent"],[1090,450,12,"accent"],[1090,565,12,"quiet"],[1090,680,12,"quiet"]],
    rings: [[760,450,96,96],[760,450,165,165]],
  },
  soniq: {
    paths: [
      "M90 450 C125 450 135 330 170 330 C205 330 215 570 250 570 C285 570 295 235 330 235 C365 235 375 650 410 650 C445 650 455 300 490 300 C525 300 535 540 570 540 C605 540 615 370 650 370 C685 370 695 500 730 500 C765 500 775 290 810 290 C845 290 855 600 890 600 C925 600 935 385 970 385 C1005 385 1015 450 1110 450",
    ],
    nodes: [[90,450,9,"quiet"],[330,235,9,"accent"],[570,540,9,"quiet"],[730,500,9,"core"],[970,385,9,"accent"],[1110,450,14,"core"]],
    rings: [[600,450,118,118],[600,450,228,228],[600,450,338,338]],
  },
  "dividends-total-returns": {
    paths: [
      "M100 680 C230 665 270 620 390 595 C510 570 530 505 650 490 C770 475 800 380 920 350 C1010 325 1050 230 1100 170",
      "M100 720 C245 710 280 680 405 665 C530 650 565 595 690 575 C820 555 870 485 980 460 C1045 445 1080 410 1100 390",
    ],
    nodes: [[100,680,9,"quiet"],[390,595,9,"quiet"],[650,490,12,"core"],[920,350,10,"accent"],[1100,170,14,"accent"],[100,720,9,"quiet"],[405,665,9,"quiet"],[690,575,9,"quiet"],[980,460,10,"accent"],[1100,390,12,"core"]],
    rings: [[650,490,72,72],[650,490,135,135]],
  },
};

export function SystemVisual({
  variant,
  label,
  className = "",
}: {
  variant: SystemVisualVariant;
  label: string;
  className?: string;
}) {
  const geometry = geometries[variant];

  return (
    <div
      className={`${styles.frame} ${className}`}
      data-system-visual
      data-variant={variant}
      role="img"
      aria-label={label}
    >
      <div className={styles.ambient} aria-hidden />
      <svg className={styles.svg} viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {geometry.plates?.map(([x, y, width, height], index) => (
          <rect
            key={`plate-${x}-${y}`}
            x={x}
            y={y}
            width={width}
            height={height}
            rx="18"
            className={styles.plate}
            style={{ "--visual-index": index } as React.CSSProperties}
          />
        ))}
        {geometry.rings?.map(([cx, cy, rx, ry], index) => (
          <ellipse
            key={`ring-${cx}-${cy}-${rx}`}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            className={styles.ring}
            style={{ "--visual-index": index } as React.CSSProperties}
          />
        ))}
        {geometry.paths.map((path, index) => (
          <path
            key={path}
            d={path}
            pathLength="1"
            className={styles.path}
            style={{ "--visual-index": index } as React.CSSProperties}
          />
        ))}
        {geometry.nodes.map(([cx, cy, radius, kind], index) => (
          <g key={`node-${cx}-${cy}`} className={styles.node} style={{ "--visual-index": index } as React.CSSProperties}>
            {kind !== "quiet" && <circle cx={cx} cy={cy} r={radius * 2.6} className={styles.nodeHalo} />}
            <circle cx={cx} cy={cy} r={radius} className={styles[kind]} />
          </g>
        ))}
      </svg>
    </div>
  );
}
