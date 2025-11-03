import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ViewStyle } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/routes/homeStack';
import experimentOne from '../../assets/images/experiment-one.png';

export default function LevelsScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Levels'>>();
    const route = useRoute<RouteProp<RootStackParamList, 'Levels'>>();
    const params = route.params ?? {} as NonNullable<RouteProp<RootStackParamList, 'Levels'>['params']>;

    useLayoutEffect(() => {
        navigation.setOptions?.({ headerShown: false });
    }, [navigation]);

    const levelNum = params.level ? Number(params.level) : undefined;
    const isLocked = params.locked === 'true';

    const progress = params.progress ? Number(params.progress) : undefined;
    const [activeTab, setActiveTab] = useState<'about' | 'modules' | 'download'>('modules');
    const activeColor = '#8B4CE8';

    return (
        <View style={tw`flex-1 bg-[#F7F7F7]`}>

            <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={tw`w-8 h-8 rounded-full bg-white items-center justify-center`}>
                    <Ionicons name="chevron-back" size={18} color="#111827" />
                </TouchableOpacity>
                <Text style={[tw`text-black font-bold text-[18px]`]}>Level {levelNum}</Text>
                <TouchableOpacity style={tw`w-8 h-8 rounded-full bg-white items-center justify-center`}>
                    <Ionicons name="time-outline" size={18} color="#111827" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>

                <View style={[tw`px-4 mt-2`]}>
                    <View style={tw`rounded-2xl p-4 overflow-hidden`}>
                        <View style={[tw`flex-row items-center justify-between`]}>
                            <Text style={[tw`text-black font-bold text-[20px]`]}>Level {levelNum}</Text>
                            <View style={tw`bg-white px-2.5 py-1.5 rounded-xl`}>
                                {isLocked ? (
                                    <View style={[tw`flex-row items-center`]}>
                                        <Ionicons name="lock-closed" size={12} color="#111827" />
                                        <Text style={[tw`text-[10px] ml-1 text-black`]}>{'Locked'}</Text>
                                    </View>
                                ) : (
                                    <Text style={[tw`text-[10px] text-black`]}>{progress ?? 0}% Complete</Text>
                                )}
                            </View>
                        </View>
                        <View style={[tw`mt-1 flex-row items-center`]}>
                            <Ionicons name="ribbon" size={12} color="#F59E0B" />
                            <Text style={[tw`text-[12px] text-[#6B7280] ml-2`]}>{params.title}</Text>
                        </View>
                        <View style={[tw`mt-3 flex-row items-center`]}>
                            <View style={[tw`flex-row items-center`]}>
                                <Ionicons name="book" size={12} color="#6B7280" />
                                <Text style={tw`text-[#6B7280] text-[12px] ml-1.5`}>{params.modules}</Text>
                            </View>
                            <View style={tw`w-1 h-1 rounded-full bg-[#E5E7EB] mx-2.5`} />
                            <View style={[tw`flex-row items-center`]}>
                                <Ionicons name="time-outline" size={12} color="#6B7280" />
                                <Text style={tw`text-[#6B7280] text-[12px] ml-1.5`}>{params.time}</Text>
                            </View>
                        </View>
                        {!isLocked && typeof progress === 'number' && progress < 100 && (
                            <View style={tw`h-2 bg-[#EDE7FF] rounded-lg mt-3 relative`}>
                                <View style={[tw`h-2 bg-[#E565B8] rounded-lg`, { width: `${progress}%` }]} />
                                <View style={tw`absolute right-2 -top-1.5 w-10 h-2 rounded bg-white opacity-80`} />
                            </View>
                        )}
                        <Image source={experimentOne} style={tw`absolute w-[160px] h-[130px] right-[-10px] top-[-8px] opacity-60`} resizeMode="contain" />
                    </View>
                </View>


                <View style={[tw`px-4 mt-3`]}>
                    <View style={tw`bg-white rounded-2xl p-2 flex-row items-center justify-between`}>
                        <TouchableOpacity
                            style={tw.style('py-2.5 px-3.5 rounded-xl flex-row items-center', activeTab === 'about' && 'bg-[#8B4CE8]')}
                            onPress={() => setActiveTab('about')}
                        >
                            <Text style={activeTab === 'about' ? tw`text-white text-[12px] font-bold` : tw`text-[#6B7280] text-[12px]`}>About Level</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={tw.style('py-2.5 px-3.5 rounded-xl flex-row items-center', activeTab === 'modules' && 'bg-[#8B4CE8]')}
                            onPress={() => setActiveTab('modules')}
                        >
                            <Text style={activeTab === 'modules' ? tw`text-white text-[12px] font-bold` : tw`text-[#6B7280] text-[12px]`}>Modules</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={tw.style('py-2.5 px-3.5 rounded-xl flex-row items-center', activeTab === 'download' && 'bg-[#8B4CE8]')}
                            onPress={() => setActiveTab('download')}
                        >
                            <Ionicons name="download-outline" size={14} color={activeTab === 'download' ? '#FFFFFF' : '#6B7280'} />
                            <Text style={tw.style('ml-2', activeTab === 'download' ? 'text-white text-[12px] font-bold' : 'text-[#6B7280] text-[12px]')}>
                                Download All
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={[tw`px-4 mt-2`]}>
                    <ModuleRow style={[tw`mb-2`]} index={1} title="Module 1" status="done" />
                    <ModuleRow index={2} title="Module 2" status="done" />
                    <ModuleRow index={3} title="Module 3" status="continue" />
                    <ModuleRow index={4} title="Module 4" status="start" />
                    <ModuleRow index={5} title="Module 5" status="start" />
                    <ModuleRow index={6} title="Module 6" status="start" />
                    <ModuleRow index={7} title="Final Assessment" status="start-grey" />
                </View>
            </ScrollView>
        </View>
    );
}



