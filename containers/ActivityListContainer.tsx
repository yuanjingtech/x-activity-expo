import React, {useState} from 'react';
import {FlatList} from "react-native";
import {activities} from "../data";
import Activity from "../components/Activity";


const ActivityListContainer = () => {
    const [tasks] = useState(activities);
    return (
        <FlatList
            data={tasks}
            renderItem={({item}) => (
                <Activity
                    key={item.id}
                    data={item}
                />
            )}
            keyExtractor={item => item.id.toString()}
        />);
};

export default ActivityListContainer;
