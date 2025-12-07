import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const AllIssueCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  const { data: issue } = useQuery({
    queryKey: ['all_issue'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-issue');
      return res.data;
    }
  });

  return (
    <div className="grid bg-[#f8f8f8] grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {issue?.map((parcel, i) => (
        <div key={i} className="card bg-base-100 shadow-xl">
          <figure>
            <img
              src={parcel?.images?.[0]}
              className="h-48 w-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{parcel?.title}</h2>

            <div className="flex gap-2">
              <span className="badge text-white badge-info">{parcel?.category}</span>
              <span className="badge text-white badge-warning">{parcel?.status}</span>
              <span className="badge text-white badge-error">{parcel?.priority}</span>
            </div>

            <p>📍 {parcel?.location}</p>
            <p> Submited By : {parcel?.name}</p>

            <div className="flex justify-between items-center">
              <span>👍 {parcel?.upvotes || 0} Upvotes</span>
              <Link to={`/issue/${parcel._id}`}>

                <button

                  className="btn btn-ghost  text-white bg-green-500 btn-md">
                  View Issue
                </button></Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllIssueCard;
