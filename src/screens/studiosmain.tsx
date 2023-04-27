import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, Button } from "react-native";
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import firestore from '@react-native-firebase/firestore';

//Function to render the StudiosMain screen
const StudiosMain = (props) => {
    const tableHead = [' Studio ID', ' Description']
    const widthArray = [75, 285]
    const [tableData, setTableData] = useState([])

    //This populates tableData with arrays representing all studios in the database
    useEffect(() => {
        const StudioCollection = firestore().collection('studios');
        StudioCollection.get().then(querySnapshot => {
            for (let i = 0; i < querySnapshot.size; i += 1){
                const rowData = [];
                rowData.push(querySnapshot.docs[i].get('studioid'));
                rowData.push(querySnapshot.docs[i].get('description'));
                //console.log(rowData);
                setTableData(oldData => [...oldData, rowData]);
            }
        });
    }, []);

    //console.log(tableData);

    return (
    <View style={styles.container}>
        <View style={styles.contentContainer}>
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        <Row data={tableHead} widthArr={widthArray} style={styles.header} textStyle={styles.headerText}/>
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                            {
                                tableData.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArray}
                                        style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                                        textStyle={styles.tableText}/>
                                ))
                            }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
            <View style={styles.footer}>
                <Button
                    color="#A0816C"
                    title="Create New Studio"
                    onPress={() => props.navigation.navigate('StudiosCreate')}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    contentContainer: { flex: 1 },
    header: { height: 50, backgroundColor: "rgba(160,129,108,1)" },
    headerText: { textAlign: 'left', fontWeight: 'bold', color: "rgba(255,255,255,1)", },
    tableText: { textAlign: 'left', fontWeight: 'bold', },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' },
    footer: { height: 80 }
});

export default StudiosMain;