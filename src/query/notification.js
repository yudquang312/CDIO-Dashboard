import { gql } from '@apollo/client';

export const BOOK_ADMIN_NOTIFICATION = gql`
    subscription receiveNotificationBookAdmin($userId: ID!) {
        receiveNotificationBookAdmin(userId: $userId) {
            id
            title
            description
            seen
            status
            uniqueBook
            createdAt
            updatedAt
        }
    }
`;

export const GET_BOOK_NOTIFICATIONS = gql`
    query notificationsBookOfAdmin {
        notificationsBookOfAdmin {
            id
            title
            description
            seen
            status
            createdAt
            updatedAt
        }
    }
`;
export const GET_BOOK_NOTIFICATION = gql`
    query notificationBookOfAdmin($id: ID!) {
        notificationBookOfAdmin(id: $id) {
            id
            title
            description
            data {
                name
                images
                year
                numberOfReprint
                publisher
                category {
                    id
                    name
                }
                author
                description
            }
            seen
            status
            uniqueBook {
                id
                name
                images
                year
                numberOfReprint
                publisher
                author
                description
                category {
                    id
                    name
                }
            }
        }
    }
`;
export const SEEN_NOTIFICATION = gql`
    mutation seenNotificationBookAdmin($id: ID!) {
        seenNotificationBookAdmin(id: $id) {
            message
        }
    }
`;
