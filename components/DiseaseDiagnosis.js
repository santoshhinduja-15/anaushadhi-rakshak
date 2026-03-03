import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function DiseaseDiagnosis({ navigation }) {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const demoResult = {
    plantName: "Tulsi",
    disease: "Leaf Spot Disease",
    confidence: "92%",
    suggestions: [
      "Remove infected leaves immediately",
      "Avoid over-watering",
      "Spray neem oil once a week",
      "Ensure proper sunlight and airflow",
    ],
  };

  const showDemoResult = (uri) => {
    setImage(uri);
    setResult(demoResult);
  };

  const pickFromGallery = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission Required", "Gallery access is needed");
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!res.canceled) {
      showDemoResult(res.assets[0].uri);
    }
  };

  const captureFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission Required", "Camera access is needed");
      return;
    }

    const res = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!res.canceled) {
      showDemoResult(res.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Plant Disease Diagnosis</Text>

      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.btn} onPress={pickFromGallery}>
          <Text style={styles.btnText}>Upload from Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={captureFromCamera}>
          <Text style={styles.btnText}>Open Camera</Text>
        </TouchableOpacity>
      </View>

      {image && (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      )}

      {result && (
        <View style={styles.card}>
          <Text style={styles.demoTag}>Demo Output (Placeholder)</Text>

          <Text style={styles.row}>
            Plant: <Text style={styles.value}>{result.plantName}</Text>
          </Text>

          <Text style={styles.row}>
            Disease: <Text style={styles.value}>{result.disease}</Text>
          </Text>

          <Text style={styles.row}>
            Confidence: <Text style={styles.value}>{result.confidence}</Text>
          </Text>

          <Text style={styles.suggTitle}>Suggested Actions</Text>

          {result.suggestions.map((item, index) => (
            <Text key={index} style={styles.suggItem}>
              • {item}
            </Text>
          ))}
        </View>
      )}

      {/* Back to Home — placed at END of page */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.backBtnText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F1F8F4",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: "#2E7D32",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  imagePreview: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    marginTop: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    elevation: 3,
  },
  demoTag: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  row: {
    fontSize: 16,
    marginVertical: 4,
    fontWeight: "600",
  },
  value: {
    fontWeight: "400",
  },
  suggTitle: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "bold",
  },
  suggItem: {
    fontSize: 15,
    marginTop: 5,
  },
  backBtn: {
    backgroundColor: "#388E3C",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  backBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
