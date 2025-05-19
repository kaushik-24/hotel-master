import { type IUser } from '../interface/user.interface'
import { ROLE } from './enum'

export const admins: IUser[] = [
    {
        name: 'Hotel Venus',
        email: 'admin@hotelvenus.com',
        password: 'Hotel@123',
        role: ROLE.ADMIN,
        phoneNumber: '0000000000'
    },
]
