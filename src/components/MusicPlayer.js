import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useColor } from '../context/ColorContext';

const MusicPlayerCard = ({ title, artist, duration }) => {
  const { isDarkTheme } = useTheme();
  const { logoColor } = useColor();
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  const progressBarWidth = Dimensions.get('window').width * 0.9;

  const togglePlayPause = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1 / duration;
          if (newProgress >= 1) {
            clearInterval(intervalRef.current);
            return 1;
          }
          return newProgress;
        });
      }, 1000);
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <View style={[styles.card, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: logoColor }]}>{title}</Text>
        <Text style={[styles.artist, { color: isDarkTheme ? '#aaa' : '#888' }]}>{artist}</Text>

        <View style={[styles.progressBarContainer, { backgroundColor: isDarkTheme ? '#555' : '#e0e0e0' }]}>
          <View
            style={[styles.progressBar, { width: progress * progressBarWidth, backgroundColor: logoColor }]}
          />
        </View>

        <View style={styles.buttons}>
          <Button
            title={isPlaying ? "Pause" : "Play"}
            onPress={togglePlayPause}
            color={'blue'}

          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  infoContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artist: {
    fontSize: 14,
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default MusicPlayerCard;
