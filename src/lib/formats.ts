export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getCategoryImage = (categoryId: number): string => {
  const categoryImages: Record<number, string> = {
    1: "/images/categories/meals-snacks.jpg",
    2: "/images/categories/beverages.jpg",
    3: "/images/categories/grains-staples.jpg",
    4: "/images/categories/protein-dairy.jpg",
    5: "/images/categories/vegetables-fruits.jpg",
    6: "/images/categories/seasonings.jpg",
    7: "/images/categories/clothing-gear.jpg",
    8: "/images/categories/tools.jpg",
    9: "/images/categories/hygiene-cleaning.jpg",
  };

  return categoryImages[categoryId] || "/images/categories/default.jpg";
};

// Map certification icons to local images
export const getCertificationImage = (icon: string): string => {
  const certificationImages: Record<string, string> = {
    "🌱": "/images/certifications/organic.jpg",
    "♻️": "/images/certifications/recycled.jpg",
    "🌍": "/images/certifications/eco-friendly.jpg",
    "🌿": "/images/certifications/natural.jpg",
    "💧": "/images/certifications/water-efficient.jpg",
    "☀️": "/images/certifications/solar-powered.jpg",
    "🌾": "/images/certifications/sustainable-farming.jpg",
    "🐝": "/images/certifications/bee-friendly.jpg",
    "🌳": "/images/certifications/forest-friendly.jpg",
    "🔋": "/images/certifications/energy-efficient.jpg",
  };

  return certificationImages[icon] || "/images/certifications/default.jpg";
};
