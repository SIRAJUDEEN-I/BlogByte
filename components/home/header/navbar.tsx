"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";
import ToggleMode from "./toggle-mode";
import Link from "next/link";
import SearchInput from "./search-input";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { AnimatedBackground } from '@/components/motion-primitives/animated-background';

// ✅ Fix: Proper navigation items structure
const NavItems = [
  { id: 'articles', label: 'Articles', href: '/articles' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="top-0 z-50 w-full border-b border-zinc-600 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo & Desktop Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Blog
                </span>
                <span className="text-foreground">Byte</span>
              </span>
            </Link>

            {/* Desktop Navigation - Fixed */}
            <div className="hidden md:flex items-center gap-4">
              <AnimatedBackground  
                className='rounded-lg bg-zinc-100 dark:bg-zinc-800'
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.3,
                }}
                enableHover
              >
                {NavItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    data-id={item.id} 
                    className='px-3 py-2 text-sm font-medium text-zinc-600 transition-colors duration-300 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50'
                  >
                    {item.label}
                  </Link>
                ))}
              </AnimatedBackground>
            </div>
          </div>

          {/* Right Section - Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar (Desktop) */}
            <SearchInput />

            {/* Theme Toggle */}
            <ToggleMode />

            <SignedIn>
              <UserButton />
            </SignedIn>
            
            <SignedOut>
              <div className="hidden md:flex items-center gap-2">
                <SignInButton>
                  <Button variant="outline">Login</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Sign up</Button>
                </SignUpButton>
              </div>
            </SignedOut>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            {/* Search Bar (Mobile) */}
            <div className="px-4">
              <SearchInput />
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2 px-4">
              {NavItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-foreground hover:bg-accent rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            <SignedOut> 
              <div className="px-4 flex flex-col gap-2">
                <SignInButton> 
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton> 
                  <Button className="w-full">Sign up</Button>
                </SignUpButton> 
              </div>
            </SignedOut> 
          </div>
        )}
      </div>
    </nav>
  );
}