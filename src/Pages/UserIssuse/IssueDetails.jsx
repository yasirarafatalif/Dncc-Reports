import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const IssueDetails = () => {
  const { id } = useParams();
  const {user}= useAuth();
  const navigate = useNavigate()
  const axiosSecure = useAxios();
  const {data: issue}=useQuery({
    queryKey:['user-issue-detalis'],
    queryFn: async()=>{
      const res = await axiosSecure.get(`/issue/${id}`)
      return res.data
    }
  })


  // if (!issue) return <p>Loading...</p>;

      const handelDelete = (percel) => {
          Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
          }).then((result) => {
              axiosSecure.delete(`/user/issue/${percel._id}?email=${user.email}`)
                  .then(res => {
                      if (res.data.result.deletedCount) {
                          Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: "Your Request has been deleted",
                              showConfirmButton: false,
                              timer: 1500
                          });
                          navigate('/')
                      }
                  })
  
          });
      }
  

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="max-w-4xl w-full space-y-8">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-3xl font-bold text-gray-800">{issue?.title}</h1>
          <p className="text-gray-600 mt-2">{issue?.description}</p>

          <div className="flex flex-wrap gap-3 mt-4">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
              {issue?.status}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              Priority: {issue?.priority}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-3">
            Submitted by: {issue?.name} ({issue?.email})
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-wrap gap-4">
          {
            issue?.status === "pending" && 
              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Edit Issue
            </button>
          }
          {
            issue?.status === "pending" && 
             <button
             onClick={()=> handelDelete(issue)}
             className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Delete Issue
            </button>
          }
          {
            issue?.status === "pending" && 
           <button className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              Boost Priority (100৳)
            </button>
          }
        

     
        </div>

     {
      issue?.status === 'pending'?    <div className="bg-white shadow-lg rounded-xl p-6">
        <div>Your Request Has Been Reivew</div>
      </div> :
         <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Assigned Staff</h2>

          <div className="border p-4 rounded-lg bg-gray-50">
            <p><strong>Name:</strong> {issue?.assignedStaff?.name}</p>
            <p><strong>Email:</strong> {issue?.assignedStaff?.email}</p>
            <p><strong>Phone:</strong> {issue?.assignedStaff?.phone}</p>
          </div>
        </div>
     }

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">Issue Images</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {issue?.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Issue"
                className="rounded-lg shadow-sm object-cover h-32 w-full"
              />
            ))}
          </div>
        </div>

        {/* <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Issue Timeline</h2>

          <div className="relative border-l border-gray-300 ml-4 space-y-10">
            {issue.timeline.map((entry, index) => (
              <div key={index} className="ml-6">
                <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2"></div>

                <div className="bg-gray-50 p-4 rounded-lg shadow-sm border">
                  <p className="font-semibold capitalize">{entry.status}</p>
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
        </div> */}
      </div>
    </div>
  );
};

export default IssueDetails;
