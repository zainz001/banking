"use client";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { sidebarLinks } from '../constants'
import { cn } from '../lib/utils'
import { usePathname } from 'next/navigation'
import Footer from './Footer';

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <div>
      <section className="sidebar">
        <nav className="flex gap-4 flex-col">
          {/* Home Link */}
          <Link href="/" className="mb-12 cursor-pointer items-center gap-2 flex">
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="UPL Logo"
              className="w-12 h-12 max-xl:w-10 max-xl:h-10"
            />
            <h1 className="sidebar-logo">UPL</h1>
          </Link>

          {/* Sidebar Links */}
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.route || 
                             (item.route !== '/' && pathname.startsWith(item.route) && pathname !== '/');

            return (
              <Link
                className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
                href={item.route}
                key={item.label}
              >
                <div className="relative size-6">
                  <Image 
                    src={item.imgURL} 
                    alt={item.label} 
                    fill
                    className={cn({ "brightness-[3] invert-0": isActive })}
                  />
                </div>
                <p className={cn("sidebar-label", { "!text-white": isActive })}>
                  {item.label}
                </p>
              </Link>
            );
          })}
        </nav>
        <Footer user={user} />
      </section>
    </div>
  );
};

export default Sidebar;
