import { gql } from "@apollo/client";

export const GET_UNIQUE_BOOKS = gql`
  query uniqueBooks {
    uniqueBooks {
      id
      name
      images
      year
      numberOfReprint
      publisher
      author
      description
      createdAt
      updatedAt
      category {
        id
        name
      }
    }
  }
`;

export const GET_UNIQUE_BOOK = gql`
  query uniqueBook($id: ID!) {
    uniqueBook(id: $id) {
      name
      images
      year
      numberOfReprint
      publisher
      author
      description
      createdAt
      updatedAt
      category {
        id
        name
      }
    }
  }
`;

export const CREATE_UNIQUE_BOOK = gql`
  mutation createUniqueBook($dataCreate: UniqueBookCreate!) {
    createUniqueBook(dataCreate: $dataCreate) {
      message
    }
  }
`;

export const UPDATE_UNIQUE_BOOK = gql`
  mutation updateUniqueBook($dataUpdate: UniqueBookUpdate!, $id: ID!) {
    updateUniqueBook(dataUpdate: $dataUpdate, id: $id) {
      message
    }
  }
`;

export const DELETE_UNIQUE_BOOK = gql`
  mutation deleteUniqueBook($id: ID!) {
    deleteUniqueBook(id: $id) {
      message
    }
  }
`;