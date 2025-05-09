"use client";
import React from "react";
import { SectionContainer } from "@/components/SectionContainer";

interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

const jobOpenings: JobOpening[] = [
  {
    id: 1,
    title: "Sustainability Manager",
    department: "Operations",
    location: "Jakarta",
    type: "Full-time",
    description:
      "Lead our sustainability initiatives and ensure all our operations meet the highest environmental standards. Responsible for developing and implementing sustainability strategies across the organization.",
  },
  {
    id: 2,
    title: "Community Outreach Coordinator",
    department: "Marketing",
    location: "Bandung",
    type: "Full-time",
    description:
      "Build and maintain relationships with local farmers, producers, and communities. Coordinate community engagement programs and events to promote our sustainability mission.",
  },
  {
    id: 3,
    title: "Frontend Developer",
    department: "Technology",
    location: "Remote",
    type: "Full-time",
    description:
      "Develop and maintain our marketplace user interface using React, Next.js, and Tailwind CSS. Collaborate with design and backend teams to create exceptional user experiences.",
  },
  {
    id: 4,
    title: "Supply Chain Analyst",
    department: "Operations",
    location: "Surabaya",
    type: "Full-time",
    description:
      "Analyze and optimize our supply chain to maximize efficiency and sustainability. Work with farmers and producers to ensure best practices in shipping and distribution.",
  },
  {
    id: 5,
    title: "Content Creator",
    department: "Marketing",
    location: "Jakarta",
    type: "Part-time",
    description:
      "Create engaging content about sustainability, local farming, and eco-friendly lifestyles for our blog and social media. Collaborate with the marketing team to develop effective content strategies.",
  },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-base-100 to-base-200">
      <SectionContainer className="!h-auto">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Careers at Sustainable Community Market
          </h1>

          <div className="mb-12">
            <p className="text-lg text-center max-w-3xl mx-auto mb-8">
              Join our team dedicated to building a more sustainable future.
              We&apos;re looking for talented and passionate individuals who
              share our vision of sustainability, community impact, and
              responsible business.
            </p>
          </div>

          {/* Why Work With Us */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-center">
              Why Work With Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title">Real Impact</h3>
                  <p>
                    Your work will have a direct impact on the environment and
                    local communities. Every day, you&apos;ll be helping to
                    build a more sustainable food system.
                  </p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title">Collaborative Culture</h3>
                  <p>
                    We believe in the power of collaboration. Our team works
                    closely together to solve problems and create innovative
                    solutions.
                  </p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title">Professional Growth</h3>
                  <p>
                    We&apos;re committed to our employees&apos; development.
                    You&apos;ll have opportunities to learn, grow, and develop
                    new skills.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Job Openings */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Current Openings</h2>
            <div className="space-y-6">
              {jobOpenings.map((job) => (
                <div key={job.id} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div>
                        <h3 className="card-title text-xl">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <div className="badge badge-primary">
                            {job.department}
                          </div>
                          <div className="badge badge-secondary">
                            {job.location}
                          </div>
                          <div className="badge badge-outline">{job.type}</div>
                        </div>
                      </div>
                      <a
                        href={`#apply-${job.id}`}
                        className="btn btn-primary self-start md:self-center"
                      >
                        Apply
                      </a>
                    </div>
                    <p className="mt-4">{job.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Benefits</h2>
            <div className="bg-base-100 p-8 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium mb-4">
                    Health & Wellness
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Comprehensive health insurance</li>
                    <li>Wellness and fitness programs</li>
                    <li>Flexible paid time off</li>
                    <li>Mental health support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-4">
                    Professional Development
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Professional development budget</li>
                    <li>Regular training and workshops</li>
                    <li>Mentoring programs</li>
                    <li>Clear career paths</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-4">Work Environment</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Remote and flexible work options</li>
                    <li>Eco-friendly offices</li>
                    <li>Free organic food and beverages</li>
                    <li>Team events and retreats</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-4">Social Impact</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Paid volunteer days</li>
                    <li>Donation matching programs</li>
                    <li>Discounts on sustainable products</li>
                    <li>Corporate social responsibility initiatives</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Application Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Application Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-content text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="font-medium mb-2">Online Application</h3>
                <p className="text-sm">
                  Submit your resume and cover letter through our careers
                  portal.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-content text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="font-medium mb-2">Initial Interview</h3>
                <p className="text-sm">
                  A brief discussion with our recruitment team to get to know
                  you better.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-content text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="font-medium mb-2">Team Interview</h3>
                <p className="text-sm">
                  Meet with team members and managers for a more in-depth
                  discussion.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-content text-xl font-bold mb-4">
                  4
                </div>
                <h3 className="font-medium mb-2">Offer</h3>
                <p className="text-sm">
                  If it&apos;s a match, we&apos;ll send you an offer and welcome
                  you to the team!
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <p className="mb-4">
              Don&apos;t see a position that fits? We&apos;re always looking for
              exceptional talent!
            </p>
            <a href="/contact" className="btn btn-primary btn-lg">
              Contact Our Recruitment Team
            </a>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
