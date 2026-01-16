import { Card } from "./portfolio-types";

const ProjectData: Card[] = [
  {
    title: "Image Processing Platform - Microservices & DevOps",
    description:
      "A cloud-native image processing platform with microservices architecture, automated CI/CD pipeline, and Kubernetes orchestration deployed on AWS EKS.",
    projectUrl: "https://github.com/sujal8976/microsvc-jenkins-k8s-cicd",
  },
  {
    title: "URL Shortener - Jenkins & ASG",
    description:
      "A scalable URL shortener with automated Jenkins CI/CD pipeline, containerized deployment via Docker, and high-availability infrastructure using AWS EC2 Auto Scaling Groups.",
    projectUrl: "https://github.com/sujal8976/jenkins-docker-aws_asg-workflow",
  },
  {
    title: "RtChat - Room Based Chat Application",
    description:
      "A high-performance real-time chat app with WebSocket messaging, multi-room support, and performance optimizations using Next.js, PostgreSQL, and monorepo architecture.",
    projectUrl: "https://github.com/sujal8976/rtchat",
  },
  {
    title: "Task Manager - Multi-Environment Deployment",
    description: "An automated multi-environment CI/CD pipeline using GitHub Actions with branch-specific deployments, Docker orchestration, and zero-downtime releases to AWS EC2 across dev/test/prod stages.",
    projectUrl: "https://github.com/sujal8976/mutli-env-cicd-github-actions",
  },
];

export default ProjectData;
