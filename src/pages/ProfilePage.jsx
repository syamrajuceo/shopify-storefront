import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProfileContainer from '../components/Profile/ProfileContainer';
// import ScrollToTop from '../utils/ScrollToTop';

function ProfilePage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("/");

  useEffect(() => {
    // ScrollToTop()
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('activetab');
    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab("/");
    }
  }, [location.search]);

  return (
    <div>
      <ProfileContainer activeTab={activeTab} />
    </div>
  );
}

export default ProfilePage;
