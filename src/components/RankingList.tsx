import React from 'react';
import type { RankingListItemData } from '../model/Ranking';
import '../style/RankingList.css';
import javaIcon from '../assets/C.png';

// 더미 데이터
const dummyRankingData: RankingListItemData[] = [
  { rank: 1, name: '윤성민', score: 2000, avatar: javaIcon },
  { rank: 2, name: '임세윤', score: 1950, avatar: javaIcon },
  { rank: 3, name: '류지성', score: 1700, avatar: javaIcon },
  { rank: 4, name: '권대근', score: 1550, avatar: javaIcon },
  { rank: 5, name: '김철수', score: 990, avatar: javaIcon },
  { rank: 6, name: '이단국', score: 900, avatar: javaIcon },
  { rank: 7, name: '정단국', score: 500, avatar: javaIcon },
  { rank: 8, name: '윤단국', score: 400, avatar: javaIcon },
  { rank: 9, name: '최단국', score: 300, avatar: javaIcon },
  { rank: 10, name: '박단국', score: 200, avatar: javaIcon },
];

const RankingList: React.FC = () => {
  const getRankIndicator = (rank: number) => {
    // 1, 2, 3위는 메달 이모지로 구분
    if (rank === 1) {
      return <div className="rank-medal">🥇</div>;
    }
    if (rank === 2) {
      return <div className="rank-medal">🥈</div>;
    }
    if (rank === 3) {
      return <div className="rank-medal">🥉</div>;
    }
    return <div className="rank-number">{rank}</div>;
  };

  return (
    <div className="ranking-list-container">
      {dummyRankingData.map((item) => (
        <div key={item.rank} className="ranking-item">
          {getRankIndicator(item.rank)}
          <img src={item.avatar} alt={item.name} className="ranking-avatar" />
          <div className="ranking-user-info">
            <p className="ranking-name">{item.name}</p>
            <p className="ranking-score">{item.score.toLocaleString()}점</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RankingList; 