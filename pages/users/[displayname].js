import React, { useEffect, useState } from 'react';
import styles from '../../css/userProfile.module.css';
import { useRouter } from 'next/router';
import UserProfile from '../../components/UserProfile';
import { useAuthContext } from '../../hooks/useAuthContext';
import PastPosts from '../../components/PastPosts';

export default function OtherUserProfile() {
  const { user } = useAuthContext();

  return (
    <div className={styles.pageContainer}>
      <UserProfile userName={user?.displayName} />
      <PastPosts />
    </div>
  );
}
