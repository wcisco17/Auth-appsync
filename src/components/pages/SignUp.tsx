import * as React from 'react'
import { SignUpShow } from '../types/Interface';
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';
import { Auth } from 'aws-amplify'

import { Formik } from 'formik'

interface SignUpValues {
    username: string
    password: string
    email: string
    phone_number: string
}


export const SignUp = (props: SignUpShow) => {
    let [message, onMessage] = React.useState("");
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
                            phone_number: ""
                        }}
                        onSubmit={async ({ username, password, email, phone_number }, { resetForm }) => {
                            try {
                                const response = await Auth.signUp({
                                    username,
                                    password,
                                    attributes: {
                                        email,
                                        phone_number,
                                    },
                                })
                                if (!response) {
                                    console.log("Response Error: ", response)
                                }
                                return response
                            } catch (err) {
                                console.log("Error: ", err.message)

                                onMessage(err.message)
                            }
                            resetForm()
                        }}
                    >
                        {({ values, handleChange, handleSubmit }) => {
                            return (
                                <React.Fragment>
                                    {
                                        <p className="err" >{message}</p> && null
                                    }
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
                                        <div>
                                            <TextField name="phone_number" value={values.phone_number} label="Phone Number ..."
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