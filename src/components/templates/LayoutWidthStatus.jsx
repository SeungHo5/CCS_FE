import React, { useState } from 'react';
import MainLayout from '@templates/MainLayout';
import TopStatusBar from '@organisms/TopStatusBar';
import Box from '@atoms/box/Box';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LayoutWidthStatus = ({ title, children, titleBtnIcon, titleBtnOnPress, titleBtnStyle, titleHeight, boxStyle, style, contentStyle, titleContainerStyle, titleStyle }) => {
  const [level, setLevel] = useState(3);
  const [coin, setCoin] = useState(3000);
  
  const navigation = useNavigation();
  
  return (
    <MainLayout style={[styles.container, style]}>
      <TopStatusBar contentStyle={{justifyContent: 'center'}} level={level} coin={coin} />
      <Box
        title={title}
        titleBtnIcon={titleBtnIcon}
        titleBtnOnPress={titleBtnOnPress}
        titleBtnStyle={titleBtnStyle}
        titleContainerStyle={titleContainerStyle}
        titleStyle={titleStyle} 
        style={[styles.box, boxStyle]}
        contentStyle={contentStyle}
        titleHeight={titleHeight}
      >{children}</Box>
    </MainLayout>
  );
};
export default LayoutWidthStatus;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 90,
    marginBottom: 15,
  },
});
