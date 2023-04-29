import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Alert, TouchableOpacity, Text, TextInput, ScrollView, Button } from "react-native";
import firestore from '@react-native-firebase/firestore';

//Function that creates a new exercise and puts it in the correct collection
const CreateNewExercise = (path, newTitle, newDesc, newDueDate, newStart, newGoal, newVideoLink) => {
    if (newTitle === '' || newDesc === '' || newDueDate === '' || newStart === '' || newGoal === ''){
        Alert.alert('Please fill out all required fields.')
    }
    else {
        return(
            path.doc(newTitle).set({
                title: newTitle,
                description: newDesc,
                duedate: newDueDate,
                startingtempo: newStart,
                goaltempo: newGoal,
                videolink: newVideoLink,
            })
            .then(() => {Alert.alert('Exercise created!')}
            )
            .catch(error => console.error(error)
            )
        );
    }
}

//Function to render the ExercisesCreate screen
const ExercisesCreate = (props) => {
    const studio = props.route.params.studioID;
    const [exercisesPath, setExercisesPath] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [duedate, setDueDate] = useState('');
    const [startingtempo, setStartingTempo] = useState('');
    const [goaltempo, setGoalTempo] = useState('');
    const [videolink, setVideoLink] = useState('');

    useEffect(() => {
        const newpath = firestore().collection('studios').doc(studio).collection('exercises');
        setExercisesPath(newpath);
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView vertical={true}>
            <Text style={styles.titleText}>Exercise Title</Text>
            <TextInput
                style={styles.inputStyle}
                onChangeText={setTitle}
                value={title}
                placeholder='Enter Exercise Title'
                />
            <Text style={styles.titleText}>Description</Text>
            <TextInput
                style={styles.inputStyle}
                onChangeText={setDesc}
                multiline
                value={desc}
                placeholder='Enter Description'
                />
            <Text style={styles.titleText}>Due Date</Text>
            <TextInput
                style={styles.inputStyle}
                onChangeText={setDueDate}
                value={duedate}
                placeholder='Enter Due Date'
                />
            <Text style={styles.titleText}>Starting Tempo</Text>
            <TextInput
                style={styles.inputStyle}
                onChangeText={setStartingTempo}
                value={startingtempo}
                placeholder='Enter Starting Tempo'
                />
            <Text style={styles.titleText}>Goal Tempo</Text>
            <TextInput
                style={styles.inputStyle}
                onChangeText={setGoalTempo}
                value={goaltempo}
                placeholder='Enter Goal Tempo'
                />
            <Text style={styles.titleText}>Optional: Video Link</Text>
            <TextInput
                style={styles.inputStyle}
                onChangeText={setVideoLink}
                value={videolink}
                placeholder='Enter an optional video link'
                />
            <Button
                color="#A0816C"
                title="Submit"
                onPress={() => CreateNewExercise(exercisesPath, title, desc, duedate, startingtempo, goaltempo, videolink)}/>
            </ScrollView>
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

export default ExercisesCreate;