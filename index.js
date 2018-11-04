/** @format */

import { AppRegistry, Platform } from "react-native";
import Android_App from "./router/android/App";
import IOS_App from "./router/ios/App";
import { name as appName } from "./app.json";

if (Platform.OS == "ios") {
  AppRegistry.registerComponent(appName, () => IOS_App);
} else if (Platform.OS == "android") {
  AppRegistry.registerComponent(appName, () => Android_App);
}
