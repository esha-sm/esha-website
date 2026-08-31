type PlayProject = {
  slug: string;
  title?: string;
  companyLabel?: string;
  logo?: string;
  yc?: string;
  type?: string;
  summary: string;
  description: string;
  tags: string[];
  timeline: string;
  role: string;
  url: string;
  detailSections?: { heading: string; body: string[] }[];
  detailCard?: {
    logo?: string;
    files?: string[];
    labeledFiles?: string[];
    meta?: {
      type: string;
      domain: string;
      task: string;
      date: string;
      tools: string;
    };
  };
};

export const playProjects: PlayProject[] = [
  {
    slug: "reddit-insights-engine",
    title: "Reddit Insights Engine",
    summary:
      "Scalable pipeline processing 4.5M+ Reddit comments to extract sentiment and topics.",
    description:
      "Built an end-to-end data workflow using Python, Pandas, Polars, DuckDB, and Parquet to process large-scale Reddit comment data, run sentiment analysis with VADER, and query trends from a star-schema warehouse.",
    tags: ["Python", "SQL", "DuckDB", "Parquet", "VADER"],
    timeline: "Mar 2025 – Apr 2025",
    role: "Data pipeline + analysis",
    url: "https://github.com/esha-sm/reddit-sentiment-analysis-pipeline",
  },
  {
    slug: "edge-case-detection",
    title: "Edge Case Detection",
    summary:
      "Model-evaluation experiments focused on finding and handling failure cases.",
    description:
      "Explored edge cases in model evaluation, built tooling to detect distributional shifts and failure modes, and added clearer debugging workflows for safer deployments.",
    tags: ["Python", "Computer Vision", "ML"],
    timeline: "Jan 2025 – Feb 2025",
    role: "Model design",
    url: "https://github.com/esha-sm/edge_case_detection",
  },
  {
    slug: "warmly",
    title: "Warmly",
    summary:
      "AI-powered cold outreach tool that writes and sends hyper-personalized emails from enriched lead data.",
    description:
      "Built a concept for an AI-powered outbound product that ingests enriched lead context, generates highly tailored outreach emails, and helps teams send more relevant follow-ups with less manual lift. The product idea centered on using signal-rich data to make cold emails feel specific, timely, and genuinely useful instead of mass-produced.",
    tags: ["AI", "Product", "Outbound", "Next.js", "Tailwind"],
    timeline: "Sep 2024 – Oct 2024",
    role: "Product + prototype",
    url: "https://github.com/esha-sm/Warmly",
  },
  {
    slug: "dyneti-take-home",
    logo: "https://www.google.com/s2/favicons?domain=dyneti.com&sz=128",
    companyLabel: "Dyneti",
    yc: "W19",
    type: "Product",
    summary:
      "AI card scanning for checkout and fraud prevention.",
    description:
      "Dyneti is an AI card scanning company for checkout and fraud prevention.",
    tags: ["Product", "Go-to-Market", "Research", "Strategy"],
    timeline: "2024",
    role: "Product thinking",
    url: "#",
    detailSections: [
      {
        heading: "Context",
        body: [
          "Dyneti wanted to improve how teams prioritized accounts and acted on outbound interest. The problem was not a lack of signals, but a mismatch between signal quality and team attention.",
          "The goal was to turn noisy intent into a clearer operating system for sales and GTM decisions."
        ]
      },
      {
        heading: "Approach",
        body: [
          "I framed the problem around account fit, intent quality, and conversion momentum. The product idea centered on surfacing the highest-probability accounts and pairing those with the right outreach motion.",
          "I also looked at how reps should prioritize follow-up plays so attention goes to the opportunities most likely to convert."
        ]
      },
      {
        heading: "Outcome",
        body: [
          "The end result was a clearer narrative: fewer low-fit accounts, better signal triage, and a more intentional outbound flow tied to account readiness instead of volume."
        ]
      }
    ]
    ,
    detailCard: {
      logo: "https://raw.githubusercontent.com/esha-sm/edge_case_detection/main/logo.png",
      files: [
        "good_original.txt",
        "bad_paper.txt",
        "bad_other.txt",
        "bad_paper_handwritten.txt",
        "bad_paper_printed.txt",
        "bad_recaptured.txt",
        "bad_physical.txt",
        "bad_tape.txt",
        "unclear.txt",
        "unclear_recaptured.txt"
      ],
      labeledFiles: [
        "good_original/",
        "bad_paper/",
        "bad_other/",
        "bad_paper_handwritten/",
        "bad_paper_printed/",
        "bad_recaptured/",
        "bad_physical/",
        "bad_tape/",
        "unclear/"
      ],
      meta: {
        type: "Take-home Assignment",
        domain: "Fintech",
        task: "Data Labeling",
        date: "July 2024",
        tools: "File Explorer · Notepad++ · Excel"
      }
    }
  },
  {
    slug: "corgi-take-home",
    logo: "https://www.google.com/s2/favicons?domain=corgi.insure&sz=128",
    companyLabel: "Corgi",
    yc: "S24",
    type: "AI Product",
    summary:
      "AI insurance platform for technology companies.",
    description:
      "Created a take-home that framed customer context, weak signals, and team workflows into a more usable internal product: surfacing what matters, summarizing the account story, and recommending actions that frontline teams can act on quickly.",
    tags: ["AI", "Product", "Workflow", "Customer Insights"],
    timeline: "2024",
    role: "Product + UX",
    url: "#",
    detailSections: [
      {
        heading: "Problem",
        body: [
          "Customer information was spread across notes, meetings, and CRM fields, which made it hard for teams to turn context into decisions.",
          "The real need was not more data — it was a clearer summary of what matters, what changed, and what to do next."
        ]
      },
      {
        heading: "Concept",
        body: [
          "I built a concept for a customer workspace that extracted the pattern from fragmented context and surfaced actionable recommendations for the account owner.",
          "The experience emphasized clarity over breadth: less noise, better next steps, and a more usable view of the account story."
        ]
      },
      {
        heading: "Takeaway",
        body: [
          "This exercise reinforced that strong product thinking often comes from structuring messy context into a crisp workflow rather than adding more features."
        ]
      }
    ]
  },
  {
    slug: "dataoric-take-home",
    logo: "https://www.google.com/s2/favicons?domain=datoric.com&sz=128",
    companyLabel: "Datoric",
    yc: "S26",
    type: "Data Product",
    summary:
      "Built a data-first concept for turning raw account signals into clearer, more strategic next steps.",
    description:
      "Designed a take-home around data synthesis and signal prioritization: combining customer context, engagement behavior, and common patterns into a product experience that helps teams decide what to do next without drowning in data.",
    tags: ["Data", "Product", "Signal Analysis", "Strategy"],
    timeline: "2024",
    role: "Data product thinking",
    url: "/play/dataoric-take-home",
    detailSections: [
      {
        heading: "Opportunity",
        body: [
          "The challenge was to turn a lot of raw account signal into a product story that a team could act on. The friction was not in collecting data, but in translating it into clarity.",
          "I focused on where data mattered most: detecting shifts in buying readiness, identifying patterns across similar accounts, and connecting those signals to action."
        ]
      },
      {
        heading: "Solution",
        body: [
          "I designed a data product concept that summarized signal quality, grouped repeated patterns, and suggested the most likely next move for the account owner.",
          "The goal was to support decision-making without making the interface feel like a dashboard for dashboards."
        ]
      },
      {
        heading: "Reflection",
        body: [
          "The strongest product ideas here were about filtering and framing, not simply showing more metrics. Better clarity often beats more information."
        ]
      }
    ]
  },
  {
    slug: "portfolio-experiments",
    title: "Portfolio Experiments",
    summary:
      "Small browser experiments about motion, layout, and personal storytelling.",
    description:
      "Design-led web experiments exploring interaction and personal expression in small, focused builds.",
    tags: ["React", "UI", "CSS"],
    timeline: "Ongoing",
    role: "Design + code",
    url: "#",
  },
];

export function takeHomeProjects() {
  return playProjects.filter((project) => project.slug.includes("take-home"));
}

export function getPlayProject(slug: string) {
  return playProjects.find((project) => project.slug === slug);
}

export function adjacentTakeHomes(slug: string) {
  const samples = takeHomeProjects();
  const index = samples.findIndex((project) => project.slug === slug);
  return {
    prev: index > 0 ? samples[index - 1] : null,
    next: index >= 0 && index < samples.length - 1 ? samples[index + 1] : null,
  };
}
