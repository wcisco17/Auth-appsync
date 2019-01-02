/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateRestaurantInput = {
  id?: string | null,
  food: string,
  price: number,
  cook?: string | null,
};

export type UpdateRestaurantInput = {
  id: string,
  food?: string | null,
  price?: number | null,
  cook?: string | null,
};

export type DeleteRestaurantInput = {
  id?: string | null,
};

export type ModelRestaurantFilterInput = {
  id?: ModelIDFilterInput | null,
  food?: ModelStringFilterInput | null,
  price?: ModelFloatFilterInput | null,
  cook?: ModelStringFilterInput | null,
  and?: Array< ModelRestaurantFilterInput | null > | null,
  or?: Array< ModelRestaurantFilterInput | null > | null,
  not?: ModelRestaurantFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelFloatFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export type CreateRestaurantMutationVariables = {
  input: CreateRestaurantInput,
};

export type CreateRestaurantMutation = {
  createRestaurant:  {
    __typename: "Restaurant",
    id: string,
    food: string,
    price: number,
    cook: string | null,
  } | null,
};

export type UpdateRestaurantMutationVariables = {
  input: UpdateRestaurantInput,
};

export type UpdateRestaurantMutation = {
  updateRestaurant:  {
    __typename: "Restaurant",
    id: string,
    food: string,
    price: number,
    cook: string | null,
  } | null,
};

export type DeleteRestaurantMutationVariables = {
  input: DeleteRestaurantInput,
};

export type DeleteRestaurantMutation = {
  deleteRestaurant:  {
    __typename: "Restaurant",
    id: string,
    food: string,
    price: number,
    cook: string | null,
  } | null,
};

export type GetRestaurantQueryVariables = {
  id: string,
};

export type GetRestaurantQuery = {
  getRestaurant:  {
    __typename: "Restaurant",
    id: string,
    food: string,
    price: number,
    cook: string | null,
  } | null,
};

export type ListRestaurantsQueryVariables = {
  filter?: ModelRestaurantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRestaurantsQuery = {
  listRestaurants:  {
    __typename: "ModelRestaurantConnection",
    items:  Array< {
      __typename: "Restaurant",
      id: string,
      food: string,
      price: number,
      cook: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateRestaurantSubscription = {
  onCreateRestaurant:  {
    __typename: "Restaurant",
    id: string,
    food: string,
    price: number,
    cook: string | null,
  } | null,
};

export type OnUpdateRestaurantSubscription = {
  onUpdateRestaurant:  {
    __typename: "Restaurant",
    id: string,
    food: string,
    price: number,
    cook: string | null,
  } | null,
};

export type OnDeleteRestaurantSubscription = {
  onDeleteRestaurant:  {
    __typename: "Restaurant",
    id: string,
    food: string,
    price: number,
    cook: string | null,
  } | null,
};
