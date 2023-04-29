import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import auth from '@react-native-firebase/auth';

/*
Note:
Auth screens were made using classes instead of hooks.
*/
//class to handle user registration
export default class Register extends Component {

    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    //function to register a new user
    registerUser = () => {
        if(this.state.email === '' && this.state.password === ''){
            Alert.alert('Enter account details to register!')
        }
        else{
            auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                res.user.updateProfile({
                    displayName: this.state.displayName
                })
                console.log('Registration successful!')
                this.setState({
                    displayName: '',
                    email: '',
                    password: ''
                })
            })
            .catch(error => this.setState({ errorMessage: error.message }))
            .then(() => {
                Alert.alert('Registration successful!')
            })
            .then(() => {
                this.props.navigation.navigate('Login')
            })
        }
    }

    //render screen
    render() {
        if(this.state.isLoading){
          return(
            <View style={styles.preloader}>
              <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
          )
        }
        return (
          <View style={styles.container}>
            <TextInput
              style={styles.inputStyle}
              placeholder="Name"
              value={this.state.displayName}
              onChangeText={(val) => this.updateInputVal(val, 'displayName')}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Email"
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, 'email')}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Password"
              value={this.state.password}
              onChangeText={(val) => this.updateInputVal(val, 'password')}
              maxLength={15}
              secureTextEntry={true}
            />
            <Button
              color="#A0816C"
              title="Register"
              onPress={() => this.registerUser()}
            />
            <Text
              style={styles.loginText}
              onPress={() => this.props.navigation.navigate('Login')}>
              Already Registered? Click here to log in.
            </Text>
          </View>
        );
      }
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
      },
      inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
      },
      loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center'
      }
    });


