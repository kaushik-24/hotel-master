import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import { phoneRegex } from "../constant/regex";

// Ensure this regex matches the one used in your Mongoose model
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least one uppercase letter, one digit, and minimum 8 characters

export class CreateUserDTO {
    @IsNotEmpty()
    @Length(2, 30)
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @Matches(passwordRegex, {
        message:
            "Password must contain at least one uppercase letter, one digit, and be at least 8 characters long",
    })
    password!: string;

    @IsNotEmpty()
    @Matches(phoneRegex, {
        message: "Enter a valid phone number",
    })
    phoneNumber!: string;
}

export class LoginUserDTO {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @Matches(passwordRegex, {
        message:
            "Password must contain at least one uppercase letter, one digit, and be at least 8 characters long",
    })
    password!: string;
}
