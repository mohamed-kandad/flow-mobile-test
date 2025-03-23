import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../feature/authSlice";
import { useRouter } from "expo-router";
import { RootState } from "../store";
import { IAgent, IReview } from "../type/agent";
import CommonInput from "../components/common/CommonInput";
import CommonButton from "../components/common/CommonButton";
import { AirbnbRating } from "react-native-ratings";
import { calculateAverageRating } from "../utils/helper";
import AgentModal from "../components/AgentModal";
import LottieView from "lottie-react-native";

// Mocked agent data
const arrayAgents: IAgent[] = [
  {
    id: 1,
    name: "Agent A",
    phone: "0612345678",
    rating: 4.8,
    latitude: 37.7749,
    longitude: -122.4194,
    reviews: [
      {
        name: "mohamed kandad",
        review: "very good agent",
        rating: 4.8,
      },
    ],
  },
];

const MapScreen = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [selectedAgent, setSelectedAgent] = useState<IAgent | null>(null);
  const [agents, setAgents] = useState<IAgent[] | null>(arrayAgents);

  const [review, setReview] = useState<IReview>({
    name: "",
    rating: 0,
    review: "",
  });

  const [modalVisible, setModalVisible] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  // Get user location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  // Logout function
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleAddReviewToAgent = () => {
    if (
      !selectedAgent ||
      !review.name ||
      !review.review ||
      review.rating === 0
    ) {
      alert("Please fill in all fields and provide a rating.");
      return;
    }

    const agentIndex = agents?.findIndex(
      (agent) => agent.id === selectedAgent.id
    );

    if (agentIndex !== undefined && agentIndex !== -1 && agents) {
      agents[agentIndex].reviews.push(review);

      // Update state with the modified agents array
      setAgents([...agents]);

      // Update selectedAgent to reflect the new review
      setSelectedAgent({ ...agents[agentIndex] });
    }

    // Clear input fields and close modal
    setReview({ review: "", rating: 0, name: "" });
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>You need to log in first.</Text>
        <Button title="Go to Login" onPress={() => router.push("/login")} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* User Marker */}
          <Marker coordinate={location} title="You" pinColor="blue" />

          {/* Agent Markers */}
          {agents?.map((agent) => (
            <Marker
              key={agent.id}
              coordinate={{
                latitude: agent.latitude,
                longitude: agent.longitude,
              }}
              title={agent.name}
              pinColor={agent.rating >= 4.7 ? "gold" : "red"}
              onPress={() => {
                setSelectedAgent(agent);
                setModalVisible(true);
              }}
            />
          ))}
        </MapView>
      ) : (
        <LottieView
          autoPlay
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#eee",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../assets/MapAnimation.json")}
        />
      )}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Agent Info Modal */}
      <AgentModal
        handleAddReviewToAgent={handleAddReviewToAgent}
        review={review}
        setReview={setReview}
        isModalVisible={modalVisible}
        selectedAgent={selectedAgent}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  logoutButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  logoutText: { color: "white", fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold" },
});

export default MapScreen;
