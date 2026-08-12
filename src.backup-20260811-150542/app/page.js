"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Home() {
  return (
    <main className="relative h-[100dvh] w-screen overflow-hidden bg-[#1a1817] text-white">
      {/* Background Image Container */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/hero-banner-1.png"
          alt="Model wearing Essentials Hoodie"
          fill
          priority
          className="object-cover object-center lg:object-[65%_center]"
          sizes="100vw"
          quality={95}
        />
      </motion.div>

      {/* Subtle Overlay to enhance visual contrast & luxury feel */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/25 to-transparent lg:from-black/70 lg:via-black/20" />

      {/* Content Container - Exactly Matches Reference Layout */}
      <div className="relative z-20 flex h-full w-full items-center px-8 sm:px-14 lg:px-24">
        <motion.div
          className="max-w-xl space-y-5"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Sub-Brand Header */}
          <motion.p
            variants={itemVariants}
            className="text-[11px] font-semibold tracking-[0.35em] uppercase text-stone-300/80"
          >
            FEAR OF GOD
          </motion.p>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-black uppercase tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            ESSENTIALS
          </motion.h1>

          {/* Minimal Line Divider */}
          <motion.div
            variants={itemVariants}
            className="h-[1px] w-14 bg-stone-400/40"
          />

          {/* Subtitle / Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-stone-300 leading-relaxed"
          >
            TIMELESS COMFORT. <br />
            MODERN SIMPLICITY.
          </motion.p>

          {/* Luxury Flat CTA Button */}
          <motion.div variants={itemVariants} className="pt-4">
            <Link
              href="/customize"
              className="inline-block bg-[#c2b8b0] hover:bg-white text-stone-900 text-[11px] font-bold tracking-[0.2em] uppercase px-7 py-3.5 transition-all duration-300 border border-transparent shadow-md hover:shadow-lg"
            >
              EXPLORE THE COLLECTION
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}