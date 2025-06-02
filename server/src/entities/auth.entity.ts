import { Column, Entity, OneToOne } from 'typeorm';
import { ROLE } from '../constant/enum'; // Assuming ROLE is the updated enum
import Base from '../entities/base.entity';
import { AuthDetails } from './details.entity';

@Entity('auth')
export class Auth extends Base {
    @Column({
        unique: true,
    })
    email: string; // Matches IUser's email field

    @Column({
        unique: true,
    })
    username: string; // Assuming `username` corresponds to IUser's name (if not, add a `name` column separately)

    @Column({
        nullable: false,
    })
    name: string; // New column for the 'name' field from IUser

    @Column({
        unique: true,
    })
    phoneNumber: string; // New column for the 'phoneNumber' field from IUser

    @Column({ select: false })
    password: string; // Matches IUser's password field

    @Column({
        type: 'enum',
        enum: ROLE,
    })
    role: ROLE; // Matches IUser's role field, using ROLE enum

    @OneToOne(() => AuthDetails, (details) => details.auth, { cascade: true })
    details: AuthDetails;

    @Column({ nullable: true })
    token: string;

    @Column({ name: 'otp_verified', default: false })
    otpVerified: boolean;
}
