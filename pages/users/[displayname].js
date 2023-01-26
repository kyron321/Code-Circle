import React from "react";
import styles from "../css/otherUserProfile.module.css";
import { useRouter } from "next/router";
import { useAuthContext } from "../../hooks/useAuthContext";
import UserProfile from "../../components/UserProfile";

export default function OtherUserProfile() {
  return <UserProfile />;
}
