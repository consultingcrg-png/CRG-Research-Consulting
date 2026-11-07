import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, Globe2, Users } from "lucide-react";
import { ServiceDetail, type ServiceDetailConfig } from "@/components/site/ServiceDetail";

const TITLE =
  "International Development, Monitoring & Stakeholder Solutions | CRG Research & Consulting";
const DESCRIPTION =
  "CRG designs development programmes, builds monitoring, evaluation and learning systems, conducts social-impact studies and facilitates inclusive stakeholder dialogue.";

export const Route = createFileRoute(
  "/services/international-development-monitoring-stakeholder-solutions",
)({
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
  title: "International Development, Monitoring & Stakeholder Solutions",
  intro:
    "Programmes that work, measured by what matters, delivered with the people they affect. We support governments and international organisations from design through evaluation.",
  overviewKicker: "THE CHALLENGE",
  overviewHeading: "Development results depend on design, evidence and trust",
  overview: [
    "Development programmes operate in complex settings where competing priorities, limited data and multiple stakeholders can dilute impact. Good design and honest measurement are what keep a programme on course.",
    "We combine technical expertise in programme design, monitoring and evaluation with a commitment to inclusive stakeholder engagement. The result is evidence that donors trust, communities recognise and implementers can use.",
  ],
  highlights: [
    { icon: Globe2, label: "Programme design" },
    { icon: ClipboardList, label: "Evidence-based MEL" },
    { icon: Users, label: "Inclusive dialogue" },
  ],
  deliverables: [
    "Theories of change and results frameworks",
    "MEL frameworks, indicators and dashboards",
    "Baseline, midline and endline evaluations",
    "Social-impact and gender assessments",
    "Stakeholder engagement and consultation reports",
    "Partnership and grassroots strategies",
  ],
  capabilities: [
    {
      icon: Globe2,
      title: "Programme Design",
      text: "Interventions built on clear logic and local realities.",
      points: [
        "Theory of change and results-framework development.",
        "Programme design, appraisal and feasibility review.",
        "Donor alignment and funding-case development.",
      ],
    },
    {
      icon: ClipboardList,
      title: "Monitoring, Evaluation & Learning",
      text: "Evidence that improves delivery as it happens.",
      points: [
        "MEL frameworks, indicators and data systems.",
        "Independent evaluations and impact studies.",
        "Learning reviews and adaptive management.",
      ],
    },
    {
      icon: Users,
      title: "Stakeholder Engagement",
      text: "Bringing the right voices into the room.",
      points: [
        "Inclusive dialogue and community consultation.",
        "Social-impact, gender and inclusion assessments.",
        "Grassroots partnerships and local facilitation.",
      ],
    },
  ],
  approach: [
    {
      step: "01",
      title: "Understand",
      text: "We map the context, stakeholders and evidence base before proposing any intervention.",
    },
    {
      step: "02",
      title: "Design",
      text: "We co-create the programme logic, results framework and measurement plan with you.",
    },
    {
      step: "03",
      title: "Deliver & Monitor",
      text: "We support implementation with practical monitoring systems and real-time data.",
    },
    {
      step: "04",
      title: "Evaluate & Learn",
      text: "We evaluate outcomes independently and translate lessons into stronger future programmes.",
    },
  ],
  focusLabel: "WHO WE SUPPORT",
  focusHeading: "Partnerships across the development ecosystem",
  focusText:
    "We work alongside the institutions that fund, deliver and benefit from development programmes.",
  focusItems: [
    "Government ministries & agencies",
    "Bilateral & multilateral donors",
    "International NGOs",
    "Local civil society",
    "Community organisations",
    "Research institutions",
    "Private-sector implementers",
    "Foundations & trusts",
  ],
  ctaHeading: "Design a programme that delivers",
  ctaText:
    "Talk to our development team about programme design, monitoring and evaluation or stakeholder engagement.",
};
