import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
        headerBackTitleVisible: true,
        headerBackTitle: "Login",
    })
  },[navigation])

  const register = () => {
      auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
        authUser.user.updateProfile({
            displayName: name,
            photoURL: imageUrl || `https://ui-avatars.com/api/?name=${name.split(" ")[0]}`
        })
      }).catch((err) => {
          alert(err.message)
      })
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>Create an account</Text>
      <View style={styles.inputContainer}>
        <Input
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Full Name"
          autoFocus
        />
        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
        />
        <Input
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
        />
        <Input
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          placeholder="Profile Picture Url (optional)"
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        onPress={register}
        title="Register"
        raised
      />
      <View style={{ height: 100 }} />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
      width: 300,
  },
  button: {
      width: 200,
      marginTop: 10
  },
});
