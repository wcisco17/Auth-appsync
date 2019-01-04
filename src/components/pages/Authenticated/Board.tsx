import * as React from 'react'

import { Avatar, Button } from '@material-ui/core';
import { EditName } from '../../molecules/Forms/EditName';
import { Auth } from 'aws-amplify';
interface Props {
    authenticated: any
}

const signOut = async () => {
    try {
        const out = await Auth.signOut()
        if (out) {
            console.log('Success', out)
        }
        return out
    } catch (err) {
        console.log('Error: ', err)
    }
}

export const Board = (props: Props) => {
    const user = props.authenticated.username[0].toUpperCase()
    const email = props.authenticated.attributes.email

    const [edit, onEdit] = React.useState(false)

    let { given_name } = props.authenticated.attributes

    return (
        <section className="container-dashboard" >
            <div className="avatar" >
                <div className="a" >
                    <Avatar>
                        {user}
                    </Avatar>
                </div>
                <p style={{
                    paddingTop: 12,
                    fontWeight: "bold",
                    fontSize: 20
                }} >{user + props.authenticated.username.slice(1)}</p>
                <div style={{
                    paddingTop: "300px"

                }} >
                    <h3 style={{
                        paddingBottom: 20
                    }} >
                        My Profile
                </h3>
                    <div style={{ paddingTop: 25, paddingBottom: 25 }} >
                        <h3>
                            Email: {email}
                        </h3>
                    </div>

                    <Button
                        onClick={() => signOut()}
                        type="submit" variant="contained" color="secondary">
                        Sign Out
                        </Button>
                </div>
            </div>

            <div className="boxes1">
                <div>
                    <h4 className="head-1" >
                        NAME
                    </h4>
                    <p>Your First name will appear as your display name</p>
                    <h5 style={{ paddingTop: 40, paddingBottom: 20, fontSize: 15 }} >First Name: {given_name}</h5>
                    {edit === false ?
                        null :
                        (
                            <div>
                                <EditName authenticated={props.authenticated} />
                            </div>

                        )}

                </div>
                <div style={{ paddingRight: 30 }} >
                    {edit === false ? (
                        <Button
                            onClick={() => onEdit(true)}
                            style={{
                                color: "#2d3651",
                                fontWeight: "bold"
                            }} >
                            Edit name
                    </Button>

                    )
                        :
                        (
                            <Button
                                onClick={() => onEdit(false)}
                                style={{
                                    color: "red",
                                    fontWeight: "bold"
                                }} >
                                Cancel
                    </Button>
                        )

                    }
                </div>
            </div>


            <div className="boxes2">
                <div>

                    <h4 className="head-1" >
                        EMAIL
                    </h4>
                    <p>Change your email Address here</p>
                </div>
                <div style={{ paddingRight: 30 }} >
                    <Button style={{
                        color: "#2d3651",
                        fontWeight: "bold"
                    }}>
                        Edit email
                    </Button>
                </div>
            </div>


            <div className="boxes3">
                <div>

                    <h4 className="head-1" >
                        CONTACT
            </h4>
                    <p>Add your mobile phone here</p>
                </div>
                <div style={{ paddingRight: 30 }} >
                    <Button style={{
                        color: "#2d3651",
                        fontWeight: "bold"
                    }}>
                        Edit contact
                    </Button>
                </div>
            </div>
        </section>
    );
}