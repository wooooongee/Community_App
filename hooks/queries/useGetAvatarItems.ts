import {
  getBottoms,
  getFaces,
  getHands,
  getHats,
  getSkins,
  getTops,
} from "@/api/avatar";
import { queryKeys } from "@/constants";
import { useQueries } from "@tanstack/react-query";

function useGetAvatarItems() {
  const [
    hatsQuery,
    facesQuery,
    topsQuery,
    bottomsQuery,
    handsQuery,
    skinsQuery,
  ] = useQueries({
    queries: [
      {
        queryFn: getHats,
        queryKey: [queryKeys.AVATAR, "hats"],
      },
      {
        queryFn: getFaces,
        queryKey: [queryKeys.AVATAR, "faces"],
      },
      {
        queryFn: getTops,
        queryKey: [queryKeys.AVATAR, "tops"],
      },
      {
        queryFn: getBottoms,
        queryKey: [queryKeys.AVATAR, "bottoms"],
      },
      {
        queryFn: getHands,
        queryKey: [queryKeys.AVATAR, "hands"],
      },
      {
        queryFn: getSkins,
        queryKey: [queryKeys.AVATAR, "skins"],
      },
    ],
  });

  return {
    hats: hatsQuery.data || [],
    faces: facesQuery.data || [],
    tops: topsQuery.data || [],
    bottoms: bottomsQuery.data || [],
    hands: handsQuery.data || [],
    skins: skinsQuery.data || [],
  };
}

export default useGetAvatarItems;
