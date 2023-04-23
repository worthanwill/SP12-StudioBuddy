import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import StudiosButton from "../components/StudiosButton";
import ExercisesButton from "../components/ExercisesButton";
import AccountButton from "../components/AccountButton";
import CalendarButton from "../components/CalendarButton";

const Mainmenu = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/studio-buddy-logo2.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <View style={styles.materialButtonGrey1Row}>
        <StudiosButton style={styles.materialButtonGrey1}></StudiosButton>
        <ExercisesButton style={styles.materialButtonGrey2}></ExercisesButton>
      </View>
      <View style={styles.materialButtonGrey3Row}>
        <AccountButton style={styles.materialButtonGrey3}></AccountButton>
        <CalendarButton style={styles.materialButtonGrey4}></CalendarButton>
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
  materialButtonGrey1: {
    height: 135,
    width: 135
  },
  materialButtonGrey2: {
    height: 135,
    width: 135,
    marginLeft: 17
  },
  materialButtonGrey1Row: {
    height: 135,
    flexDirection: "row",
    marginLeft: 44,
    marginRight: 44
  },
  materialButtonGrey3: {
    height: 135,
    width: 135
  },
  materialButtonGrey4: {
    height: 135,
    width: 135,
    marginLeft: 17
  },
  materialButtonGrey3Row: {
    height: 135,
    flexDirection: "row",
    marginTop: 16,
    marginLeft: 44,
    marginRight: 44
  }
});

export default Mainmenu;
