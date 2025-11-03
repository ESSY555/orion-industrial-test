import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/routes/homeStack';
import manSmile from '../../assets/images/man-smile.png';
import peoplePro3 from '../../assets/images/people-pro3.png';
import pro3Lady from '../../assets/images/pro3-lady.png';
import calendar2 from '../../assets/images/calendar-2.png';

import tw from 'twrnc';

export default function TaskScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    useLayoutEffect(() => {
        navigation.setOptions?.({ headerShown: false, title: '' });
    }, [navigation]);
    const [showSearch, setShowSearch] = React.useState(false);
    const [query, setQuery] = React.useState('');

    const people = [
        { id: 1, name: 'Bayo Sydney', tags: ['Shelf', 'Cabinet'], status: 'Cleaned', avatar: manSmile },
        { id: 2, name: 'Kachi Chisom', tags: ['Cabinet', 'Shelf'], status: 'Cleaned', avatar: peoplePro3 },
        { id: 3, name: 'Eyefian Bambi', tags: ['Cabinet'], status: 'Cleaned', avatar: pro3Lady },
    ];

    return (
        <>
            <StatusBar style="dark" backgroundColor="#FFFFFF" />
            <ScrollView style={[tw`h-full pb-26`, { backgroundColor: '#F7F7F7' }]} showsVerticalScrollIndicator={false}>

                {showSearch ? (
                    <View style={[tw`px-4 pt-14 pb-3`]}>
                        <View style={[tw`flex-row items-center bg-white rounded-2xl px-3 py-2`, { shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 }]}>
                            <TouchableOpacity style={[tw`w-9 h-9 rounded-full items-center justify-center`]} onPress={() => { setShowSearch(false); setQuery(''); }}>
                                <Ionicons name="chevron-back" size={20} color="#3A3A3A" />
                            </TouchableOpacity>
                            <TextInput
                                value={query}
                                onChangeText={setQuery}
                                placeholder="Search"
                                placeholderTextColor="#9CA3AF"
                                style={[tw`flex-1 px-2`, { color: '#111827', fontSize: 14 }]}
                                returnKeyType="search"
                            />
                            <TouchableOpacity style={[tw`w-9 h-9 rounded-full items-center justify-center`, { backgroundColor: '#7F56D9' }]}>
                                <Ionicons name="search" size={18} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
                        <TouchableOpacity style={[tw`w-9 h-9 rounded-full bg-white items-center justify-center`, shadow()]}
                                onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={20} color="#3A3A3A" />
                        </TouchableOpacity>
                        <Text style={[tw`text-black font-bold`, { fontSize: 18 }]}>Tasks</Text>
                        <TouchableOpacity style={[tw`w-9 h-9 rounded-full bg-white items-center justify-center`, shadow()]} onPress={() => { setShowSearch(true); }}> 
                            <Ionicons name="search" size={18} color="#3A3A3A" />
                        </TouchableOpacity>
                    </View>
                )}


                <View style={[tw`px-4`]}>
                    <View style={[tw`flex-row bg-white rounded-2xl py-4`, shadow()]}> 
                        <Pill label="All Work Orders" active={false} />
                        <Pill label="Rent Teams" active={false} rightIcon="chevron-down" />
                        <Pill label="Individual" active />
                    </View>
                </View>


                <View style={[tw`px-4 mt-4 flex-row items-center justify-between`]}>
                    <TouchableOpacity style={[pillBox()]}> 
                        <Text style={[tw`text-gray-700`, { fontWeight: '600' }]}>Ready for Review</Text>
                        <Ionicons name="chevron-down" size={14} color="#6B7280" style={{ marginLeft: 6 }} />
                    </TouchableOpacity>
                    <View style={[tw`flex-row items-center`]}>
                        <TouchableOpacity style={[pillBox(), tw`mr-3`]}>
                            <Text style={[tw`text-gray-700`]}>Today</Text>
                            <Ionicons name="chevron-down" size={14} color="#6B7280" style={{ marginLeft: 6 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[tw`w-9 h-9 rounded-xl items-center justify-center bg-white`, shadow()]}> 
                            <Image source={calendar2} style={[tw`w-8 h-8`]} />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={[tw`px-4 mt-4 mb-10`]}> 
                    {people
                        .filter(p => {
                            const q = (query ?? '').trim().toLowerCase();
                            return q.length ? p.name.toLowerCase().includes(q) : true;
                        })
                        .map((p) => (
                            <TouchableOpacity key={p.id} activeOpacity={0.9} onPress={() => navigation.navigate('SupervisorEditTask', { id: p.id, name: p.name })} style={[tw`bg-white rounded-2xl px-3 py-4 flex-row items-center justify-between mb-3`, shadowLight()]}> 
                            <View style={[tw`flex-row items-center flex-1`]}>
                                <View style={[tw`w-11 h-11 rounded-full overflow-hidden bg-gray-200 items-center justify-center`]}>
                                    <Image source={p.avatar} style={[tw`w-11 h-11`]} />
                                </View>
                                <View style={tw`pl-3`}>
                                    <Text style={[tw`text-black`, { fontWeight: '700' }]}>{p.name}</Text>
                                    <View style={tw`flex-row items-center mt-1`}>
                                        {p.tags.map((t, i) => (
                                            <View key={i} style={tw`flex-row items-center mr-3`}>
                                                <Ionicons name="chatbox-ellipses-outline" size={12} color="#9CA3AF" />
                                                <Text style={[tw`text-gray-500 ml-1`, { fontSize: 11 }]}>{t}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                            <Text style={[tw``, { color: '#2ECC71', fontWeight: '700', fontSize: 13 }]}>{p.status}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </>
    );
}

function Pill({ label, active, rightIcon }: { label: string; active?: boolean; rightIcon?: any }) {
    return (
        <TouchableOpacity style={[tw`flex-1 py-2 rounded-2xl items-center mx-1`, { backgroundColor: active ? '#7F56D9' : 'transparent' }]}> 
            <View style={tw`flex-row items-center`}>
                <Text style={[active ? tw`text-white` : tw`text-gray-700`, { fontSize: 12 }]}>{label}</Text>
                {!!rightIcon && <Ionicons name={rightIcon} size={12} color={active ? '#FFFFFF' : '#6B7280'} style={{ marginLeft: 6 }} />}
            </View>
        </TouchableOpacity>
    );
}

function pillBox() {
    return [tw`flex-row items-center bg-white rounded-2xl px-3 py-2`, shadow()] as const;
}

function shadow() {
    return { shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 } as const;
}

function shadowLight() {
    return { shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10, elevation: 1.5 } as const;
}


