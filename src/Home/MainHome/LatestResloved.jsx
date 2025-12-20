import { Link, useNavigate } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ViewButton from "../../Components/Shared/ViewButton";
import { CiCircleCheck } from "react-icons/ci";
import useAuth from "../../Hooks/useAuth";
import { AiOutlineLike } from "react-icons/ai";
import toast from "react-hot-toast";

const LatestResloved = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const { data: latestIssue = [],refetch } = useQuery({
    queryKey: ["latest-all-get-issue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-issue");
      return res.data;
    },
  });
  const handelLikeUpdate = (issueId) => {
    const userData = {
      likeEmail: user?.email,
    };
    axiosSecure.patch(`/likes/${issueId._id}`, userData).then((res) => {
      if (res.data.message === "Like added") {
        toast.success("You Are SuccessFully votr fot this issue");
      }
      if (res.data.message === "Already liked") {
        toast.error("You Are Already Like This Issue");
      }

      refetch();
    });
  };
  
//   const isLiked = issue?.likedBy?.includes(user?.email);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-[#71717A]   mb-4">
            Latest Resolved Issues
          </h2>
          <p className="text-gray-600  max-w-2xl mx-auto">
            Recent public infrastructure issues successfully resolved by
            authorities.
          </p>
        </div>

  
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestIssue?.map((issue, index) => {
            return (
              <div
                key={issue._id}
                data-aos="zoom-in"
                className="group hover:cursor-pointer relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Image with overlay */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={issue?.images[0] || "/placeholder.svg"}
                    alt={issue?.title}
                    className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                  {/* Status badge on image */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-full border backdrop-blur-sm bg-emerald-100 text-emerald-700 border-emerald-200 shadow-lg`}
                    >
                      <CiCircleCheck /> {issue?.status}
                    </span>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-full bg-white/90 text-gray-700 backdrop-blur-sm shadow-lg">
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
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      {issue?.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all line-clamp-2">
                    {issue.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-4 text-gray-600">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium truncate">
                      {issue.location}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {/* Timestamp or ID */}
                    <div className="flex items-center gap-2 text-xl text-gray-400">
                      <button
                        onClick={() => handelLikeUpdate(issue)}
                        className="flex justify-between items-center gap-2"
                      >
                        <AiOutlineLike className="text-blue-300" />
                        <span>{issue?.likesCount || "0"}</span>
                      </button>
                    </div>

                    {/* View Details Button */}
                    <Link to={`/issue/${issue._id}`}>
                      <button
                        className={`group/btn inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                      >
                        <span>View Details</span>
                        <svg
                          className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestResloved;
