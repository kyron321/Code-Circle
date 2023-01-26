import React, { useState } from 'react';
import styles from '../../css/userProfile.module.css';
import { useRouter } from 'next/router';
import UserProfile from '../../components/UserProfile';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function OtherUserProfile() {
  const { user } = useAuthContext();
  const [isUsersOwnProfile, setIsUsersOwnProfile] = useState(false);
  let { query } = useRouter();
  let userNameFromParams = query.displayname;

  return (
    <div className={styles.pageContainer}>
      <UserProfile
        userName={user?.displayName}
        userNameFromParams={userNameFromParams}
      />
    </div>
  );
}
