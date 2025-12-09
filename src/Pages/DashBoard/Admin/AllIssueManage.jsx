import React, { useRef, useState } from 'react';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const AllIssueManage = () => {
    const issues = [
        {
            _id: "1",
            title: "Road broken near sector-5",
            category: "Infrastructure",
            status: "pending",
            priority: "High",
            assignedStaff: null,
        },
        {
            _id: "2",
            title: "Street light not working",
            category: "Electricity",
            status: "approved",
            priority: "Normal",
            assignedStaff: "Rahim Uddin",
        },
    ];
    const axiosSecure = useAxios();
    const assignedStaff = useRef();
    const [selectedpercel, setselectedpercel] = useState(null)

    const { data: issue = [] } = useQuery({
        queryKey: ['all_issue'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-issue');
            return res.data;
        }
    });
    const {
        data: staffs = [],
        isLoading: staffLoading,
        refetch: staffRefetch,
    } = useQuery({
        queryKey: ["all_staff", "available"],
        enabled: !!selectedpercel,
        queryFn: async () => {
            const res = await axiosSecure.get("/user/cityzen?staffStatus=approved");
            return res.data;
        },
    });

    const openAssignModal = percel => {
        setselectedpercel(percel)
        assignedStaff.current.showModal()
    }

    const handelAssignStaff=(staff)=>{
        
        const updateInfo={
            staffName: staff.display_name,
            staffEmail: staff.email,
            phoneNumber: staff.staffPhoneNUmbe || '0185188347',
            staffId: staff._id
        }
        axiosSecure.patch(`/issue/${selectedpercel._id}`, updateInfo)
        .then(res=>{
            staffRefetch()
            assignedStaff.current.close()
            console.log(res.data);
        })




    }

    return (
        <div className="bg-gray-100 p-6 min-h-screen">
            <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
                <table className="table-auto w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 text-left">#</th>
                            <th className="p-2 text-left">Issue Title</th>
                            <th className="p-2 text-left">Category</th>
                            <th className="p-2 text-left">Status</th>
                            <th className="p-2 text-left">Priority</th>
                            <th className="p-2 text-left">Assigned Staff</th>
                            <th className="p-2 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {issue?.map((item, index) => (
                            <tr key={item._id} className="border-b">
                                <td className="p-2">{index + 1}</td>

                                {/* Issue Title */}
                                <td className="p-2 font-semibold">{item.title}</td>

                                {/* Category */}
                                <td className="p-2">{item.category}</td>

                                {/* Status Badge */}
                                <td className="p-2">
                                    <span
                                        className={`px-2 py-1 rounded text-white text-xs ${item.status === "pending"
                                            ? "bg-yellow-500"
                                            : item.status === "approved"
                                                ? "bg-green-600"
                                                : "bg-red-600"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                {/* Priority Badge */}
                                <td className="p-2">
                                    <span
                                        className={`px-2 py-1 rounded text-white text-xs ${item.priority === "High"
                                            ? "bg-red-600"
                                            : "bg-blue-500"
                                            }`}
                                    >
                                        {item.priority}
                                    </span>
                                </td>

                                {/* Assigned Staff */}
                                <td className="p-2">
                                    {item.assignedStaff ? (
                                        <span className="font-medium">{item.assignedStaff}</span>
                                    ) : (
                                        <span className="text-gray-400 italic">Not Assigned</span>
                                    )}
                                </td>

                                {/* Assign Button */}
                                <td className="p-2">
                                    {!item.assignedStaff ? (
                                        <button
                                            onClick={() => openAssignModal(item)}
                                            className="px-3 py-1 bg-green-600 hover:cursor-pointer text-white rounded text-sm">
                                            Assign Staff
                                        </button>
                                    ) : (
                                        <button

                                            className="px-3 py-1 bg-gray-400 text-white rounded text-sm"
                                            disabled

                                        >
                                            Assigned
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
            <dialog ref={assignedStaff} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Rider:

                    </h3>

                    {/* Table */}
                    <div className="overflow-x-auto my-4">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Work Status</th>
                                    <th>Email</th>
                                    <th>Assign Riders</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                  staffs?.map((r,i)=> 
                                    <tr  key={r._id} className="bg-base-200">
                                    <th>{i+1}</th>
                                    <td>{r.display_name}</td>
                                    <td>{r.staffStatus}</td>
                                    <td>{r?.email}</td>
                                    <td>
                                         <button
                                        onClick={()=>handelAssignStaff(r) }
                                        className="btn btn-ghost bg-green-300 btn-xs">Assign Staff</button>
                                    </td>
                                </tr>)  
                                }




                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>






        </div>
    );
};

export default AllIssueManage;