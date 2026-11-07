import { createFileRoute } from "@tanstack/react-router";
import { Network, Scale, Target, TrendingUp, Users } from "lucide-react";
import { ServiceDetail, type ServiceDetailConfig } from "@/components/site/ServiceDetail";

const TITLE = "Strategy, Policy & Business Transformation | CRG Research & Consulting";
const DESCRIPTION =
  "CRG advises governments, NGOs and businesses on policy, regulation, trade, compliance, organisational design, growth and transformation.";

export const Route = createFileRoute("/services/strategy-policy-business-transformation")({
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
  title: "Strategy, Policy & Business Transformation",
  intro:
    "Clear strategy, sound policy and the operating model to deliver it. We help governments, NGOs and businesses navigate regulation, trade and organisational change with confidence.",
  overviewKicker: "THE CHALLENGE",
  overviewHeading: "Strategy fails when policy, markets and organisational reality are considered separately",
  overview: [
    "Whether you are a ministry drafting regulation, an NGO designing a programme, or a business entering a new market, success depends on aligning policy intent, commercial reality and organisational capability. We help clients see those connections early and act on them.",
    "Our advisors combine economic analysis, regulatory expertise and hands-on transformation experience. We move from diagnosis to design to implementation — staying with you through the change, not just advising from the sidelines.",
  ],
  highlights: [
    { icon: Scale, label: "Policy clarity" },
    { icon: TrendingUp, label: "Growth ready" },
    { icon: Network, label: "Change that sticks" },
  ],
  deliverables: [
    "Policy analysis and regulatory impact assessments",
    "Corporate and market-entry strategies",
    "Trade, regulatory and compliance guidance",
    "Organisational design and operating models",
    "Efficiency and performance reviews",
    "Transformation roadmaps and change plans",
  ],
  capabilities: [
    {
      icon: Scale,
      title: "Policy & Regulatory Advisory",
      text: "Evidence-based policy that works in practice.",
      points: [
        "Policy analysis, drafting support and regulatory impact assessment.",
        "Trade policy, market access and compliance frameworks.",
        "Stakeholder consultation and regulatory alignment.",
      ],
    },
    {
      icon: TrendingUp,
      title: "Strategy & Growth",
      text: "Clear choices about where to play and how to win.",
      points: [
        "Corporate, portfolio and market-entry strategy.",
        "Growth diagnostics and competitive positioning.",
        "Investment appraisal and business case development.",
      ],
    },
    {
      icon: Network,
      title: "Organisational Transformation",
      text: "Structure, systems and people aligned behind the strategy.",
      points: [
        "Organisational design and operating-model reviews.",
        "Process efficiency, governance and performance systems.",
        "Change management and implementation support.",
      ],
    },
  ],
  approach: [
    {
      step: "01",
      title: "Diagnose",
      text: "We assess the policy, market and organisational context to identify the real constraints on performance.",
    },
    {
      step: "02",
      title: "Design",
      text: "We develop options, test them against evidence and agree the strategic direction with your leadership.",
    },
    {
      step: "03",
      title: "Align",
      text: "We align structures, processes, incentives and stakeholders so the strategy can actually be delivered.",
    },
    {
      step: "04",
      title: "Implement",
      text: "We support roll-out, monitor progress and adjust as conditions change.",
    },
  ],
  focusLabel: "WHO WE WORK WITH",
  focusHeading: "Advice built around your mandate",
  focusText:
    "We adapt the same rigorous approach to public, private and non-profit clients — always anchored in your objectives and constraints.",
  focusItems: [
    "Government ministries & agencies",
    "Regulators & public institutions",
    "Private companies & investors",
    "NGOs & civil society",
    "Trade associations",
    "Development partners",
    "State-owned enterprises",
    "SMEs & entrepreneurs",
  ],
  ctaHeading: "Ready to turn strategy into delivery?",
  ctaText:
    "Talk to our advisory team about your policy, strategy or transformation challenge and we will outline a practical path forward.",
};
