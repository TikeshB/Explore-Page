import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Dimensions, Animated, FlatList, ActivityIndicator, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WIDTH = Dimensions.get('window').width;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// Mock data generator
const generateMockData = (startIndex, count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: startIndex + i,
    image: `https://picsum.photos/400/500?random=${startIndex + i}`,
    name: ['Sofia Chen', 'Maria Garcia', 'Aisha Patel', 'Emma Wilson', 'Yuki Tanaka'][Math.floor(Math.random() * 5)],
    location: ['Paris', 'Milan', 'New York', 'London', 'Tokyo'][Math.floor(Math.random() * 5)],
    dominantColor: ['#673AB7', '#E040FB', '#3F51B5', '#FF5722', '#4CAF50'][Math.floor(Math.random() * 5)],
  }));
};

const FashionGrid = ({ onScroll, contentOffset }) => {
  const { width, height } = useWindowDimensions();
  const SPACING = width * 0.03;
  const IMAGE_HEIGHT = height * 0.4;

  const [fashionItems, setFashionItems] = useState(generateMockData(0, 10));
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const newItems = generateMockData(fashionItems.length, 10);
      setFashionItems([...fashionItems, ...newItems]);
      setLoading(false);
    }, 1500);
  };

  const ListHeader = () => (
    <Text style={styles.sectionTitle}></Text>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#E040FB" />
      </View>
    );
  };

  const GridItem = ({ item }) => (
    <View 
      style={[
        styles.gridItemContainer, 
        { marginBottom: SPACING * 2 }
      ]}
    >
      <View style={[styles.imageContainer, { height: IMAGE_HEIGHT }]}>
        <LinearGradient
          colors={['transparent', item.dominantColor]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </LinearGradient>
      </View>
      <View style={[styles.textContainer, { paddingHorizontal: SPACING }]}>
        <Text style={[styles.name, { fontSize: width * 0.045 }]}>{item.name}</Text>
        <Text style={[styles.location, { fontSize: width * 0.035 }]}>{item.location}</Text>
      </View>
    </View>
  );

  return (
    <AnimatedFlatList
      data={fashionItems}
      renderItem={({ item }) => <GridItem item={item} />}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={[
        styles.grid,
        { 
          paddingTop: contentOffset,
          paddingHorizontal: SPACING,
          paddingBottom: SPACING * 2
        }
      ]}
      ListHeaderComponent={ListHeader}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      onScroll={onScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={8}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    padding: 20,
    marginTop: -70,
  },
  gridItemContainer: {
    width: '100%',
  },
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginTop: 8,
  },
  name: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  location: {
    color: '#B8B8D1',
  },
  loader: {
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
});

export default FashionGrid;
