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
