import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";

const Mainmenu = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/studio-buddy-logo2.png")}
        resizeMode="contain"
        style={styles.image}>
      </Image>
      <View style={styles.row1}>
        <TouchableOpacity style={styles.studiosContainer} onPress={() => props.navigation.navigate('Studios')}>
            <Text style={styles.studiosText}>Studios</Text>
            </TouchableOpacity>
        <TouchableOpacity style={styles.exercisesContainer} onPress={() => props.navigation.navigate('ExercisesMain')}>
            <Text style={styles.exercisesText}>Exercises</Text>
            </TouchableOpacity>
      </View>
      <View style={styles.row2}>
        <TouchableOpacity style={styles.accountContainer} onPress={() => props.navigation.navigate('Account')}>
            <Text style={styles.accountText}>Account</Text>
            </TouchableOpacity>
        <TouchableOpacity style={styles.calendarContainer} onPress={() => props.navigation.navigate('Auth')}>
            <Text style={styles.calendarText}>Calendar</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)"
  },
  image: {
    width: 288,
    height: 289,
    marginTop: 96,
    marginLeft: 44
  },
  studiosContainer: {
    height: 135,
    width: 135,
    backgroundColor: "rgba(160,129,108,1)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
     width: 0,
     height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  },
  studiosText: {
      color: "rgba(255,255,255,1)",
      fontSize: 20
    },
  exercisesContainer: {
    height: 135,
    width: 135,
    marginLeft: 17,
    backgroundColor: "rgba(160,129,108,1)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  },
  exercisesText: {
      color: "rgba(255,255,255,1)",
      fontSize: 20
  },
  row1: {
    height: 135,
    flexDirection: "row",
    marginLeft: 44,
    marginRight: 44
  },
  accountContainer: {
    height: 135,
    width: 135,
    backgroundColor: "rgba(160,129,108,1)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 2,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
    shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,
        minWidth: 88,
        paddingLeft: 16,
        paddingRight: 16
  },
  accountText: {
      color: "rgba(255,255,255,1)",
      fontSize: 20
  },
  calendarContainer: {
    height: 135,
    width: 135,
    marginLeft: 17,
    backgroundColor: "rgba(160,129,108,1)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 2,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,
        minWidth: 88,
        paddingLeft: 16,
        paddingRight: 16
  },
  calendarText: {
      color: "rgba(255,255,255,1)",
      fontSize: 20
  },
  row2: {
    height: 135,
    flexDirection: "row",
    marginTop: 16,
    marginLeft: 44,
    marginRight: 44
  }
});

export default Mainmenu;
