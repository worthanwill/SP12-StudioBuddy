import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Alert, ScrollView, Text, Linking } from "react-native";
import firestore from '@react-native-firebase/firestore';

const CheckIfValidVideoLink = (videolink) => {
    if (videolink!=''){
        const isValid = Linking.canOpenURL(videolink);
        if (isValid) {
            Linking.openURL(videolink);
        } else {
            Alert.alert('Invalid link.');
        };
    };
}

const ExercisesView = (props) => {
    const studio = props.route.params.studioID;
    const title = props.route.params.exerciseTitle;
    const [desc, setDesc] = useState('');
    const [duedate, setDueDate] = useState('');
    const [startingtempo, setStartingTempo] = useState('');
    const [goaltempo, setGoalTempo] = useState('');
    const [videolink, setVideoLink] = useState('');

    const path = firestore().collection('studios').doc(studio).collection('exercises').doc(title);
    let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm; //not used

    //effect hook to set all exercise values
    useEffect(() => {
        path.get().then(documentSnapshot => {
            setDesc(documentSnapshot.get('description'));
            setDueDate(documentSnapshot.get('duedate'));
            setStartingTempo(documentSnapshot.get('startingtempo'));
            setGoalTempo(documentSnapshot.get('goaltempo'));
            setVideoLink(documentSnapshot.get('videolink'));
        });
    }, []);

    /*
    I tried using an embedded YouTube player library to show the video in the app but whether or not
    it worked was very hardware specific. Regardless I kept the regex and effect hook to extract the
    videoID in case someone wants to try reimplementing this in the future.

    useEffect(() => {
        if (videolink === ''){
            return;
        } else {
            setVideoLink(regex.exec(videolink)[3]);
        };
    }, []);
    */

    return (
        <View style={styles.container}>
            <Text style={styles.titleText} multiline>{title}</Text>
                <ScrollView vertical={true}>
                    <View style={styles.scrollContainer}>
                        <Text style={styles.headerText}>Description</Text>
                        <Text>{desc}</Text>
                        <Text style={styles.headerText}>Due Date: {duedate}</Text>
                        <Text style={styles.headerText}>Starting Tempo: {startingtempo}</Text>
                        <Text style={styles.headerText}>Goal Tempo: {goaltempo}</Text>
                        <Text style={styles.headerText}>Example Video Link</Text>
                        <Text style={{color: 'blue', textDecorationLine: 'underline'}} onPress={() => CheckIfValidVideoLink(videolink)}>{videolink}</Text>
                    </View>
                </ScrollView>
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
    scrollContainer: {
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
      }
});

export default ExercisesView;