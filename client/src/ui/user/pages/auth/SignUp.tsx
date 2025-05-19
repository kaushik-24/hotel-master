import { signUpSchema } from '@config/schema/auth.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpFormProps } from '@interface/global.interface';
import Button from '@ui/common/atoms/Button';
import InputField from '@ui/common/atoms/InputField';
import Label from '@ui/common/atoms/Label';
import Logo from '@ui/common/molecules/Logo';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineLock } from 'react-icons/ai';
import { BsPhone } from 'react-icons/bs';
import { IoMailUnreadOutline, IoPersonOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from 'services/instance';

const SignUp = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpFormProps>({
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: ""
        },
        resolver: yupResolver(signUpSchema())
    });

    const onSubmit: SubmitHandler<SignUpFormProps> = async (data) => {
        try {
            console.log('Form data:', data); // Log the data
            const response = await axiosInstance.post('/api/auth/register', {
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber,
                password: data.password,
            });

            console.log('Response:', response);
            navigate('/auth/login', { replace: true });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                console.error('Validation Error:', error.response.data.message);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    return (
        <div className='bg-[#ffeedc] flex flex-col justify-center items-center px-4 py-4 w-full h-screen'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className='flex flex-col items-center'>
                <Logo textColor='text-[#5b3423]' />

                <div className='w-full flex flex-col'>
                    {/* Name */}
                    <div className='relative text-[#5b3423]'>
                        <Label name={'name'} label={'Name'} />
                        <IoPersonOutline className='absolute left-3 top-[45px] text-[#5b3423]' />
                        <InputField
                            name='name'
                            type={'text'}
                            placeholder={'Name'}
                            register={register}
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm my-1">{errors.name.message}</span>
                        )}
                    </div>

                    {/* Email */}
                    <div className='relative text-[#5b3423]'>
                        <Label name={'email'} label={'Email'} />
                        <IoMailUnreadOutline className='absolute left-3 top-[45px] text-[#5b3423]' />
                        <InputField
                            name='email'
                            type={'email'}
                            autocomplete='on'
                            placeholder={'Email'}
                            register={register}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm my-1">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div className='relative text-[#5b3423]'>
                        <Label name={'phoneNumber'} label={'Phone Number'} />
                        <BsPhone className='absolute left-3 top-[45px] text-[#5b3423]' />
                        <InputField
                            name='phoneNumber'
                            type={'text'}
                            placeholder={'Phone Number'}
                            register={register}
                        />
                        {errors.phoneNumber && (
                            <span className="text-red-500 text-sm my-1">{errors.phoneNumber.message}</span>
                        )}
                    </div>

                    {/* Password */}
                    <div className='relative'>
                        <Label name={'password'} label={'Password'} />
                        <AiOutlineLock className='absolute left-3 top-[45px]   text-[#5b3423]' />
                        <InputField
                            name='password'
                            type={'password'}
                            autocomplete='on'
                            placeholder={'Password'}
                            register={register}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm my-1">{errors.password.message}</span>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className='relative'>
                        <Label name={'confirmPassword'} label={'Confirm Password'} />
                        <AiOutlineLock className='absolute left-3 top-[45px]  text-[#5b3423]' />
                        <InputField
                            name='confirmPassword'
                            type={'password'}
                            autocomplete='on'
                            placeholder={'Confirm Password'}
                            register={register}
                        />
                        {errors.confirmPassword && (
                            <span className="text-red-500 text-sm my-1">{errors.confirmPassword.message}</span>
                        )}
                    </div>

                    <div className='mb-2 self-center'>
                        <Button type='submit' buttonText={'Sign Up'} />
                    </div>
                </div>
            </form>

            <div className='flex'>
                <p>{`Already have an account?`} </p>&nbsp;
                <Link to='/auth/login'>
                    <span className='text-[#5b3423] font-bold'>Login</span>
                </Link>
            </div>
        </div>
    );
};

export default SignUp;
