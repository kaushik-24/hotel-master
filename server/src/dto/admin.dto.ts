import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
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

    @IsOptional()
    @IsString()
    name?: string;
   
    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsEnum(ROLE, { message: 'Invalid role' })
    role?: ROLE;
}

