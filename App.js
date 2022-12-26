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
  // const [currentValue, setCurrentValue] = useState('');
  const [previousIndex, setPreviousIndex] = useState(-1);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [matchCount, setMatchCount] = useState(0);

  const [shuffledArray, setshuffledArray] = useState([]);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle([...array]) {
    var randomIntSet = new Set();
    while (randomIntSet.size !== 8) {
      const j = getRandomInt(0, 7);
      randomIntSet.add(j);
    }

    var shuffled = [];

    randomIntSet.forEach(item => {
      console.log(item);
      shuffled.push(array[item]);
    });

    return [...shuffled];
  }

  const shuffleTheBlocks = useRef(() => {
    setMatchCount(0);
    setPreviousValue('');
    setPreviousIndex(-1);
    setSelectedIndex(0);
    // setCurrentValue('');
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
    const data1 = [
      {id: 9, title: 'A', selected: false, matched: false},
      {id: 10, title: 'B', selected: false, matched: false},
      {id: 11, title: 'C', selected: false, matched: false},
      {id: 12, title: 'D', selected: false, matched: false},
      {id: 13, title: 'E', selected: false, matched: false},
      {id: 14, title: 'F', selected: false, matched: false},
      {id: 15, title: 'G', selected: false, matched: false},
      {id: 16, title: 'H', selected: false, matched: false},
    ];

    let random1 = shuffle(data);
    let random2 = shuffle(data1);

    console.log('random1 Before', random1);
    console.log('random2 Before', random2);

    random2.forEach((item, index) => {
      random2[index].id = 8 + (index + 1);
    });

    console.log('random1', random1);
    console.log('random2', random2);

    const final = random1.concat(random2);
    console.log('final', final);
    setshuffledArray(final);
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

    if (!previousValue) {
      setPreviousValue(item.title);
      setPreviousIndex(index);
    }

    if (previousValue.length > 0 && item.title.length > 0) {
      var sa = shuffledArray;
      if (previousValue === item.title) {
        setMatchCount(matchCount + 1);

        sa[index].matched = true;
        sa[previousIndex].matched = true;
        sa.forEach(it => (it.selected = false));

        setPreviousValue('');

        setPreviousIndex(-1);

        setshuffledArray(sa);
      } else {
        setPreviousValue('');

        setPreviousIndex(-1);

        sa.forEach(it => (it.selected = false));
        setshuffledArray(sa);
      }
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
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => showTheCard(item, index)}>
                    <View
                      style={{
                        width: (Dimensions.get('screen').width - 30) / 4,
                        height: 100,
                        backgroundColor: item.matched
                          ? 'rgba(52, 52, 52, 0.3)'
                          : 'orange',
                        marginLeft: 5,
                        marginTop: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {item.matched ? (
                        <Text style={{fontSize: 24, color: 'white'}}>
                          {item.title}
                        </Text>
                      ) : null}
                    </View>
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
