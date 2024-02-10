// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// // import { formatLastSeen } from '../utils/utils'; // Adjust the import path accordingly
// import { FaUserCircle } from 'react-icons/fa';

// const Profile = () => {
//   const { authFetch, isAuthenticated } = useAuth();
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       if (!isAuthenticated()) {
//         return <redirectedirect to="/login" />;
//       }

//       try {
//         const response = await authFetch('/profile', 'GET');
//         setProfileData(response);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//         setError('Error fetching profile data');
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, [authFetch, isAuthenticated]);

//   if (!isAuthenticated()) {
//     return <redirectedirect to="/login" />;
//   }

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   // Function to format timestamp to display date and time
//   const formatLastSeen = (timestamp) => {
//     const date = new Date(timestamp);
//     return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit',
//     })}`;
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <div className="bg-white rounded-lg overflow-hidden shadow-lg">
//         <div className="px-6 py-4">
//           <div className="flex items-center">
//             <FaUserCircle className="w-16 h-16 text-gray-500 mr-4" />{' '}
//             {/* Use the user circle icon */}
//             <div>
//               <h1 className="text-xl font-bold">{profileData.username}</h1>
//               <p className="text-gray-600 text-sm">{profileData.email}</p>
//             </div>
//           </div>
//           <div className="mt-4">
//             <p className="text-gray-700">{profileData.description}</p>
//           </div>
//           <div className="mt-4">
//             <p className="text-gray-600 text-sm">
//               Last Seen: {formatLastSeen(profileData.last_seen)}
//             </p>
//           </div>
//         </div>
//         <div className="px-6 py-4 border-t border-gray-200">
//           <p className="text-sm text-gray-600">
//             Phone Number: {profileData.phone_number}
//           </p>
//         </div>
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Description
//         </label>
//         <p className="text-gray-700 text-lg">{profileData.description}</p>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa'; // Ensure react-icons/fa is properly imported

const Profile = () => {
  const { authFetch, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!isAuthenticated()) {
        return <redirect to="/login" />; // Fix the redirection here
      }

      try {
        const response = await authFetch('/profile', 'GET');
        setProfileData(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Error fetching profile data');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [authFetch, isAuthenticated]);

  if (!isAuthenticated()) {
    return <redirect to="/login" />; // Fix the redirection here
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Function to format timestamp to display date and time
  const formatLastSeen = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  return (
    <div className="container mx-auto my-4 mt-8 max-w-md">
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center">
            <FaUserCircle className="w-16 h-16 text-gray-600 mr-4" />
            <div>
              <h1 className="text-2xl font-bold">{profileData.username}</h1>
              <p className="text-gray-600 text-sm">{profileData.email}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-700">
              About Me: {profileData.description}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-gray-600 text-sm">
              Last Seen: {formatLastSeen(profileData.last_seen)}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Phone Number: {profileData.phone_number}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
