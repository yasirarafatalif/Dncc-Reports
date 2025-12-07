import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import AllIssueCard from "./AllIssueCard";

const AllIssue = () => {
  const axios = useAxios();
  const { user } = useAuth();

  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  // ---------------- Load All Issues ----------------
  const fetchIssues = async () => {
    const { data } = await axios.get("/issues");
    setIssues(data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // ---------------- Upvote Handler ----------------
  const handleUpvote = async (issue) => {
    if (!user) {
      return window.location.href = "/login";
    }

    if (issue.email === user?.email) {
      return toast.error("You cannot upvote your own issue!");
    }

    if (issue.upvotedUsers?.includes(user.email)) {
      return toast.error("You already upvoted this issue!");
    }
    setIssues((prev) =>
      prev.map((i) =>
        i._id === issue._id
          ? {
              ...i,
              upvotes: i.upvotes + 1,
              upvotedUsers: [...i.upvotedUsers, user.email],
            }
          : i
      )
    );

    // Update DB
    await axios.patch(`/issues/upvote/${issue._id}`, {
      email: user.email,
    });
  };

  // ---------------- Filtering Logic ----------------
  const filteredIssues = issues.filter((i) => {
    return (
      (filterCategory ? i.category === filterCategory : true) &&
      (filterStatus ? i.status === filterStatus : true) &&
      (filterPriority ? i.priority === filterPriority : true) &&
      i.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Issues</h1>

      {/* Filters + Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search issue..."
          className="input input-bordered w-full"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered"
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Category</option>
          <option value="Road">Road</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Garbage">Garbage</option>
        </select>

        <select
          className="select select-bordered"
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select
          className="select select-bordered"
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">Priority</option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
        </select>
      </div>

      {/* Issues Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredIssues.map((issue) => (
          <div
            key={issue._id}
            className="card bg-base-100 shadow-xl border border-gray-300"
          >
            <figure>
              <img
                src={issue.image}
                alt={issue.title}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{issue.title}</h2>

              <div className="flex gap-2">
                <span className="badge badge-info">{issue.category}</span>
                <span className="badge badge-warning">{issue.status}</span>
                <span className="badge badge-error">{issue.priority}</span>
              </div>

              <p className="text-gray-600">📍 {issue.location}</p>

              {/* Upvote Section */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleUpvote(issue)}
                  className="btn btn-sm btn-outline"
                >
                  👍 Upvote
                </button>

                <span className="text-lg font-semibold">
                  {issue.upvotes ?? 0}
                </span>
              </div>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/issue/${issue._id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AllIssueCard></AllIssueCard>
    </div>
  );
};

export default AllIssue;
