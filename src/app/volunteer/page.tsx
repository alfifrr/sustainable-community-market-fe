"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SectionContainer } from "@/components/SectionContainer";

export default function VolunteerPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-white">
            <SectionContainer className="!h-auto">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-4 text-center text-black">Volunteer With Us</h1>
                    <div className="h-1 w-24 bg-success mx-auto mb-8"></div>

                    <div className="text-center mb-12">
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Join our community of passionate volunteers and help us create a more sustainable future.
                            Your time and skills can make a real difference in promoting sustainable practices and
                            supporting local communities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="card bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-success/30">
                            <div className="card-body">
                                <h3 className="card-title text-black">Community Events</h3>
                                <p className="text-gray-600">
                                    Help organize and support local sustainability events, farmers markets, and educational workshops.
                                </p>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Event coordination</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Community outreach</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">On-site support</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-success/30">
                            <div className="card-body">
                                <h3 className="card-title text-black">Education & Awareness</h3>
                                <p className="text-gray-600">
                                    Share knowledge about sustainable practices and help educate the community.
                                </p>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Workshop facilitation</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Content creation</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Social media support</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-success/30">
                            <div className="card-body">
                                <h3 className="card-title text-black">Technical Support</h3>
                                <p className="text-gray-600">
                                    Provide technical assistance to our platform and help improve user experience.
                                </p>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">User support</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Platform testing</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Documentation</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-semibold mb-4 text-black">Ready to Make a Difference?</h2>
                        <p className="text-gray-600 mb-8">
                            Contact us today to learn more about our volunteer opportunities and how you can get involved.
                        </p>
                        <button
                            onClick={() => router.push("/contact")}
                            className="btn bg-success text-white hover:bg-success/80"
                        >
                            Contact Us to Volunteer
                        </button>
                    </div>
                </div>
            </SectionContainer>
        </main>
    );
}