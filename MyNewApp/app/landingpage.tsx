import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/* ---------------- FEATURE CARD COMPONENT ---------------- */
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardIcon}>{icon}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{description}</Text>
    </View>
  );
};

/* ---------------- MAIN APP ---------------- */
export default function LandingPage() {
  const [faceShape, setFaceShape] = useState("");
  const [buttonText, setButtonText] = useState("Scan My Face");

  const handleScan = () => {
    const faceShapes = ["Oval", "Round", "Square", "Heart", "Diamond"];

    const randomShape =
      faceShapes[Math.floor(Math.random() * faceShapes.length)];

    setFaceShape(randomShape);
    setButtonText("Scan Again");

    Alert.alert("Face Detected", `Your detected face shape is ${randomShape}`);
  };

  const handleLearnMore = () => {
    Alert.alert(
      "About FaceFrame AI",
      "This app helps users detect face shape and recommend eyeglass frames.",
    );
  };

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        {/* ---------------- HEADER ---------------- */}
        <View style={styles.topBar}>
          <Text style={styles.appName}>FaceFrame AI</Text>
        </View>

        {/* ---------------- HERO SECTION ---------------- */}
        <View style={styles.center}>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>👓</Text>
          </View>

          <Text style={styles.heading}>Find Glasses That Suit Your Face</Text>

          <Text style={styles.subText}>
            Upload a selfie and get personalized frame recommendations.
          </Text>

          {/* SCAN BUTTON */}
          <TouchableOpacity style={styles.blueButton} onPress={handleScan}>
            <Text style={styles.blueButtonText}>{buttonText}</Text>
          </TouchableOpacity>

          {/* LEARN MORE BUTTON */}
          <TouchableOpacity
            style={styles.whiteButton}
            onPress={handleLearnMore}
          >
            <Text style={styles.whiteButtonText}>Learn More</Text>
          </TouchableOpacity>

          {/* RESULT SECTION */}
          {faceShape !== "" && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Detected Face Shape</Text>

              <Text style={styles.resultShape}>{faceShape}</Text>
            </View>
          )}
        </View>

        {/* ---------------- FEATURES SECTION ---------------- */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresHeading}>Why FaceFrame AI?</Text>

          <FeatureCard
            icon="🧠"
            title="AI Detection"
            description="Detects your face shape instantly."
          />

          <FeatureCard
            icon="⚡"
            title="Fast Results"
            description="Get results in seconds."
          />

          <FeatureCard
            icon="🕶️"
            title="Frame Matching"
            description="Recommends best glasses for you."
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#ECECEC",
  },

  topBar: {
    padding: 16,
  },

  appName: {
    fontSize: 20,
    fontWeight: "bold",
  },

  center: {
    alignItems: "center",
    padding: 24,
  },

  iconBox: {
    backgroundColor: "#E8F0FF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  icon: {
    fontSize: 40,
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  subText: {
    textAlign: "center",
    color: "#666",
    marginVertical: 15,
  },

  blueButton: {
    backgroundColor: "#2453E6",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },

  blueButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  whiteButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },

  whiteButtonText: {
    color: "#444",
  },

  resultCard: {
    marginTop: 20,
    backgroundColor: "#fff",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  resultShape: {
    fontSize: 24,
    color: "#2453E6",
    fontWeight: "bold",
    marginTop: 5,
  },

  featuresSection: {
    padding: 20,
  },

  featuresHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  cardIcon: {
    fontSize: 22,
    marginBottom: 5,
  },

  cardTitle: {
    fontWeight: "bold",
    marginBottom: 3,
  },

  cardText: {
    color: "#666",
  },
});
