import React, { useLayoutEffect } from 'react';
import { TouchableOpacity, Image, ScrollView, DeviceEventEmitter } from 'react-native';
import { Text, View } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/routes/homeStack';
import { StatusBar } from 'expo-status-bar';
import cupp from '../../assets/images/cupp.png';
import ladyHome from '../../assets/images/lady-home.png';
import refresh from '../../assets/images/refresh.png';
import newBell from '../../assets/images/new-bell.png';
import experimentOne from '../../assets/images/experiment-one.png';
import labImg from '../../assets/images/scientists-look-orange-chemicals-glass-laboratory 1.png';
import jugn from '../../assets/images/jugn.png';
import book from '../../assets/images/book.png';
import clock1 from '../../assets/images/clock1.png';

export default function requiredCourses() {
    const route = useRoute<RouteProp<RootStackParamList, 'RequiredCourses'>>();
    const username = route.params?.username;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'RequiredCourses'>>();

    useLayoutEffect(() => {

    }, []);


    useLayoutEffect(() => {
        navigation.setOptions?.({ headerShown: false, title: '' });
    }, [navigation]);
    return (
        <View style={tw`flex-1 bg-[#F7F7F7]`}>
             <StatusBar style="dark" backgroundColor="#FFFFFF" />
            <ScrollView style={[tw`h-full`]} contentContainerStyle={tw`pb-30`} showsVerticalScrollIndicator={false}>
                <View style={tw`flex-1`}>

                <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
                        <View style={[tw`flex-row items-center`]}>
                            <Image source={ladyHome} style={{ width: 42, height: 42, borderRadius: 21 }} />
                        <View style={[tw`pl-3`]}>
                            <Text style={[tw`text-black font-bold text-[18px]`]}>Hello {username ? String(username) : 'Emmanuella'}</Text>
                            <Text style={[tw`text-gray-600 text-[13px]`]}>Pandas Factory</Text>
                        </View>
                    </View>
                    <View style={[tw`flex-row items-center pt-5`]}>
                        <TouchableOpacity style={[tw`mr-3 bg-white rounded-full shadow-lg p-2`]}>
                                <Image source={refresh} style={[tw`w-6 h-6 p-2 bg-white rounded-full`]} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[tw`bg-white rounded-full shadow-lg p-2`]}>
                                <Image source={newBell} style={[tw`w-6 h-6 bg-white rounded-full`]} />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={[tw`px-4 mt-2 flex-row`]}>

                        <View style={tw`flex-1 rounded-2xl p-3 mr-3 overflow-hidden bg-white`}>
                            <View style={tw`w-7 h-7 rounded-full bg-[#2B2140] items-center justify-center mb-2`}>
                            <Ionicons name="time-outline" size={14} color="#FFFFFF" />
                        </View>
                            <Text style={tw`absolute top-3 right-3 text-[#2B2140] text-[11px] opacity-90 text-right`}>Courses{"\n"}Completed</Text>
                            <Text style={tw`text-[#2B2140] font-extrabold text-[28px] mt-4`}>14</Text>
                        <Image
                                source={experimentOne}
                                style={tw`absolute right-[10px] bottom-[-6px] w-16 h-16 opacity-80`}
                        />
                    </View>

                        <View style={tw`flex-1 rounded-2xl p-3 overflow-hidden bg-[#EDE3FF]`}>
                            <View style={tw`w-7 h-7 rounded-full bg-[#2B2140] items-center justify-center mb-2`}>
                            <Ionicons name="time-outline" size={14} color="#FFFFFF" />
                        </View>
                            <Text style={tw`absolute top-3 right-3 text-[#2B2140] text-[11px] opacity-90 text-right`}>Courses{"\n"}Remaining</Text>
                            <Text style={tw`text-[#2B2140] font-extrabold text-[28px] mt-4`}>3</Text>
                        <Image
                                source={experimentOne}
                                style={tw`absolute right-[10px] bottom-[-6px] w-16 h-16 opacity-80`}
                        />
                    </View>
                </View>


                <View style={[tw`px-4 mt-4`]}>
                        <View style={tw`bg-[#2D163E] rounded-2xl p-4`}>
                        <View style={[tw`flex-row items-center justify-between`]}>
                            <Text style={[tw`text-white`, { opacity: 0.9 }]}>Level 3</Text>
                                <View style={tw`bg-white/20 py-1.5 px-2.5 rounded-xl`}>
                                <Text style={[tw`text-white text-[10px]`]}>50% Complete</Text>
                            </View>
                        </View>
                        <Text style={[tw`text-white font-bold text-[18px] mt-2`]}>Chemistry Essentials</Text>
                        <View style={[tw`flex-row items-center mt-3`]}>
                                <View style={tw`bg-white/20 py-1 px-2.5 rounded-xl`}>
                                <Text style={[tw`text-white text-[10px]`]}>Module 2</Text>
                            </View>
                            <Text style={[tw`text-white ml-3 text-[10px]`, { opacity: 0.6 }]}>Module 6</Text>
                        </View>
                            <View style={tw`h-1.5 bg-white/25 rounded-lg overflow-hidden mt-3`}>
                                <View style={tw`h-1.5 bg-[#F38FFF] rounded-lg w-1/2`} />
                        </View>
                    </View>
                </View>


                <SectionHeader title="Required Courses" />
                <CourseCard
                    badgeText="Required Training"
                    dueText="Due in 3 days"
                    title="Chemical Handling SK-250"
                    actionText="Continue"
                        thumb={labImg}
                    modulesCount={8}
                    durationText="1h 30m"
                    points={10}
                />
                <CourseCard
                    badgeText="Required Training"
                    dueText="Due in 3 days"
                    title="LOTO Procedure SK-250"
                    actionText="Continue"
                    thumb={jugn}
                    modulesCount={4}
                    durationText="30 minutes"
                    points={10}
                    progress={50}
                />


                <SectionHeader title="Recommendations" optional />
                <CourseCard
                    badgeText="Optional"
                    dueText="No Due Date"
                    subtitle="Available in Level 3"
                    title="Advanced Sanitation"
                    actionText="Start"
                    thumb={labImg}
                    modulesCount={8}
                    durationText="1h 30m"
                    points={10}
                />

                </View>
            </ScrollView>
        </View>
    );
}

