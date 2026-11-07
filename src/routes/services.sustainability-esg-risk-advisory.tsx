import { createFileRoute } from "@tanstack/react-router";
import { CloudSun, Leaf, ShieldCheck } from "lucide-react";
import { ServiceDetail, type ServiceDetailConfig } from "@/components/site/ServiceDetail";

const TITLE = "Sustainability, ESG & Risk Advisory | CRG Research & Consulting";
const DESCRIPTION =
  "CRG delivers environmental and social impact assessments, ESG frameworks, climate-risk analysis, resilience planning and governance for geopolitical, financial and operational risk.";

export const Route = createFileRoute("/services/sustainability-esg-risk-advisory")({
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
  title: "Sustainability, ESG & Risk Advisory",
  intro:
    "Sustainable growth depends on understanding impact, climate exposure and risk. We help clients measure, manage and communicate these responsibly.",
  overviewKicker: "THE CHALLENGE",
  overviewHeading: "Sustainability and risk are now core to strategy — not a compliance afterthought",
  overview: [
    "Investors, regulators and communities expect organisations to demonstrate real environmental and social performance. At the same time, climate change, geopolitical shifts and financial volatility are reshaping the risk landscape.",
    "We help clients turn these pressures into advantage: credible impact assessments, practical ESG frameworks, climate-resilient plans and risk systems that protect value while enabling growth.",
  ],
  highlights: [
    { icon: Leaf, label: "Impact measured" },
    { icon: CloudSun, label: "Climate ready" },
    { icon: ShieldCheck, label: "Risk managed" },
  ],
  deliverables: [
    "Environmental and social impact assessments",
    "ESG strategy, policy and reporting frameworks",
    "Climate-risk and vulnerability analyses",
    "Resilience and adaptation plans",
    "Governance and compliance frameworks",
    "Geopolitical, financial and operational risk assessments",
  ],
  capabilities: [
    {
      icon: Leaf,
      title: "ESG & Impact Assessment",
      text: "Credible evidence of environmental and social performance.",
      points: [
        "Environmental and social impact assessment.",
        "ESG strategy, materiality and disclosure frameworks.",
        "Stakeholder and community impact studies.",
      ],
    },
    {
      icon: CloudSun,
      title: "Climate & Resilience",
      text: "Understanding exposure today to prepare for tomorrow.",
      points: [
        "Climate-risk and vulnerability analysis.",
        "Adaptation and resilience planning.",
        "Carbon and natural-resource assessments.",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Risk & Governance",
      text: "Systems that protect value and build trust.",
      points: [
        "Governance, compliance and safeguards frameworks.",
        "Geopolitical, financial and operational risk assessment.",
        "Due diligence and risk-management systems.",
      ],
    },
  ],
  approach: [
    {
      step: "01",
      title: "Assess",
      text: "We establish a baseline, identify material issues and map the stakeholders who matter.",
    },
    {
      step: "02",
      title: "Quantify",
      text: "We model impact, climate exposure and risk so priorities are grounded in evidence.",
    },
    {
      step: "03",
      title: "Integrate",
      text: "We embed sustainability and risk into strategy, operations and decision-making.",
    },
    {
      step: "04",
      title: "Report & Improve",
      text: "We help you report transparently, track performance and improve over time.",
    },
  ],
  focusLabel: "WHERE WE ADD VALUE",
  focusHeading: "From measurement to meaningful action",
  focusText:
    "We work across sectors and along the value chain — from board-level strategy to on-the-ground safeguards.",
  focusItems: [
    "Environmental & social impact",
    "Climate-risk & adaptation",
    "ESG strategy & reporting",
    "Governance frameworks",
    "Supply-chain & due diligence",
    "Community & stakeholder risk",
    "Investment risk & safeguards",
    "Sustainability performance",
  ],
  ctaHeading: "Make sustainability measurable and credible",
  ctaText:
    "Speak with our ESG and risk team about assessing impact, strengthening governance or building climate resilience.",
};
