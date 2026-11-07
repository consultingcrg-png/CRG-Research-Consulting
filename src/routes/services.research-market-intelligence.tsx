import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Database, Globe2, LineChart, Search, Target } from "lucide-react";
import { ServiceDetail, type ServiceDetailConfig } from "@/components/site/ServiceDetail";

const TITLE = "Research, Market Intelligence & Data Analytics | CRG Research & Consulting";
const DESCRIPTION =
  "CRG delivers applied research, market intelligence, forecasting, econometric modelling and data analytics for governments, investors and development partners across Africa.";

export const Route = createFileRoute("/services/research-market-intelligence")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: () => <ServiceDetail config={CONFIG} />,
});

const CONFIG: ServiceDetailConfig = {
  title: "Research, Market Intelligence & Data Analytics",
  intro:
    "Evidence you can act on. We help governments, investors and development partners understand markets, quantify opportunity and make confident decisions grounded in rigorous data.",
  overviewKicker: "THE CHALLENGE",
  overviewHeading: "Decisions are only as strong as the evidence behind them",
  overview: [
    "Markets across Africa are moving quickly — regulation shifts, new competitors emerge, and investment cases that looked certain a year ago now need a second look. Our research and analytics practice exists to close the gap between data and decisions.",
    "We combine primary fieldwork with secondary data, economic modelling and market intelligence to produce evidence that withstands scrutiny from boards, regulators and financiers. Whether you are entering a new market, designing a programme or testing an investment thesis, we build the analytical foundation you need.",
  ],
  highlights: [
    { icon: Globe2, label: "Pan-African reach" },
    { icon: BarChart3, label: "Quantified insight" },
    { icon: Target, label: "Decision-focused" },
  ],
  deliverables: [
    "Market and sector assessment reports",
    "Feasibility and investment cases",
    "Forecasts, scenarios and price outlooks",
    "Survey datasets and methodology notes",
    "Impact evaluation and baseline studies",
    "Interactive dashboards and data tools",
  ],
  capabilities: [
    {
      icon: Search,
      title: "Applied & Market Research",
      text: "Structured inquiry designed around the decision you need to make.",
      points: [
        "Research design, sampling and instrument development for household, firm and stakeholder studies.",
        "Sector and market studies that map demand, competition, pricing and growth pathways.",
        "Feasibility studies, baseline assessments and needs analyses for new programmes and investments.",
      ],
    },
    {
      icon: LineChart,
      title: "Market Intelligence & Forecasting",
      text: "Forward-looking insight that helps you anticipate rather than react.",
      points: [
        "Continuous market monitoring and competitor intelligence for strategic planning.",
        "Demand, revenue and scenario forecasting using econometric and time-series models.",
        "Trade, investment and regulatory intelligence across African and international markets.",
      ],
    },
    {
      icon: Database,
      title: "Data Analytics & Modelling",
      text: "Rigorous analysis that turns raw data into defensible evidence.",
      points: [
        "Data collection systems, cleaning, validation and management for reliable datasets.",
        "Statistical analysis, econometric modelling and impact evaluation.",
        "Dashboards, visualisation and decision-support tools that put insight in your hands.",
      ],
    },
  ],
  approach: [
    {
      step: "01",
      title: "Scope & Frame",
      text: "We define the decision problem, map stakeholders and agree on the questions the evidence must answer.",
    },
    {
      step: "02",
      title: "Collect & Verify",
      text: "We combine desk research, field data and proprietary sources, then validate every dataset for quality and bias.",
    },
    {
      step: "03",
      title: "Analyse & Model",
      text: "We apply econometric, statistical and scenario modelling to test hypotheses and quantify uncertainty.",
    },
    {
      step: "04",
      title: "Advise & Embed",
      text: "We translate findings into clear, actionable recommendations and support implementation alongside your team.",
    },
  ],
  focusLabel: "WHERE WE WORK",
  focusHeading: "Cross-sector experience, sector-specific depth",
  focusText:
    "Our analysts move across industries without losing rigour. That cross-sector view is often what reveals the opportunity a single-industry study would miss.",
  focusItems: [
    "Agriculture & agribusiness",
    "Energy & extractives",
    "Finance & investment",
    "Health & social protection",
    "Technology & digital economy",
    "Land, water & natural resources",
    "Trade & regional integration",
    "Public policy & governance",
  ],
  ctaHeading: "Have a research question you need answered?",
  ctaText:
    "Tell us about your market, programme or investment and we will outline how our research and analytics team can help.",
};
