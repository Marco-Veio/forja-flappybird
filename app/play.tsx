import MovingBackground from "@/components/MovingBackground";
import { Pipe } from "@/components/Pipe";
import { DURATION } from "@/constants/speed";
import { useAudioPlayer } from "expo-audio";
import { useEffect, useState } from "react";
import { Image, ImageBackground, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Play() {
  const [obstacles, setObstacles] = useState<string[]>([]);
  const jumpSound = useAudioPlayer(require("@/assets/audios/wing.mp3"));
  const pointSound = useAudioPlayer(require("@/assets/audios/point.mp3"));

  useEffect(() => {
    const interval = setInterval(() => spawnObstacle(), DURATION / 4);

    return () => clearInterval(interval);
  }, []);

  function spawnObstacle() {
    setObstacles((oldValue) => [...oldValue, Date.now().toString()]);
  }

  function removeObstacle(id: string) {
    setObstacles((oldValue) => oldValue.filter((obstacle) => obstacle !== id));
    pointSound.seekTo(0);
    pointSound.play();
  }

  function handleJump() {
    jumpSound.seekTo(0);
    jumpSound.play();
  }

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <Pressable onPress={handleJump}>
        <SafeAreaView style={styles.screen}>
          <Image
            source={require("@/assets/images/bird.png")}
            style={styles.bird}
          />

          {obstacles.map((id) => (
            <Pipe key={id} gapY={195} onEnd={() => removeObstacle(id)} />
          ))}
          <MovingBackground />
        </SafeAreaView>
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  screen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "LuckiestGuy",
    marginTop: 30,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: {
      width: 3,
      height: 3,
    },
    textShadowRadius: 0,
    paddingRight: 3,
  },
  button: {
    borderRadius: 100,
    position: "absolute",
    top: "50%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    textShadowColor: "#000",
    fontFamily: "LilitaOne",
    paddingBottom: 4,
  },
  bird: {
    position: "absolute",
    top: "40%",
    left: "30%",
    width: 70,
    height: 48,
    transform: [{ rotate: "-20deg" }],
  },
});
