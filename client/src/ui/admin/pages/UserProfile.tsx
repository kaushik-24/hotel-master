import InputField from "@ui/common/atoms/InputField"
import Label from "@ui/common/atoms/Label"

const UserProfile = () => {
    return (
        <div className="bg-white px-4 rounded-md shadow-md w-full flex flex-col">
            <div className="p-6">
                <h1 className="font-poppins text-xl font-medium mb-4">Edit Profile</h1>
                <hr className="mb-6" />

                <div className="flex flex-col gap-y-4">

                    <div className="flex  gap-x-6 items-center  ">
                        <div className="flex gap-x-2 justify-end  items-center w-96">
                            <Label name={"username"} label={"Username"} textColor="text-black" textSize="text-md" required={true} />
                            <InputField name={"name"} type={"text"} />
                        </div>
                        <div className="flex gap-x-2 justify-end items-center w-96 ">
                            <Label name={"email"} label={"Email Address"} textColor="text-black" textSize="text-md" required={true} />
                            <InputField name={"name"} type={"text"} />
                        </div>
                    </div>

                    <div className="flex  gap-x-6  items-center">
                        <div className="flex gap-x-2 justify-end items-center w-96">
                            <Label name={"name"} label={"Name"} textColor="text-black" textSize="text-md" />
                            <InputField name={"name"} type={"text"} />
                        </div>
                        <div className="flex gap-x-2 justify-end items-center w-96 ">
                            <Label name={"password"} label={"Password"} textColor="text-black" textSize="text-md" required={true} />
                            <InputField name={"name"} type={"text"} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white flex-1 h-20 p-5  w-full ">
                <button className="p-2 bg-[#6b3aa3] rounded-md text-white font-poppins text-[0.875rem]  ">Update</button>
            </div>


        </div>
    )
}

export default UserProfile
