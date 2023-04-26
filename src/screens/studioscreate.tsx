import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Alert, Text, TextInput, Button } from "react-native";
import firestore from '@react-native-firebase/firestore';

const CreateNewStudio = (newID, newDesc) => {
    const StudioCollection = firestore().collection('studios');

    if (newID === '' || newDesc === ''){
        Alert.alert('Please enter all studio details.')
    }
    else {
        return(
            StudioCollection.add({
                studioid: newID,
                description: newDesc,
            })
            .then(() => {Alert.alert('Studio created!')}
            )
            .catch(error => console.error(error)
            )
        );
    }
}

const StudiosCreate = (props) => {
    const [idText, setIDText] = useState('');
    const [descText, setDescText] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Studio ID</Text>
            <TextInput
                style={styles.inputStyle}
                onChangeText={setIDText}
                value={idText}
                placeholder={'Enter Studio ID'}/>
            <Text style={styles.titleText}>Description</Text>
            <TextInput
                style={styles.inputStyle}
                onChangeText={setDescText}
                value={descText}
                placeholder={'Enter Description'}/>
            <Button
                color="#A0816C"
                title="Submit"
                onPress={() => CreateNewStudio(idText, descText)}/>
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

export default StudiosCreate;