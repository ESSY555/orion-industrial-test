import React, { useLayoutEffect, useState, useMemo } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/routes/homeStack';

export default function TrainingLevels() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Levels'>>();
    const [query, setQuery] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions?.({ headerShown: false });
    }, [navigation]);

    return (
        <View style={tw`flex-1 bg-[#F7F7F7]`}>

            <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={tw`w-8 h-8 rounded-full bg-white items-center justify-center`}>
                    <Ionicons name="chevron-back" size={18} color="#111827" />
                </TouchableOpacity>
                <Text style={[tw`text-black font-bold text-[18px]`]}>Training Levels</Text>
                <TouchableOpacity style={tw`w-8 h-8 rounded-full bg-white items-center justify-center`}>
                    <Image source={require('../../../assets/images/newclock.png')} style={tw`w-4 h-4`} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>

                <View style={tw`px-4 pt-6`}>
                    <View style={tw`bg-white rounded-full px-3.5 py-2.5 flex-row items-center`}>
                        <Ionicons name="search" size={16} color="#9CA3AF" />
                        <TextInput
                            placeholder="Search anything"
                            placeholderTextColor="#9CA3AF"
                            style={tw`flex-1 ml-2 text-[#111827]`}
                            value={query}
                            onChangeText={setQuery}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TouchableOpacity style={tw`w-[34px] h-[34px] rounded-[17px] bg-[#6B5DEB] items-center justify-center`} onPress={() => setQuery('')}>
                            <Ionicons name="search" size={16} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={[tw`px-4 mt-3`]}>
                    {useMemo(() => {
                        const levels = [
                            { level: 1, title: 'Entry Level (Yellow Badge)', courses: '8 Courses', time: '1hr 30min', progress: 100, tint: '#EDE7FF', bg: 'rgba(239,234,249,0.6)' },
                            { level: 2, title: 'Basic Skills (Orange Badge)', courses: '8 Courses', time: '1hr 30min', progress: 100, tint: '#FBD1E6', bg: 'rgba(245,211,228,0.65)' },
                            { level: 3, title: 'Quality Assurance (Green Badge)', courses: '8 Courses', time: '1hr 30min', progress: 50, tint: '#EDE7FF', bg: 'rgba(239,234,249,0.6)' },
                            { level: 4, title: 'Advanced Sanitation (Blue Badge)', courses: '8 Courses', time: '1hr 30min', locked: true, tint: '#E5E7EB', bg: 'rgba(233,233,238,0.6)' },
                        ];
                        const q = (query ?? '').trim().toLowerCase();
                        const filtered = q
                            ? levels.filter(l =>
                                `${l.level}`.includes(q) ||
                                l.title.toLowerCase().includes(q) ||
                                (l as any).courses.toLowerCase().includes(q) ||
                                l.time.toLowerCase().includes(q)
                            )
                            : levels;
                        return filtered.map(props => (
                            <LevelCard key={props.level} {...(props as any)} />
                        ));
                    }, [query])}
                </View>
            </ScrollView>
        </View>
    );
}

type LevelCardProps = {
    level: number;
    title: string;
    courses: string;
    time: string;
    progress?: number; 
    locked?: boolean;
    tint: string;
    bg: string;
};

function LevelCard({ level, title, courses, time, progress, locked, tint, bg }: LevelCardProps) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Levels'>>();
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Levels', {
                level: String(level),
                title,
                courses,
                time,
                progress: typeof progress === 'number' ? String(progress) : undefined,
                locked: locked ? 'true' : 'false',
            })}>
            <View style={tw.style('rounded-2xl p-4 mt-3 overflow-hidden', { backgroundColor: bg })}> 
            <View style={[tw`flex-row items-center justify-between`]}>
                <Text style={[tw`text-black font-bold text-[20px]`]}>Level {level}</Text>
                    <View style={tw`bg-white px-2.5 py-1.5 rounded-xl`}>
                    {locked ? (
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
                <Text style={[tw`text-[12px] text-[#6B7280] ml-2`]}>{title}</Text>
            </View>

            <View style={[tw`mt-3 flex-row items-center`]}>
                <View style={[tw`flex-row items-center`]}>
                    <Ionicons name="book" size={12} color="#6B7280" />
                        <Text style={tw`text-[#6B7280] text-[12px] ml-1.5`}>{courses}</Text>
                </View>
                    <View style={tw`w-1 h-1 rounded-full bg-[#E5E7EB] mx-2.5`} />
                <View style={[tw`flex-row items-center`]}>
                    <Ionicons name="time-outline" size={12} color="#6B7280" />
                        <Text style={tw`text-[#6B7280] text-[12px] ml-1.5`}>{time}</Text>
                </View>
            </View>

            {!locked && typeof progress === 'number' && progress < 100 && (
                    <View style={tw`h-2 bg-[#EDE7FF] rounded-lg mt-4 relative`}>
                        <View style={[tw`h-2 bg-[#E565B8] rounded-lg`, { width: `${progress}%` }]} />
                        <View style={tw`absolute right-2 -top-1.5 w-10 h-2 rounded bg-white opacity-80`} />
                </View>
            )}

                <Image source={require('../../../assets/images/experiment-one.png')} style={tw.style('absolute w-[200px] h-[180px] right-[-12px] top-[-12px] opacity-50', { tintColor: tint })} resizeMode="contain" />
        </View>
        </TouchableOpacity>
    );
}


