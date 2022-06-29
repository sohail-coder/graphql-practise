// const { products, categories, reviews } = require("../db");
exports.Query = {
  products: (parent, { filter }, { db }) => {
    let filteredProducts = db.products;
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => {
          return product.onSale;
        });
      }
      if (!onSale) {
        filteredProducts = filteredProducts.filter((product) => {
          return !product.onSale;
        });
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          db.reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          let average = sumRating / numberOfReviews;
          console.log(sumRating, product.name, avgRating);
          return average >= avgRating;
        });
      }
    }

    return filteredProducts;
  },
  product: (parent, args, { db }) => {
    const productId = args.id;
    const product = db.products.find((product) => product.id === productId);
    if (!product) return null;
    return product;
  },
  categories: (parent, args, { db }) => {
    return db.categories;
  },
  category: (parent, args, { db }) => {
    const { id } = args;
    return db.categories.find((category) => category.id === id);
  },
};
