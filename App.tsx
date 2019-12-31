import React, {useEffect} from 'react';
import {Clipboard, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Linking, Notifications} from "expo";
import * as Permissions from "expo-permissions";
import {activities} from './data';
import ActivityListContainer from "./containers/ActivityListContainer";

const App = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
               <ActivityListContainer/>
            </SafeAreaView>
        </View>
    );
};
export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        fontSize: 20,
    }
});
