import React, {useState, useEffect} from 'react';
import {FlatList} from "react-native";
import Activity from "../components/Activity";
import {activityService,IActivity} from "../services"

const ActivityListContainer = () => {
    const [tasks,setTasks] = useState<IActivity[]>([]);
    useEffect(()=>{
        const run=async()=>{
            const list = await activityService.getList();
            setTasks(list);
        }
        run();
    })
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
