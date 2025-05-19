import { image } from "@config/constant/image"

const HistoryLeft = () => {
    return (
        <div className="flex-1 flex flex-col gap-y-5">
            <img src={image?.historyOne} alt="" />
            <div className="flex justify-start flex-col gap-y-5">
                <p className="text-[17px] font-poppins w-full md:max-w-[445px] ">
                    Our hotel’s name was inspired by the mythical Venus kingdom,
                    echoing our aspiration to offer peace, relaxation, and liberation
                    from life’s tribulations to our guests.
                </p>

                <p className="text-[17px] font-poppins w-full md:max-w-[445px] ">
                    We opened our doors in December 2014. The same year in July, our CEO Tseten
                    Tsatultsang returned to mark a new chapter in our journey, reflecting our
                    commitment to family, community, and creating a haven for all who seek it.
                </p>
            </div>
        </div>
    )
}

export default HistoryLeft
