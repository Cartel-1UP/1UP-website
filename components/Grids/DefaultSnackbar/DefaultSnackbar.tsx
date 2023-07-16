'use client'
import { Notification } from '@mantine/core';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useNotifiactionStore } from '../../../zustand/stores/useNotificationStore';
import useStyles from './style';

interface Props {
    id: string;
    title: string;
    message: string;
    queryKey?: string;
}

export function DefaultSnackbar({ id, title, message, queryKey }: Props) {
    const { removeSnackbar } = useNotifiactionStore((state) => state);
    const queryCache = useQueryClient();
    const { classes, theme } = useStyles();

    useEffect(() => {
        const timeout = setTimeout(() => {
            removeSnackbar(id);
            queryKey && queryCache.invalidateQueries(queryKey);
        }, 10000);

        return () => {
            clearTimeout(timeout);
        };
    }, [id, removeSnackbar, queryCache, queryKey]);

    return (
        <div className={classes.snackbarContainer}>
            <Notification title={title}>{message}</Notification>
        </div>
    );
}

