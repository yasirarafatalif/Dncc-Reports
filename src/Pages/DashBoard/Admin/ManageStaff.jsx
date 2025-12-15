import React, { useRef, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { CiCirclePlus, CiEdit } from 'react-icons/ci';
import { useForm } from 'react-hook-form';
import { GrUpdate } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

const ManageStaff = () => {
  const { user, createUser, logOut } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const [selectedStaff, setselectedStaff] = useState([])

  const { data: citizen, refetch } = useQuery({
    queryKey: ["staff_manage"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/cityzen?staffStatus=pending&role=Field Staff");
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
  const addStaffModalOpen = () => {
    addStaffRef.current.showModal()

  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const profileImage = data.photo[0];
    const fromData = new FormData();
    fromData.append('image', profileImage)
    const photoimageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMAGE_KEY}`
    const imageRes = await axios.post(photoimageUrl, fromData);
    const photoURL = imageRes.data.data.display_url;
    const staffData = {
      ...data,
      photo: photoURL,
    };
    const res = await axiosSecure.post("/create-staff", staffData);
    console.log(res.data);

    if (res.data.success) {
      Swal.fire("Success", "Staff created", "success");
      refetch();
      addStaffRef.current.close();
    }

    reset();

  };


const handleDeleteStaff = (staff) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This staff will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Yes, delete",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/delete-staff/${staff._id}`);

      if (res.data.success) {
        Swal.fire("Deleted!", "Staff removed", "success");
        refetch(); // UI update
      }
    }
  });
};



  const updateModalRef = useRef()

  const updateStaffModalOpen = () => {
    updateModalRef.current.showModal()

  }
  const handleUpdateStaff = async (e) => {
    e.preventDefault();
    const form = e.target;

    let photoURL = selectedStaff?.photo; 


    if (form.photo.files.length > 0) {
      const profileImage = form.photo.files[0];

      const formData = new FormData();
      formData.append("image", profileImage);

      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMAGE_KEY}`;

      const imageRes = await axios.post(imageUploadUrl, formData);
      photoURL = imageRes.data.data.display_url;
    }

   
    const updatedInfo = {
      name: form.name.value,
      phone: form.phone.value,
      photo: photoURL,
      status: form.status.value,
    };

   


    const res = await axiosSecure.patch(
      `/update-staff/${selectedStaff._id}`,
      updatedInfo
    );

    if (res.data.success) {
      Swal.fire("Updated!", "Staff info updated", "success");
      refetch();
      updateModalRef.current.close();
    }

  }
  console.log(selectedStaff);

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
              type="file"
              className="file-input file-input-bordered w-full"
              accept="image/*"
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

      {/* update staff data modal */}
      <dialog ref={updateModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Staff</h3>

          <form onSubmit={handleUpdateStaff} className="space-y-3">
            <input
              name="name"
              defaultValue={selectedStaff?.display_name}
              className="input input-bordered w-full"
              placeholder="Name"
            />

            <input
              name="phone"
              defaultValue={selectedStaff?.phoneNumber}
              className="input input-bordered w-full"
              placeholder="Phone"
            />

            <input
              type="file"
              name="photo"
              accept="image/*"
              className="file-input file-input-bordered w-full"
            />


            <select
              name="status"
              defaultValue={selectedStaff?.status}
              className="select select-bordered w-full"
            >
              <option value="approved">Approved</option>
              <option value="pending">Reject</option>
            </select>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => updateModalRef.current.close()} className="btn">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </dialog>





      <div className='flex justify-between'>
        <h2 className="text-xl font-bold mb-4">Manage Staff Requests</h2>

        <button
          onClick={() => addStaffModalOpen()}
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
                    onClick={() => {
                      updateStaffModalOpen()
                      setselectedStaff(c)
                    }
                    }
                    className="px-4 py-1 flex justify-baseline items-center gap-1 bg-blue-600 hover:cursor-pointer text-white rounded-md hover:bg-blue-700 transition"
                  >
                    <GrUpdate /> Update
                  </button>

                  <button
                    onClick={() => handleDeleteStaff(c)}
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

    </div >
  );
};

export default ManageStaff;
