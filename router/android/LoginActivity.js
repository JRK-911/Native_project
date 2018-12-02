import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View,
  Button,
  TextInput
} from "react-native";

import db from "../../Firebase/db";
import key from "../../Firebase/key";
import CryptoJS from "crypto-js";

class LoginActivity extends Component {
  constructor(props) {
    super(props);
    this.placeholder_id = "Input Your ID";
    this.placeholder_passwd = "Input Your Passwd";
    this.LogIn = this.LogIn.bind(this);
    this.state = {
      id: "",
      passwd: ""
    };
  }
  static navigationOptions = {
    title: "LoginActivity"
  };

  LogIn = () => {
    if (this.state.id == "" || this.state.passwd == "") {
      Alert.alert("로그인 실패", "아이디와 패스워드를 입력해주세요.");
    } else {
      db.ref("Users/").once("value", data => {
        var users = data.val();
        var input_id = this.state.id;
        var ids = Object.keys(users);
        var bytes = CryptoJS.AES.decrypt(users[input_id].passwd, key);
        var decryptedPw = bytes.toString(CryptoJS.enc.Utf8);
        if (ids.includes(input_id)) {
          if (decryptedPw == this.state.passwd) {
            Alert.alert("로그인", "로그인 성공!");
            this.props.navigation.navigate("Second");
          } else {
            Alert.alert("로그인 실패", "비밀번호가 일치하지 않습니다.");
          }
        } else {
          Alert.alert("로그인 실패", "입력하신 회원정보(아이디)가 없습니다.");
        }
      });
    }
  };

  GoToJoinPage = () => {
    this.props.navigation.navigate("Join");
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.TextStyle}> This is LoginActivity </Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <TextInput
            placeholder={this.placeholder_id}
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={id => this.setState({ id })}
            value={this.id}
          />
          <TextInput
            placeholder={this.placeholder_passwd}
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={passwd => this.setState({ passwd })}
            secureTextEntry={true}
            value={this.passwd}
          />
        </View>
        <View>
          <Button onPress={this.LogIn} title="Login" />
        </View>
        <View style={{ marginTop: 40 }}>
          <Button onPress={this.GoToJoinPage} title="Join In" />
        </View>
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
  SetMarginBottom: {
    marginBottom: 30
  },
  TextStyle: {
    fontSize: 23,
    textAlign: "center",
    color: "#000"
  }
});

module.exports = LoginActivity;
