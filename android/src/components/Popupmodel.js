import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

const PopupMenu = ({ isVisible, onClose }) => {
  const [solutionAmount, setSolutionAmount] = useState("");
  const [mixingMode, setMixingMode] = useState(null);
  const [mixingBucket, setMixingBucket] = useState(null);

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.headerText}>Tạo bộ trộn mới</Text>
        <TextInput style={styles.input} placeholder="Tên bộ trộn" />
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
            <Picker.Item style={styles.pickertext} label="Sơ" value="1" />
            <Picker.Item
              style={styles.pickertext}
              label="Trung bình"
              value="2"
            />
            <Picker.Item style={styles.pickertext} label="Nhuyễn" value="3" />
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
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Bắt đầu trộn</Text>
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
