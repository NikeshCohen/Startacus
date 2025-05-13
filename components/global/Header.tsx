"use client";

import React from "react";

import Link from "next/link";

import { LogIn, Menu, X } from "lucide-react";
import { motion } from "motion/react";

import { Logo } from "@/components/global/Logo";
import ThemeToggle from "@/components/global/ThemeToggle";
import UserContextMenu from "@/components/global/UserContextMenu";
import UserProfileAvatar from "@/components/global/UserProfileAvatar";
import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";

const menuItems: { name: string; href: string }[] = [
  { name: "About", href: "#about" },
  { name: "Tech Stack", href: "#tech-stack" },
  { name: "FAQ", href: "#faq" },
];

function Header() {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [animationPlayed, setAnimationPlayed] = React.useState(false);
  const { data: session, isPending } = authClient.useSession();
  const headerRef = React.useRef<HTMLElement>(null);

  // Initialize scroll state and set up listener
  React.useEffect(() => {
    // Check scroll position immediately on mount
    const initiallyScrolled = window.scrollY > 5;
    setIsScrolled(initiallyScrolled);

    // Mark animation as played if initially scrolled
    if (initiallyScrolled) {
      setAnimationPlayed(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
      // Once we've scrolled, mark animation as played
      if (!animationPlayed) {
        setAnimationPlayed(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animationPlayed]);

  // Animation variants based on scroll state
  const headerAnimation = React.useMemo(() => {
    return {
      initial: { opacity: 0, y: -20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: isScrolled ? 0 : 0.5 },
      },
    };
  }, [isScrolled]);

  // Animation variants for menu items
  const menuAnimation = React.useMemo(() => {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: isScrolled ? 0 : 0.1,
          delayChildren: isScrolled ? 0 : 0.2,
          duration: isScrolled ? 0 : 0.3,
        },
      },
    };
  }, [isScrolled]);

  // Item variants
  const itemAnimation = React.useMemo(() => {
    return {
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: isScrolled ? 0 : 0.3 },
      },
    };
  }, [isScrolled]);

  const closeMenu = () => {
    setMenuState(false);
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    // Only process anchor links
    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);

      if (element) {
        // Close the menu if it's open
        closeMenu();

        // Update URL without reload
        window.history.pushState({}, "", href);

        // Add a small delay before scrolling to prevent animation interference
        requestAnimationFrame(() => {
          // Get the header height dynamically or use a reasonable default
          const headerHeight = headerRef.current?.offsetHeight || 100;

          // Get the element's position
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.scrollY - headerHeight;

          // Scroll with smooth behavior
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        });
      }
    }
  };

  return (
    <motion.header
      ref={headerRef}
      initial={headerAnimation.initial}
      animate={headerAnimation.animate}
      className="w-full"
    >
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 border/70 max-w-4xl rounded-2xl backdrop-blur-lg lg:px-5",
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: isScrolled ? 0 : 0.5 },
              }}
              className="flex w-full justify-between lg:w-auto"
            >
              <Logo />

              <div className="flex items-center gap-2">
                <ThemeToggle className="lg:hidden" />

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
                  <X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
                </button>
              </div>
            </motion.div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <motion.ul
                key="menu-items"
                initial="hidden"
                animate="visible"
                variants={menuAnimation}
                className="flex gap-8 text-sm"
              >
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.name + "-" + index}
                    variants={itemAnimation}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: isScrolled ? 0 : 0.5 },
              }}
              className="bg-background mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 text-center shadow-2xl shadow-zinc-300/20 in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:in-data-[state=active]:flex dark:shadow-none dark:lg:bg-transparent"
            >
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col items-center space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <div className="hidden lg:block">
                  <ThemeToggle />
                </div>

                {isPending ? (
                  <UserProfileAvatar isPending={true} className="h-9 w-9" />
                ) : session?.user ? (
                  <UserContextMenu />
                ) : (
                  <Button
                    effect="expandIcon"
                    size="sm"
                    icon={LogIn}
                    iconPlacement="right"
                    onClick={closeMenu}
                    asChild
                  >
                    <Link href="/sign-in">
                      <span>Sign In</span>
                    </Link>
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

export default Header;
