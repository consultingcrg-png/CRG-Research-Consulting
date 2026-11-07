import { createFileRoute } from "@tanstack/react-router";
import { Building2, Cpu, GraduationCap } from "lucide-react";
import { ServiceDetail, type ServiceDetailConfig } from "@/components/site/ServiceDetail";

const TITLE = "Training, Capacity Building & Innovation Advisory | CRG Research & Consulting";
const DESCRIPTION =
  "CRG builds institutional and professional capacity through tailored training, technical assistance, knowledge transfer, digital transformation, emerging technology and R&D support.";

export const Route = createFileRoute("/services/training-capacity-building-innovation-advisory")({
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
  title: "Training, Capacity Building & Innovation Advisory",
  intro:
    "We build the skills, systems and confidence that let people and organisations grow — combining practical training with digital and innovation advisory.",
  overviewKicker: "THE CHALLENGE",
  overviewHeading: "Capacity is the difference between a plan and a result",
  overview: [
    "Strategies and programmes only succeed when the people and institutions behind them have the skills, systems and support to deliver. Too often, capacity is assumed rather than built.",
    "We work alongside your teams to strengthen capability where it matters — through tailored training, technical assistance and knowledge transfer. We also help organisations adopt digital tools and new technologies responsibly, so innovation strengthens rather than disrupts delivery.",
  ],
  highlights: [
    { icon: GraduationCap, label: "Skills that last" },
    { icon: Building2, label: "Institutions strengthened" },
    { icon: Cpu, label: "Innovation enabled" },
  ],
  deliverables: [
    "Tailored training programmes and curricula",
    "Technical assistance and coaching",
    "Capacity assessments and development plans",
    "Knowledge-transfer and learning systems",
    "Digital transformation roadmaps",
    "Innovation and R&D support",
  ],
  capabilities: [
    {
      icon: GraduationCap,
      title: "Training & Technical Assistance",
      text: "Practical learning built around your work.",
      points: [
        "Tailored training design and delivery.",
        "Certification, coaching and mentoring.",
        "Training-of-trainers and peer learning.",
      ],
    },
    {
      icon: Building2,
      title: "Institutional Capacity Building",
      text: "Systems and processes that outlast the project.",
      points: [
        "Capacity assessments and development plans.",
        "Systems, processes and knowledge transfer.",
        "Organisational learning and performance.",
      ],
    },
    {
      icon: Cpu,
      title: "Innovation & Digital Transformation",
      text: "Adopting technology with purpose and care.",
      points: [
        "Digital transformation and emerging technologies.",
        "AI, fintech and data-tool advisory.",
        "R&D and innovation-programme support.",
      ],
    },
  ],
  approach: [
    {
      step: "01",
      title: "Assess Needs",
      text: "We identify the capability gaps that actually matter to your objectives.",
    },
    {
      step: "02",
      title: "Co-design",
      text: "We build the training and support plan with your team, not for it.",
    },
    {
      step: "03",
      title: "Build & Coach",
      text: "We deliver practical training and hands-on technical assistance.",
    },
    {
      step: "04",
      title: "Sustain & Scale",
      text: "We embed knowledge and systems your organisation can keep using.",
    },
  ],
  focusLabel: "WHERE WE BUILD CAPACITY",
  focusHeading: "Capability that strengthens institutions",
  focusText:
    "From individual skills to organisational systems, we tailor support to the level where change is needed.",
  focusItems: [
    "Public institutions & agencies",
    "Private-sector teams",
    "NGOs & civil society",
    "Universities & research bodies",
    "Professional associations",
    "SMEs & entrepreneurs",
    "Development programmes",
    "Digital & innovation teams",
  ],
  ctaHeading: "Build capability that lasts",
  ctaText:
    "Speak with our training and innovation team about designing a capacity-building programme for your organisation.",
};
