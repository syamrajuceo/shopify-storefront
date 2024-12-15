import { useEffect, useState } from "react";

function UserData({user}) {
  
  return (
    <>
      {user ? (
        <div className="w-64 bg-gray-800 text-white p-4">
          <div className="flex items-center space-x-4 mb-8">
            <div className="relative">
              <img
                className="w-16 h-16 rounded-full border-2 border-white"
                src={user.profilePicture || "https://randomuser.me/api/portraits/men/1.jpg"}
                alt="User Avatar"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <h2 className="text-lg font-semibold">{`${user.firstName} ${user.lastName}` || "John Doe"}</h2>
              <p className="text-sm text-gray-400">{"Online"}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </>
  );
}

export default UserData;
