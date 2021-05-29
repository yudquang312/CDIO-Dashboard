import { useSubscription } from '@apollo/client';
import { BOOK_ADMIN_NOTIFICATION } from 'query/notification';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { message } from 'antd';

const Notification = (props) => {
    const history = useHistory();
    const location = useLocation();
    const { data } = useSubscription(BOOK_ADMIN_NOTIFICATION, {
        variables: {
            userId: sessionStorage.getItem('userId'),
        },
    });
    useEffect(() => {
        if (data) {
            if (location.pathname === '/admin/manage-notification') {
                history.go(0);
            } else {
                message.info(data.receiveNotificationBookAdmin.description);
            }
        }
        return () => {
            // cleanup;
        };
    }, [data]);
    return <React.Fragment>{props.children}</React.Fragment>;
};
export default Notification;
