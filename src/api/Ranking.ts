import type { RankingInfoProps, RankingListItemData, MyRankCardProps } from "../model/Ranking";
import { PROFILE_ICONS } from "../constants/ProfileIcons";

const API_BASE_URL = "https://dev-api.dkuaegis.org";

export async function getRankingData(): Promise<{
  info: RankingInfoProps;
  top10: RankingListItemData[];
  me: MyRankCardProps;
}> {
  const res = await fetch(`${API_BASE_URL}/points/ranking`, {
    method: "GET",
    credentials: "include", // 세션 쿠키 전송
    headers: { 
        accept: "application/json" 
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as {
    memberCount: number;
    top10: {
      rank: number;
      name: string;
      totalEarnedPoints: number;
      profileIcon: string | null;
    }[];
    me: {
      rank: number;
      name: string;
      totalEarnedPoints: number;
      profileIcon: string | null;
    };
  };

  const sortedTop10 = [...json.top10].sort((a, b) => a.rank - b.rank);

  return {
    info: { totalParticipants: json.memberCount },
    top10: sortedTop10.map((u) => ({
      rank: u.rank,
      name: u.name,
      score: u.totalEarnedPoints,
      avatar: u.profileIcon ? PROFILE_ICONS[u.profileIcon] : "",
    })),
    me: {
      rank: json.me.rank,
      name: json.me.name,
      score: json.me.totalEarnedPoints,
      avatar: json.me.profileIcon ? PROFILE_ICONS[json.me.profileIcon] : "",
    },
  };
}