import React, { useRef } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { CiCirclePlus, CiEdit } from 'react-icons/ci';
import { useForm } from 'react-hook-form';
import { GrUpdate } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';

const ManageStaff = () => {
    const { user,createUser, logOut } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxios();

    const { data: citizen, refetch } = useQuery({
        queryKey: ["staff_manage"],
        queryFn: async () => {
            const res = await axiosSecure.get("/user/cityzen?staffStatus=pending");
            return res.data;
        },
    });

    const handelApproved = (item, status, role) => {
        Swal.fire({
            title: "Are you sure?",
            text: `${item?.display_name} will be updated`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16A34A",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/staff/${item._id}?staffStatus=${status}&role=${role}`)
                    .then((res) => {
                        refetch();
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Status updated successfully!",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                    });
            }
        });
    };
    const addStaffRef = useRef();
    const addStaffModalOpen=()=>{
        addStaffRef.current.showModal()

    }

     const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); 
    console.log(data.email, data.password);
    createUser(data.email,data.password)
    .then(res=>{
      // logOut()
      form.reset();
    addStaffRef.current.close();
      
        console.log(res.data);
    })
    // reset();
    // addStaffRef.current.close();
  };


  const handelstaffdelete=(d)=>{
    console.log(d);

  }

    return (
        <div className="p-6 min-h-screen bg-gray-200">

      {/* MODAL */}
      <dialog ref={addStaffRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add New Staff</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

            <input
              className="input input-bordered w-full"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <input
              className="input input-bordered w-full"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
              className="input input-bordered w-full"
              placeholder="Phone"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}

            <input
              className="input input-bordered w-full"
              placeholder="Photo URL"
              {...register("photo")}
            />

            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => addStaffRef.current.close()}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Create Staff
              </button>
            </div>

          </form>
        </div>
      </dialog>




            <div className='flex justify-between'>
                <h2 className="text-xl font-bold mb-4">Manage Staff Requests</h2>

                <button 
                onClick={()=>addStaffModalOpen()}
                    className=" flex justify-between items-center gap-2 font-bold text-lg mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <CiCirclePlus />  Add New Staff
                </button>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="table w-full">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th>No:</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>User Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {citizen?.map((c, i) => (
                            <tr key={c._id} className="hover:bg-gray-50 transition hover:cursor-pointer">
                                <th>{i + 1}</th>

                                <td className="font-medium">{c?.display_name}</td>

                                <td className="text-gray-600">{c?.email}</td>

                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold 
                      ${c?.staffStatus === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {c?.staffStatus}
                                    </span>
                                </td>

                                <td>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                        {c?.role}
                                    </span>
                                </td>

                                <td className="flex gap-2 justify-center">


                                  
                                   <button
                                            onClick={() =>handelstaffdelete(c) }
                                            className="px-4 py-1 flex justify-baseline items-center gap-1 bg-blue-600 hover:cursor-pointer text-white rounded-md hover:bg-blue-700 transition"
                                        >
                                            <GrUpdate /> Update
                                        </button>

                                         <button
                                          onClick={() =>handelstaffdelete(c) }
                                            className="px-4 py-1 flex justify-baseline items-center gap-1 bg-green-600 hover:cursor-pointer text-white rounded-md hover:bg-green-700 transition"
                                        >
                                          <MdDelete />  Delete
                                        </button>


                                  

                                    {/* APPROVE BUTTON */}
                                    {c?.staffStatus === "pending" && (
                                        <button
                                            onClick={() =>
                                                handelApproved(c, "approved", "Field Staff")
                                            }
                                            className="px-4 py-1 bg-green-600 hover:cursor-pointer text-white rounded-md hover:bg-green-700 transition"
                                        >
                                            Approve
                                        </button>
                                    )}
                                    {c?.staffStatus === "in_work" && (
                                        <button
                                            onClick={() =>
                                                handelApproved(c, "approved", "Field Staff")
                                            }
                                            className="px-4 py-1 bg-green-600 hover:cursor-pointer text-white rounded-md hover:bg-green-700 transition"
                                        >
                                            Approve
                                        </button>
                                    )}

                                    {/* REJECT BUTTON */}
                                    {(c?.staffStatus === "pending" ||
                                        c?.staffStatus === "approved") && (
                                            <button
                                                onClick={() =>
                                                    handelApproved(c, "pending", "citizen")
                                                }
                                                className="px-4 py-1 hover:cursor-pointer bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                            >
                                                Reject
                                            </button>
                                        )}

                                    {/* BADGE */}
                                    {c?.staffStatus === "approved" && (
                                        <span className="px-4 py-1 hover:cursor-pointer bg-green-100 text-green-600 rounded-md font-semibold">
                                            Approved
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageStaff;
