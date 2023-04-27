import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, Alert, FlatList } from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { SelectList } from 'react-native-dropdown-select-list';
import firestore from '@react-native-firebase/firestore';

//Function to render the ExercisesMain screen
const ExercisesMain = (props) => {
    const [listSelected, setListSelected] = useState('');
    const [listData, setListData] = useState([]);
    const [studioDocID, setStudioDocID] = useState('');
    const [exercisesList, setExercisesList] = useState([]);
    const StudioCollection = firestore().collection('studios');

    //Big dumb effect hook that handles studio selection and exercise rendering
    useEffect(() => {
        StudioCollection.get().then(querySnapshot => {
            for (let i = 0; i < querySnapshot.size; i += 1){
                const myStudioID = querySnapshot.docs[i].get('studioid');
                setListData(oldData => [...oldData, myStudioID]);
            }
        });

        /*
        The following if statement is a pretty roundabout way to get the ID of the associated studio
        doc. If you create studios using the app only, this isn't needed and you can just find the
        selected studio's exercises via
        firestore.collection('studios').doc(listSelected).collection('exercises').get()
        since the studioid and documentID are the same. See studioscreate.tsx

        If you're creating studios via the Firebase console, then this is needed since the studioid
        and documentID can be mismatched.
        */
        if (listSelected!=''){
            const queryRef = StudioCollection.where('studioid', '==', listSelected);

            queryRef.get().then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                setStudioDocID(documentSnapshot.id);
                });
            });
        };

        if (studioDocID!=''){
            StudioCollection.doc(studioDocID).collection('exercises').get().then(querySnapshot => {
                const exercisetitle = querySnapshot.docs[0].get('title');
                setExercisesList(oldData => [...oldData, exercisetitle]);
                //console.log(exercisetitle);
            });
        };

    }, [listSelected, studioDocID]);


    /*
    A bug with the search function of SelectList makes it unusable for this project. I just set
    search to false to disable the functionality for now.
    If you're working on this project in the future, check dropdown-select-list's GitHub to see if
    it's resolved: https://github.com/danish1658/react-native-dropdown-select-list
    */
    return (
        <View style={styles.container}>
            <View style={styles.headerSelectList}>
                <Text style={styles.titleText}>Select a Studio:</Text>
                <SelectList search={false} maxHeight={200} setSelected={setListSelected} data={listData}/>
            </View>
            <View style={styles.exercisesContainer}>
                <Text style={styles.titleText}>Exercises</Text>
                <Text textAlign={'left'}>Tap on an exercise to view</Text>
                {exercisesList.map((exercise) => {
                    return(
                        <View>
                            <Text>{exercise.title}</Text>
                        </View>
                    );
                })}
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
    headerSelectList: {
        flex: 1
      },
    exercisesContainer: {
        flex: 1,
      },
    titleText: {
        textAlign: 'left',
        fontWeight: 'bold'
      }
});

export default ExercisesMain;