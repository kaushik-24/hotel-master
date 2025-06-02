import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ROLE } from '../constant/enum';

// DTO for creating a new admin
export class CreateAdminDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string = '';

    @IsNotEmpty()
    @IsString()
    password: string = '';

    @IsNotEmpty()
    @IsEnum(ROLE, { message: 'Invalid role' })
    role: ROLE = ROLE.USER;

    @IsNotEmpty()
    @IsString()
    name: string = '';

    @IsNotEmpty()
    @IsString()
    phoneNumber: string = '';
}

// DTO for updating an existing admin
export class UpdateAdminDTO {
    @IsNotEmpty()
    @IsUUID()
    id: string = '';

    @IsNotEmpty()
    @IsString()
    name: string = '';
    
    @IsString()
    password: string = '';

    @IsNotEmpty()
    @IsString()
    phoneNumber: string = '';

    @IsNotEmpty()
    @IsEnum(ROLE, { message: 'Invalid role' })
    role: ROLE = ROLE.USER;
}

