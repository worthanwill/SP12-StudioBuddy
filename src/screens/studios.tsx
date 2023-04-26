import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import { Table, TableWrapper, Row, } from 'react-native-table-component';
import ActiveStudio from './src/components/ActiveStudio';
import firestore from '@react-native-firebase/firestore';

const Studios = (props) => {
    const tableHead = ['Studio ID', 'Description', 'Set Active']
    const widthArr = [100, 300, 100]
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        const StudioCollection = firestore().collection('studios');
        StudioCollection.get().then(querySnapshot => {
            for (let i = 0; i < querySnapshot.size; i += 1){
                const rowData = [];
                rowData.push(querySnapshot.docs[i].get('studioid'));
                rowData.push(querySnapshot.docs[i].get('description'));
                console.log(rowData);
                setTableData(oldData => [...oldData, rowData]);
            }
        });
    }, []);

    console.log(tableData);

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text}/>
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: "rgba(160,129,108,1)" },
    text: { textAlign: 'left', fontWeight: '100', color: "rgba(255,255,255,1)", },
    dataWrapper: { marginTop: -1 },
    row: { backgroundColor: '#E7E6E1' },
    btn: { width: 58, height: 18, backgroundColor: "rgba(160,129,108,1)",  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});

export default Studios;