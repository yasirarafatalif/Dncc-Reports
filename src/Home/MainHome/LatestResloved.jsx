import { Link, useNavigate } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ViewButton from "../../Components/Shared/ViewButton";
import { CiCircleCheck } from "react-icons/ci";


const LatestResloved = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxios();
    const { data: latestIssue = [] } = useQuery({
        queryKey: ["latest-all-get-issue"],
        queryFn: async () => {
            const res = await axiosSecure.get('/latest-issue');
            //   console.log(res.data);
            return res.data;
        },
    });
    console.log(latestIssue);

    // 🔹 Fake Data
    const issues = [
        {
            id: "1",
            title: "Broken Streetlight",
            location: "Dhanmondi, Dhaka",
            category: "Streetlight",
            status: "resolved",
            resolvedAt: "10 Aug 2025",
            image:
                "https://images.unsplash.com/photo-1504215680853-026ed2a45def",
        },
        {
            id: "2",
            title: "Pothole on Main Road",
            location: "Mirpur 10",
            category: "Road",
            status: "resolved",
            resolvedAt: "09 Aug 2025",
            image:
                "https://images.unsplash.com/photo-1505842465776-3ac2697b3f4a",
        },
        {
            id: "3",
            title: "Garbage Overflow",
            location: "Uttara Sector 7",
            category: "Sanitation",
            status: "resolved",
            resolvedAt: "08 Aug 2025",
            image:
                "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a",
        },
        {
            id: "4",
            title: "Water Leakage",
            location: "Mohammadpur",
            category: "Water",
            status: "resolved",
            resolvedAt: "07 Aug 2025",
            image:
                "https://images.unsplash.com/photo-1581093588401-16d3c61f6b6b",
        },
        {
            id: "5",
            title: "Damaged Footpath",
            location: "Farmgate",
            category: "Footpath",
            status: "resolved",
            resolvedAt: "06 Aug 2025",
            image:
                "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
        },
        {
            id: "6",
            title: "Traffic Signal Not Working",
            location: "Gulshan 2",
            category: "Traffic",
            status: "resolved",
            resolvedAt: "05 Aug 2025",
            image:
                "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
        },
    ];

    // 🔹 Only resolved issues (sorted & limited)
    const resolvedIssues = issues
        .filter((issue) => issue.status === "resolved")
        .slice(0, 6);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-extrabold text-[#71717A]   mb-4">
                        Latest Resolved Issues
                    </h2>
                    <p className="text-gray-600 bg-primary max-w-2xl mx-auto">
                        Recent public infrastructure issues successfully resolved by
                        authorities.
                    </p>
                </div>

                {/* Issue Cards */}
                {/* <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestIssue?.map((issue) => (
                        <div
                        data-aos="zoom-in"

                            key={issue._id}
                            className=" hover:scale-105 hover:cursor-pointer  hover:duration-1000 bg-gray-100  rounded-2xl shadow hover:shadow-xl  transition overflow-hidden"
                        >
                           
                            <img
                                src={issue?.images[0]}
                                alt={issue?.title}
                                className="h-48 w-full object-cover"
                            />

                         
                            <div className="p-6">
                                <span className="inline-block mb-3 px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
                                    Resolved
                                </span>

                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {issue.title}
                                </h3>

                                <p className="text-gray-600 text-sm">
                                    📍 {issue.location}
                                </p>

                                <p className="text-gray-500 text-sm mb-4">
                                    Category: {issue?.category}
                                </p>

                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">
                                        {issue?.status}
                                    </span>
                                    <Link to={`/issue/${issue._id}`}>
                                    <ViewButton></ViewButton>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
                <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestIssue?.map((issue, index) => {
                        

                        return (
                            <div
                                key={issue._id}
                                data-aos="zoom-in"
                                className="group hover:cursor-pointer relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
                                style={{
                                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
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
                                        <span className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-full border backdrop-blur-sm bg-emerald-100 text-emerald-700 border-emerald-200 shadow-lg`}>
                                            
                                            
                                           <CiCircleCheck  /> {issue?.status}
                                        </span>
                                    </div>

                                    {/* Category badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-full bg-white/90 text-gray-700 backdrop-blur-sm shadow-lg">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
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
                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium truncate">{issue.location}</span>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        {/* Timestamp or ID */}
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {/* <span>Issue #{issue._id.slice(-6)}</span> */}
                                        </div>

                                        {/* View Details Button */}
                                        <Link to={`/issue/${issue._id}`}>
                                            <button className={`group/btn inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
                                                <span>View Details</span>
                                                <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Bottom accent line */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`}></div>
                            </div>
                        );
                    })}

                    <style jsx>{`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>
                </div>
            </div>
        </section>
    );
};

export default LatestResloved;
