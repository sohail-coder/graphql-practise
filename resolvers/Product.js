exports.Product = {
  category: (parent, args, { db }) => {
    const id = parent.categoryId;
    return db.categories.find((category) => category.id === id);
  },
  reviews: (parent, args, { db }) => {
    return db.reviews.filter((review) => review.productId === parent.id);
  },
};
