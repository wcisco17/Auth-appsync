import * as React from 'react'
import { Show } from '../types/Interface';
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';

import { Auth } from 'aws-amplify'

import { Formik } from 'formik'


interface LoginValues {
    username: string
    password: string
}




export const Login = (props: Show) => {
    let [message, onMessage] = React.useState("")
    return (
        <React.Fragment>
            <div className="modal__content">
                <div className="close-login" >
                    <Close className="cursor-close"
                        onClick={() => {
                            props.onModal("none")
                        }}
                    />
                </div>
                <div className="modules_login">
                    <h4>Login Page</h4>
                    <Formik<LoginValues>
                        initialValues={{
                            username: "",
                            password: ""
                        }}
                        onSubmit={async ({ username, password }, { resetForm }) => {
                            try {
                                const response = await Auth.signIn({ username, password })
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
                                                value={values.username} label="Email ..."
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
