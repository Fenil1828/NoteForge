"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { useScroll } from "motion/react";
import Image from "next/image";
import { ModeSwitcher } from "./mode-switcher";

const menuItems: { name: string; href: string }[] = [];

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // ✅ Debug logging
  console.log("Header render - menuState:", menuState);

  return (
    <header>
      <nav
        className={cn(
          "fixed z-20 w-full border-b transition-colors duration-150",
          scrolled && "bg-background/50 backdrop-blur-3xl"
        )}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-4 sm:gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-8 sm:gap-12 lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2 touch-manipulation"
              >
                <Image
                  src="/noteforge-logo.png"
                  alt="logo"
                  width={60}
                  height={60}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px]"
                />
                <span className="text-xl sm:text-2xl font-bold">NoteForge</span>
              </Link>

              {/* ✅ FIXED Mobile menu button - only show one icon at a time */}
              <button
                onClick={() => {
                  console.log("Button clicked, current state:", menuState);
                  setMenuState(!menuState);
                }}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 block cursor-pointer p-3 lg:hidden touch-manipulation
                          hover:bg-accent/10 rounded-md transition-colors duration-150
                          w-12 h-12 flex items-center justify-center"
              >
                {/* ✅ Show only one icon based on state - INCREASED SIZE */}
                <div className="relative w-8 h-8 sm:w-7 sm:h-7">
                  {menuState ? (
                    <X 
                      className="size-8 sm:size-7 transition-transform duration-200" 
                    />
                  ) : (
                    <Menu 
                      className="size-8 sm:size-7 transition-transform duration-200" 
                    />
                  )}
                </div>
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ✅ Mobile dropdown with proper state management */}
            <div 
              className={cn(
                "bg-background mb-6 w-full flex-wrap items-center justify-end space-y-6 sm:space-y-8",
                "rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap",
                "lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent",
                "lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent",
                // ✅ Simple conditional class
                menuState ? "flex" : "hidden lg:flex"
              )}
            >
              
              <div className="lg:hidden w-full">
                {menuItems.length > 0 && (
                  <ul className="space-y-6 text-base">
                    {menuItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          className="text-muted-foreground hover:text-accent-foreground block duration-150 
                                   py-2 rounded touch-manipulation hover:bg-accent/10"
                          onClick={() => {
                            console.log("Menu item clicked, closing menu");
                            setMenuState(false);
                          }}
                        >
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <div className="flex items-center gap-1">
                  <Link
                    href="https://github.com"
                    target="_blank"
                    className="touch-manipulation"
                  >
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 h-11 sm:h-9 lg:h-8 px-4 sm:px-3 lg:px-2
                               hover:bg-accent hover:text-accent-foreground rounded-lg
                               active:scale-95 transition-all duration-150"
                    >
                      <svg viewBox="0 0 24 24" className="size-6 sm:size-5 lg:size-4 fill-current">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                      <span className="block sm:hidden">GitHub</span>
                    </Button>
                  </Link>

                  <ModeSwitcher />
                </div>
                
                <Button 
                  asChild 
                  variant="outline" 
                  className="h-11 sm:h-9 lg:h-8 touch-manipulation active:scale-95 transition-all duration-150"
                >
                  <Link href="/login">
                    <span>Login</span>
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  className="h-11 sm:h-9 lg:h-8 touch-manipulation active:scale-95 transition-all duration-150"
                >
                  <Link href="/signup">
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};