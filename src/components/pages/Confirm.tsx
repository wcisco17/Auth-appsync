import * as React from 'react'

import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';


import { Auth } from 'aws-amplify'

import { Formik } from 'formik'

interface Props {
    success: boolean
    close: () => void
}


interface Confirm {
    username: string
    code: string
}




export const Confirm = (props: Props) => {
    let [message, onMessage] = React.useState("")
    let confirm = ""
    props.success === true ? confirm = "suc" : confirm = `confirm`
    return (
        <React.Fragment>
            <div className={`${confirm}`} >
                <div className="modal__content">
                    <div className="modules_login">
                        <h4>Confirm Email</h4>
                        <Formik<Confirm>
                            initialValues={{
                                username: "",
                                code: "",
                            }}
                            onSubmit={async ({ username, code }, { resetForm }) => {
                                try {
                                    const response = await Auth.confirmSignUp(username, code)
                                    if (response) {
                                        alert("Thank you please sign in :)")
                                        props.close()
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
                                        <p className="err" >{message}</p>
                                        <form onSubmit={handleSubmit} className="form-container" >
                                            <div>
                                                <TextField name="username"
                                                    value={values.username} label="Username ..."
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <TextField name="code"
                                                    value={values.code} label="Code ..."
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
            </div>
        </React.Fragment>
    );
}
