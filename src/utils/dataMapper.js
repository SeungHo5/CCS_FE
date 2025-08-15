 // utils/dataMapper.js (새로 생성)
  import { ALL_CHARACTERS, ALL_THEMES } from
  '../constants/allCharacters';
  import { getCharacterImage, getThemeImage } from
  './imageMapping';

  // 전체 캐릭터 + 보유 정보를 합성
  export const mergeCharacterData = (userCharacters =
  []) => {
    return ALL_CHARACTERS.map(character => {
      const ownedCharacter = userCharacters.find(uc => uc.id === character.id);
      return {
        id: character.id,
        name: character.name,
        rarity: character.rarity,
        image: getCharacterImage(character.id),
        amount: ownedCharacter?.amount || 0,
        locked: !ownedCharacter || ownedCharacter?.amount <= 0, // 수량이 0 이하면 잠김
        isSelected: ownedCharacter?.isSelected || false
      };
    });
  };

  // 전체 테마 + 보유 정보를 합성
  export const mergeThemeData = (userThemes = []) => {
    return ALL_THEMES.map(theme => {
      const ownedTheme = userThemes.find(ut => ut.id === theme.id);
      return {
        id: theme.id,
        name: theme.name,
        rarity: theme.rarity,
        image: getThemeImage(theme.id),
        amount: ownedTheme?.amount || 0,
        locked: !ownedTheme || ownedTheme?.amount <= 0, // 수량이 0 이하면 잠김
        isSelected: ownedTheme?.isSelected || false
      };
    });
  };