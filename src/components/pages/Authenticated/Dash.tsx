import * as React from 'react'
import { Avatar } from '@material-ui/core';

interface Props {
    authenticated: any
}

export const Dash = (props: Props) => {
    console.log('Dashboard: ', props.authenticated.attributes.email)
    const user = props.authenticated.username[0].toUpperCase()

    return (
        <React.Fragment>
            <Avatar  >
                {user}
            </Avatar>
        </React.Fragment>
    );
}