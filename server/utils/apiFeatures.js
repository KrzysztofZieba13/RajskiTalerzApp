class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (queryObj.isVisibleNotification) {
      queryObj.isVisibleNotification =
        queryObj.isVisibleNotification === 'true';
    }

    Object.keys(queryObj).forEach((key) => {
      if (key !== 'status') return;
      if (queryObj[key].includes(',')) {
        queryObj[key] = { $in: queryObj[key].split(',') };
      }
    });

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|ne)\b/g,
      (match) => `$${match}`,
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    }

    return this;
  }
}

module.exports = APIFeatures;
