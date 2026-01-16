import { PortfolioConfig, SocialPlatform } from "./portfolio-types";

const portfolioData: PortfolioConfig = {
  personalInfo: {
    firstName: "Sujal",
    lastName: "Gupta",
    title: "DevOps and Backend Developer",
    location: "Mumbai, India",
    email: "sujalgupta8976@gmail.com",
  },

  content: {
    tagline:
      "a self-taught DevOps and Cloud enthusiat based in Maharashtra, India, with a passion for building clean and performant backend server",
    about: [
      "Hey there, I’m a DevOps and backend engineer passionate about building scalable systems, automating deployments, and improving application reliability. I enjoy working at the intersection of code, infrastructure, and operations. ",
      "Right now, I’m focused on cloud-native technologies, Kubernetes, CI/CD pipelines, and backend performance optimization. ",
      "When I’m not working on infrastructure or code, I enjoy watching anime and experimenting with my Linux setup. ",
    ],
    svgLink: "https://schar.dev/images/saurabh-charde.svg",
  },

  skills: {
    Languages: ["TypeScript", "Python", "Java", "Shell/Bash Scripting"],
    "Cloud Platforms": ["Amazon Web Services(AWS)", "Google Cloud Platform(GCP)", "GitHub"],
    "DevOps & CI/CD": [
      "Jenkins", "GitHub Actions", "CI/CD pipeline design", "Terraform", "Prometheus"
    ],
    "Containers & Orchestration": [
      "Docker", "Kubernetes", "Helm"
    ],
    Databases: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
    "Tools & System": [
      "Git", "Linux system administration", "Node.js", "Next.js", "React.js", "Tailwind CSS"
    ],
    Concepts: ["Microservices", "Networking", "Automation", "System Design (basic)"],
  },

  socialLinks: [
    {
      platform: SocialPlatform.GITHUB,
      url: "https://github.com/sujal8976",
      username: "sujal8976",
    },
    {
      platform: SocialPlatform.LINKEDIN,
      url: "https://linkedin.com/in/sujal8976",
      username: "sujal8976",
    },
    {
      platform: SocialPlatform.REDDIT,
      url: "https://www.reddit.com/user/no__sujal/",
      username: "no__sujal",
    },
    {
      platform: SocialPlatform.TELEGRAM,
      url: "https://t.me/sujal8976",
      username: "sujal8976",
    },
    {
      platform: SocialPlatform.CREDLY,
      url: "https://www.credly.com/users/sujal8976",
      username: "sujal8976",
    }
  ],

  // workExperience: [
  //   {
  //     company: "TechNova Labs",
  //     position: "Full Stack Developer",
  //     startDate: new Date("2023-01-01"),
  //     endDate: null,
  //     description:
  //       "Building modern web applications for startups and enterprises.",
  //     achievements: [
  //       "Redesigned core dashboard improving performance by 30%",
  //       "Built reusable component library with Tailwind and ShadCN",
  //       "Integrated real-time chat using WebSocket",
  //     ],
  //     technologies: [
  //       "Next.js",
  //       "TypeScript",
  //       "Prisma",
  //       "PostgreSQL",
  //       "Tailwind CSS",
  //     ],
  //   },
  //   {
  //     company: "OpenSource Contributions",
  //     position: "Contributor",
  //     startDate: new Date("2022-05-01"),
  //     endDate: new Date("2022-12-01"),
  //     description:
  //       "Actively contributed to open-source projects in the React and Node ecosystem.",
  //     achievements: [
  //       "Merged 10+ PRs in high-traffic repositories",
  //       "Improved documentation and onboarding experience",
  //     ],
  //     technologies: ["React", "Node.js", "Markdown", "Git"],
  //   },
  // ],

  certification: [
    {
      name: "Google Cloud Engineering Certified - Google Cloud Career Launchpad",
      issuingOrganization: "Google Cloud Platform(GCP)",
      issueDate: new Date("2025-08-12"),
      url: "https://www.credly.com/badges/c0e3284c-2221-428a-86d3-3e4033d224f1/public_url"
    },
    {
      name: "Build Infrastructure with Terraform - Google Cloud Skills",
      issuingOrganization: "Google Cloud Platform(GCP)",
      issueDate: new Date("2025-08-15"),
      url: "https://www.credly.com/badges/a1594c80-138d-4033-b1c2-8fc6dff13a29/public_url"
    },
    {
      name: "Networking Basics",
      issuingOrganization: "Cisco Networking Academy",
      issueDate: new Date("2025-07-30"),
      url: "https://www.credly.com/badges/abc7aff9-39c4-4b56-92d5-9a25b478b5bc/public_url"
    },
  ],

  education: [
    {
      institution: "S.I.E.S college of Arts, Science and Commerce, Mumbai",
      degree: "B.Sc in Computer Science",
      startDate: new Date("2022-07-01"),
      endDate: null,
    },
  ],

  footerMarquee: [
    "Backend Developer",
    "DevOps Enthusiast",
    "Life of Linux",
    "Cloud Native",
  ],

  includeGitHubInProjects: true,
};

export default portfolioData;
