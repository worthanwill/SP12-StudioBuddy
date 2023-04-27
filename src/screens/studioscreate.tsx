import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Alert, Text, TextInput, Button } from "react-native";
import firestore from '@react-native-firebase/firestore';

/*
Function that handles creation of new studios.
Note:
Firebase documents have an id value. If you create documents via the add() function, the id
value is randomly generated. The only way to access this value in React is via a documentSnapshot.
For convenience, the CreateNewStudio function uses the set() function to make the document id
value and the studioid field the same.
*/
const CreateNewStudio = (newID, newDesc) => {
    const StudioCollection = firestore().collection('studios');

    if (newID === '' || newDesc === ''){
        Alert.alert('Please enter all studio details.')
    }
    else {
        return(
            //doc for new studio
            StudioCollection.doc(newID).set({
                studioid: newID,
                description: newDesc,
            })
            .then(() => {Alert.alert('Studio created!')}
            )
            .catch(error => console.error(error)
            ),

            //creating a sample exercise for the new studio
            //this also creates the 'exercises' collection within the new studio doc
            StudioCollection.doc(newID).collection('exercises').doc('Sample Exercise').set({
                title: "Sample Exercise",
                description: "This is a sample exercise!",
                duedate: firestore.FieldValue.serverTimestamp(),
                startingtempo: 100,
                goaltempo: 120,
                videolink: "",
            })
            .catch(error => console.error(error)
            )
        );
    }
}

//Function to render the StudiosCreate screen
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