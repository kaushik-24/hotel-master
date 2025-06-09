// src/dto/booking.dto.ts
import { ArrayNotEmpty, IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class CreateBookingDTO {
    @IsNotEmpty()
    @Length(2, 30)
    name!: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1, { message: "Number of rooms must be at least 1" })
    numberOfRoom!: number;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty({ message: "Rooms array cannot be empty" })
    @IsString({ each: true, message: "Each value in rooms must be a string" })
    rooms?: string[];
    
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty({ message: "Rooms array cannot be empty" })
    @IsString({ each: true, message: "Each value in rooms must be a string" })
    roomNames?: string[];

    @IsOptional()
    @IsDateString({}, { message: "Invalid Check-In Date format" })
    checkInDate?: string;

    @IsOptional()
    @IsDateString({}, { message: "Invalid Check-Out Date format" })
    checkOutDate?: string;
}
