import React, {useEffect} from 'react';
import {Clipboard, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Linking, Notifications} from "expo";
import * as Permissions from "expo-permissions"

const tasks = [
    {
        id: 1,
        title: "天猫小黑盒领红包",
        code: "【来这里，逛新品！】https://m.tb.cn/h.ez6E62g?sm=e5e31f 嚸↑↓擊鏈ㄣ接，再选择瀏覽嘂..咑№亓；或復zんíゞ整句话￥OoQM1Zzl8k6￥后打开👉淘灬寳👈",
        link: "taobao://"
    },
    {
        id: 2,
        title: "送你0.1~0.5元话费",
        code: "【送你0.1~0.5元话费，点击签到可领，当日有效】https://m.tb.cn/h.eBBNNRY 點ゞ撃°鏈ㄣ接，再选择瀏覽●噐○咑ぺ鐦；或復zんíゞ整句话￥TuNo100iQeX￥后打开👉淘灬寳👈",
        link: "taobao://"
    },
    {
        id: 3,
        title: "天天支付宝 幸运抽大奖",
        code: "",
        link: "https://render.alipay.com/p/s/i/?scheme=alipays%3A%2F%2Fplatformapi%2Fstartapp%3FappId%3D20000067%26__open_alipay__%3DYES%26url%3Dhttps%253A%252F%252Frender.alipay.com%252Fp%252Fc%252Flow-permeate%253FchInfo%253Dshare%2526__webview_options__%253DpullRefresh%25253DYES%252526transparentTitle%25253Dauto"
    },
    {
        id: 4,
        title: "支付宝 天天砸蛋 天天领钱",
        code: "#R4pluA613Ei#长按复制此消息，打开支付宝搜索，体验每日必抢小程序",
        link: "alipay://"
    }
];
const openTask = async (it) => {
    await Clipboard.setString(it.code);
    await Linking.openURL(it.link)
};
const Task = ({data: it}) => (<TouchableOpacity onPress={async () => {
    await openTask(it)
}}>
    <Text style={[styles.item, {padding: 8, margin: 4}]}>{it.title}</Text>
</TouchableOpacity>);
const App = () => {
    useEffect(() => {
        let subscribe: any;
        const run = async () => {
            let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

            if (result.status === 'granted') {
                console.log('Notification permissions granted.')
            }
            subscribe = Notifications.addListener((notification) => {
                console.log(notification);
                if (notification.origin == "selected" && notification.data.type == "task") {
                    const task = notification.data.data;
                    openTask(task)
                }
            })
        };
        // noinspection JSIgnoredPromiseFromCall
        run();
        return () => subscribe.remove()
    }, []);

    const schedule = (task: any) => {
        const localNotification = {
            title: task.title,
            body: task.code,
            data: {type: 'task', data: task},
        };

        // Notifications show only when app is not active.
        // (ie. another app being used or device's screen is locked)
        Notifications.scheduleLocalNotificationAsync(
            localNotification, {
                time: ((new Date()).getTime() + 5 * 1000)
            }
        );
    };
    const scheduleAll = () => {
        tasks.forEach(schedule)
    };
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={tasks}
                    renderItem={({item}) => (
                        <Task
                            key={item.id}
                            data={item}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                />
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
