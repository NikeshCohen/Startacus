import { Network } from "lucide-react";
import { Computer } from "lucide-react";
import { FaBusinessTime } from "react-icons/fa";

export const siteConfig = {
  supportEmail: "info@startacus.app",
};

export const features = [
  {
    name: "Build faster",
    description:
      "Get up and running in no time with pre-configured settings and best practices. Say goodbye to setup and focus on what truly matters - building your application.",
    icon: Computer,
  },
  {
    name: "Focus on business logic",
    description:
      "Concentrate on solving business problems instead of dealing with the repetitive setup.",
    icon: FaBusinessTime,
  },
  {
    name: "Ready for scale",
    description:
      "Prepare for growth from day one. With built-in optimizations and scalable architecture, your application will be ready to handle increased traffic and complexity.",
    icon: Network,
  },
];
