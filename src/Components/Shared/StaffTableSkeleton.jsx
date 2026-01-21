import React from 'react';

const StaffTableSkeleton = () => {
  return (
    <div className="animate-pulse overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="table w-full">
        <thead className="bg-gray-100">
          <tr>
            {[...Array(6)].map((_, i) => (
              <th key={i}>
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {[...Array(6)].map((_, row) => (
            <tr key={row}>
              <td>
                <div className="h-4 w-6 bg-gray-300 rounded"></div>
              </td>

              <td>
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </td>

              <td>
                <div className="h-4 w-40 bg-gray-300 rounded"></div>
              </td>

              <td>
                <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
              </td>

              <td>
                <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
              </td>

              <td className="flex gap-2 justify-center">
                <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
                <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
                <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTableSkeleton;
