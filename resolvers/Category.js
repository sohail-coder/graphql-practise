exports.Category = {
  products: ({ id }, { filter }, { db }) => {
    let categoryProducts = db.products.filter(
      (product) => product.categoryId === id
    );
    if (filter) {
      if (filter.onSale === true) {
        categoryProducts = categoryProducts.filter((product) => {
          return product.onSale;
        });
      }
      if (filter.onSale === false) {
        categoryProducts = categoryProducts.filter((product) => {
          return !product.onSale;
        });
      }
      if ([1, 2, 3, 4, 5].includes(filter.avgRating)) {
        categoryProducts = categoryProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          db.reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          let average = sumRating / numberOfReviews;
          return average >= filter.avgRating;
        });
      }
    }
    return categoryProducts;
  },
};