type CourseCardProps = {
    badgeText: string;
    dueText: string;
    subtitle?: string;
    title: string;
    actionText: string;
    thumb: any;
    modulesCount: number;
    durationText: string;
    points: number;
    progress?: number;
};

function CourseCard({ badgeText, dueText, subtitle, title, actionText, thumb, modulesCount, durationText, points, progress }: CourseCardProps) {
    return (
        <View style={[tw`px-4 mt-3`]}>
            <View style={tw`bg-white rounded-2xl p-3`}>
                <View style={[tw`flex-row items-center justify-between`]}>
                    <BadgeLeft text={badgeText} />
                    <BadgeRight text={dueText} />
                </View>
                {subtitle ? <Text style={tw`text-[#7A7A86] text-[11px] mt-2`}>{subtitle}</Text> : null}
                <View style={[tw`flex-row mt-3`]}>
                    <View style={[tw`flex-1 pr-3`]}>
                        <Text style={[tw`text-black font-bold text-[16px]`]}>{title}</Text>
                        <View style={[tw`flex-row items-center mt-2`]}>
                            <Text style={[tw`text-[#E565B6] font-semibold`]}>{actionText}</Text>
                            <Ionicons name="arrow-forward" size={14} color="#E565B8" style={{ marginLeft: 4 }} />
                        </View>
                        <View style={[tw`flex-row items-center mt-3`]}>
                            <View style={[tw`flex-row items-center`]}>
                                <Image source={book} style={tw`w-3 h-3 mr-1.5`} />
                                <Text style={tw`text-[#7A7A86] text-[11px] text-black font-bold`}>{modulesCount} Courses</Text>
                            </View>
                            <View style={tw`w-1 h-1 rounded bg-[#E5E7EB] mx-2`} />
                            <View style={[tw`flex-row items-center`]}>
                                <Image source={clock1} style={tw`w-3 h-3 mr-1.5`} />
                                <Text style={tw`text-[#7A7A86] text-[11px] text-black font-bold`}>{durationText}</Text>
                            </View>
                            <View style={tw`w-1 h-1 rounded bg-[#E5E7EB] mx-2`} />
                            <View style={[tw`flex-row items-center`]}>
                                <Image source={cupp} style={tw`w-3 h-3 mr-1.5`} />
                                <Text style={tw`text-[#7A7A86] text-[11px] text-[#FBA82C] font-bold pt-2`}>+ {points} points</Text>
                            </View>
                        </View>
                        {typeof progress === 'number' && (
                            <View style={[tw`mt-3`]}>
                                <Text style={[tw`text-[#E565B8] text-[10px] font-semibold`]}>{`${progress}% complete`}</Text>
                                <View style={tw`h-1.5 bg-[#F5E6F0] rounded-lg overflow-hidden mt-1`}>
                                    <View style={[tw`h-1.5 bg-[#E565B8] rounded-lg`, { width: `${progress}%` }]} />
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={tw`w-[100px] h-[84px] rounded-xl items-center justify-center`}>
                        <Image source={thumb} style={tw`w-[70px] h-[70px] rounded-lg`} resizeMode="contain" />
                    </View>
                </View>
            </View>
        </View>
    );
}

function BadgeLeft({ text }: { text: string }) {
    const isOptional = text.toLowerCase() === 'optional';
    return (
        <View style={isOptional ? tw`bg-[#EEF2FF] py-1.5 px-2.5 rounded-xl` : tw`bg-[#F3F4F6] py-1.5 px-2.5 rounded-xl`}>
            <Text style={[tw`text-[10px]`, { color: isOptional ? '#7C5CFF' : '#111827' }]}>{text}</Text>
        </View>
    );
}

function BadgeRight({ text }: { text: string }) {
    const isNoDue = text.toLowerCase() === 'no due date';
    return (
        <View style={tw.style('py-1.5 px-2.5 rounded-xl', isNoDue ? 'bg-[#F3F4F6]' : 'bg-[#FFE9F3]')}>
            <Text style={[tw`text-[10px]`, { color: isNoDue ? '#6B7280' : '#FF5CA8' }]}>{text}</Text>
        </View>
    );
}

function SectionHeader({ title, optional }: { title: string; optional?: boolean }) {
    return (
        <View style={[tw`px-4 mt-6 mb-2`]}>
            <View style={[tw`flex-row items-center justify-between`]}>
                <View style={[tw`flex-row items-center`]}>
                    <Text style={[tw`text-black font-bold`]}>{title}</Text>
                </View>
                <TouchableOpacity style={tw`bg-white border border-[#EFEFEF] rounded-2xl px-2.5 py-1.5 flex-row items-center`}>
                    <Text style={[tw`text-black text-[12px]`]}>View All</Text>
                    <Ionicons name="chevron-forward" size={16} color="#111827" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

