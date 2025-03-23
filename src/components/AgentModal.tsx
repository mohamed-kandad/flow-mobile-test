import { Button, FlatList, Modal, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import CommonInput from "./common/CommonInput";
import CommonButton from "./common/CommonButton";
import { AirbnbRating } from "react-native-ratings";
import { IAgent, IReview } from "../type/agent";
import { calculateAverageRating } from "../utils/helper";

type Props = {
  isModalVisible: boolean;
  selectedAgent: IAgent | null;
  setModalVisible: (visible: boolean) => void;
  handleAddReviewToAgent: () => void;
  setReview: (review: IReview) => void;
  review: IReview;
};

const AgentModal: FC<Props> = ({
  handleAddReviewToAgent,
  review,
  setReview,
  isModalVisible,
  selectedAgent,
  setModalVisible,
}) => {
  return (
    <Modal visible={isModalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{selectedAgent?.name}</Text>
          <Text>📞 {selectedAgent?.phone}</Text>
          <Text>
            ⭐ {calculateAverageRating(selectedAgent?.reviews || [])} /{" "}
            {selectedAgent?.reviews.length}
          </Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <View style={{ maxHeight: 300, width: "100%" }}>
            <FlatList
              data={selectedAgent?.reviews}
              keyExtractor={(item, index) => String(index)}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 15 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                    <Text>{item.rating}</Text>
                  </View>
                  <Text style={{ color: "black" }}>{item.review}</Text>
                </View>
              )}
            />
          </View>

          <View style={{ width: "100%", gap: 10 }}>
            <CommonInput
              placeholder="Name"
              onChangeText={(name: string) => {
                setReview({ ...review, name: name });
              }}
              value={review.name}
            />
            <CommonInput
              placeholder="Review"
              onChangeText={(rev: string) =>
                setReview({ ...review, review: rev })
              }
              value={review.review}
            />
            <AirbnbRating
              count={5}
              defaultRating={review.rating}
              size={20}
              showRating={false}
              onFinishRating={(rating: number) =>
                setReview({ ...review, rating })
              }
            />
            <CommonButton title="Submit" onPress={handleAddReviewToAgent} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AgentModal;

const styles = StyleSheet.create({
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
