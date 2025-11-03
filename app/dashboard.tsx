import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TouchableOpacity, Image, ScrollView, Animated, Easing, RefreshControl } from 'react-native';
import { Text, View } from 'react-native';
import { Svg, Circle, G } from 'react-native-svg';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/routes/homeStack';
import { StatusBar } from 'expo-status-bar';
import MenuBar from '@/components/MenuBar';
import ladyHome from '../assets/images/lady-home.png';
import refresh from '../assets/images/refresh.png';
import newBell from '../assets/images/new-bell.png';
import activeTask from '../assets/images/active-task.png';
import teamsAssigned from '../assets/images/teams-assigned.png';
import reportReview from '../assets/images/report-review.png';
import areasCleaned from '../assets/images/areas-cleaned.png';

export default function Dashboard() {
    const route = useRoute<RouteProp<RootStackParamList, 'Dashboard'>>();
    const username = route.params?.username;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [showAll, setShowAll] = useState(false);
    const [refreshTick, setRefreshTick] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        setRefreshTick((t) => t + 1);

        setTimeout(() => setRefreshing(false), 400);
    };


    useLayoutEffect(() => {
        navigation.setOptions?.({ headerShown: false, title: '' });
    }, [navigation]);


    useEffect(() => {

    }, [refreshTick]);

    return (
        <>
            <StatusBar style="dark" backgroundColor="#FFFFFF" />
            <ScrollView
                key={`refresh-${refreshTick}`}
                style={tw`h-full bg-[#F7F7F7]`}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#7F56D9" />}
            >

                <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
                    <View style={[tw`flex-row items-center`]}>
                        <Image source={ladyHome} style={{ width: 42, height: 42, borderRadius: 21 }} />
                        <View style={[tw`pl-3`]}>
                            <Text style={[tw`text-black font-bold text-[18px]`]}>
                                Hello {username ? String(username) : 'Emmanuella'}
                            </Text>
                            <Text style={[tw`text-gray-600 text-[13px]`]}>Pandas Factory</Text>
                        </View>
                    </View>
                    <View style={[tw`flex-row items-center`]}>
                        <TouchableOpacity style={[tw`mr-3 bg-white rounded-full shadow-lg p-2`]} onPress={handleRefresh}>
                            <Image source={refresh} style={[tw`w-6 h-6 p-2 bg-white rounded-full`]} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[tw`bg-white rounded-full shadow-lg p-2`]}>
                            <Image source={newBell} style={[tw`w-6 h-6 bg-white rounded-full`]} />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={[tw`px-4 mt-8 mb-5`]}>
                    <View style={[tw`flex-row`]}>
                        <View style={tw`flex-1 rounded-2xl p-3 mr-3 bg-white`}>
                            <View style={tw`w-8 h-8 rounded-full bg-[#F1EEF6] items-center justify-center mb-2`}>
                                <Image source={activeTask} style={tw`w-[30px] h-[30px]`} />
                            </View>
                            <Text style={tw`text-[#3A3A3A] mb-2 text-[13.6px]`}>Active Tasks</Text>
                            <Text style={tw`text-black font-bold text-[42px]`}>2</Text>
                        </View>
                        <View style={tw`flex-1 rounded-2xl p-3 bg-[#EAE2F8]`}>
                            <View style={tw`bg-[#2D1B3D] rounded-full p-2 w-8 h-8 items-center justify-center`}>
                                <Image source={teamsAssigned} style={tw`w-[14px] h-[14px]`} />
                            </View>
                            <Text style={tw`text-[#3A3A3A] mb-2 pt-2 text-[13.6px]`}>Teams Assigned</Text>
                            <Text style={tw`text-black font-bold text-[42px]`}>2</Text>
                        </View>
                    </View>
                    <View style={[tw`flex-row mt-5`]}>
                        <View style={tw`flex-1 rounded-2xl p-3 mr-3 bg-[#EAE2F8]`}>
                            <View style={tw`w-8 h-8 rounded-full bg-[#F1EEF6] items-center justify-center mb-2`}>
                                <Image source={reportReview} style={tw`w-[30px] h-[30px]`} />
                            </View>
                            <Text style={tw`text-[#3A3A3A] mb-2 text-[13.6px]`}>Reports to Review</Text>
                            <Text style={tw`text-black font-bold text-[42px]`}>12</Text>
                        </View>
                        <View style={tw`flex-1 rounded-2xl p-3 bg-white`}>
                            <View style={tw`bg-[#2D1B3D] rounded-full p-2 w-8 h-8 items-center justify-center`}>
                                <Image source={areasCleaned} style={tw`w-[14px] h-[14px]`} />
                            </View>
                            <Text style={tw`text-[#3A3A3A] mb-2 pt-2 text-[13.6px]`}>Areas Cleaned</Text>
                            <Text style={tw`text-black font-bold text-[42px]`}>6</Text>

                        </View>
                    </View>
                </View>


                <View style={[tw`px-4 mt-4 mb-5`]}>
                    <View style={tw`bg-[#2D163E] rounded-2xl p-4 flex-row items-center justify-between`}>
                        <View>
                            <Text style={[tw`text-white font-bold text-[20px]`]}>Work Orders Done</Text>
                            <Text style={tw`text-white mt-1 text-[12px]`}>
                                3/8 <Text style={[tw`text-[12px] text-white/60`]}>reviews completed today</Text>
                            </Text>
                            <TouchableOpacity style={tw`flex-row items-center mt-2`}>

                                <Text style={[{ color: '#F28BFD' }, tw`text-[14px]`]}>Continue</Text>
                                <Ionicons name="arrow-forward" size={16} color="#F28BFD" style={{ marginLeft: 6 }} />

                            </TouchableOpacity>
                        </View>
                        <View style={tw`items-center justify-center`}>
                            <ProgressRing percent={69} size={92} strokeWidth={10} />
                        </View>
                    </View>
                </View>


                <View style={tw`px-4 mt-5 flex-row items-center justify-between`}>
                    <Text style={[tw`text-black font-bold`]}>Work Orders</Text>
                    <TouchableOpacity style={tw`bg-[#EFECEF] py-1.5 px-3.5 rounded-2xl`} onPress={() => navigation.navigate('WorkOrders')}>
                        <Text style={[tw`text-black`]}>View All</Text>
                    </TouchableOpacity>
                </View>


                <View style={[tw`px-4 mt-3 mb-26`]}>
                    {(showAll ? [
                        { id: 1, title: 'Fresh Kitchen Room', subtitle: 'Shelf and Cabinet', status: 'Not Cleaned', color: '#E74C3C' },
                        { id: 2, title: 'Fresh Kitchen Room', subtitle: 'Shelf and Cabinet', status: 'Not Cleaned', color: '#E74C3C' },
                        { id: 3, title: 'Fresh Kitchen Room', subtitle: 'Shelf and Cabinet', status: 'Cleaned', color: '#2ECC71' },
                        { id: 4, title: 'Locker Room', subtitle: 'Benches and Lockers', status: 'Not Cleaned', color: '#E74C3C' },
                        { id: 5, title: 'Main Hallway', subtitle: 'Floors and Corners', status: 'Cleaned', color: '#2ECC71' },
                        { id: 6, title: 'Office 2B', subtitle: 'Desks and Windows', status: 'Not Cleaned', color: '#E74C3C' },
                    ] : [
                        { id: 1, title: 'Fresh Kitchen Room', subtitle: 'Shelf and Cabinet', status: 'Not Cleaned', color: '#E74C3C' },
                        { id: 2, title: 'Fresh Kitchen Room', subtitle: 'Shelf and Cabinet', status: 'Not Cleaned', color: '#E74C3C' },
                        { id: 3, title: 'Fresh Kitchen Room', subtitle: 'Shelf and Cabinet', status: 'Cleaned', color: '#2ECC71' },
                    ]).map((item) => (
                        <View key={item.id} style={tw`bg-white rounded-3xl py-4 px-3 flex-row items-center justify-between mb-3 border border-[#EFEFEF]`}>
                            <View style={tw`flex-row items-center flex-1`}>
                                <View style={tw`w-[34px] h-[34px] rounded-[17px] bg-[#F3F1F4] items-center justify-center`}>
                                    <Text style={[tw`text-black`]}>{item.id}</Text>
                                </View>
                                <View style={tw`pl-3`}>
                                    <Text style={[tw`text-black font-bold text[14px]`]}>{item.title}</Text>
                                    <Text style={[tw`text-gray-600 mt-1 text-[11.5px]`]}>{item.subtitle}</Text>
                                </View>
                            </View>
                            <Text style={[{ color: item.color, fontWeight: '600' }, tw`text-[12px]`]}>
                                {item.status}
                            </Text>

                        </View>
                    ))}
                </View>
            </ScrollView>
            <MenuBar />
        </>
    );
}


