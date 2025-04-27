import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Animated, useWindowDimensions, Platform } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import FashionGrid from './components/FashionGrid';
import FeaturedScroll from './components/FeaturedScroll';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const GradientText = ({ style, children }) => {
  return (
    <MaskedView maskElement={<Text style={style}>{children}</Text>}>
      <LinearGradient
        colors={['#E040FB', '#9C27B0', '#673AB7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

const AppContent = () => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const SPACING = width * 0.05;
  const HEADER_HEIGHT = Platform.select({ ios: 44, android: 56 });
  const FONT_SCALE = Math.min(width * 0.0025, 1.2);

  const scrollY = new Animated.Value(0);
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const contentTranslate = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -200],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      
      <Animated.View 
        style={[
          styles.animatedSection, 
          { 
            opacity: headerOpacity,
            transform: [{ translateY: contentTranslate }],
            paddingTop: insets.top,
            paddingHorizontal: SPACING,
          }
        ]}
      >
        <View style={[styles.header, { height: HEADER_HEIGHT }]}>
          <Feather name="menu" size={24} color="#E9E9E9" />
          <Feather name="search" size={24} color="#E9E9E9" />
        </View>

        <View style={styles.topSection}>
          <View style={[styles.titleSection, { paddingHorizontal: SPACING }]}>
            <GradientText style={[styles.gradientText, { fontSize: 32 * FONT_SCALE }]}>
              2021 Fashion show in Paris
            </GradientText>
            <Text style={[styles.subtitleText, { fontSize: 16 * FONT_SCALE }]}>
              Experience the latest trends
            </Text>
          </View>

          <View style={styles.exploreHeader}>
            <Text style={[styles.exploreText, { fontSize: 24 * FONT_SCALE }]}>Explore</Text>
            <Ionicons name="" size={24} color="#E9E9E9" />
            <View style={styles.tabContainer}>
              <Text style={[styles.tabText, styles.activeTab]}>Recommended</Text>
              <Text style={styles.tabText}>New Models</Text>
              <Text style={styles.tabText}>2020 Show</Text>
            </View>
          </View>

          <FeaturedScroll />
        </View>
      </Animated.View>

      <View style={[styles.postsSection, { 
        marginBottom: insets.bottom,
        paddingHorizontal: SPACING 
      }]}>
        <FashionGrid 
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          contentOffset={height * 0.7}
        />
      </View>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  topSection: {
    backgroundColor: 'black',
    marginLeft: -10,
    marginTop: 10,
  },
  content: {
    flex: 1,
  },
  titleSection: {
    paddingBottom: 10,
  },
  gradientText: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitleText: {
    color: '#B8B8D1',
  },
  exploreHeader: {
    paddingTop: 20,
    paddingBottom:30,
    marginLeft: 20,
  },
  exploreText: {
    fontWeight: 'bold',
    color: '#E9E9E9',
    marginBottom: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 20,
    marginLeft: 0,
  },
  tabText: {
    color: '#B8B8D1',
  },
  activeTab: {
    color: '#E040FB',
    fontWeight: '600',
  },
  postsSection: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 80,
  },
  animatedSection: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
