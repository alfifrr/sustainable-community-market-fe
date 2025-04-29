"use client";

import React, { useEffect } from "react";
import { SectionContainer } from "@/components/SectionContainer";
import "./about.css";

export default function AboutPage() {
  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".scroll-animate");
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementPosition < windowHeight * 0.85) {
          element.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on load
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-base-100 to-base-200">
      <SectionContainer className="!h-auto">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="animate-fadeIn">
            <h1 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-scaleUp">
              About Sustainable Community Market
            </h1>

            <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
              <div className="md:w-1/2 flex justify-center items-center animate-slideInLeft scroll-animate opacity-0">
                <img
                  src="/logo/Untitled design.svg"
                  alt="Sustainable Market Logo"
                  className="w-3/4 h-auto hover-rotate"
                />
              </div>
              <div className="md:w-1/2 animate-slideInRight scroll-animate opacity-0">
                <h2 className="text-3xl font-semibold mb-4 text-primary">
                  Our Vision
                </h2>
                <p className="text-lg mb-4 leading-relaxed">
                  Sustainable Community Market is a marketplace platform that
                  connects sustainable local producers with environmentally
                  conscious consumers. We aim to build a sustainable economic
                  ecosystem, support local small businesses, and reduce the
                  environmental impact of everyday consumption.
                </p>
              </div>
            </div>

            <div className="mb-16 scroll-animate opacity-0">
              <h2 className="text-3xl font-semibold mb-6 text-primary text-center animate-scaleUp">
                Our Values
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div
                  className="bg-base-100 p-8 rounded-xl shadow-lg hover-lift border-t-4 border-primary scroll-animate opacity-0"
                  style={{ transitionDelay: "0.1s" }}
                >
                  <h3 className="text-xl font-medium mb-2">Sustainability</h3>
                  <p>
                    We prioritize environmentally friendly products and
                    practices, reduce waste, and support the circular economy.
                  </p>
                </div>
                <div
                  className="bg-base-100 p-8 rounded-xl shadow-lg hover-lift border-t-4 border-secondary scroll-animate opacity-0"
                  style={{ transitionDelay: "0.2s" }}
                >
                  <h3 className="text-xl font-medium mb-2">Local Community</h3>
                  <p>
                    We support local producers and small businesses to build a
                    strong and resilient local economy.
                  </p>
                </div>
                <div
                  className="bg-base-100 p-8 rounded-xl shadow-lg hover-lift border-t-4 border-accent scroll-animate opacity-0"
                  style={{ transitionDelay: "0.3s" }}
                >
                  <h3 className="text-xl font-medium mb-2">Transparency</h3>
                  <p>
                    We are committed to providing clear information about
                    product origins, production processes, and environmental
                    impact.
                  </p>
                </div>
                <div
                  className="bg-base-100 p-8 rounded-xl shadow-lg hover-lift border-t-4 border-info scroll-animate opacity-0"
                  style={{ transitionDelay: "0.4s" }}
                >
                  <h3 className="text-xl font-medium mb-2">Innovation</h3>
                  <p>
                    We continuously seek new ways to improve sustainability and
                    user experience on our platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-16 bg-base-100 p-8 rounded-xl shadow-lg hover-scale scroll-animate opacity-0">
              <h2 className="text-3xl font-semibold mb-6 text-primary">
                How We Work
              </h2>
              <p className="text-lg mb-4">
                We connect local producers committed to sustainable practices
                with consumers looking for environmentally friendly products.
                Every product on our platform goes through a verification
                process to ensure compliance with our sustainability standards.
              </p>
              <p className="text-lg mb-4">
                We also collaborate with local communities to educate and
                promote sustainable lifestyles through various programs and
                events.
              </p>
            </div>

            <div className="mb-10 text-center bg-gradient-to-r from-primary/10 to-secondary/10 p-10 rounded-xl scroll-animate opacity-0">
              <h2 className="text-3xl font-semibold mb-6 text-primary">
                Join Us
              </h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Are you a local producer committed to sustainability or a
                consumer who cares about the environment? Join our community and
                be part of the change towards a more sustainable future.
              </p>
              <div className="flex justify-center mt-8">
                <a
                  href="/signup"
                  className="btn btn-primary btn-lg px-8 shadow-lg animate-bounce"
                >
                  Sign Up Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
