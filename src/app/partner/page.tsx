"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SectionContainer } from "@/components/SectionContainer";

export default function PartnerPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-white">
            <SectionContainer className="!h-auto">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-4 text-center text-black">Partner With Us</h1>
                    <div className="h-1 w-24 bg-success mx-auto mb-8"></div>

                    <div className="text-center mb-12">
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Join our network of sustainable partners and help us create a more environmentally
                            conscious marketplace. Together, we can make a lasting impact on our communities
                            and the planet.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="card bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-success/30">
                            <div className="card-body">
                                <h3 className="card-title text-black">Corporate Partnerships</h3>
                                <p className="text-gray-600">
                                    Collaborate with us to promote sustainable business practices and reach environmentally conscious consumers.
                                </p>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Brand visibility</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Joint marketing</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Impact reporting</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-success/30">
                            <div className="card-body">
                                <h3 className="card-title text-black">Technology Integration</h3>
                                <p className="text-gray-600">
                                    Integrate your sustainable solutions with our platform to enhance user experience.
                                </p>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">API access</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Technical support</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Custom solutions</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-success/30">
                            <div className="card-body">
                                <h3 className="card-title text-black">Supply Chain</h3>
                                <p className="text-gray-600">
                                    Join our sustainable supply chain network and reach environmentally conscious customers.
                                </p>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Market access</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Logistics support</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-success">✓</span>
                                        <span className="text-gray-600">Growth opportunities</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-semibold mb-4 text-black">Ready to Partner With Us?</h2>
                        <p className="text-gray-600 mb-8">
                            Contact us today to discuss partnership opportunities and how we can work together
                            for a more sustainable future.
                        </p>
                        <button
                            onClick={() => router.push("/contact")}
                            className="btn bg-success text-white hover:bg-success/80"
                        >
                            Contact Us to Partner
                        </button>
                    </div>
                </div>
            </SectionContainer>
        </main>
    );
}