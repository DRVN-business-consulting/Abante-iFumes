import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import MusicPlayerCard from './src/components/MusicPlayer';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { ColorProvider, useColor } from './src/context/ColorContext';

const AppContent = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const { logoColor, setLogoColor } = useColor();
  const [selectedSong, setSelectedSong] = React.useState(null);

  const musicData = [
    { id: '1', title: 'Song 1', artist: 'Artist 1', duration: 180 },
    { id: '2', title: 'Song 2', artist: 'Artist 2', duration: 240 },
    { id: '3', title: 'Song 3', artist: 'Artist 3', duration: 200 },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem(isDarkTheme)}
      onPress={() => setSelectedSong(item)}
    >
      <Text style={[styles.songTitle(isDarkTheme),{color:logoColor}]}>{item.title}</Text>
      <Text style={styles.artistName(isDarkTheme)}>{item.artist}</Text>
    </TouchableOpacity>
  );

  const goBackToList = () => {
    setSelectedSong(null);
  };

  return (
    <View style={styles.container(isDarkTheme)}>
      <Text style={[styles.logo, { color: logoColor }]}>iFumes</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel(isDarkTheme)}>Dark Theme</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
      <View style={styles.colorButtons}>
        <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#F68E5F' }]} onPress={() => setLogoColor('#F68E5F')} />
        <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#324376' }]} onPress={() => setLogoColor('#324376')} />
        <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#E52454' }]} onPress={() => setLogoColor('#E52454')} />
      </View>
      {selectedSong ? (
        <View>
          <TouchableOpacity style={styles.backButton(isDarkTheme)} onPress={goBackToList}>
            <Text style={styles.backButtonText}>Back to List</Text>
          </TouchableOpacity>
          <MusicPlayerCard
            title={selectedSong.title}
            artist={selectedSong.artist}
            duration={selectedSong.duration}
          />
        </View>
      ) : (
        <FlatList
          data={musicData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ColorProvider>
        <AppContent />
      </ColorProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: (isDarkTheme) => ({
    flex: 1,
    padding: 20,
    backgroundColor: isDarkTheme ? '#333' : '#f5f5f5',
  }),
  list: {
    paddingBottom: 20,
  },
  listItem: (isDarkTheme) => ({
    backgroundColor: isDarkTheme ? '#444' : '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  }),
  songTitle: (isDarkTheme) => ({
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkTheme ? '#fff' : '#000',
  }),
  artistName: (isDarkTheme) => ({
    fontSize: 14,
    color: isDarkTheme ? '#aaa' : '#888',
  }),
  backButton: (isDarkTheme) => ({
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  }),
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchLabel: (isDarkTheme) => ({
    fontSize: 16,
    color: isDarkTheme ? '#fff' : '#000',
    marginRight: 10,
  }),
  colorButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
});
