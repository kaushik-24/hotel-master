import OtherLinksAdmin from "@ui/admin/molecules/OtherLinksAdmin"
import RoomLinksAdmin from "@ui/admin/molecules/RoomLinksAdmin"

const SiteFooter = () => {
    return (
        <div className="w-full">
            <RoomLinksAdmin />
            <hr />
            <OtherLinksAdmin />
            <hr />
        </div>
    )
}

export default SiteFooter
