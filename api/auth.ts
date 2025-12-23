import type { Profile } from "@/types";
import { getSecureStore } from "@/utils/secureStore";
import axiosInstance from "./axios";

type RequestUser = {
  email: string;
  password: string;
};

async function postSignup(body: RequestUser): Promise<void> {
  const { data } = await axiosInstance.post("/auth/signup", body);

  return data;
}

async function postLogin(
  body: RequestUser & { expoPushToken?: string }
): Promise<{ accessToken: string }> {
  const { data } = await axiosInstance.post("/auth/signin", body);

  return data;
}

async function getMe(): Promise<Profile> {
  const accessToken = await getSecureStore("accessToken");

  const { data } = await axiosInstance.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
}

async function getUserProfile(id: number): Promise<Profile> {
  const { data } = await axiosInstance.get(`/auth/${id}`);

  return data;
}

async function editProfile(body: Partial<Profile>): Promise<Profile> {
  const { data } = await axiosInstance.patch("/auth/me", body);

  return data;
}

export { editProfile, getMe, getUserProfile, postLogin, postSignup };
