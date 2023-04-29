import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, Alert, FlatList, Button } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import firestore from '@react-native-firebase/firestore';

//Function to check if a studio is selected.
//If so, then navigate to ExercisesCreate, passing that studio as a param
const CreateNewExerciseNav = (props, selectedStudio) => {
    if (selectedStudio===''){
        Alert.alert("Please select a studio.");
    } else {
        props.navigation.navigate('ExercisesCreate', {
            studioID: selectedStudio
        });
    };
}

const ExercisesViewNav = (props, selectedStudio, selectedExercise) => {
    props.navigation.navigate('ExercisesView', {
        studioID: selectedStudio,
        exerciseTitle: selectedExercise.item
    });
}

//Function to render the ExercisesMain screen
const ExercisesMain = (props) => {
    const [listSelected, setListSelected] = useState(''); //stores selected studio from list
    const [listData, setListData] = useState([]); //stores all studios from database
    const [studioDocID, setStudioDocID] = useState(''); //stores selected studio's doc ID
    const [exercisesList, setExercisesList] = useState([]); //stores all exercises from selected studio
    const StudioCollection = firestore().collection('studios');

    //effect hook to populate SelectList with studios
    useEffect(() => {
        StudioCollection.get().then(querySnapshot => {
            for (let i = 0; i < querySnapshot.size; i += 1){
                const myStudioID = querySnapshot.docs[i].get('studioid');
                setListData(oldData => [...oldData, myStudioID]);
            }
        });
    }, []);

    /*
    The following effect hook is a pretty roundabout way to get the ID of the associated studio
    doc. If you create studios using the app only, this isn't needed and you can just find the
    selected studio's exercises via
    firestore.collection('studios').doc(listSelected).collection('exercises').get()
    since the studioid and documentID are the same. See studioscreate.tsx

    If you're creating studios via the Firebase console, then this is needed since the studioid
    and documentID can be mismatched.
    */
    useEffect(() => {
        if (listSelected!=''){
            setExercisesList([]);
            const queryRef = StudioCollection.where('studioid', '==', listSelected);

            queryRef.get().then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                setStudioDocID(documentSnapshot.id);
                });
            });
        };
    }, [listSelected]);

    //effect hook to populate exercisesList with the exercises from the chosen studio
    useEffect(() => {
        if (studioDocID!=''){
            setExercisesList([]);
            StudioCollection.doc(studioDocID).collection('exercises').get().then(querySnapshot => {
                for (let i = 0; i < querySnapshot.size; i += 1){
                    const exercisetitle = querySnapshot.docs[i].get('title');
                    setExercisesList(oldData => [...oldData, exercisetitle]);
                    //console.log(exercisetitle);
                };
            });
        };
    }, [studioDocID]);

    /*
    A bug with the search function of SelectList makes it unusable for this project. I just set
    search to false to disable the functionality for now.
    If you're working on this project in the future, check dropdown-select-list's GitHub to see if
    it's resolved: https://github.com/danish1658/react-native-dropdown-select-list
    */
    return (
        <View style={styles.container}>
            <View style={styles.exercisesContainer}>
                <Text style={styles.titleText}>Select a Studio</Text>
                <SelectList
                    search={false}
                    maxHeight={200}
                    setSelected={setListSelected}
                    data={listData}
                    />
                <Text/>
                <Text style={styles.titleText}>Exercises</Text>
                <Text textAlign={'left'}>Tap on an exercise to view</Text>
                <FlatList
                    data={exercisesList}
                    renderItem={({item}) => <Text
                        style={styles.exerciseText}
                        onPress={() => ExercisesViewNav(props, listSelected, {item})}
                        >{item}</Text>}
                    />
            </View>
            <View style={styles.footer}>
                <Button
                    color="#A0816C"
                    title="Create New Exercise"
                    onPress={() => CreateNewExerciseNav(props, listSelected)}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "rgba(255,255,255,1)"
      },
    exercisesContainer: {
        flex: 1,
        gap: 10
      },
    titleText: {
        textAlign: 'left',
        fontWeight: 'bold'
      },
    exerciseText: {
        color: "rgba(255,255,255,1)",
        backgroundColor: "#A0816C",
        padding: 10,
        gap: 10
      },
    footer: {
        height: 80
     }
});

export default ExercisesMain;