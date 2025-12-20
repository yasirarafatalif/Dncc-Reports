import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import Spinar from "../../Components/Shared/Spinar";

const IssueDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  const { data: userInfo = {} ,isLoading} = useQuery({
    queryKey: ["userIssue", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const handleSubmitClick = () => {
    if (userInfo?.status === "block") {
      Swal.fire({
        icon: "error",
        title: "You are blocked!",
        text: "You cannot submit an issue.",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
  };

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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
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
      }
    });
  };
  const handelPayment = async (percel) => {
    const paymentInfo = {
      percelName: percel.category,
      customer_email: percel.email,
      customer_name: user?.displayName,
      percelId: percel._id,
      cost: 100,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };

  if (!issue) return <Spinar />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-10 px-4 flex justify-center">
      <div
        className="max-w-5xl w-full space-y-6"
        style={{ animation: "fadeIn 0.6s ease-out" }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Issues
        </button>

        {/* Issue Title Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white rounded-2xl shadow-xl border border-blue-100/50 p-8">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl -z-10"></div>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                {issue?.title}
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {issue?.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wide shadow-sm border ${
                issue?.status === "pending"
                  ? "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200"
                  : issue?.status === "assign_staff"
                  ? "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200"
                  : "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  issue?.status === "pending"
                    ? "bg-amber-500 animate-pulse"
                    : "bg-emerald-500"
                }`}
              ></span>
              {issue?.status}
            </span>

            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wide shadow-sm border ${
                issue?.priority === "High"
                  ? "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200"
                  : "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200"
              }`}
            >
              {issue?.priority === "High" ? (
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
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              ) : (
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
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              )}
              Priority: {issue?.priority}
            </span>

            {issue?.payment_status === "paid" && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200 shadow-sm">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Priority Boosted
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              {issue?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Submitted by: {issue?.name}
              </p>
              <p className="text-xs text-gray-500">{issue?.email}</p>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        {userInfo.status !== "block" && issue?.email === user?.email && (
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              Issue Actions
            </h3>

            <div className="flex flex-wrap gap-4">
              {issue?.status === "pending" && (
                <>
                  {issue?.payment_status !== "paid" && (
                    <>
                      <button
                        onClick={() => handelDelete(issue)}
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl shadow-lg hover:shadow-xl font-bold transform hover:scale-105 transition-all duration-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete Issue
                      </button>

                      <button
                        onClick={() => handelPayment(issue)}
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-xl font-bold transform hover:scale-105 transition-all duration-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        Boost Priority (100৳)
                      </button>
                    </>
                  )}
                </>
              )}

              {issue?.status === "assign_staff" &&
                issue?.payment_status !== "paid" && (
                  <button
                    onClick={() => handelPayment(issue)}
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-xl font-bold transform hover:scale-105 transition-all duration-300"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Boost Priority (100৳)
                  </button>
                )}
            </div>
          </div>
        )}

        {/* Staff Info Section */}
        {issue?.status === "pending" ? (
          <div className="relative overflow-hidden bg-gradient-to-br from-white via-amber-50/20 to-white rounded-2xl shadow-xl border border-amber-100/50 p-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl -z-10"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white animate-spin"
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
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Under Review
                </p>
                <p className="text-sm text-gray-500">
                  Your request is being reviewed by our team
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/20 to-white rounded-2xl shadow-xl border border-emerald-100/50 p-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl -z-10"></div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Assigned Staff Member
                </h2>
                <p className="text-sm text-gray-500">
                  Your issue has been assigned to a staff member
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-emerald-50/30 p-6 rounded-xl border border-gray-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                  {issue?.staffName?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{issue?.staffName}</p>
                  <p className="text-sm text-gray-500">Assigned Staff</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm">{issue?.staffEmail}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-sm">{issue?.staffPhoneNumber}</span>
              </div>
            </div>
          </div>
        )}

        {/* Image Gallery */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Issue Images</h2>
              <p className="text-sm text-gray-500">
                {issue?.images?.length} images attached
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {issue?.images?.map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{ animation: `zoomIn 0.4s ease-out ${i * 0.1}s both` }}
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`Issue ${i + 1}`}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-sm font-semibold">
                    Image {i + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Issue Timeline
              </h2>
              <p className="text-sm text-gray-500">
                Track the progress of your issue
              </p>
            </div>
          </div>

          <div className="relative ml-8 space-y-8 before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-gradient-to-b before:from-blue-500 before:via-purple-500 before:to-pink-500 before:rounded-full">
            {issue?.timeline?.map((entry, index) => (
              <div
                key={index}
                className="ml-8 relative"
                style={{
                  animation: `slideInLeft 0.5s ease-out ${index * 0.15}s both`,
                }}
              >
                <div className="absolute w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full -left-10 shadow-lg border-4 border-white"></div>

                <div className="group bg-gradient-to-br from-gray-50 to-blue-50/20 p-6 rounded-xl shadow-md hover:shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg capitalize text-gray-800 group-hover:text-blue-600 transition-colors">
                      {entry.status}
                    </h3>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                      {new Date(entry.dateTime).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {entry.message}
                  </p>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
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
                      <span className="font-medium">{entry.updatedBy}</span>
                    </div>
                  
                  </div>
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