function StatusBadge({ status, index }: { status: 'done' | 'continue' | 'start' | 'start-grey'; index?: number }) {
    if (status === 'done') {
        return (
            <View style={tw`bg-[#DCFCE7] py-1.5 px-3.5 rounded-lg`}>
                <Text style={tw`text-[#22C55E] font-bold text-[12px]`}>Done</Text>
            </View>
        );
    }
    if (status === 'continue') {
        return (
            <View style={tw`bg-[#E5F0FF] py-1.5 px-3.5 rounded-lg`}>
                <Text style={tw`text-[#3B82F6] font-bold text-[12px]`}>Continue</Text>
            </View>
        );
    }
    const bg = status === 'start-grey' ? '#E5E7EB' : '#7C5CFF';
    const color = status === 'start-grey' ? '#374151' : '#FFFFFF';
    const isDisabled = status === 'start-grey';
    const nav = useNavigation<StackNavigationProp<RootStackParamList, 'Levels'>>();
    const onPress = () => nav.navigate('Moduls', { module: String(index ?? 1), total: '6' });
    const Wrapper: any = isDisabled ? View : TouchableOpacity;
    return (
        <Wrapper onPress={isDisabled ? undefined : onPress} style={tw.style('py-1.5 px-3.5 rounded-lg flex-row items-center', { backgroundColor: bg })}>
            <Text style={tw.style('font-bold text-[12px] mr-1.5', { color })}>Start</Text>
            <Ionicons name="arrow-forward" size={14} color={color} />
        </Wrapper>
    );
}

function ModuleRow({ index, title, status, style }: { index: number; title: string; status: 'done' | 'continue' | 'start' | 'start-grey'; style?: ViewStyle | ViewStyle[] }) {
    return (
        <View style={[tw`bg-white rounded-2xl p-3 mb-3 flex-row items-center justify-between`, style as any]}>
            <View style={tw`flex-row items-center`}>
                <View style={tw`w-9 h-9 rounded-full bg-[#F3F4F6] items-center justify-center mr-3`}>
                    <Text style={tw`text-[#111827] font-bold`}>{index}</Text>
                </View>
                <Text style={tw`text-[#111827]`}>{title}</Text>
            </View>
            <StatusBadge status={status} index={index} />
        </View>
    );
}


