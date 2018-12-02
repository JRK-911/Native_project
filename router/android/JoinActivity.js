import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput
} from "react-native";
import db from "../../Firebase/db";
import key from "../../Firebase/key";
import CryptoJS from "crypto-js";

class JoinActivity extends Component {
  constructor(props) {
    super(props);
    this.CheckIdValidation = this.CheckIdValidation.bind(this);
    this.CheckJoinedIn = this.CheckJoinedIn.bind(this);
    this.placeholder_id = "Input Your ID";
    this.placeholder_name = "Input Your Name";
    this.placeholder_passwd = "Input Your Passwd";
    this.placeholder_chk_passwd = "ReInput Your Passwd to Check";
    this.state = {
      id: "",
      id_validation: false,
      name: "",
      passwd: "",
      chk_passwd: " "
    };
  }
  static navigationOptions = {
    title: "JoinActivity"
  };

  CheckIdValidation = () => {
    if (this.state.id == "") {
      Alert.alert("입력 오류", "ID를 입력하세요.");
    } else {
      db.ref("Users/").once("value", data => {
        if (data == null) {
          Alert.alert("err", "err");
        } else {
          var ids = Object.keys(data.val());
          if (ids.includes(this.state.id)) {
            Alert.alert("아이디 중복", "중복된 아이디입니다!");
          } else {
            Alert.alert("사용가능", "사용가능한 아이디 입니다.");
            this.setState({ id_validation: true });
          }
        }
      });
    }
  };

  CheckJoinedIn = () => {
    if (
      this.state.id == "" ||
      this.state.name == "" ||
      this.state.passwd == ""
    ) {
      Alert.alert("입력정보 오류", "입력하지 않은 항목이 있습니다.");
    } else if (this.state.passwd != this.state.chk_passwd) {
      Alert.alert("비밀번호 불일치", "입력한 비밀번호가 일치하지 않습니다.");
    } else {
      if (!this.state.id_validation) {
        Alert.alert("아이디 체크!!", "아이디 유효성부터 검사하세요.");
      } else {
        Alert.alert("회원가입 완료", "회원가입이 완료되었습니다.");
        var cipherPasswd = CryptoJS.AES.encrypt(
          this.state.passwd,
          key
        ).toString();
        db.ref("Users/")
          .child(this.state.id)
          .set({
            name: this.state.name,
            passwd: cipherPasswd
          });
        this.props.navigation.navigate("Login");
      }
    }
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.TextStyle}> This is JoinActivity </Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <TextInput
            placeholder={this.placeholder_id}
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={id => this.setState({ id })}
            value={this.id}
          />
          <Button
            onPress={this.CheckIdValidation}
            title="Check ID validation"
          />
          <TextInput
            placeholder={this.placeholder_name}
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={name => this.setState({ name })}
            value={this.name}
          />
          <TextInput
            placeholder={this.placeholder_passwd}
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={passwd => this.setState({ passwd })}
            secureTextEntry={true}
            value={this.passwd}
          />
          <TextInput
            placeholder={this.placeholder_chk_passwd}
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={chk_passwd => this.setState({ chk_passwd })}
            secureTextEntry={true}
            value={this.chk_passwd}
          />
        </View>
        <View>
          <Button onPress={this.CheckJoinedIn} title="Join In" />
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

  TextStyle: {
    fontSize: 23,
    textAlign: "center",
    color: "#000"
  }
});
module.exports = JoinActivity;
