export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  // 시간 차이를 계산
  const diffInTime = now.getTime() - date.getTime();

  // 초, 분, 시간, 일 차이 계산
  const diffInSeconds = Math.max(0, Math.floor(diffInTime / 1000)); // 음수일 경우 0으로 설정
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // "몇 초 전" 처리
  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  }

  // "몇 분 전" 처리
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  // "몇 시간 전" 처리
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  // "오늘"인 경우
  if (date.toLocaleDateString() === now.toLocaleDateString()) {
    return "오늘";
  }

  // 1일 전, 2일 전, 3일 전 처리
  if (diffInDays === 1) {
    return "1일 전";
  } else if (diffInDays === 2) {
    return "2일 전";
  } else if (diffInDays === 3) {
    return "3일 전";
  }

  // 3일 이상 전인 경우, 월과 일 표시
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  return `${month} ${day}일`;
};
