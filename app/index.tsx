import MovingBackground from "@/components/MovingBackground";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.screen}>
        <Text style={styles.title}>Flappy Bird</Text>

        <Link href="/play" asChild>
          <TouchableOpacity style={styles.button}>
            <LinearGradient
              style={styles.buttonGradient}
              colors={["#FF8A00", "#FFD600"]}
            >
              <Text style={styles.buttonText}>Jogar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Link>

        <Image
          source={require("@/assets/images/bird.png")}
          style={styles.bird}
        />

        <MovingBackground />
      </SafeAreaView>
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
    color: "#FFD600",
    marginTop: 30,
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
    // textShadowOffset: { width: 0, height: 2 },
    // textShadowRadius: 4,
    fontFamily: "LilitaOne",
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
