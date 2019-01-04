import * as React from 'react'
import { SignUpShow } from '../types/Interface';
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';
import { Auth } from 'aws-amplify'

import { Formik } from 'formik'
import { Confirm } from './Confirm';

interface SignUpValues {
    username: string
    password: string
    email: string
}


export const SignUp = (props: SignUpShow) => {
    let [message, onMessage] = React.useState("")
    return (
        <React.Fragment>
            <div className="modal__content2">
                <div className="close-login" >
                    <Close className="cursor-close"
                        onClick={() => {
                            props.onModule("none")
                        }}
                    />
                </div>
                <div className="modules_login">
                    <h4>Sign Up Page</h4>
                    <Formik<SignUpValues>
                        initialValues={{
                            username: "",
                            password: "",
                            email: "",
                        }}
                        onSubmit={async ({ username, password, email }, { resetForm }) => {
                            try {
                                const response = await Auth.signUp({
                                    username,
                                    password,
                                    attributes: {
                                        email,
                                        given_name: "",
                                        family_name: "",
                                        phone_number: ""
                                    },
                                })
                                if (response) {
                                    props.confirm()
                                }
                                return response
                            } catch (err) {
                                console.log("Error: ", err.message)

                                onMessage(JSON.stringify(err.message))
                            }
                            resetForm()
                        }}
                    >
                        {({ values, handleChange, handleSubmit }) => {
                            console.log(message)
                            return (
                                <React.Fragment>
                                    <div>
                                        <p className="err" >{message}</p>
                                    </div>
                                    <form onSubmit={handleSubmit} className="form-container" >
                                        <div>
                                            <TextField name="username"
                                                value={values.username} label="Username ..."
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <TextField name="password" value={values.password} label="Password ..."
                                                type="password"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <TextField name="email" value={values.email} label="Email ..."
                                                type="text"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="btn-login" >
                                            <Button
                                                type="submit" variant="contained" color="secondary">
                                                Submit
                                            </Button>
                                        </div>
                                    </form>
                                </React.Fragment>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </React.Fragment>
    );
}