import { editProfile, getMe, postLogin, postSignup } from "@/api/auth";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { removeHeader, setHeader } from "@/utils/header";
import {
  deleteSecureStore,
  getSecureStore,
  saveSecureStore,
} from "@/utils/secureStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import Toast from "react-native-toast-message";

function useGetMe() {
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    getSecureStore("accessToken").then((token) => {
      setHasToken(!!token);
      if (token) {
        setHeader("Authorization", `Bearer ${token}`);
      }
    });
  }, []);

  const { data, isError, isLoading } = useQuery({
    queryFn: getMe,
    queryKey: [queryKeys.AUTH, queryKeys.GET_ME],
    enabled: hasToken === true,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (isError) {
      removeHeader("Authorization");
      deleteSecureStore("accessToken");
      setHasToken(false);
    }
  }, [isError]);

  return { data, isLoading: hasToken === null || isLoading };
}

type ResponseError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await saveSecureStore("accessToken", accessToken);
      // 내정보 가져오는 훅 호출
      queryClient.fetchQuery({ queryKey: [queryKeys.AUTH, queryKeys.GET_ME] });
      router.replace("/");
    },
    onError: (error: ResponseError) => {
      Toast.show({
        type: "error",
        text1: error.response?.data.message,
      });
    },
  });
}

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => router.replace("/auth/login"),
    onError: (error: ResponseError) => {
      Toast.show({
        type: "error",
        text1: error.response?.data.message,
      });
    },
  });
}

function useUpdateProfile() {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: (newProfile) => {
      queryClient.setQueryData([queryKeys.AUTH, queryKeys.GET_ME], newProfile);
      // 아바타 변경 시 게시물/댓글 캐시 무효화 (author.avatarConfig 갱신)
      queryClient.invalidateQueries({ queryKey: [queryKeys.POST] });
    },
  });
}

function useAuth() {
  const { data, isLoading } = useGetMe();
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const profileMutation = useUpdateProfile();

  const logout = () => {
    removeHeader("Authorization");
    deleteSecureStore("accessToken");
    queryClient.resetQueries({ queryKey: [queryKeys.AUTH] });
  };

  const auth = useMemo(
    () => ({
      id: data?.id || "",
      nickname: data?.nickname || "",
      imageUri: data?.imageUri || "",
      introduce: data?.introduce || "",
      avatarConfig: data?.avatarConfig,
    }),
    [data?.id, data?.nickname, data?.imageUri, data?.introduce, data?.avatarConfig]
  );

  return {
    auth,
    isLoading,
    loginMutation,
    signupMutation,
    profileMutation,
    logout,
  };
}

export default useAuth;
