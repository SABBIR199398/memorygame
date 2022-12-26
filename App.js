/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';

import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: 'white',
    margin: 5,
    flex: 1,
  };

  const [previousValue, setPreviousValue] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [matchCount, setMatchCount] = useState(0);

  const [shuffledArray, setshuffledArray] = useState([]);
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const shuffleTheBlocks = useRef(() => {
    setMatchCount(0);
    setPreviousValue('');
    setCurrentValue('');
    setshuffledArray([]);
    const data = [
      {id: 1, title: 'A', selected: false, matched: false},
      {id: 2, title: 'B', selected: false, matched: false},
      {id: 3, title: 'C', selected: false, matched: false},
      {id: 4, title: 'D', selected: false, matched: false},
      {id: 5, title: 'E', selected: false, matched: false},
      {id: 6, title: 'F', selected: false, matched: false},
      {id: 7, title: 'G', selected: false, matched: false},
      {id: 8, title: 'H', selected: false, matched: false},
    ];
    // const data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    var random1 = shuffle(data);
    var random2 = shuffle(data);

    console.log('random1', random1);

    random2.forEach((item, index) => (item.id = 8 + (index + 1)));

    console.log('random2', random2);
    random2.forEach(item => random1.push(item));
    setshuffledArray(random2);

    console.log('final', random2);
  });

  useEffect(() => {
    shuffleTheBlocks.current();
  }, []);

  function showTheCard(item, index) {
    console.log('showTheCard', item.selected);

    var sa = shuffledArray;
    sa[index].selected = true;
    setSelectedIndex(item.id);

    setshuffledArray(sa);

    if (previousValue) {
      setCurrentValue(item.title);
    } else {
      setPreviousValue(item.title);
    }

    if (previousValue === currentValue) {
      setMatchCount(matchCount + 1);
      var sa = shuffledArray;
      sa[index].matched = true;

      setPreviousValue('');
      setCurrentValue('');
    } else {
      setPreviousValue('');
      setCurrentValue('');
    }
  }
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: 'lightblue',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                marginBottom: 10,
                marginTop: 10,
              }}>
              <Text style={{fontSize: 20}}>Matches: {matchCount}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => shuffleTheBlocks.current()}>
            <View
              style={{
                backgroundColor: 'lightblue',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                marginBottom: 10,
                marginTop: 10,
              }}>
              <Text style={{fontSize: 20}}>Restart: {}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            numColumns={4}
            data={shuffledArray}
            renderItem={({item, index}) => (
              <View>
                {item.selected === true ? (
                  <TouchableOpacity
                    onPress={() =>
                      item.matched ? null : showTheCard(item, index)
                    }>
                    <View
                      style={{
                        width: (Dimensions.get('screen').width - 30) / 4,
                        height: 100,
                        backgroundColor: item.matched
                          ? 'rgba(52, 52, 52, 0.3)'
                          : 'blue',
                        marginLeft: 5,
                        marginTop: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontSize: 24, color: 'white'}}>
                        {item.title}
                        {item.id}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => showTheCard(item, index)}>
                    <View
                      style={{
                        width: (Dimensions.get('screen').width - 30) / 4,
                        height: 100,
                        backgroundColor: 'orange',
                        marginLeft: 5,
                        marginTop: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
            extraData={selectedIndex}
            keyExtractor={item => Math.floor(Math.random() * 1000)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
