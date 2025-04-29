"use client";
import Image from "next/image";

interface ProfileCard {
  name: string;
  role: string;
  description: string;
  image: string;
  testimonial: string;
}

const profiles: ProfileCard[] = [
  {
    name: "Sarah Azkia",
    role: "Organic Farmer",
    description: "Growing pesticide-free vegetables for 15 years",
    image: "/images/female-farmer.jpg",
    testimonial:
      "This platform has helped me reach customers who truly value sustainable farming.",
  },
  {
    name: "David Djaelani",
    role: "Regular Customer",
    description: "Supporting local farmers since 2023",
    image: "/images/happy-man.jpg",
    testimonial:
      "I love knowing exactly where my food comes from and who grew it.",
  },
  {
    name: "Maria Lestari",
    role: "Market Coordinator",
    description: "Connecting farmers with urban communities",
    image: "/images/female-coordinator.jpg",
    testimonial:
      "Seeing the direct impact we make on both farmers and consumers is incredible.",
  },
];

export default function CommunitySection() {
  return (
    <section className="py-16 md:py-24 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Community</h2>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
            Meet the amazing people who make our sustainable marketplace
            possible. From dedicated farmers to conscious consumers, we&apos;re
            building a better future together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="card bg-base-200 hover:shadow-xl transition-all overflow-hidden"
            >
              <figure className="relative h-48">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{profile.name}</h3>
                <div className="badge badge-primary">{profile.role}</div>
                <p className="text-base-content/80">{profile.description}</p>
                <blockquote className="mt-4 p-4 bg-base-300 rounded-lg italic">
                  "{profile.testimonial}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn btn-primary btn-lg">Join Our Community</button>
        </div>
      </div>
    </section>
  );
}
