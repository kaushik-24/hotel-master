import { ArrayNotEmpty, IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class CreateBookingDTO {
    @IsNotEmpty()
    @Length(2, 30)
    name!: string;
    
    @IsOptional()
    email!: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1, { message: "Number of rooms must be at least 1" })
    numberOfRoom!: number;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty({ message: "Rooms array cannot be empty" })
    @IsString({ each: true, message: "Each value in rooms must be a string" })
    rooms: string;
    
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty({ message: "Rooms array cannot be empty" })
    @IsString({ each: true, message: "Each value in rooms must be a string" })
    roomNames: string;

    @IsOptional()
    @IsDateString({}, { message: "Invalid Check-In Date format" })
    checkInDate?: string;

    @IsOptional()
    @IsDateString({}, { message: "Invalid Check-Out Date format" })
    checkOutDate?: string;

    @IsOptional()
    roomPrice?: number;

    @IsOptional()
    idImage: string;
}

export class UpdateBookingDTO {
    @IsOptional()
    @Length(2, 30)
    name?: string;
    
    @IsOptional()
    email?: string;

    @IsOptional()
    @IsNumber()
    @Min(1, { message: "Number of rooms must be at least 1" })
    numberOfRoom?: number;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty({ message: "Rooms array cannot be empty" })
    @IsString({ each: true, message: "Each value in rooms must be a string" })
    rooms: string;
    
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty({ message: "Rooms array cannot be empty" })
    @IsString({ each: true, message: "Each value in rooms must be a string" })
    roomNames: string;

    @IsOptional()
    @IsDateString({}, { message: "Invalid Check-In Date format" })
    checkInDate?: string;

    @IsOptional()
    @IsDateString({}, { message: "Invalid Check-Out Date format" })
    checkOutDate?: string;

    @IsOptional()
    roomPrice?: number;
}

export class SendBookingEmailDTO {
    @IsNotEmpty()
    @IsString()
    bookingId!: string;

    @IsNotEmpty()
    @Length(2, 30)
    name!: string;

    @IsOptional()
    email!: string;

    @IsNotEmpty()
    @IsString()
    roomNames: string;

    @IsNotEmpty()
    @IsDateString({}, { message: "Invalid Check-In Date format" })
    checkInDate!: string;

    @IsNotEmpty()
    @IsDateString({}, { message: "Invalid Check-Out Date format" })
    checkOutDate!: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1, { message: "Number of rooms must be at least 1" })
    numberOfRooms!: number;

    @IsOptional()
    roomPrice!: number;
    
    @IsOptional()
    idImage!: string;
}

export interface IBookingInput {
    name: string;
    email: string;
    numberOfRoom: number;
    rooms: string;
    roomNames: string;
    checkInDate: string;
    checkOutDate: string;
    roomPrice: number;
    totalPrice: number;
    idImage?: string;
}
