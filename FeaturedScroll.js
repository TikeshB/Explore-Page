import React from 'react';
import { StyleSheet, ScrollView, View, Image, Text, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FeaturedScroll = () => {
  const { width, height } = useWindowDimensions();
  const CARD_WIDTH = width * 0.38;
  const CARD_HEIGHT = height * 0.25;
  const SPACING = width * 0.03;

  const featuredItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500',
      name: 'Summer Vibes',
      location: 'Paris Fashion',
      dominantColor: '#E040FB'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500',
      name: 'Winter Collection',
      location: 'Milan Show',
      dominantColor: '#673AB7'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500',
      name: 'Spring Special',
      location: 'New York',
      dominantColor: '#3F51B5'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500',
      name: 'Autumn Looks',
      location: 'London Week',
      dominantColor: '#FF5722'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=500',
      name: 'Street Style',
      location: 'Tokyo Fashion',
      dominantColor: '#4CAF50'
    }
  ];

  const renderItem = (item) => (
    <View 
      key={item.id} 
      style={[
        styles.cardContainer, 
        { 
          width: CARD_WIDTH,
          marginRight: SPACING * 1.5 
        }
      ]}
    >
      <View style={[styles.card, { height: CARD_HEIGHT, width: CARD_WIDTH }]}>
        <LinearGradient
          colors={['transparent', item.dominantColor]}
          style={[styles.gradient, { height: CARD_HEIGHT, width: CARD_WIDTH }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Image 
            source={{ uri: item.image }} 
            style={[styles.image, { height: CARD_HEIGHT, width: CARD_WIDTH }]}
            resizeMode="cover"
            onError={(error) => console.log('Image loading error:', error)}
          />
        </LinearGradient>
      </View>
      <Text style={[styles.title, { fontSize: width * 0.04 }]}>{item.name}</Text>
      <Text style={[styles.location, { fontSize: width * 0.035 }]}>{item.location}</Text>
    </View>
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.container, 
        { 
          paddingHorizontal: SPACING,
          paddingVertical: SPACING * 0.8
        }
      ]}
      decelerationRate="fast"
      snapToInterval={CARD_WIDTH + SPACING * 1.5}
    >
      {featuredItems.map(renderItem)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginLeft: 9,
  },
  cardContainer: {
    alignItems: 'flex-start',
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2A2A2A',
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    marginTop: 8,
  },
  location: {
    color: '#B8B8D1',
    marginTop: 4,
  },
});

export default FeaturedScroll;
