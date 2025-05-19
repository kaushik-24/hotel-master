// import { toast } from "@components/toast/ToastManages";
// import { CreateAdminProps } from "@interface/global.interface";
// import Button from "@utils/themes/components/Button";
// import Checkbox from "@utils/themes/components/Checkbox";
// import InputField from "@utils/themes/components/InputField";
// import SelectOption from "@utils/themes/components/SelectOption";



// import * as yup from 'yup';

// validation from yup
// const validationSchema = yup.object().shape({
//     details: yup.object().shape({
//         firstName: yup.object().shape({
//             en: yup.string().required('First Name is required'),
//             ne: yup.string().notRequired() //optional
//         }),
//         lastName: yup.object().shape({
//             en: yup.string().required('Last Name (EN) is required'),
//             ne: yup.string().notRequired() // Optional
//         }),
//         phoneNumber: yup.string().required('Phone Number is required')
//     }),
//     email: yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format').required('Email is required'),
//     firstPassword: yup.string().required('Password is required')
//         .min(8, 'Password must be at least 8 characters')
//         .max(16, 'Password cannot exceed 16 characters'),
//     password: yup.string().required('Confirm Password is required')
//         .oneOf([yup.ref('firstPassword')], "Your Password doesn't match")
// });


const CreateAdmin = () => {
    // const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateAdminProps>({
    //     defaultValues: {
    //         email: '',
    //         role: 'ADMIN',
    //         username: '',
    //         firstPassword: '',
    //         password: '',
    //         allowedFeature: [],
    //         details: {
    //             firstName: { en: '', ne: '' },
    //             middleName: { en: '', ne: '' },
    //             lastName: { en: '', ne: '' },
    //             phoneNumber: '',
    //         }
    //     },
    //     resolver: yupResolver(validationSchema),
    // })


    // const onSubmit: SubmitHandler<CreateAdminProps> = async (data) => {
    //     try {
    //         await axiosInstance.post('/admin', {
    //             email: data.email,
    //             role: data.role,
    //             password: data.password,
    //             details: {
    //                 firstName: {
    //                     en: data.details.firstName.en,
    //                     ne: data.details.firstName.ne,
    //                 },
    //                 lastName: {
    //                     en: data.details.lastName.en,
    //                     ne: data.details.lastName.ne,
    //                 },

    //                 phoneNumber: data.details.phoneNumber,
    //             },
    //             allowedFeature: data.allowedFeature,

    //         });
    //         reset();
    //         // toast.show({ title: "Success", content: "Created successfully", duration: 2000, type: 'success' });
    //         console.log("data", data)

    //     } catch (error) {
    //         console.error('Error:', error);
    //         // toast.show({ title: "Error", content: "Admin Create unsuccessfully", duration: 2000, type: 'error' });

    //     }
    // };
    return (
        <div>
            create form
        </div>
    )
}

export default CreateAdmin