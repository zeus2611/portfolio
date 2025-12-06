const person = {
  firstName: "Nischay",
  lastName: "",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Cloud & Software Engineer",
  avatar: "/images/avatar.svg",
  email: "itsnischay2604@gmail.com",
  location: "Asia/Kolkata", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Hindi"], // optional: Leave the array empty if you don't want to display languages
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
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
  // {
  //   name: "Threads",
  //   icon: "threads",
  //   link: "https://www.threads.com/@once_ui",
  // },
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
    <>Fusing user-centric design with cutting-edge AI and cloud solutions.</>
  ),
  featured: {
    display: true,
    title: (
      <>
        Recent project: <strong className="ml-4">Once UI</strong>
      </>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      I'm {person.name}, a Cloud + AI Engineer BridgeTalk, where I craft intelligent,
      scalable AI-powered systems and seamless mobile-first experiences. After
      hours, I build my own innovative projects that push the boundaries of AI,
      cloud, and mobile technologies.
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
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Hi there! I'm Nischay, a Cloud + AI Engineer who's passionate about
        building intelligent systems and mobile-first products that scale. I
        specialize in the intersection of AI, mobile development, and cloud
        infrastructure — combining Flutter, Python, and cutting-edge AI
        technologies to create impactful solutions.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "BridgeTalk",
        timeframe: "January, 2025 - Present",
        role: "Founding Engineer",
        achievements: [
          <>
            Redesigned the UI/UX for the FLY platform, resulting in a 20%
            increase in user engagement and 30% faster load times.
          </>,
          <>
            Spearheaded the integration of AI tools into design workflows,
            enabling designers to iterate 50% faster.
          </>,
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Whizlabs",
        timeframe: "April, 2023 - August, 2025",
        role: "Cloud Labs Engineer",
        achievements: [
          <>
            Integrated multiple payment gateways, expanding payment options and
            driving a 14% increase in online transactions.
          </>,
          <>
            Developed a performance monitoring framework for Android, improving
            app stability by reducing crashes by 22% and enhancing performance
            by 10%.
          </>,
        ],
        images: [],
      },
      {
        company: "Supista",
        timeframe: "July, 2022 - August, 2022",
        role: "Software Engineer Intern",
        achievements: [
          <>
            Integrated multiple payment gateways, expanding payment options and
            driving a 14% increase in online transactions.
          </>,
          <>
            Developed a performance monitoring framework for Android, improving
            app stability by reducing crashes by 22% and enhancing performance
            by 10%.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "National Institute of Technology, Rourkela",
        timeframe: "2025 - Present",
        description: (
          <>
            Masters in ECE with specialization in Signal and Image Processing.
          </>
        ),
      },
      {
        name: "Shri Mata Vaishno Devi University",
        timeframe: "2020 - 2024",
        description: <>Studied Electronics and Communication Engineering.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: (
          <>Able to prototype in Figma with Once UI with unnatural speed.</>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Next.js",
        description: (
          <>Building next gen apps with Next.js + Once UI + Supabase.</>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

export { person, social, home, about, blog, work };
