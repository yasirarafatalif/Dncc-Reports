import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const IssueDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  const { data: issue } = useQuery({
    queryKey: ["user-issue-details"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issue/${id}`);
      return res.data;
    },
  });

  const handelDelete = (percel) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      axiosSecure
        .delete(`/user/issue/${percel._id}?email=${user.email}`)
        .then((res) => {
          if (res?.data?.result?.deletedCount) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Request has been deleted",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        });
    });
  };

  if (!issue) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-10 px-4 flex justify-center">
      <div className="max-w-4xl w-full space-y-8">

        {/* -------- Issue Title Card -------- */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {issue?.title}
          </h1>

          <p className="text-gray-700 mt-2">{issue?.description}</p>

          <div className="flex flex-wrap gap-3 mt-4">
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-800 rounded-full text-sm font-medium">
              {issue?.status}
            </span>
            <span className="px-3 py-1 bg-gradient-to-r from-purple-200 to-purple-300 text-purple-800 rounded-full text-sm font-medium">
              Priority: {issue?.priority}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-3">
            Submitted by: {issue?.name} ({issue?.email})
          </p>
        </div>

        {/* -------- Buttons Section -------- */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-wrap gap-4">

          {issue?.status === "pending" && (
            <>
              <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:scale-105 transition">
                Edit Issue
              </button>

              <button
                onClick={() => handelDelete(issue)}
                className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow hover:scale-105 transition">
                Delete Issue
              </button>

              <button className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg shadow hover:scale-105 transition">
                Boost Priority (100৳)
              </button>
            </>
          )}

          {issue?.status === "assign_staff" && (
            <button className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg shadow hover:scale-105 transition">
              Boost Priority (100৳)
            </button>
          )}
        </div>

        {/* -------- Staff Info Section -------- */}
        {issue?.status === "pending" ? (
          <div className="bg-white shadow-lg rounded-xl p-6 text-center text-gray-700">
            <div>Your request is being reviewed...</div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Assigned Staff</h2>

            <div className="border p-4 rounded-lg bg-gray-50">
              <p><strong>Name:</strong> {issue?.staffName}</p>
              <p><strong>Email:</strong> {issue?.staffEmail}</p>
              <p><strong>Phone:</strong> {issue?.staffPhoneNumber}</p>
            </div>
          </div>
        )}

        {/* -------- Image Gallery -------- */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Issue Images</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {issue?.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Issue"
                className="rounded-xl shadow object-cover h-32 w-full hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* -------- Timeline Section -------- */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Issue Timeline</h2>

          <div className="relative ml-4 space-y-10 before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-gradient-to-b from-blue-500 to-purple-600 before:rounded-full">

            {issue?.timeline?.map((entry, index) => (
              <div key={index} className="ml-6 relative">

                <div className="absolute w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full -left-8 shadow-lg"></div>

                <div className="bg-gray-50 p-4 rounded-lg shadow border border-gray-200">
                  <p className="font-semibold capitalize text-gray-800">{entry.status}</p>

                  <p className="text-gray-700">{entry.message}</p>

                  <p className="text-sm text-gray-500 mt-1">
                    Updated by: {entry.updatedBy}
                  </p>

                  <p className="text-xs text-gray-400">
                    {new Date(entry.dateTime).toLocaleString()}
                  </p>
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default IssueDetails;
