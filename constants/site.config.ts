import { Network } from "lucide-react";
import { Computer } from "lucide-react";
import { FaBusinessTime } from "react-icons/fa";

export const siteConfig = {
  supportEmail: "info@startacus.app",
};

export const features = [
  {
    name: "Instant Ignition",
    description:
      "Startacus clears the path with smart defaults and best practices, letting you code, not configure.",
    icon: Computer,
  },
  {
    name: "Code What Counts",
    description:
      "Ditch the boilerplate drudgery. Startacus lets you focus your brainpower on the unique logic that actually matters.",
    icon: FaBusinessTime,
  },
  {
    name: "Scale Without Sweat",
    description:
      "Architected for growth, optimized for performance. Handle success without rebuilding the foundations.",
    icon: Network,
  },
];
