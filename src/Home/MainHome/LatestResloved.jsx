import { Link, useNavigate } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ViewButton from "../../Components/Shared/ViewButton";


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
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Latest Resolved Issues
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Recent public infrastructure issues successfully resolved by
                        authorities.
                    </p>
                </div>

                {/* Issue Cards */}
                <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestIssue?.map((issue) => (
                        <div
                        data-aos="zoom-in"

                            key={issue._id}
                            className="  rounded-2xl shadow hover:shadow-xl  transition overflow-hidden"
                        >
                            {/* Image */}
                            <img
                                src={issue?.images[0]}
                                alt={issue?.title}
                                className="h-48 w-full object-cover"
                            />

                            {/* Content */}
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
                                    

                                    {/* <button
                                        onClick={() => navigate(`/issue/${issue._id}`)}
                                        className="group inline-flex items-center gap-2 text-green-700 font-semibold
             transition-all duration-300
             hover:text-green-800"
                                    >
                                        <span>View Details</span>
                                        <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </button> */}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestResloved;
