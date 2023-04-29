import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Button, TouchableOpacity, Text } from "react-native";
import auth from '@react-native-firebase/auth';

//function to render main account screen
const AccountMain = (props) => {
    //auth boilerplate start
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
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
            <View style={styles.infoContainer}>
                <Text style={styles.titleText}>Account Info</Text>
                <Text style={styles.headerText}>Email</Text>
                <Text>{user.email}</Text>
                <Text style={styles.headerText}>Name</Text>
                <Text>{user.displayName}</Text>
            </View>
            <View style={styles.footer}>
                <Button
                    color="#A0816C"
                    title="Edit Account Info"
                    onPress={() => props.navigation.navigate('AccountEdit')}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "rgba(255,255,255,1)",
        gap: 20
      },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: 10
      },
    titleText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
      },
    headerText: {
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'bold'
      },
    footer: {
        height: 80
    }
});

export default AccountMain;