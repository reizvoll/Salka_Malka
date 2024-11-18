export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  // 날짜 비교를 위해 날짜의 년, 월, 일만 비교
  const isToday = date.toLocaleDateString() === now.toLocaleDateString();

  // 1일 전, 2일 전, 3일 전 계산
  const diffInTime = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  // "오늘"인 경우
  if (isToday) {
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
