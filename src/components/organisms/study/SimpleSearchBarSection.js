import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text as RNText } from 'react-native';
import Icon from '@components/atoms/image/Icon';

// 간단한 SearchInput 컴포넌트
const SimpleSearchInput = ({ onSearch, placeholder = "검색어를 입력하세요" }) => {
  const [searchText, setSearchText] = useState('');
  
  const handleSearch = () => {
    console.log('🔍 검색 실행:', searchText);
    onSearch?.(searchText);
  };
  
  return (
    <View style={searchStyles.container}>
      <TextInput
        style={searchStyles.input}
        placeholder={placeholder}
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <TouchableOpacity style={searchStyles.button} onPress={handleSearch}>
        <Icon icon={require('@assets/search.png')} size={20} />
      </TouchableOpacity>
    </View>
  );
};

// 간단한 ButtonSection 컴포넌트
const SimpleButtonSection = ({ filter, onFiltering, onMakeRoom }) => {
  return (
    <View style={buttonStyles.container}>
      <TouchableOpacity 
        style={[buttonStyles.filterBtn, filter && buttonStyles.filterBtnActive]} 
        onPress={onFiltering}
      >
        <Icon 
          icon={filter ? require('@assets/checkBox_on.png') : require('@assets/checkBox_off.png')} 
          size={12} 
        />
        <RNText style={[buttonStyles.filterText, filter && buttonStyles.filterTextActive]}>
          대기 방 보기
        </RNText>
      </TouchableOpacity>
      
      <TouchableOpacity style={buttonStyles.makeBtn} onPress={onMakeRoom}>
        <RNText style={buttonStyles.makeText}>방 만들기</RNText>
      </TouchableOpacity>
    </View>
  );
};

// 메인 SearchBarSection 컴포넌트
const SimpleSearchBarSection = ({ onSearch, onFiltering, filter, onMakeRoom }) => {
  console.log('🔍 SimpleSearchBarSection 렌더링:', { filter });
  
  return (
    <View style={styles.container}>
      <SimpleSearchInput onSearch={onSearch} />
      <SimpleButtonSection 
        filter={filter} 
        onFiltering={onFiltering} 
        onMakeRoom={onMakeRoom} 
      />
    </View>
  );
};

export default SimpleSearchBarSection;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
});

const searchStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E6E6E6',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 12,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    paddingHorizontal: 8,
  },
  button: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
});

const buttonStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterBtn: {
    width: 100,
    height: 25,
    backgroundColor: '#C5C5C5',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  filterBtnActive: {
    backgroundColor: '#91B7AB',
  },
  filterText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
  },
  filterTextActive: {
    color: '#E4CC71',
  },
  makeBtn: {
    width: 80,
    height: 25,
    backgroundColor: '#91B7AB',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  makeText: {
    color: '#E4CC71',
    fontSize: 12,
  },
});
