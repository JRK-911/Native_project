import React, { Component } from "react";

import { AppRegistry, StyleSheet, Text, View, Button } from "react-native";

class SecondActivity extends Component {
  static navigationOptions = {
    title: "SecondActivity"
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.TextStyle}> This is SecondActivity </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 10
  },

  TextStyle: {
    fontSize: 23,
    textAlign: "center",
    color: "#000"
  }
});
module.exports = SecondActivity;
