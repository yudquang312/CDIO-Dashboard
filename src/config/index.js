import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
    concat,
    split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { createUploadLink } from 'apollo-upload-client';
const url = `http://localhost:3000`;
const httpLink = createUploadLink({ uri: `${url}/graphql` });

const wsLink = new WebSocketLink({
    uri: `ws://localhost:3000/subscriptions`,
    options: {
        reconnect: true,
    },
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink
);

const authMiddleware = new ApolloLink(async (operation, forward) => {
    operation.setContext({
        headers: {
            authorization: localStorage.getItem('token'),
            refresh_token: localStorage.getItem('refreshToken'),
            'Access-Control-Allow-Origin': '*',
        },
    });
    return forward(operation);
});

export const Client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, splitLink),
});
