import {
  Building2,
  CloudSun,
  Cpu,
  Database,
  Droplets,
  Globe2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Leaf,
  Lightbulb,
  LineChart,
  Pickaxe,
  Scale,
  ShieldCheck,
  Sprout,
  Sun,
  TrendingUp,
  Users,
  Waves,
  Zap,
} from "lucide-react";
import type { SectorDetailConfig } from "@/components/site/SectorDetail";

export const SECTOR_DETAILS: Record<string, SectorDetailConfig> = {
  "land-natural-resources-mining": {
    slug: "land-natural-resources-mining",
    title: "Land, Natural Resources & Mining",
    intro:
      "From mineral wealth to land tenure, we help governments, investors and communities make resource decisions that are economically sound, socially fair and environmentally responsible.",
    overviewKicker: "HOW WE ARE AN EXPERT",
    overviewHeading: "Resource wealth only creates value when decisions are evidence-based",
    overview: [
      "Land and natural resources sit at the centre of some of the most consequential decisions in Africa — how rights are allocated, how benefits are shared, and how extraction affects the communities and ecosystems around it. These decisions are too often made with incomplete evidence.",
      "CRG brings together resource economics, land governance and impact assessment. We help clients understand what a resource is worth, who holds rights to it, what regulation applies, and what it will take to develop it responsibly. That integrated view is what turns a resource endowment into durable, inclusive value.",
    ],
    highlights: [
      { icon: Pickaxe, label: "Resource economics" },
      { icon: Scale, label: "Tenure & regulation" },
      { icon: ShieldCheck, label: "Responsible extraction" },
    ],
    services: [
      "Mineral, land and natural-resource policy analysis",
      "Licensing, tenure and regulatory reviews",
      "Feasibility studies and investment appraisal",
      "Community impact and compensation assessments",
      "Environmental and social safeguards",
      "Resource value-chain and beneficiation analysis",
    ],
    capabilities: [
      {
        icon: Pickaxe,
        title: "Resource Economics & Valuation",
        text: "Understanding what a resource is worth and how value is shared.",
        points: [
          "Commodity market, price and demand analysis.",
          "Fiscal regime, royalty and benefit-sharing reviews.",
          "Project feasibility and investment case development.",
        ],
      },
      {
        icon: Scale,
        title: "Land Tenure & Governance",
        text: "Clarity on rights, regulation and the rules that govern access.",
        points: [
          "Land policy, tenure and administration analysis.",
          "Licensing, permitting and regulatory compliance reviews.",
          "Stakeholder mapping and dispute-sensitive engagement.",
        ],
      },
      {
        icon: ShieldCheck,
        title: "Mining & Community Impact",
        text: "Development that earns and keeps its social licence.",
        points: [
          "Environmental and social impact assessment.",
          "Resettlement, compensation and livelihoods analysis.",
          "Local content, employment and community investment studies.",
        ],
      },
    ],
    whyCrg: [
      {
        step: "01",
        title: "Evidence first",
        text: "We combine field data, market intelligence and legal analysis so resource decisions rest on facts, not assumptions.",
      },
      {
        step: "02",
        title: "Stakeholder grounded",
        text: "We engage communities, regulators and investors early so recommendations are credible to everyone affected.",
      },
      {
        step: "03",
        title: "Commercially realistic",
        text: "We test every option against cost, risk and investability — not just policy ideals.",
      },
      {
        step: "04",
        title: "Implementation focused",
        text: "We stay through design and delivery, supporting permits, agreements and monitoring systems.",
      },
    ],
    clientsLabel: "WHO WE SUPPORT",
    clientsHeading: "Partners across the resource value chain",
    clientsText:
      "We work with the institutions that allocate, regulate, invest in and live with natural-resource development.",
    clients: [
      "Ministries of mines, lands & environment",
      "Mining & exploration companies",
      "Institutional investors & financiers",
      "Regulators & licensing authorities",
      "Affected communities & local government",
      "Development partners",
      "Law firms & transaction advisors",
      "Industry associations",
    ],
    ctaHeading: "Planning a resource project or reviewing land policy?",
    ctaText:
      "Talk to our resource team about valuation, tenure, regulation or community impact and we will outline how we can help.",
  },

  energy: {
    slug: "energy",
    title: "Energy",
    intro:
      "Africa's energy transition is reshaping investment, regulation and access. We help clients navigate that transition with evidence on markets, policy and infrastructure.",
    overviewKicker: "HOW WE ARE AN EXPERT",
    overviewHeading: "The energy transition demands decisions that balance access, affordability and sustainability",
    overview: [
      "Energy systems are being rebuilt at the same time as demand is growing. Governments are reforming tariffs and procurement, investors are reassessing risk, and utilities are balancing universal access with financial sustainability.",
      "CRG helps clients cut through that complexity. We combine market and demand analysis, regulatory expertise and project-level advisory so that policy, investment and infrastructure decisions reinforce one another rather than pulling in different directions.",
    ],
    highlights: [
      { icon: Zap, label: "Energy markets" },
      { icon: Sun, label: "Renewables" },
      { icon: TrendingUp, label: "Investable projects" },
    ],
    services: [
      "Energy market and demand studies",
      "Power-sector policy and regulatory advisory",
      "Renewable feasibility and pipeline analysis",
      "Tariff, cost-of-service and subsidy reviews",
      "Energy access and off-grid assessments",
      "Transition scenarios and investment cases",
    ],
    capabilities: [
      {
        icon: Zap,
        title: "Market & Demand Intelligence",
        text: "A clear view of demand, supply and price dynamics.",
        points: [
          "Electricity demand forecasting and market sizing.",
          "Generation, transmission and fuel-mix analysis.",
          "Regional trade and interconnection intelligence.",
        ],
      },
      {
        icon: Scale,
        title: "Policy & Regulation",
        text: "Rules that attract investment and protect consumers.",
        points: [
          "Power-sector reform and regulatory design.",
          "Tariff, subsidy and cost-of-service analysis.",
          "Procurement, licensing and IPP framework review.",
        ],
      },
      {
        icon: TrendingUp,
        title: "Project & Investment Advisory",
        text: "Bankable projects built on realistic assumptions.",
        points: [
          "Renewable and thermal feasibility studies.",
          "Investment cases and risk assessment.",
          "Energy access and off-grid business models.",
        ],
      },
    ],
    whyCrg: [
      {
        step: "01",
        title: "Sector fluency",
        text: "Our team understands generation, grids, tariffs, procurement and the politics of reform.",
      },
      {
        step: "02",
        title: "Quantitative rigour",
        text: "We model demand, cost and risk so projections hold up to investor and regulator scrutiny.",
      },
      {
        step: "03",
        title: "Investor perspective",
        text: "We assess projects the way financiers do — bankability, risk allocation and returns.",
      },
      {
        step: "04",
        title: "Public interest",
        text: "We keep access, affordability and sustainability in view alongside commercial returns.",
      },
    ],
    clientsLabel: "WHO WE SUPPORT",
    clientsHeading: "Working across the energy value chain",
    clientsText:
      "From policy makers to project developers, we support the institutions shaping Africa's energy future.",
    clients: [
      "Utilities & system operators",
      "Independent power producers",
      "Energy regulators",
      "Ministries of energy & finance",
      "Development finance institutions",
      "Off-grid & clean-energy companies",
      "Industrial energy consumers",
      "Development partners",
    ],
    ctaHeading: "Facing an energy market or investment decision?",
    ctaText:
      "Speak with our energy team about market analysis, regulation, tariffs or project feasibility.",
  },

  "agriculture-agribusiness": {
    slug: "agriculture-agribusiness",
    title: "Agriculture & Agribusiness",
    intro:
      "Agriculture is central to growth, jobs and food security across Africa. We help clients build agri-food systems that are productive, inclusive and investable.",
    overviewKicker: "HOW WE ARE AN EXPERT",
    overviewHeading: "Strong agri-food systems are built on market evidence and inclusive models",
    overview: [
      "Agriculture employs a large share of Africa's workforce yet remains under-capitalised and exposed to climate, price and trade shocks. Closing that gap requires more than production support — it requires functioning value chains, finance and market access.",
      "CRG works across the agri-food system: analysing value chains, testing investment cases, evaluating policy and designing inclusive business models. We combine field-level understanding with commercial analysis so that interventions are both impactful and sustainable.",
    ],
    highlights: [
      { icon: Sprout, label: "Value chains" },
      { icon: TrendingUp, label: "Agri-finance" },
      { icon: Users, label: "Inclusive growth" },
    ],
    services: [
      "Value-chain and market analysis",
      "Agribusiness feasibility and investment cases",
      "Food security and resilience studies",
      "Farmer and stakeholder surveys",
      "Agricultural policy and trade analysis",
      "Outgrower and inclusive business models",
    ],
    capabilities: [
      {
        icon: Sprout,
        title: "Value Chain & Market Intelligence",
        text: "Understanding where value is created and lost.",
        points: [
          "Value-chain mapping, pricing and margin analysis.",
          "Market demand, trade and competitiveness studies.",
          "Food security, nutrition and resilience assessment.",
        ],
      },
      {
        icon: TrendingUp,
        title: "Agri-Finance & Investment",
        text: "Turning agribusiness opportunities into bankable cases.",
        points: [
          "Feasibility studies and investment appraisal.",
          "Access-to-finance and risk-sharing analysis.",
          "Processing, storage and logistics assessment.",
        ],
      },
      {
        icon: Users,
        title: "Policy, Trade & Inclusion",
        text: "Growth that reaches smallholders and rural economies.",
        points: [
          "Agricultural policy, subsidy and trade review.",
          "Outgrower and inclusive business model design.",
          "Gender, youth and rural livelihoods analysis.",
        ],
      },
    ],
    whyCrg: [
      {
        step: "01",
        title: "Field grounded",
        text: "We collect primary data from farmers, firms and markets rather than relying on desk assumptions.",
      },
      {
        step: "02",
        title: "Commercially minded",
        text: "We test interventions for profitability and sustainability, not just development impact.",
      },
      {
        step: "03",
        title: "Systems view",
        text: "We look across input supply, production, processing, finance and trade together.",
      },
      {
        step: "04",
        title: "Inclusion by design",
        text: "We build smallholder and women's participation into the model from the start.",
      },
    ],
    clientsLabel: "WHO WE SUPPORT",
    clientsHeading: "Partners across the agri-food system",
    clientsText:
      "We work with the public and private institutions that shape agricultural growth and food security.",
    clients: [
      "Agribusinesses & processors",
      "Farmer organisations & cooperatives",
      "Ministries of agriculture & trade",
      "Banks & agri-finance providers",
      "Input suppliers & distributors",
      "Development partners",
      "Trade & industry associations",
      "Research institutions",
    ],
    ctaHeading: "Looking to grow an agribusiness or strengthen a value chain?",
    ctaText:
      "Talk to our agriculture team about market analysis, investment cases or inclusive value-chain design.",
  },

  "water-resources-management": {
    slug: "water-resources-management",
    title: "Water Resources Management",
    intro:
      "Water security underpins health, food, energy and industry. We support evidence-based management of a resource that is increasingly scarce and contested.",
    overviewKicker: "HOW WE ARE AN EXPERT",
    overviewHeading: "Water decisions require reliable data and fair, workable governance",
    overview: [
      "Across the region, competing demands from agriculture, cities, energy and industry are straining water systems that are already exposed to climate variability. Poor data and weak institutions make those pressures harder to manage.",
      "CRG combines hydrological and economic analysis with governance expertise. We help clients understand how much water is available, who uses it, what it is worth, and how policy and infrastructure can allocate it more fairly and efficiently.",
    ],
    highlights: [
      { icon: Droplets, label: "Water security" },
      { icon: Waves, label: "Catchment planning" },
      { icon: ShieldCheck, label: "Governance" },
    ],
    services: [
      "Water resource assessments and balances",
      "Catchment and basin planning",
      "Water policy, pricing and tariff studies",
      "Irrigation and infrastructure appraisal",
      "WASH programme design and evaluation",
      "Climate-water risk analysis",
    ],
    capabilities: [
      {
        icon: Droplets,
        title: "Resource Assessment & Modelling",
        text: "Understanding availability, demand and scarcity.",
        points: [
          "Water resource and demand assessments.",
          "Catchment water balances and scenario modelling.",
          "Climate variability and drought risk analysis.",
        ],
      },
      {
        icon: Scale,
        title: "Policy, Pricing & Governance",
        text: "Rules and incentives that allocate water fairly.",
        points: [
          "Water policy, law and institutional review.",
          "Tariff, pricing and cost-recovery analysis.",
          "Water-use rights and stakeholder governance.",
        ],
      },
      {
        icon: Building2,
        title: "Infrastructure & Programme Advisory",
        text: "Investments that deliver reliable services.",
        points: [
          "Irrigation, storage and supply feasibility studies.",
          "WASH programme design, monitoring and evaluation.",
          "Utility performance and investment planning.",
        ],
      },
    ],
    whyCrg: [
      {
        step: "01",
        title: "Interdisciplinary",
        text: "We combine hydrology, economics and governance rather than treating water as an engineering problem alone.",
      },
      {
        step: "02",
        title: "Data driven",
        text: "We build decisions on measured availability and demand, not on optimistic assumptions.",
      },
      {
        step: "03",
        title: "Equity aware",
        text: "We analyse who gains and who loses from allocation and pricing choices.",
      },
      {
        step: "04",
        title: "Delivery oriented",
        text: "We support institutions to implement, monitor and adapt water plans over time.",
      },
    ],
    clientsLabel: "WHO WE SUPPORT",
    clientsHeading: "Partners in water security",
    clientsText:
      "We work with the institutions responsible for managing, financing and delivering water services.",
    clients: [
      "Water utilities & service providers",
      "Basin & catchment authorities",
      "Ministries of water & environment",
      "Municipalities & local government",
      "Irrigation schemes & farmer groups",
      "WASH programmes & NGOs",
      "Infrastructure investors",
      "Development partners",
    ],
    ctaHeading: "Facing a water security or allocation challenge?",
    ctaText:
      "Speak with our water team about resource assessment, policy, pricing or infrastructure appraisal.",
  },

  "climate-change-biodiversity-health": {
    slug: "climate-change-biodiversity-health",
    title: "Climate Change, Biodiversity & Health",
    intro:
      "Climate change, biodiversity loss and public health are deeply connected. We help clients understand those links and act on them with evidence.",
    overviewKicker: "HOW WE ARE AN EXPERT",
    overviewHeading: "Climate, nature and health risks cannot be managed in silos",
    overview: [
      "Rising temperatures, ecosystem degradation and shifting disease patterns interact in ways that conventional sector planning misses. Communities that depend on natural resources are often the most exposed, and the least equipped to adapt.",
      "CRG brings climate science, biodiversity assessment and public-health analysis together. We help governments, investors and development partners identify risk, prioritise adaptation, and design interventions that protect both people and ecosystems.",
    ],
    highlights: [
      { icon: CloudSun, label: "Climate risk" },
      { icon: Leaf, label: "Biodiversity" },
      { icon: HeartPulse, label: "Health & resilience" },
    ],
    services: [
      "Climate risk and vulnerability assessments",
      "Biodiversity and ecosystem assessments",
      "Health impact and resilience studies",
      "Adaptation and resilience planning",
      "Carbon and natural-capital analysis",
      "One Health policy advisory",
    ],
    capabilities: [
      {
        icon: CloudSun,
        title: "Climate Risk & Adaptation",
        text: "Understanding exposure today to prepare for tomorrow.",
        points: [
          "Climate risk and vulnerability assessment.",
          "Adaptation and resilience planning.",
          "Climate scenario and economic impact analysis.",
        ],
      },
      {
        icon: Leaf,
        title: "Biodiversity & Natural Capital",
        text: "Valuing nature in policy and investment decisions.",
        points: [
          "Biodiversity and ecosystem service assessment.",
          "Natural-capital and carbon analysis.",
          "Conservation and land-use trade-off studies.",
        ],
      },
      {
        icon: HeartPulse,
        title: "Health & Resilience",
        text: "Protecting health in a changing environment.",
        points: [
          "Climate-health impact and vulnerability studies.",
          "One Health and zoonotic-risk advisory.",
          "Health-system resilience and adaptation planning.",
        ],
      },
    ],
    whyCrg: [
      {
        step: "01",
        title: "Integrated science",
        text: "We connect climate, nature and health evidence instead of analysing each in isolation.",
      },
      {
        step: "02",
        title: "Local realities",
        text: "We ground assessments in community experience and local ecological conditions.",
      },
      {
        step: "03",
        title: "Policy relevance",
        text: "We translate complex science into options decision-makers can act on.",
      },
      {
        step: "04",
        title: "Finance ready",
        text: "We help clients structure adaptation and conservation cases for funders.",
      },
    ],
    clientsLabel: "WHO WE SUPPORT",
    clientsHeading: "Partners protecting people and ecosystems",
    clientsText:
      "We support the institutions responsible for climate, environment and health outcomes.",
    clients: [
      "Environment & climate ministries",
      "Health ministries & agencies",
      "Conservation organisations",
      "Municipalities & planners",
      "Impact investors & funders",
      "Development partners",
      "Research institutions",
      "Community organisations",
    ],
    ctaHeading: "Need to understand climate, nature or health risk?",
    ctaText:
      "Talk to our climate and health team about assessment, adaptation planning or natural-capital analysis.",
  },

  "digital-information-e-environmental": {
    slug: "digital-information-e-environmental",
    title: "Digital Information & E-Environmental",
    intro:
      "Digital tools and environmental data are transforming how organisations monitor, plan and deliver. We help clients turn them into practical decision support.",
    overviewKicker: "HOW WE ARE AN EXPERT",
    overviewHeading: "Digital systems only create value when they answer real decisions",
    overview: [
      "Governments and firms are investing heavily in digital systems, yet many produce more data than insight. Environmental monitoring, GIS and management information systems often sit apart from the decisions they were meant to inform.",
      "CRG bridges digital strategy, environmental data and analytics. We help clients design information systems around decisions, use earth observation and GIS to fill data gaps, and govern digital tools responsibly — including the sustainability of the technology itself.",
    ],
    highlights: [
      { icon: Cpu, label: "Digital systems" },
      { icon: Database, label: "Environmental data" },
      { icon: Globe2, label: "Earth observation" },
    ],
    services: [
      "Digital information and data strategy",
      "Environmental data systems and dashboards",
      "GIS and earth-observation analysis",
      "E-waste and digital sustainability advisory",
      "Data governance and interoperability reviews",
      "Digital public infrastructure advisory",
    ],
    capabilities: [
      {
        icon: Cpu,
        title: "Digital Strategy & Transformation",
        text: "Technology aligned to institutional priorities.",
        points: [
          "Digital information and data strategy.",
          "Systems requirements and operating-model design.",
          "Digital public infrastructure and service delivery.",
        ],
      },
      {
        icon: Database,
        title: "Environmental Data & Analytics",
        text: "Turning environmental data into decisions.",
        points: [
          "Environmental monitoring and data systems.",
          "Dashboards and decision-support tools.",
          "Data quality, governance and interoperability.",
        ],
      },
      {
        icon: Globe2,
        title: "GIS & Earth Observation",
        text: "Seeing change across landscapes and assets.",
        points: [
          "Satellite and earth-observation analysis.",
          "GIS mapping and spatial modelling.",
          "Land-use, resource and risk monitoring.",
        ],
      },
    ],
    whyCrg: [
      {
        step: "01",
        title: "Decision-led design",
        text: "We start from the decision and build the information system around it, not the reverse.",
      },
      {
        step: "02",
        title: "Data literacy",
        text: "We combine analytical rigour with practical understanding of environmental datasets.",
      },
      {
        step: "03",
        title: "Sustainability",
        text: "We consider e-waste, energy use and digital inclusion alongside functionality.",
      },
      {
        step: "04",
        title: "Capability transfer",
        text: "We train client teams so systems continue to be used and improved after handover.",
      },
    ],
    clientsLabel: "WHO WE SUPPORT",
    clientsHeading: "Partners building digital and environmental capability",
    clientsText:
      "We work with the institutions that generate, manage and use environmental and digital information.",
    clients: [
      "Government digital agencies",
      "Environment & climate ministries",
      "Utilities & infrastructure operators",
      "Technology & data companies",
      "Cities & municipalities",
      "Development partners",
      "Research institutions",
      "Regulators & statistical agencies",
    ],
    ctaHeading: "Building a digital or environmental information system?",
    ctaText:
      "Speak with our digital and data team about strategy, dashboards, GIS or data governance.",
  },

  "policy-economic-research": {
    slug: "policy-economic-research",
    title: "Policy & Economic Research",
    intro:
      "Good policy rests on credible economics. We give governments, regulators and development partners the evidence to design, price and evaluate policy with confidence.",
    overviewKicker: "HOW WE ARE AN EXPERT",
    overviewHeading: "Policy choices are stronger when the economics are made explicit",
    overview: [
      "Policy debates are often shaped by advocacy rather than evidence. The result is reform that is poorly sequenced, badly priced or impossible to implement — and public trust that erodes with each failed initiative.",
      "CRG provides independent economic research and policy analysis. We quantify trade-offs, assess regulatory impact, review public spending and evaluate what actually worked. Our aim is to make the costs and benefits of policy visible before decisions are taken.",
    ],
    highlights: [
      { icon: Scale, label: "Policy design" },
      { icon: LineChart, label: "Economic analysis" },
      { icon: Landmark, label: "Public finance" },
    ],
    services: [
      "Policy analysis and reform appraisal",
      "Macroeconomic and fiscal analysis",
      "Regulatory impact assessment",
      "Cost-benefit and public expenditure review",
      "Market and competition studies",
      "Policy monitoring and evaluation",
    ],
    capabilities: [
      {
        icon: LineChart,
        title: "Economic Research & Modelling",
        text: "Quantifying costs, benefits and trade-offs.",
        points: [
          "Macroeconomic, fiscal and sector modelling.",
          "Cost-benefit and economic impact analysis.",
          "Market, competition and pricing studies.",
        ],
      },
      {
        icon: Scale,
        title: "Policy Design & Reform",
        text: "Evidence-based options that can be implemented.",
        points: [
          "Policy analysis and reform appraisal.",
          "Regulatory impact assessment.",
          "Stakeholder and political-economy analysis.",
        ],
      },
      {
        icon: Landmark,
        title: "Public Finance & Institutions",
        text: "Making public money work harder.",
        points: [
          "Public expenditure and budget reviews.",
          "Revenue, subsidy and fiscal sustainability analysis.",
          "Institutional and governance assessment.",
        ],
      },
    ],
    whyCrg: [
      {
        step: "01",
        title: "Independent",
        text: "We follow the evidence wherever it leads and say clearly what the data can and cannot support.",
      },
      {
        step: "02",
        title: "Quantitative",
        text: "We price trade-offs so decision-makers can compare options on a consistent basis.",
      },
      {
        step: "03",
        title: "Political economy aware",
        text: "We assess feasibility and incentives, not just theoretical optimality.",
      },
      {
        step: "04",
        title: "Implementation focused",
        text: "We translate recommendations into sequenced, budgeted and monitorable actions.",
      },
    ],
    clientsLabel: "WHO WE SUPPORT",
    clientsHeading: "Partners shaping public policy",
    clientsText:
      "We work with the institutions that design, finance, regulate and scrutinise policy.",
    clients: [
      "Ministries of finance & planning",
      "Central banks & regulators",
      "Parliaments & oversight bodies",
      "Sector ministries & agencies",
      "Development partners",
      "Industry & business associations",
      "Local governments",
      "Research institutions",
    ],
    ctaHeading: "Need independent economic evidence for a policy decision?",
    ctaText:
      "Talk to our policy and economics team about analysis, regulatory impact or evaluation.",
  },

  "capacity-development-training": {
    slug: "capacity-development-training",
    title: "Capacity Development & Training",
    intro:
      "Lasting results depend on capable people and institutions. We design practical capacity development that strengthens performance long after an engagement ends.",
    overviewKicker: "HOW WE ARE AN EXPERT",
    overviewHeading: "Capacity is built through practice, not one-off workshops",
    overview: [
      "Many programmes assume that skills will appear once a strategy is written. In practice, capacity develops through sustained practice, coaching and systems that make good performance possible. Without that, reforms stall when external support ends.",
      "CRG designs capacity development around real work. We assess gaps, build tailored training and coaching, strengthen institutional systems, and transfer knowledge to client teams so improvements persist. Our focus is measurable change in how people and organisations perform.",
    ],
    highlights: [
      { icon: GraduationCap, label: "Practical skills" },
      { icon: Building2, label: "Stronger institutions" },
      { icon: Lightbulb, label: "Learning systems" },
    ],
    services: [
      "Capacity needs assessments",
      "Tailored training programmes and curricula",
      "Training-of-trainers and coaching",
      "Institutional development plans",
      "Knowledge and learning systems",
      "Technical assistance and mentoring",
    ],
    capabilities: [
      {
        icon: GraduationCap,
        title: "Training & Facilitation",
        text: "Learning designed around the work people actually do.",
        points: [
          "Tailored curriculum design and delivery.",
          "Training-of-trainers and peer learning.",
          "Coaching, mentoring and certification.",
        ],
      },
      {
        icon: Building2,
        title: "Institutional Strengthening",
        text: "Systems and processes that outlast individuals.",
        points: [
          "Capacity assessment and development planning.",
          "Organisational design and performance systems.",
          "Governance, process and knowledge transfer.",
        ],
      },
      {
        icon: Lightbulb,
        title: "Learning & Knowledge Systems",
        text: "Making learning part of how the organisation works.",
        points: [
          "Learning strategies and knowledge management.",
          "Monitoring of capacity and performance change.",
          "Communities of practice and peer exchange.",
        ],
      },
    ],
    whyCrg: [
      {
        step: "01",
        title: "Work-based",
        text: "We build training around live tasks so skills are applied immediately, not filed away.",
      },
      {
        step: "02",
        title: "Institution aware",
        text: "We address systems and incentives, not just individual knowledge.",
      },
      {
        step: "03",
        title: "Measurable",
        text: "We define capacity outcomes and track change in performance over time.",
      },
      {
        step: "04",
        title: "Sustainable",
        text: "We train trainers and transfer tools so capability remains in-house.",
      },
    ],
    clientsLabel: "WHO WE SUPPORT",
    clientsHeading: "Partners investing in people and institutions",
    clientsText:
      "We work with organisations that want capability to stay in-house rather than depend on external support.",
    clients: [
      "Public institutions & agencies",
      "Private-sector teams",
      "NGOs & civil society",
      "Universities & research bodies",
      "Professional associations",
      "SMEs & entrepreneurs",
      "Development programmes",
      "Sector regulators",
    ],
    ctaHeading: "Want capacity that stays with your organisation?",
    ctaText:
      "Speak with our capacity team about assessments, tailored training or institutional strengthening.",
  },
};

export const SECTOR_LINKS = Object.values(SECTOR_DETAILS).map((sector) => ({
  title: sector.title,
  href: `/sectors/${sector.slug}`,
}));

export const SECTOR_SLUGS = Object.keys(SECTOR_DETAILS);
