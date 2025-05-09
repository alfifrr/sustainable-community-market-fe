"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SectionContainer } from "@/components/SectionContainer";

export default function DonatePage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-white">
            <SectionContainer className="!h-auto">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-4 text-center text-black">Support Our Mission</h1>
                    <div className="h-1 w-24 bg-success mx-auto mb-8"></div>

                    <div className="text-center mb-12">
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Your support helps us build a more sustainable future. Every contribution makes a difference
                            in connecting communities with sustainable products and practices.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="card bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-success/30">
                            <div className="card-body">
                                <h3 className="card-title text-black">Support Local Farmers</h3>
                                <p className="text-gray-600">
                                    Help small-scale sustainable farmers access markets and receive fair compensation.
                                </p>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Market access</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Fair pricing</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Training support</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-success/30">
                            <div className="card-body">
                                <h3 className="card-title text-black">Reduce Food Waste</h3>
                                <p className="text-gray-600">
                                    Support innovative solutions to minimize food waste throughout the supply chain.
                                </p>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Smart logistics</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Waste tracking</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Community programs</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-success/30">
                            <div className="card-body">
                                <h3 className="card-title text-black">Educate Communities</h3>
                                <p className="text-gray-600">
                                    Help develop educational programs that promote sustainable food practices.
                                </p>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Workshops</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">School programs</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Online resources</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-semibold mb-4 text-black">Ready to Support Our Mission?</h2>
                        <p className="text-gray-600 mb-8">
                            Contact us today to learn more about how you can contribute to our mission and make
                            a lasting impact on sustainable communities.
                        </p>
                        <button
                            onClick={() => router.push("/contact")}
                            className="btn bg-success text-white hover:bg-success/80"
                        >
                            Contact Us to Support
                        </button>
                    </div>
                </div>
            </SectionContainer>
        </main>
    );
}