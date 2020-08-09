/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import {Card} from 'react-native-shadow-cards';

export default function app() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const URL = 'https://api.jsonbin.io/b/5f2c36626f8e4e3faf2cb42e'


  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((json) => setData(json.categories))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cardContainer}>
        <StatusBar hidden />
        {data.map(({ category }, index) => {
          return (
            <TouchableOpacity
              key={category.categoryName}
              onPress={() => {
                setCurrentIndex(index === currentIndex ? null : index)
              }}
              style={styles.cardContainer}
              activeOpacity={0.9}>
              <View style={[styles.card]}>
              <Card style={{elevation: 1, padding: 10, margin: 10, backgroundColor: '#FCFCFC' }}>
                <Text style={[styles.heading]}>{category.categoryName}</Text>
                {index === currentIndex && (
                  <View style={[styles.card]}>

                    {category.subcategories.map(({ items, subCategoryname }) => {
                      return (
                        <TouchableOpacity
                          key={subCategoryname}
                          onPress={() => {
                            setCurrentIndex(index === currentIndex ? null : index)
                          }}
                          activeOpacity={0.9}>
                          <View >
                          <Card style={{padding: 10, margin: 3}}>
                            <Text style={[styles.subheading]}>{subCategoryname}</Text>

                            {items.map((items) => (
                              <Text key={items} style={[styles.body]}>
                                {items}
                              </Text>
                            ))}
                            </Card>
                          </View>
                        </TouchableOpacity>
                      )
                    })}
                  </View>)}
                  </Card>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  cardContainer: {
    flexGrow: 0
  },
  card: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  heading: {
    fontSize: 20,
    fontWeight: '900',
    marginTop: 30,
    marginBottom: 30,
    textTransform: 'uppercase',
    letterSpacing: -1
  },
  subheading: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
    justifyContent: 'center',
    textAlign: 'center'
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: 'center'
  },
});
