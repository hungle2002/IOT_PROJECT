import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { create } from "../apiServices/searchService";
import { Picker } from "@react-native-picker/picker";

const PopupMenu = ({ isVisible, onClose, onRefresh }) => {
  const [solutionAmount, setSolutionAmount] = useState("");
  const [mixingMode, setMixingMode] = useState(null);
  const [mixingBucket, setMixingBucket] = useState(null);
  const [name, setName] = useState("");

  const handleCreateFertilzier = async () => {
    try {
      const response = await create({
        path: "fertilizer",
        data: {
          key: mixingBucket,
          name: name,
          type: mixingMode,
          mixVolume: Number(solutionAmount),
          waterVolume: 200,
          duration: 10000
        }
      });
    } catch (error) {
      console.log(error);
    }
    await onRefresh();
    onClose();
  }

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.headerText}>Tạo bộ trộn mới</Text>
        <TextInput style={styles.input} placeholder="Tên bộ trộn" value={name}
            onChangeText={setName}/>
        <View style={styles.row}>
          <Text>Số lượng dung dịch cần trộn</Text>
          <TextInput
            style={styles.inputSmall}
            keyboardType="numeric"
            value={solutionAmount}
            onChangeText={setSolutionAmount}
            placeholder="(ml)"
          />
        </View>
        <View style={styles.row}>
          <Text>Chế độ trộn (Sơ/TB/Nhuyễn)</Text>
          {/* <RNPickerSelect
            onValueChange={(value) => setMixingMode(value)}
            items={[
              { label: "Sơ", value: 0 },
              { label: "TB", value: 1 },
              { label: "Nhuyễn", value: 2 },
            ]}
            style={pickerSelectStyles}
            placeholder={{
              label: "Select a mode...",
              value: null,
            }}
          /> */}
          <Picker
            style={styles.pickerStyles}
            selectedValue={mixingMode}
            onValueChange={(value) => setMixingMode(value)}
            useNativeAndroidPickerStyle={false}
          >
            <Picker.Item style={styles.pickertext} label="Sơ" value="Sơ" />
            <Picker.Item
              style={styles.pickertext}
              label="Trung bình"
              value="Trung bình"
            />
            <Picker.Item style={styles.pickertext} label="Nhuyễn" value="Nhuyễn" />
          </Picker>
        </View>
        <View style={styles.row}>
          <Text>Thùng trộn (1/2/3)</Text>
          <Picker
            style={styles.pickerStyles}
            selectedValue={mixingBucket}
            onValueChange={(value) => setMixingBucket(value)}
            useNativeAndroidPickerStyle={false}
          >
            <Picker.Item style={styles.pickertext} label="1" value="1" />
            <Picker.Item style={styles.pickertext} label="2" value="2" />
            <Picker.Item style={styles.pickertext} label="3" value="3" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCreateFertilzier}>
          <Text style={styles.buttonText}>Tạo bộ trộn</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  headerText: {
    fontSize: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginBottom: 15,
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "40%",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  pickerStyles: {
    width: "40%",
    backgroundColor: "white",
  },
  pickertext: {
    color: "black",
    fontSize: 15,
  },
});

export default PopupMenu;
