import { 
  SiPython, SiGo, SiDocker, SiKubernetes, SiTerraform, 
  SiGooglecloud, SiAmazon, SiFlutter, SiNextdotjs, SiFastapi,
  SiAppwrite, SiMongodb, SiGithubactions, SiPrometheus, 
  SiOpenai, SiLinux, SiFirebase 
} from "react-icons/si";


const person = {
  firstName: "Nischay",
  lastName: "",
  get name() {
    return `${this.firstName}`;
  },
  role: "Software Engineer & Systems Architect",
  avatar: "/images/avatar.svg",
  email: "itsnischay2604@gmail.com",
  location: "Asia/Kolkata",
  languages: ["English", "Hindi"],
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/zeus2611/",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/nischay-2604/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: (
    <>
      Engineering resilient, scalable systems with a focus on product impact and
      user experience.
    </>
  ),
  featured: {
    display: true,
    title: (
      <>
        Recent project: <strong className="ml-4">BridgeTalk</strong>
      </>
    ),
    href: "/work/building-an-ai-powered-learning-platform",
  },
  subline: (
    <>
      I'm {person.name}, a Software Engineer driven by curiosity and a
      first-principles approach to problem-solving. At BridgeTalk, I architect
      high-performance solutions that bridge complex infrastructure with
      intuitive design. I thrive in autonomous environments where I can own the
      technical lifecycle and deliver software that scales.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/its-nischay",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Hi there! I'm Nischay, a Systems & Product Engineer passionate about
        building robust, scalable software. I specialize in the intersection of
        distributed backend systems and mobile-first experiences—combining
        Python, Go, and Flutter to solve complex architectural challenges.
        Whether optimizing cloud costs or contributing to open source, I apply a
        rigorous engineering mindset to build tools that empower users.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "BridgeTalk",
        timeframe: "January 2025 - Present",
        role: "Founding Engineer",
        link: "https://www.bridgetalk.ai/",
        achievements: [
          <>
            Architected a scalable AI-driven backend using FastAPI and MongoDB,
            implementing real-time speech-to-text pipelines with deepgram and
            OpenAI.
          </>,
          <>
            Designed a secure role-based dashboard for organization management,
            improving administrative workflows for multi-tenant users.
          </>,
          <>
            Optimized API performance and automated deployments via GitHub
            Actions, ensuring low-latency responses for global users.
          </>,
        ],
        images: [
          // Add screenshots if available, otherwise leave empty
          // {
          //   src: "/images/projects/bridgetalk/cover.jpg",
          //   alt: "BridgeTalk Dashboard",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        company: "Activist.org (Open Source)",
        timeframe: "October 2024 - Present",
        role: "Software Engineer (Volunteer)",
        link: "https://github.com/orgs/activist-org",
        achievements: [
          <>
            Enhanced system reliability by rewriting test coverage for
            Django-based models (
            <a
              href="https://github.com/activist-org/activist/pull/1020"
              target="_blank"
              rel="noopener noreferrer"
            >
              PR #1020
            </a>
            ), ensuring robust handling of multilingual constraints.
          </>,
          <>
            Streamlined CI/CD pipelines by integrating a centralized i18n test
            runner (
            <a
              href="https://github.com/activist-org/activist/pull/995"
              target="_blank"
              rel="noopener noreferrer"
            >
              PR #995
            </a>
            ), enforcing localization checks before every commit.
          </>,
        ],
        images: [],
      },
      {
        company: "Whizlabs",
        timeframe: "April 2023 - August 2025",
        role: "Cloud Labs Engineer",
        link: "https://www.whizlabs.com/",
        achievements: [
          <>
            Engineered a serverless abuse detection system that reduced
            malicious resource incidents by 78% and saved 28% in monthly cloud
            overage costs.
          </>,
          <>
            Built an AI support agent leveraging vector databases to
            autonomously resolve 65% of user tickets, cutting median response
            time by 42%.
          </>,
          <>
            Automated infrastructure teardowns using Python and Bash, reducing
            cloud waste by 39% and improving cleanup latency by 50%.
          </>,
        ],
        images: [],
      },
      {
        company: "Supista",
        timeframe: "June 2022 - July 2022",
        role: "Software Engineer Intern",
        link: "https://www.supista.com/",
        achievements: [
          <>
            Integrated multiple payment gateways, driving a 14% increase in
            online transactions through diversified payment options.
          </>,
          <>
            Developed a custom Android performance monitoring framework,
            reducing app crashes by 22% and improving stability.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "National Institute of Technology, Rourkela",
        timeframe: "August 2025 - Present",
        description: (
          <>M.Tech in EC (Signal & Image Processing Specialization).</>
        ),
      },
      {
        name: "Shri Mata Vaishno Devi University",
        timeframe: "August 2020 - May 2024",
        description: (
          <>
            B.Tech in Electronics & Communication Engineering (CGPA: 7.54).
            <br />
            Cloud Lead at Google Developer Student Clubs (GDSC).
          </>
        ),
      },
    ],
  },
  certificates: {
    display: true,
    title: "Certificates",
    certificates: [
      {
        name: "Certified Kubernetes Application Developer",
        timeframe: "May 2024 - May 2026",
        link: "https://www.credly.com/badges/95311f8c-fea4-4dff-a054-00ac223e3eb2",
      },
      {
        name: "HashiCorp Certified: Terraform Associate (003)",
        timeframe: "March 2024 - March 2026",
        link: "https://www.credly.com/badges/5dd08ad8-ea30-4226-8a8e-a02b6b73ad85",
      },
      {
        name: "Google Cloud Professional Cloud Architect",
        timeframe: "February 2024 - February 2026",
        link: "https://www.credly.com/badges/bd4dea7c-f9c9-4fbb-8ae3-b99d7089465b",
      },
      {
        name: "Google Cloud Associate Cloud Engineer",
        timeframe: "September 2022 - September 2025",
        link: "https://www.credly.com/badges/faa12876-c2b5-4339-91cc-8b9d9b50f0c5",
      },
      {
        name: "AWS Academy Graduate - AWS Academy Cloud Foundations",
        timeframe: "",
        link: "https://www.credly.com/badges/5caeb18d-9543-4971-bae2-7532a7e85490/public_url",
      },
    ],
  },
    technical: {
    display: true,
    title: "Technical Expertise",
    skills: [
      {
        title: "Cloud & Infrastructure",
        description: (
          <>
            Orchestrating production-grade infrastructure with a focus on cost
            optimization and automation.
          </>
        ),
        stack: [
          { name: "GCP", icon: <SiGooglecloud /> },
          { name: "AWS", icon: <SiAmazon /> },
          { name: "Terraform", icon: <SiTerraform /> },
          { name: "Kubernetes", icon: <SiKubernetes /> },
          { name: "Docker", icon: <SiDocker /> },
          { name: "GitHub Actions", icon: <SiGithubactions /> },
        ],
      },
      {
        title: "Systems & Backend",
        description: (
          <>
            Building high-performance, distributed systems designed for scale and
            reliability.
          </>
        ),
        stack: [
          { name: "Python", icon: <SiPython /> },
          { name: "FastAPI", icon: <SiFastapi /> },
          { name: "Appwrite", icon: <SiAppwrite /> },
          { name: "MongoDB", icon: <SiMongodb /> },
          { name: "Prometheus", icon: <SiPrometheus /> },
          { name: "Firebase", icon: <SiFirebase /> },
        ],
      },
      {
        title: "Product & AI",
        description: (
          <>
            Fusing intelligent data pipelines with seamless, user-centric interfaces.
          </>
        ),
        stack: [
          { name: "OpenAI API", icon: <SiOpenai /> },
          { name: "Flutter", icon: <SiFlutter /> },
          { name: "Next.js", icon: <SiNextdotjs /> },
          { name: "Linux", icon: <SiLinux /> },
        ],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
};

export { person, social, home, about, blog, work };
