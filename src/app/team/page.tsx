"use client";
import React from "react";
import { SectionContainer } from "@/components/SectionContainer";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  imagePath: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alfian F",
    imagePath: "/images/Team/Alfian F.jpeg",
  },
  {
    id: 2,
    name: "M Rifqi Ramadani",
    imagePath: "/images/Team/M Rifqi Ramadani.jpeg",
  },
  {
    id: 3,
    name: "Novianus Efrat",
    imagePath: "/images/Team/Novianus Efrat.jpeg",
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-base-100 to-base-200">
      <SectionContainer className="!h-auto">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Our Team</h1>

          <div className="mb-12">
            <p className="text-lg text-center max-w-3xl mx-auto mb-8">
              Meet the dedicated team behind Sustainable Community Market. We
              are a group of passionate individuals committed to building a more
              sustainable future through community connections and responsible
              business practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="card bg-base-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <figure className="relative h-64 w-full bg-base-300">
                  <Image
                    src={member.imagePath}
                    alt={member.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    priority
                  />
                </figure>
                <div className="card-body p-4 text-center">
                  <h2 className="card-title text-xl justify-center">{member.name}</h2>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-base-100 p-8 rounded-xl shadow-lg mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Join Our Team
            </h2>
            <p className="text-center mb-6">
              We are always looking for talented and passionate individuals who
              share our vision of sustainability and community impact. Check out
              our open positions or contact us to learn more about careers at
              Sustainable Community Market.
            </p>
            <div className="flex justify-center">
              <a href="/careers" className="btn btn-primary">
                View Careers
              </a>
            </div>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
