import React, { useRef, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllIssueManage = () => {
  const axiosSecure = useAxios();
  const assignedStaff = useRef();
  const [selectedpercel, setselectedpercel] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const { data: issue = [], refetch } = useQuery({
    queryKey: ["all_issue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-issue");
      return res.data;
    },
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

  const openAssignModal = (percel) => {
    setselectedpercel(percel);
    assignedStaff.current.showModal();
  };

  const handelAssignStaff = (staff) => {
    const updateInfo = {
      staffName: staff.display_name,
      staffEmail: staff.email,
      phoneNumber: staff.staffPhoneNUmbe || "0185188347",
      staffId: staff._id,
    };
    axiosSecure
      .patch(`/issue/${selectedpercel._id}`, updateInfo)
      .then((res) => {
        refetch();
        assignedStaff.current.close();
        setselectedpercel(null);
      });
  };
  const [filters, setFilters] = useState({
    priority: "",
    status: "",
    category: "",
  });

  const filteredIssues = issue.filter((item) => {
    return (
      (!filters.priority || item.priority === filters.priority) &&
      (!filters.category || item.category === filters.category)
    );
  });

  const handleReject = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Rejected It",
    }).then((result) => {
      axiosSecure
        .patch(`/issue/${item._id}/status?status=rejected`)
        .then((res) => {
          if (res.data.modifiedCount) {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Rejected",
                text: "Your request has been rejected.",
                icon: "success",
              });
            }
          }

          refetch();
        });
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-6 min-h-screen">
      {/* ================= FILTER SECTION ================= */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-white rounded-2xl shadow-xl border border-purple-100/50 p-6 mb-6">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl -z-10"></div>

        <div className="flex flex-col md:flex-row md:items-end gap-6">
          {/* Title */}
          <div className="md:w-56">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Filter Issues
                </h3>
                <p className="text-xs text-gray-500">Refine your search</p>
              </div>
            </div>
          </div>

          {/* Priority Filter */}
          <div className="form-control w-full md:w-56">
            <label className="label pb-2">
              <span className="label-text text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                Priority Level
              </span>
            </label>
            <select
              className="select select-bordered bg-white border-2 border-gray-200 hover:border-purple-400 focus:border-purple-500 focus:outline-none transition-all rounded-xl shadow-sm"
              value={filters.priority}
              onChange={(e) =>
                setFilters({ ...filters, priority: e.target.value })
              }
            >
              <option value="">All Priorities</option>
              <option value="high">🔴 High Priority</option>
              <option value="normal">🟢 Normal Priority</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="form-control w-full md:w-56">
            <label className="label pb-2">
              <span className="label-text text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                Issue Category
              </span>
            </label>
            <select
              className="select select-bordered bg-white border-2 border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:outline-none transition-all rounded-xl shadow-sm"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">Select a category</option>
              <option value="Road Problem">🛣️ Road Problem</option>
              <option value="Water Leakage">💧 Water Leakage</option>
              <option value="Garbage Overflow">🗑️ Garbage Overflow</option>
              <option value="Street Light Issue">💡 Street Light Issue</option>
              <option value="Drainage Problem">🚰 Drainage Problem</option>
              <option value="Other">📋 Other</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="mt-4 md:mt-6">
            <button
              onClick={() => setFilters({ priority: "", status: "" })}
              className="group btn btn-outline border-2 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-600 hover:border-transparent hover:text-white px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* ================= TABLE SECTION ================= */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Table Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-blue-600 rounded-full"></div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">
                Issue Management
              </h3>
              <p className="text-xs text-gray-500">
                Assign staff and manage reported issues
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <span className="text-xs font-medium text-gray-500">Total:</span>
            <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              {filteredIssues?.length || 0}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-xs uppercase tracking-wider">
                <th className="text-gray-600 font-bold p-4">#</th>
                <th className="text-gray-600 font-bold p-4">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Issue Title
                  </div>
                </th>
                <th className="text-gray-600 font-bold p-4">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    Category
                  </div>
                </th>
                <th className="text-gray-600 font-bold p-4">Status</th>
                <th className="text-gray-600 font-bold p-4">Priority</th>
                <th className="text-gray-600 font-bold p-4">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Assigned Staff
                  </div>
                </th>
                <th className="text-center text-gray-600 font-bold p-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredIssues?.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-blue-50/30 transition-all duration-300 group"
                  style={{
                    animation: `fadeInRow 0.4s ease-out ${index * 0.05}s both`,
                  }}
                >
                  <td className="p-4 font-semibold text-gray-500">
                    {index + 1}
                  </td>

                  {/* Issue Title */}
                  <td className="p-4 font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </td>

                  {/* Category */}
                  <td className="p-4">
                    <span className="inline-flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg font-medium">
                      {item.category}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-sm ${
                        item.status === "pending"
                          ? "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200"
                          : item.status === "approved"
                          ? "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200"
                          : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.status === "pending"
                            ? "bg-amber-500 animate-pulse"
                            : item.status === "approved"
                            ? "bg-emerald-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      {item.status}
                    </span>
                  </td>

                  {/* Priority Badge */}
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-sm ${
                        item.priority === "high"
                          ? "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200"
                          : "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {item.priority === "high" ? (
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      )}
                      {item.priority}
                    </span>
                  </td>

                  {/* Assigned Staff */}
                  <td className="p-4">
                    {item.staffName ? (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                          {item.staffName.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-gray-800">
                          {item.staffName}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                        Not Assigned
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      {/* Assign Staff Button */}
                      {!item?.staffName ? (
                        <button
                          onClick={() => openAssignModal(item)}
                          className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                          </svg>
                          <span>Assign Staff</span>
                        </button>
                      ) : (
                        <button
                          disabled
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-500 text-xs font-bold rounded-lg cursor-not-allowed opacity-60"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Assigned</span>
                        </button>
                      )}

                      {/* Reject Button */}
                      {item?.priority === "normal" ? (
                        <button
                          onClick={() => handleReject(item)}
                          className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <span>Reject</span>
                        </button>
                      ) : (
                        <button
                          disabled
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-500 text-xs font-bold rounded-lg cursor-not-allowed opacity-60"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <span>Rejected</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= ASSIGN STAFF MODAL ================= */}
      <dialog
        ref={assignedStaff}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box relative bg-gradient-to-br from-white via-purple-50/20 to-white border-2 border-purple-100 shadow-2xl rounded-2xl p-8 max-w-md">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl -z-10"></div>

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-800">
                Assign Staff Member
              </h3>
              <p className="text-xs text-gray-500">
                Select an available staff to assign
              </p>
            </div>
          </div>

          {/* Dropdown */}
          <div className="form-control w-full mb-6">
            <label className="label pb-2">
              <span className="label-text text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Available Staff
              </span>
            </label>
            <select
              className="select select-bordered w-full bg-white border-2 border-gray-200 hover:border-purple-400 focus:border-purple-500 focus:outline-none transition-all rounded-xl shadow-sm"
              defaultValue=""
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedStaff = staffs.find((s) => s._id === selectedId);
                setSelectedStaff(selectedStaff);
              }}
            >
              <option disabled value="">
                Select a staff member
              </option>

              {staffs?.map((staff) => (
                <option key={staff._id} value={staff._id}>
                  {staff.display_name} ({staff?.email})
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <form method="dialog">
              <button className="btn btn-outline border-2 rounded-xl px-6 hover:bg-gray-100 transition-all">
                Cancel
              </button>
            </form>

            <button
              disabled={!selectedStaff}
              onClick={() => handelAssignStaff(selectedStaff)}
              className="btn bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 rounded-xl px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Assign Staff
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllIssueManage;
