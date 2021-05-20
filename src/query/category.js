import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query categories {
    categories {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const GET_BOOKS_CATEGORIES = gql`
  query booksByCategory($id: ID!) {
    booksByCategory(id: $id) {
      id
      name
      book {
        id
        name
        images
        year
        numberOfReprint
        publisher
        category {
          id
          name
        }
      }
      store {
        id
        name
        avatar
      }
      amount
      price
      sold
      name
      images
      year
      numberOfReprint
      publisher
      category {
        id
        name
      }
      createdAt
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory($name: String!) {
    createCategory(name: $name) {
      message
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: String!, $name: String) {
    updateCategory(id: $id, name: $name) {
      message
    }
  }
`;
// t de nham me cai type id roi
export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      message
    }
  }
`;
