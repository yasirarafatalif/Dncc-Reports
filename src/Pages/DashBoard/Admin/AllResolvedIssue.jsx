import React, { useState } from 'react';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const AllResolvedIssue = () => {
    const axiosSecure=useAxios();
     const { data: reslovedIssue = [], refetch } = useQuery({
    queryKey: ["all_resolved_issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-resoved-issue");
      return res.data;
    },
  });
  console.log(reslovedIssue)

   const [filters, setFilters] = useState({
    priority: "",
    status: "",
    category:''
  });
    const filteredIssues = reslovedIssue.filter((item) => {
      return (
        (!filters.priority || item.priority === filters.priority) &&
        (!filters.category || item.category === filters.category)
      );
    });
  
    return (
      <div className="bg-gray-100 p-6 min-h-screen">

  {/* ================= FILTER SECTION ================= */}
  <div className="bg-white p-5 rounded-2xl shadow mb-6">
    <div className="flex flex-col lg:flex-row lg:items-end gap-5">

      {/* Title */}
      <div className="lg:w-48">
        <h3 className="text-lg font-semibold text-gray-800">
          Filter Issues
        </h3>
        <p className="text-xs text-gray-500">
          Narrow down issues easily
        </p>
      </div>

      {/* Priority */}
      <div className="form-control w-full sm:w-56">
        <label className="label py-0">
          <span className="label-text text-sm text-gray-600">
            Priority
          </span>
        </label>
        <select
          className="select select-bordered select-sm focus:outline-none"
          value={filters.priority}
          onChange={(e) =>
            setFilters({ ...filters, priority: e.target.value })
          }
        >
          <option value="">All Priority</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Category */}
      <div className="form-control w-full sm:w-56">
        <label className="label py-0">
          <span className="label-text text-sm text-gray-600">
            Category
          </span>
        </label>
        <select
          className="select select-bordered select-sm"
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Category</option>
          <option value="Road Problem">Road Problem</option>
          <option value="Water Leakage">Water Leakage</option>
          <option value="Garbage Overflow">Garbage Overflow</option>
          <option value="Street Light Issue">Street Light Issue</option>
          <option value="Drainage Problem">Drainage Problem</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Reset */}
      <div className="pt-2">
        <button
          onClick={() =>
            setFilters({ priority: "", category: "" })
          }
          className="btn btn-outline btn-sm px-6"
        >
          Reset
        </button>
      </div>

    </div>
  </div>

  {/* ================= TABLE SECTION ================= */}
  <div className="bg-white rounded-2xl shadow overflow-hidden">

    {/* Table Header */}
    <div className="px-5 py-4 border-b flex justify-between items-center">
      <h3 className="font-semibold text-gray-800">
        All Reported Issues
      </h3>
      <span className="text-sm text-gray-500">
        Total: {filteredIssues?.length || 0}
      </span>
    </div>

    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead className="bg-gray-50 text-gray-600 text-sm">
          <tr>
            <th>#</th>
            <th>Issue Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Priority</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredIssues?.map((item, index) => (
            <tr
              key={item._id}
              className="hover:bg-gray-50 transition"
            >
              <td>{index + 1}</td>

              <td className="font-medium text-gray-800">
                {item.title}
              </td>

              <td className="text-gray-600">
                {item.category}
              </td>

              <td>
                <span
                  className={`badge badge-sm text-white ${
                    item.status === "pending"
                      ? "badge-warning"
                      : item.status === "approved"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td>
                <span
                  className={`badge badge-sm text-white ${
                    item.priority === "High"
                      ? "badge-error"
                      : "badge-info"
                  }`}
                >
                  {item.priority}
                </span>
              </td>

              <td className="text-center">
               <Link to={`/issue/${item?._id}`} className="btn btn-xs btn-outline btn-primary">
               View
               
               </Link>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  </div>

</div>

    );
};

export default AllResolvedIssue;