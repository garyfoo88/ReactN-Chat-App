import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { auth } from "../firebase";
const mainLogo = require("../assets/logomain.png");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      alert(err)
    })
  };

  return (
    // can also use <KeyboardAvoidingView>
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={mainLogo} style={{ width: 200, height: 200 }} />
      <View style={styles.inputContainer}>
        <Input
          onChangeText={(text) => setEmail(text)}
          value={email}
          type="email"
          placeholder="Email"
          autoFocus
        />
        <Input
          onChangeText={(text) => setPassword(text)}
          value={password}
          type="password"
          secureTextEntry
          placeholder="Password"
        />
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.button}
        type="outline"
        title="Register"
      />
      <View style={{ height: 100 }} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
});
