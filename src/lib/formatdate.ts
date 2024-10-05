export const formatDate = (date: string, relative: boolean = false) => {
  const d = new Date(date);
  const now = new Date();

  if (relative) {
    const s = Math.floor((now.getTime() - d.getTime()) / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(s / 3600);
    const days = Math.floor(s / 86400);
    const months = now.getMonth() - d.getMonth() + (12 * (now.getFullYear() - d.getFullYear()));
    const years = now.getFullYear() - d.getFullYear();

    if (s < 60) {
      return `방금 전`;
    } else if (m < 60) {
      return `${m}분 전`;
    } else if (h < 24) {
      return `${h}시간 전`;
    } else if (days < 30) {
      return `${days}일 전`;
    } else if (months < 12) {
      return `${months}달 전`;
    } else {
      return `${years}년 전`;
    }
  } else {
    return d.toLocaleString('ko-KR', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
};