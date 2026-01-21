import React from "react";
import { motion } from "framer-motion"; // Framer Motion install thakte hobe
import { Link } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { CiCircleCheck, CiLocationOn } from "react-icons/ci";
import useAuth from "../../Hooks/useAuth";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";
import IssueCardSkeleton from "../../Components/Shared/IssueCardSkeleton";

const LatestResloved = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data: latestIssue = [], refetch, isLoading } = useQuery({
    queryKey: ["latest-all-get-issue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-issue");
      return res.data;
    },
  });

  const handelLikeUpdate = (issueId) => {
    if (!user) return toast.error("Please login to vote");
    
    axiosSecure.patch(`/likes/${issueId._id}`, { likeEmail: user?.email }).then((res) => {
      if (res.data.message === "Like added") toast.success("Vote registered!");
      if (res.data.message === "Already liked") toast.error("Already voted");
      refetch();
    });
  };

  if (isLoading) {
    return (
      <div className="grid max-w-7xl mx-auto px-6 grid-cols-1 md:grid-cols-3 gap-8 py-20">
        {[...Array(6)].map((_, i) => (
          <IssueCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Framer Motion Variants for Staggered Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Ekta card ashar kisu khon por arekta card ashbe
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-base-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs">Success Stories</span>
          <h2 className="text-4xl md:text-5xl font-black text-secondary mt-3 mb-4">
            Latest <span className="text-emerald-500">Resolved</span> Issues
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto font-medium">
            Discover the positive changes happening in our community through collective action.
          </p>
        </motion.div>

        {/* Animated Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {latestIssue?.map((issue) => {
            const isLiked = issue?.likedBy?.includes(user?.email);

            return (
              <motion.div
                key={issue._id}
                variants={itemVariants}
                whileHover={{ y: -12 }}
                className="group relative bg-base-100 rounded-[2.5rem] p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)]  transition-all duration-500 
                
                border  backdrop-blur-xl  border-blue-500/50 hover:shadow-blue-500/20 hover:shadow-2xl
                "
              >
                {/* Image Section */}
                <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    src={issue?.images[0] || "/placeholder.svg"}
                    alt={issue?.title}
                    className="h-full w-full object-cover"
                  />
                  
                  {/* Glassmorphism Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="backdrop-blur-md bg-emerald-500/90 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 shadow-lg">
                      <CiCircleCheck className="text-lg" /> Resolved
                    </div>
                  </div>

                  <div className="absolute top-4 left-4">
                    <div className="backdrop-blur-md bg-white/80 text-slate-700 px-3 py-1.5 rounded-xl text-[10px] font-bold shadow-sm">
                      {issue?.category}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 pb-4">
                  <h3 className="text-xl font-extrabold text-secondary mb-3 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
                    {issue.title}
                  </h3>

                  <div className="flex items-center gap-2 text-slate-400 mb-6 font-medium">
                    <CiLocationOn className="text-emerald-500 text-xl" />
                    <span className="text-xs truncate">{issue.location}</span>
                  </div>

                  {/* Footer Action */}
                  <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handelLikeUpdate(issue)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                        isLiked ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400 hover:text-emerald-500'
                      }`}
                    >
                      {isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
                      <span className="text-sm font-black">{issue?.likesCount || "0"}</span>
                    </motion.button>

                    <Link to={`/issue/${issue._id}`}>
                      <motion.div 
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-slate-800 font-bold text-sm bg-slate-100 px-4 py-2 rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-300"
                      >
                        Details
                        <FiArrowRight />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestResloved;