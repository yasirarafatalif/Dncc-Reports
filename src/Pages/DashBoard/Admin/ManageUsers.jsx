import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  const { data: citizen, refetch } = useQuery({
    queryKey: ["cityzen_manage"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/cityzen?role=citizen");
      return res.data;
    },
  });

  const handelStatusUpdate = (u, status) => {
    const userInfoUpdate = { status };

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${status} the user: ${u?.display_name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user/${u._id}`, userInfoUpdate).then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `User has been ${status}ed`,
              showConfirmButton: false,
              timer: 1500,
            });

            refetch();
          }
        });
      }
    });
  };

  const handelView = (c) => {
    const massege = c?.subscription;
    Swal.fire({
      title: "Payments Info",
      text: `${c?.display_name} is ${massege} user`,
      icon: "success",
    });
  };
  const [searchEmail, setSearchEmail] = useState("");
  const [subscription, setsubscription] = useState("all");

  const filteredPayments = citizen?.filter((payment) => {
    const emailMatch = payment?.email
      ?.toLowerCase()
      .includes(searchEmail.toLowerCase());

    const typeMatch =
      subscription === "all" || payment?.subscription === subscription;

    return emailMatch && typeMatch;
  });

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Manage Citizens</h2>

      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 items-center">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />

        {/* PAYMENT TYPE FILTER */}
        <select
          value={subscription}
          onChange={(e) => setsubscription(e.target.value)}
          className="select select-bordered w-full md:w-1/4"
        >
          <option value="all">Subscription</option>
          <option value="premium">Premium</option>
          <option value="normal">Normal</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>

              <th>User Status</th>

              <th>Status</th>
              <th>Subscription Info</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPayments?.map((c, i) => (
              <tr key={c._id} className="hover:bg-base-200 transition">
                <td>{i + 1}</td>

                <td className="font-semibold">{c?.display_name}</td>

                <td>{c?.email}</td>
                {/* 
                                    <td>
                                        <span className="badge badge-info px-3 py-2 text-white">
                                            {c?.role}
                                        </span>
                                    </td> */}

                {/* Status Badge */}
                <td>
                  <span
                    className={`badge px-3 py-2 text-white 
                                            ${
                                              c?.subscription === "free"
                                                ? "badge-error"
                                                : "badge-success"
                                            }
                                        `}
                  >
                    {c?.subscription}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge px-3 py-2 text-white 
                                            ${
                                              c?.status === "block"
                                                ? "badge-error"
                                                : "badge-success"
                                            }
                                        `}
                  >
                    {c?.status}
                  </span>
                </td>
                <td>
                  {c?.subscription === "premium" ? (
                    <button
                      onClick={() => handelView(c)}
                      className="btn btn-success btn-sm text-white"
                    >
                      Subscription Info
                    </button>
                  ) : (
                    "Un Paid User"
                  )}
                </td>

                <td className="flex gap-3">
                  {/* Block Button */}
                  {c?.status === "unblock" && (
                    <button
                      onClick={() => handelStatusUpdate(c, "block")}
                      className="btn btn-error btn-sm text-white"
                    >
                      Block
                    </button>
                  )}

                  {/* Unblock Button */}
                  {c?.status === "block" && (
                    <button
                      onClick={() => handelStatusUpdate(c, "unblock")}
                      className="btn btn-success btn-sm text-white"
                    >
                      Unblock
                    </button>
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

export default ManageUsers;
