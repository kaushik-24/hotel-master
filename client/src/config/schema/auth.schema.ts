

import { PASSWORD, PHONE_NUMBER } from '@regex/index';
import * as yup from 'yup';


export const loginSchema = () => {
    const schema = yup.object({
        email: yup.string()
            .required(
                'Email is required'
            )
            .email(
                'Please enter valid email'
            ),

        password: yup.string().required(
            'Password is required'
        ),
        rememberMe: yup.boolean().optional(),
    })

    return schema
}

export const signUpSchema = () => {
    const schema = yup.object({
        name: yup.string()
            .required(
                'Name is required'
            ),

        email: yup.string()
            .email(
                'Please enter valid email'
            )
            .required(
                'Email is required'
            ),
        //    Phone Number

        phoneNumber: yup.string()
            .matches(
                PHONE_NUMBER,
                'Please enter valid phone number'
            )
            .required(
                'Phone number is required'
            ),

        password: yup.string()
            .matches(PASSWORD)
            .required(
                'Password is required'
            ),

        confirmPassword: yup.string()
            .oneOf(
                [yup.ref('password')],
                'Both password must be same'
            )
            .required(
                'Confirm password is required'
            ),
    })

    return schema
}
