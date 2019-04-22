import _ from "lodash";
// to slice the movies array into the pageSize and return it as a new array to be rendered again
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items) // wraps the items array into lodash to chain methods
    .slice(startIndex)
    .take(pageSize)
    .value();
}
