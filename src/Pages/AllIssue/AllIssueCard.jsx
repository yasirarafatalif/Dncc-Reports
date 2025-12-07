import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const AllIssueCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate()
  const axiosSecure = useAxios();
  const { data: issue } = useQuery({
    queryKey: ['all_issue'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-issue')
      return res.data
    }
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

      {
        issue.map((p,i)=>(  <div key={p._id} className="card bg-base-100 shadow-xl border">
        <figure>
          <img
            src={p?.images[0]}
            className="h-48 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{p?.title}</h2>

          <div className="flex gap-2">
            <span className="badge text-white badge-info">{p?.category}</span>
            <span className="badge text-white badge-warning">{p?.status}</span>
            <span className="badge text-white  badge-error">{p?.priority}</span>
          </div>

          <p>📍 {p.location}</p>
          <p> Submited By : {p.name}</p>

          <div className="flex justify-between items-center">
            <span>👍 12 Upvotes</span>
            <button className="btn btn-primary btn-sm">View Details</button>
          </div>
        </div>
      </div>))
      }

    </div>
  );
};


export default AllIssueCard;