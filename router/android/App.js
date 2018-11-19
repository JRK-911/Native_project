import React, { Component } from "react";

import { AppRegistry, StyleSheet, Text, View, Button } from "react-native";

import { StackNavigator } from "react-navigation";

import LoginActivity from "./LoginActivity";
import SecondActivity from "./SecondActivity";
import JoinActivity from "./JoinActivity";

export default (Project = StackNavigator({
  Login: { screen: LoginActivity },
  Second: { screen: SecondActivity },
  Join: { screen: JoinActivity }
}));
