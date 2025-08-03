export function getFirstChoseong(text: string): string {
  const CHO = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];

  if (!text || text.length === 0) return '';

  const char = text[0];
  const code = char.charCodeAt(0);

  // 한글 범위 체크: 가(44032, 0xac00) ~ 힣(55203, 0xd7a3)
  // UNICODE
  if (code >= 0xac00 && code <= 0xd7a3) {
    const choIndex = Math.floor((code - 0xac00) / 588); // 중성(21) * 종성(28)
    return CHO[choIndex];
  }

  // 한글이 아닌 경우 그대로 반환 (예: 영어, 숫자)
  return '-';
}
