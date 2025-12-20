import React, { useState } from 'react';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const AllRejectedIssue = () => {
    const axiosSecure=useAxios();
     const { data: reslovedIssue = [], refetch,isLoading } = useQuery({
    queryKey: ["all_rejected_issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-rejected-issue");
      return res.data;
    },
  });
  if(isLoading){
    <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
  }

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
 <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 min-h-screen">
  <title>All Rejected Issues</title>

  {/* ================= FILTER SECTION ================= */}
  <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white rounded-2xl shadow-xl border border-blue-100/50 p-6 mb-6">
    {/* Decorative background */}
    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl -z-10"></div>

    <div className="flex flex-col lg:flex-row lg:items-end gap-6">

      {/* Title */}
      <div className="lg:w-56">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Filter Issues
            </h3>
            <p className="text-xs text-gray-500">
              Narrow down issues easily
            </p>
          </div>
        </div>
      </div>

      {/* Priority */}
      <div className="form-control w-full sm:w-64">
        <label className="label pb-2">
          <span className="label-text text-sm font-semibold text-gray-700 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Priority Level
          </span>
        </label>
        <select
          className="select select-bordered bg-white border-2 border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:outline-none transition-all rounded-xl shadow-sm"
          value={filters.priority}
          onChange={(e) =>
            setFilters({ ...filters, priority: e.target.value })
          }
        >
          <option value="">All Priorities</option>
          <option value="high">🔴 High Priority</option>
          <option value="normal">🟢 Low Priority</option>
        </select>
      </div>

      {/* Category */}
      <div className="form-control w-full sm:w-64">
        <label className="label pb-2">
          <span className="label-text text-sm font-semibold text-gray-700 flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Issue Category
          </span>
        </label>
        <select
          className="select select-bordered bg-white border-2 border-gray-200 hover:border-purple-400 focus:border-purple-500 focus:outline-none transition-all rounded-xl shadow-sm"
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories</option>
          <option value="Road Problem">🛣️ Road Problem</option>
          <option value="Water Leakage">💧 Water Leakage</option>
          <option value="Garbage Overflow">🗑️ Garbage Overflow</option>
          <option value="Street Light Issue">💡 Street Light Issue</option>
          <option value="Drainage Problem">🚰 Drainage Problem</option>
          <option value="Other">📋 Other</option>
        </select>
      </div>

      {/* Reset */}
      <div className="pt-2">
        <button
          onClick={() =>
            setFilters({ priority: "", category: "" })
          }
          className="group btn btn-outline border-2 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:border-transparent hover:text-white px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset Filters
        </button>
      </div>

    </div>
  </div>

  {/* ================= TABLE SECTION ================= */}
  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

    {/* Table Header */}
    <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
        <div>
          <h3 className="font-bold text-lg text-gray-800">
            All Reported Issues
          </h3>
          <p className="text-xs text-gray-500">Manage and track community issues</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
        <span className="text-xs font-medium text-gray-500">Total Issues:</span>
        <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {filteredIssues?.length || 0}
        </span>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr className="text-xs uppercase tracking-wider">
            <th className="text-gray-600 font-bold">#</th>
            <th className="text-gray-600 font-bold">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Issue Title
              </div>
            </th>
            <th className="text-gray-600 font-bold">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Category
              </div>
            </th>
            <th className="text-gray-600 font-bold">Status</th>
            <th className="text-gray-600 font-bold">Priority</th>
            <th className="text-center text-gray-600 font-bold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredIssues?.map((item, index) => (
            <tr
              key={item._id}
              className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-300 group"
              style={{
                animation: `fadeInRow 0.4s ease-out ${index * 0.05}s both`
              }}
            >
              <td className="font-semibold text-gray-500">{index + 1}</td>

              <td className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {item.title}
              </td>

              <td>
                <span className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                  {item.category}
                </span>
              </td>

              <td>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-sm ${
                    item.status === "pending"
                      ? "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200"
                      : item.status === "approved"
                      ? "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200"
                      : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    item.status === "pending"
                      ? "bg-amber-500 animate-pulse"
                      : item.status === "approved"
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }`}></span>
                  {item.status}
                </span>
              </td>

              <td>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-sm ${
                    item.priority === "High"
                      ? "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200"
                      : "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200"
                  }`}
                >
                  {item.priority === "High" ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                  {item.priority}
                </span>
              </td>

              <td className="text-center">
                <Link to={`/issue/${item?._id}`}>
                <button className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>View</span>
                  <svg className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
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

export default AllRejectedIssue;