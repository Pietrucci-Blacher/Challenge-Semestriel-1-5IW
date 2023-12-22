import { useEffect, useState, useCallback } from "react";
import httpClient from "@/services/httpClient";

const useUserAccount = (userId) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUserProfile = useCallback(async () => {
    setLoading(true);
    try {
      const account = await httpClient.get(`/users/${userId}`);
      setUserProfile(account);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [userId]);

  const updateProfile = async (updatedData) => {
    setLoading(true);
    try {
      const response = await httpClient.patch(`/users/${userId}`, updatedData);
      setUserProfile(response);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        await loadUserProfile();
      }
    };

    fetchData();
  }, [userId, loadUserProfile]);

  return { userProfile, updateProfile, loading, error };
};

export default useUserAccount;
