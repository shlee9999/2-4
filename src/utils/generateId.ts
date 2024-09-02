export const generateId = function () {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD 형식의 날짜
  const randomString = Math.random().toString(36).slice(2, 11); // 무작위 문자열
  return `id-${date}-${randomString}`;
};
