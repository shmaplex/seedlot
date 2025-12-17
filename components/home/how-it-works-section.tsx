"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function HowItWorksSection({ steps }: { steps: any[] }) {
  return (
    <section className="bg-card py-24 px-4 sm:px-6 md:px-12 md:py-32 relative overflow-hidden">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold text-foreground mb-16 md:mb-20">
        How It Works
      </h2>

      <div className="relative">
        {/* Decorative fade at top */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-card/100 to-card/0 pointer-events-none z-10" />
        {/* Decorative fade at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-card/100 to-card/0 pointer-events-none z-10" />

        <VerticalTimeline lineColor="var(--muted)" layout="1-column">
          {steps.map((step, i) => (
            <VerticalTimelineElement
              key={i as any}
              contentStyle={{
                background: "var(--card)",
                color: "var(--foreground)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                borderRadius: "var(--radius-xl)",
                padding: "1.5rem",
              }}
              contentArrowStyle={{ borderRight: "7px solid var(--card)" }}
              iconStyle={{
                background:
                  "linear-gradient(135deg, var(--secondary), var(--accent))",
                color: "var(--background)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
              icon={
                <motion.div
                  className="relative w-14 h-14 flex items-center justify-center sm:w-12 sm:h-12"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  <Leaf className="absolute inset-0 m-auto w-6 h-6 sm:w-5 sm:h-5" />
                </motion.div>
              }
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-base md:text-lg">
                  {step.description}
                </p>
              </motion.div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>

      {/* Background decorative circles */}
      <div className="absolute -top-16 -left-16 w-60 h-60 sm:w-48 sm:h-48 rounded-full bg-green-100/20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 sm:w-64 sm:h-64 rounded-full bg-yellow-100/20 blur-3xl pointer-events-none"></div>

      <style jsx global>{`
        /* Center timeline on desktop, left-align on mobile */
        @media (min-width: 768px) {
          .vertical-timeline {
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
        @media (max-width: 767px) {
          .vertical-timeline::before {
            left: 20px !important; /* left-align timeline line on mobile */
          }
        }

        /* Thinner timeline line */
        .vertical-timeline::before {
          width: 3px !important;
        }
      `}</style>
    </section>
  );
}
