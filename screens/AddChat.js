import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";
const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("");

  const createChat = async () => {
      await db.collection('chats').add({
          chatName: input
      }).then(() => {
          navigation.goBack();
      }).catch((err) => {
          alert(err)
      })
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
      headerBackTitleVisible: true,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Input
        onChangeText={(text) => setInput(text)}
        value={input}
        placeholder="Enter a chat name"
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button onPress={createChat} title="Create new chat" />
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  container: {
      backgroundColor: "white",
      padding: 30,
      height: "100%",
  },
});
