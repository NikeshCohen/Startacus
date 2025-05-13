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

export const faqItems = [
  {
    question: "How do I get started?",
    answer:
      "Clone the repository, run npm install, and then npm run dev. You'll have a fully functioning Next.js application with authentication, database connectivity, and beautiful UI components ready to customize.",
  },
  {
    question: "Is the project updated regularly?",
    answer:
      "Yes! Startacus is built with the latest technologies and is regularly updated to ensure compatibility and performance.",
  },
  {
    question: "Can I use Startacus for commercial projects?",
    answer:
      "Absolutely! We are under the MIT license, which means you can use it for personal, open-source, or commercial projects without restrictions.",
  },
  {
    question: "Can I customize the UI components?",
    answer:
      "Definitely! All UI components are built with Tailwind CSS and shadcn/ui, making them highly customizable to match your brand's design system.",
  },
];
