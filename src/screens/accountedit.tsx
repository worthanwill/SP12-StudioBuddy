import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Image, Alert, Text, TextInput, Button } from "react-native";
import auth from '@react-native-firebase/auth';

//Function to render edit account screen
const AccountEdit = (props) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    //auth boilerplate start
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    //Not auth boilerplate. This function is used to update account info based on user input
    function SubmitChanges(newEmail, newName){
        user.updateEmail(newEmail);
        user.updateProfile({displayName: newName});
        Alert.alert('Changes submitted.');
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <View>
                <Text>No user found!</Text>
            </View>
        );
    }
    //auth boilerplate end

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Email</Text>
            <TextInput
                style={styles.inputStyle}
                onChangeText={setEmail}
                value={email}
                placeholder='Enter Email'
                />
            <Text style={styles.titleText}>Display Name</Text>
            <TextInput
                style={styles.inputStyle}
                onChangeText={setName}
                value={name}
                placeholder='Enter Display Name'
                />
            <Button
                color="#A0816C"
                title="Submit"
                onPress={() => SubmitChanges(email, name)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
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
    titleText: {
        textAlign: 'left',
        fontWeight: 'bold'
      }
});

export default AccountEdit;