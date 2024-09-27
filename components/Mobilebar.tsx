"use client";
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '../constants/index'
import { cn } from '../lib/utils'
import { usePathname } from 'next/navigation'
import Footer from './Footer';

const Mobilebar = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <section className='w-full max-w-[265px]'>
      <Sheet>
        {/* Hamburger Menu Icon */}
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt='menu'
            className='cursor-pointer'
          />
        </SheetTrigger>

        {/* Sheet Content */}
        <SheetContent side='left' className='border-none bg-white'>
          <nav className="flex gap-4 flex-col">
            {/* UPL Logo */}
            <Link href="/" className="px-4 cursor-pointer items-center gap-1 flex">
              <Image
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="UPL Logo"
              />
              <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">UPL</h1>
            </Link>

            {/* Mobile Navigation Links */}
            <div className='mobilenav-sheet'>
              <nav className='flex h-full flex-col gap-5 pt-16 text-white'>
                {sidebarLinks.map((item) => {
                  // Determine if the link is active
                  const isActive = pathname === item.route || 
                                   (item.route !== '/' && pathname.startsWith(item.route) && pathname !== '/');

                  return (
                    <SheetClose asChild key={item.label}>
                      <Link
                        className={cn("mobilenav-sheet_close w-full flex items-center gap-2", {
                          "bg-bank-gradient": isActive
                        })}
                        href={item.route}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({ "brightness-[3] invert-0": isActive })}
                        />
                        <p className={cn("text-16 font-semibold text-black-2", {
                          "text-white": isActive
                        })}>
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </div>
          </nav>
          <Footer user={user} type="mobile"/>
        </SheetContent>
      </Sheet>
    </section>
  );
}

export default Mobilebar;
