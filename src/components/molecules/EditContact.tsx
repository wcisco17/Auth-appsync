import * as React from 'react'
import { Formik } from 'formik';
import { Auth } from 'aws-amplify';
import { TextField, Button } from '@material-ui/core';
interface Props {
    authenticated: any

}
interface EditContactInput {
    phone_number: string
}

export const EditContact = (props: Props) => {
    let user = props.authenticated
    return (
        <div>
            <Formik<EditContactInput>
                initialValues={{
                    phone_number: ""
                }}
                onSubmit={async ({ phone_number }, { resetForm }) => {
                    let phone: string = "+1"
                    try {
                        const res = await Auth.updateUserAttributes(user, {
                            'phone_number': phone_number
                        })
                        if (res) {
                            console.log('Changed! ', res)
                            alert("Phone Changed!")
                        }
                    } catch (err) {
                        console.log("Error: ", err.message)
                    }
                    resetForm()
                }}
            >
                {({ values, handleChange, handleSubmit }) => {
                    return (
                        <React.Fragment>
                            <form onSubmit={handleSubmit} className="form-containers" >
                                <div>
                                    <TextField name="phone_number"
                                        value={values.phone_number} label="Phone Number ..."
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="btn-login" >
                                    <Button
                                        type="submit" variant="contained" color="secondary">
                                        Edit
                                            </Button>
                                </div>
                            </form>
                        </React.Fragment>
                    )
                }}
            </Formik>
        </div>
    );
}