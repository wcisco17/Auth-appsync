// tslint:disable
// this is an auto generated file. This will be overwritten

export const getRestaurant = `query GetRestaurant($id: ID!) {
  getRestaurant(id: $id) {
    id
    food
    price
    cook
  }
}
`;
export const listRestaurants = `query ListRestaurants(
  $filter: ModelRestaurantFilterInput
  $limit: Int
  $nextToken: String
) {
  listRestaurants(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      food
      price
      cook
    }
    nextToken
  }
}
`;
