class ApiFeatures {
  constructor(query, mongoQuery) {
    this.query = query;
    this.mongoQuery = mongoQuery;
  }

  filter() {
    let { page, limit, sort, fields, keyword, ...filters } = this.query;

    filters = JSON.stringify(filters).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filters);
    this.mongoQuery.find(filters);
    return this;
  }

  sort() {
    let { sort } = this.query;
    if (sort) {
      sort = sort.replace(",", " ");
      this.mongoQuery.sort(sort);
    }

    return this;
  }

  select() {
    let { fields } = this.query;
    if (fields) {
      fields = fields.replace(",", " ");
      this.mongoQuery.select(fields);
    }
    return this;
  }

  search() {
    const { keyword } = this.query;

    if (keyword) {
      const searchObj = {};
      searchObj.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
      this.mongoQuery.find(searchObj);
    }
    return this;
  }

  paginate(count) {
    const { page = 1, limit = 10 } = this.query;
    const skip = (page - 1) * limit;
    const prev = page > 1 ? page - 1 : null;
    const next = page * limit < count ? page + 1 : null;
    const numberOfPages = Math.ceil(count / limit);

    this.pagination = {
      page,
      limit,
      prev,
      next,
      numberOfPages,
    };
    this.mongoQuery.skip(skip);

    return this;
  }
}

export default ApiFeatures;
