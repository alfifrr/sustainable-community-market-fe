"use client";
import React from "react";
import { SectionContainer } from "@/components/SectionContainer";

export default function ImpactPage() {
  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-base-100 to-base-200">
      <SectionContainer className="!h-auto">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Impact Report</h1>

          <div className="mb-12">
            <p className="text-lg text-center max-w-3xl mx-auto mb-8">
              Sustainable Community Market is committed to transparency and
              accountability. Our impact report shows how our business affects
              the environment, communities, and local economies.
            </p>
          </div>

          {/* Highlight Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="card bg-primary text-primary-content shadow-xl">
              <div className="card-body text-center">
                <h2 className="text-4xl font-bold mb-2">2,500 kg</h2>
                <p>Food waste successfully reduced</p>
              </div>
            </div>
            <div className="card bg-secondary text-secondary-content shadow-xl">
              <div className="card-body text-center">
                <h2 className="text-4xl font-bold mb-2">500+</h2>
                <p>Local farmers supported</p>
              </div>
            </div>
            <div className="card bg-accent text-accent-content shadow-xl">
              <div className="card-body text-center">
                <h2 className="text-4xl font-bold mb-2">15,000+</h2>
                <p>Sustainable transactions</p>
              </div>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="bg-base-100 p-8 rounded-xl shadow-lg mb-12">
            <h2 className="text-2xl font-semibold mb-6">
              Environmental Impact
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-2">85%</div>
                <p>Reduction in single-use plastic packaging</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-2">
                  12 tons
                </div>
                <p>Annual carbon emissions reduction</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <p>Products from sustainable sources</p>
              </div>
            </div>

            <p className="mb-4">
              We are committed to reducing our environmental footprint through
              sustainable business practices. Our initiatives include:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Reusable and refillable packaging programs</li>
              <li>
                Partnerships with farmers using regenerative agricultural
                practices
              </li>
              <li>Use of renewable energy in all our facilities</li>
              <li>Waste reduction and composting programs</li>
            </ul>

            <div className="bg-base-200 p-4 rounded-lg">
              <p className="italic text-sm">
                &quot;Charts will be added here to show waste reduction and
                carbon emissions over time.&quot;
              </p>
            </div>
          </div>

          {/* Social Impact */}
          <div className="bg-base-100 p-8 rounded-xl shadow-lg mb-12">
            <h2 className="text-2xl font-semibold mb-6">Social Impact</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-2">250+</div>
                <p>Local farmers and producers supported</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-2">15</div>
                <p>Community education programs run</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-2">
                  5,000+
                </div>
                <p>Volunteer hours donated</p>
              </div>
            </div>

            <p className="mb-4">
              We believe business should be a force for social good. Our social
              impact programs include:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Training and support for local farmers and producers</li>
              <li>Educational programs about sustainability and agriculture</li>
              <li>Partnerships with local nonprofit organizations</li>
              <li>
                Food justice initiatives to improve access to healthy food
              </li>
            </ul>

            <div className="bg-base-200 p-4 rounded-lg">
              <p className="italic text-sm">
                &quot;Maps will be added here to show community reach and social
                impact.&quot;
              </p>
            </div>
          </div>

          {/* Economic Impact */}
          <div className="bg-base-100 p-8 rounded-xl shadow-lg mb-12">
            <h2 className="text-2xl font-semibold mb-6">Economic Impact</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-2">
                  $140K+
                </div>
                <p>Revenue generated for local economy</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-2">75+</div>
                <p>Local jobs created</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-2">35%</div>
                <p>Average income increase for partner farmers</p>
              </div>
            </div>

            <p className="mb-4">
              We are committed to building a strong and resilient local economy.
              Our economic impact includes:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Creating local jobs with living wages</li>
              <li>Paying fair prices to farmers and producers</li>
              <li>Investing in local community infrastructure</li>
              <li>Supporting small businesses and local entrepreneurs</li>
            </ul>

            <div className="bg-base-200 p-4 rounded-lg">
              <p className="italic text-sm">
                &quot;Charts will be added here to show local economic growth
                and income impact.&quot;
              </p>
            </div>
          </div>

          {/* Future Goals */}
          <div className="bg-base-100 p-8 rounded-xl shadow-lg mb-12">
            <h2 className="text-2xl font-semibold mb-6">Future Goals</h2>

            <p className="mb-4">
              We are committed to continuously improving our positive impact.
              Our goals for the coming year include:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Reducing carbon emissions by an additional 25%</li>
              <li>Expanding our reach to 5 new communities</li>
              <li>Launching a sustainability education program for schools</li>
              <li>Achieving 100% recyclable or compostable packaging</li>
              <li>Increasing our partner farmers and producers by 30%</li>
            </ul>

            <div className="mt-6">
              <a href="#" className="btn btn-primary">
                Download Full Report
              </a>
            </div>
          </div>

          {/* Download Report */}
          <div className="text-center">
            <a href="#" className="btn btn-primary btn-lg">
              Download Full Report (PDF)
            </a>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
