import { loginSchema } from '@config/schema/auth.schema';
import encryptDecrypt from '@function/encryptDecrypt';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormProps } from '@interface/global.interface';
import Button from '@ui/common/atoms/Button';
import InputField from '@ui/common/atoms/InputField';
import Label from '@ui/common/atoms/Label';
import Logo from '@ui/common/molecules/Logo';
import { toast } from '@ui/common/organisms/toast/ToastManage';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineLock } from 'react-icons/ai';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from 'services/instance';

const Login = () => {
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState<boolean>(false);


    const { encrypt } = encryptDecrypt;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormProps>({
        defaultValues: {
            email: "",
            password: "",

        },
        resolver: yupResolver(loginSchema())
    });

    const onSubmit: SubmitHandler<LoginFormProps> = async (data) => {
        try {
            const response = await axiosInstance.post('/api/auth/login', {
                email: data.email,
                password: data.password,
            });
            // console.log('Response:', response);

            const accessToken = response.data?.data?.token?.accessToken;
            const role = response.data?.data?.role;

            if (!accessToken) {
                throw new Error('Access token not found in response.');
            }

            const encrypted = encrypt(accessToken);

            sessionStorage.setItem('accessTokenHotelVenus', encrypted as string);

            localStorage.setItem('HotelVenusName', response.data.data.name)
            toast.show({ title: "Success", content: "Login successfully", duration: 2000, type: 'success' });


            if (role === 'ADMIN') {
                localStorage.setItem('HotelVenusLastLogin', new Date().toISOString());
                navigate('/admin', { replace: true });  // Navigate to admin page
            } else {
                navigate('/booking', { replace: true });
            }
            console.log(response);


        } catch (error: unknown) {
            console.error('Error:', error);
            toast.show({ title: "Error", content: "Login unsuccessfully", duration: 2000, type: 'error' });

        }
    };


    const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    };

    return (
        <div className='bg-[#ffeedc] flex flex-col justify-center items-center px-4 py-4 w-full h-screen'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className='flex flex-col items-center'>

                <Logo textColor='text-[#5b3423]' />

                <div className='w-full flex flex-col'>
                    {/* Email */}
                    <div className='relative text-[#5b3423]'>
                        <Label name={'email'} label={'Email'} />
                        <IoMailUnreadOutline className='absolute left-3 top-[45px] text-[#5b3423] ' />
                        <InputField
                            name='email'
                            type={'email'}
                            autocomplete='on' // Set autocomplete attribute for email
                            placeholder={'Email'}
                            register={register}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm my-1">{errors?.email?.message}</span>
                        )}
                    </div>

                    {/* Password */}
                    <div className='relative'>
                        <Label name={'password'} label={'Password'} />
                        <AiOutlineLock className='absolute left-3 top-[45px] text-[#5b3423]' />
                        <InputField
                            name='password'
                            type={'password'}
                            autocomplete='on' // Set autocomplete attribute for password
                            placeholder={'Password'}
                            register={register}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm my-1">{errors.password?.message}</span>
                        )}
                    </div>

                    {/* Remember ME */}
                    <div className="flex items-center gap-x-2 my-4">
                        <label className="font-poppins flex items-center text-[#5b3423] font-bold">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                            />
                            Remember Me
                        </label>
                    </div>

                    <div className='  mb-2  self-center'>
                        <Button type='submit' buttonText={'Login'} />
                    </div>
                </div>
            </form>

            <div className='flex'>
                <p>{`Don't have an account?`} </p>&nbsp;
                <Link to='/auth/sign-up'>
                    <span className='text-[#5b3423] font-bold'>Sign-up</span>
                </Link>
            </div>
        </div>
    );
};

export default Login;
