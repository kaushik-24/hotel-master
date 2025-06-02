import { useState } from "react";
// import AdminTable from "";
import AdminTable from "../organisms/AdminTable";
import CreateAdmin from "../organisms/CreateAdmin";
import { Link } from "react-router-dom";
const ManageAdmin = () => {
    const [showAdmin, setShowAdmin] = useState<boolean>(true);
    return (
        <div className=" w-full  h-full rounded-md p-4 bg-slate-100 ">
            <div className="flex justify-between ">
                <h1 className="text-3xl underline font-bold">Manage User</h1>

                <div>
                                    </div>
            </div>
             <AdminTable />        </div>
    )
}

export default ManageAdmin
