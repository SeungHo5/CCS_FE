const iconMap = {
  'StudyBoard': require('@assets/challengeBoardIcon0.png'),
  'CharacterBoard': require('@assets/challengeBoardIcon1.png'),
  'CoinBoard': require('@assets/challengeBoardIcon2.png'),
};

export const getChallengeIconSource = (iconName) => {
  console.log("🔍 getChallengeIconSource 호출:", { iconName, result: iconMap[iconName] });
  
  const result = iconMap[iconName];
  if (!result) {
    console.warn(`❌ 아이콘을 찾을 수 없음: ${iconName}`);
    // 기본 아이콘 반환
    return iconMap['StudyBoard'];
  }
  
  return result;
};
