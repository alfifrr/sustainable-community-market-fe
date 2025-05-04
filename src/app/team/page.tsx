"use client";
import React from "react";
import { SectionContainer } from "@/components/SectionContainer";
import Image from "next/image";

interface TeamMember {
    id: number;
    name: string;
    imagePlaceholder: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Team Member 1",
        imagePlaceholder: "/team-member-1.jpg" // Placeholder, will be replaced later
    },
    {
        id: 2,
        name: "Team Member 2",
        imagePlaceholder: "/team-member-2.jpg" // Placeholder, will be replaced later
    },
    {
        id: 3,
        name: "Team Member 3",
        imagePlaceholder: "/team-member-3.jpg" // Placeholder, will be replaced later
    },
    {
        id: 4,
        name: "Team Member 4",
        imagePlaceholder: "/team-member-4.jpg" // Placeholder, will be replaced later
    }
];

export default function TeamPage() {
    return (
        <main className="min-h-screen py-12 bg-gradient-to-b from-base-100 to-base-200">
            <SectionContainer className="!h-auto">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-8 text-center">Our Team</h1>

                    <div className="mb-12">
                        <p className="text-lg text-center max-w-3xl mx-auto mb-8">
                            Meet the dedicated team behind Sustainable Community Market. We are a group of passionate individuals committed to building a more sustainable future through community connections and responsible business practices.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="card bg-base-100 shadow-xl overflow-hidden">
                                <figure className="relative h-80 w-full bg-base-300">
                                    {/* Placeholder untuk foto yang akan diupload nanti */}
                                    <div className="w-full h-full flex items-center justify-center text-base-content/50">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-2xl">{member.name}</h2>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-base-100 p-8 rounded-xl shadow-lg mb-12">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Join Our Team</h2>
                        <p className="text-center mb-6">
                            We are always looking for talented and passionate individuals who share our vision of sustainability and community impact. Check out our open positions or contact us to learn more about careers at Sustainable Community Market.
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