const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type ProgressRingProps = {
    percent: number;
    size?: number;
    strokeWidth?: number;
};

function ProgressRing({ percent, size = 92, strokeWidth = 10 }: ProgressRingProps) {
    const progress = useRef(new Animated.Value(0)).current;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = size / 2;

    useEffect(() => {
        Animated.timing(progress, {
            toValue: percent,
            duration: 1200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
        }).start();
    }, [percent]);

    const strokeDashoffset = progress.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0],
    });

    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={size} height={size}>
                <G rotation={-90} originX={center} originY={center}>
                    {/* Track */}
                    <Circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#4A3556"
                        strokeOpacity={0.45}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="round"
                    />
                    <AnimatedCircle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#FFFFFF"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={strokeDashoffset as unknown as number}
                    />
                </G>
            </Svg>
            <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[tw`text-white font-bold`]}>69%</Text>
            </View>
            <View style={{ position: 'absolute', width: size, height: size, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Animated.View
                    style={{
                        width: size,
                        height: size,
                        transform: [
                            { rotate: progress.interpolate({ inputRange: [0, 100], outputRange: ['0deg', '360deg'] }) as unknown as string },
                        ],
                    }}
                >
                    <View style={{ position: 'absolute', top: strokeWidth / 2, right: size / 2 - strokeWidth / 2 }}>
                        <View style={{ width: strokeWidth, height: strokeWidth, borderRadius: strokeWidth / 2, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: strokeWidth / 3, height: strokeWidth / 3, borderRadius: strokeWidth / 6, backgroundColor: '#2D163E' }} />
                        </View>
                    </View>
                </Animated.View>
            </View>
        </View>
    );
}
