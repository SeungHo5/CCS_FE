import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconText from '@molecules/IconText';

const TopStatusBar = ({level, coin, style, contentStyle}) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container, style]}>
      <View style={[styles.content, contentStyle]}>
        <IconText
          width = {105}
          height = {40}
          icon={require('@assets/petBtn.png')}
          text={`Lv.${level || 20}`}
        />
        <IconText 
          width = {105}
          height = {40}
          icon={require('@assets/coin.png')}
          text={`${coin || 3150}`}
        />
      </View>
    </View>
  );
};
export default TopStatusBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    top: 40,
    left: 20,
    right: 20,
    height: 50,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  }
});
