import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Heatmap } from "react-native-maps";

export default function PlantHeatmap() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://10.189.228.90/vanaushadhi_backend/getPlants.php")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  const heatPoints = data.map((item) => ({
    latitude: item.latitude,
    longitude: item.longitude,
    weight: item.temperature / 40,
  }));

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 22.9734,
          longitude: 78.6569,
          latitudeDelta: 20,
          longitudeDelta: 20,
        }}
      >
        <Heatmap points={heatPoints} radius={50} opacity={0.8} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
