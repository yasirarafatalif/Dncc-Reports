import React, { useRef, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

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
  category:''
});
  const filteredIssues = issue.filter((item) => {
    return (
      (!filters.priority || item.priority === filters.priority) &&
      (!filters.category || item.category === filters.category)
    );
  });



  return (
    <div className="bg-gray-100 p-6 min-h-screen">
   <div className="bg-white p-4 rounded-xl shadow mb-6">
  <div className="flex flex-col md:flex-row md:items-center gap-4">

    {/* Title */}
    <h3 className="font-semibold text-gray-700 md:w-32">
      Filter Issues
    </h3>

    {/* Priority Filter */}
    <div className="form-control w-full md:w-48">
      <label className="label py-0">
        <span className="label-text text-sm text-gray-600">
          Priority
        </span>
      </label>
      <select
        className="select select-bordered select-sm"
        value={filters.priority}
        onChange={(e) =>
          setFilters({ ...filters, priority: e.target.value })
        }
      >
        <option value="">All</option>
        <option value="high">High</option>
        <option value="low">Low</option>
      </select>
    </div>

    {/* Status Filter */}
    <div className="form-control w-full md:w-48">
      <label className="label py-0">
        <span className="label-text text-sm text-gray-600">
          Status
        </span>
      </label>
      <select
        className="select select-bordered select-sm"
        value={filters.category}
        onChange={(e) =>
          setFilters({ ...filters, category: e.target.value })
        }
      >
       <option value="">Select a category</option>
              <option value="Road Problem">Road Problem</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Garbage Overflow">Garbage Overflow</option>
              <option value="Street Light Issue">Street Light Issue</option>
              <option value="Drainage Problem">Drainage Problem</option>
              <option value="Other">Other</option>
           
      </select>
    </div>

    {/* Reset Button */}
    <div className="mt-4 md:mt-6">
      <button
        onClick={() =>
          setFilters({ priority: "", status: "" })
        }
        className="btn btn-outline btn-sm"
      >
        Reset
      </button>
    </div>

  </div>
</div>


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
            {filteredIssues?.map((item, index) => (
              <tr key={item._id} className="border-b">
                <td className="p-2">{index + 1}</td>

                {/* Issue Title */}
                <td className="p-2 font-semibold">{item.title}</td>

                {/* Category */}
                <td className="p-2">{item.category}</td>

                {/* Status Badge */}
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      item.status === "pending"
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
                    className={`px-2 py-1 rounded text-white text-xs ${
                      item.priority === "High" ? "bg-red-600" : "bg-blue-500"
                    }`}
                  >
                    {item.priority}
                  </span>
                </td>

                {/* Assigned Staff */}
                <td className="p-2">
                  {item.staffName ? (
                    <span className="font-medium">{item.staffName}</span>
                  ) : (
                    <span className="text-gray-400 italic">Not Assigned</span>
                  )}
                </td>

                <td className="p-2 flex gap-2">
                  {/* Assign Staff Button */}
                  {!item?.staffName ? (
                    <button
                      onClick={() => openAssignModal(item)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 
      text-white rounded text-sm transition"
                    >
                      Assign Staff
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-3 py-1 bg-gray-400 text-white 
      rounded text-sm cursor-not-allowed"
                    >
                      Assigned
                    </button>
                  )}

                  {/* Reject Button */}
                  {item?.status === "pending" ? (
                    <button
                      onClick={() => handleReject(item)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 
      text-white rounded text-sm transition"
                    >
                      Reject
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-3 py-1 bg-gray-400 text-white 
      rounded text-sm cursor-not-allowed"
                    >
                      Rejected
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
      <dialog
        ref={assignedStaff}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Assign Staff</h3>

          {/* Dropdown */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">
                Select Aviable Staff
              </span>
            </label>

            <select
              className="select select-bordered w-full"
              defaultValue=""
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedStaff = staffs.find((s) => s._id === selectedId);
                setSelectedStaff(selectedStaff);
              }}
            >
              <option disabled value="">
                Select a rider
              </option>

              {staffs?.map((staff) => (
                <option key={staff._id} value={staff._id}>
                  {staff.display_name} ({staff?.email})
                </option>
              ))}
            </select>
          </div>

          {/* Assign Button */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              disabled={!selectedStaff}
              onClick={() => handelAssignStaff(selectedStaff)}
              className="btn btn-success"
            >
              Assign Staff
            </button>

            <form method="dialog">
              <button className="btn btn-outline">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllIssueManage;
