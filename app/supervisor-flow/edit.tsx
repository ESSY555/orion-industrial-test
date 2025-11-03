import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import calendar2 from '../../assets/images/calendar-2.png';

type RouteParams = {
    title?: string;
    sub?: string;
    id?: number;
    status?: string;
};

export default function SupervisorEditScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    useLayoutEffect(() => {

        navigation.setOptions?.({ headerShown: false, title: '' });
    }, [navigation]);
    const params: RouteParams = (route.params || {}) as RouteParams;

    const displayTitle = params.title || 'Fresh Room';

    return (
        <>
            <StatusBar style="dark" backgroundColor="#FFFFFF" />
            <ScrollView style={[tw`h-full pb-26`, { backgroundColor: '#F7F7F7' }]} showsVerticalScrollIndicator={false}>

                <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
                    <CircleButton onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={20} color="#3A3A3A" />
                    </CircleButton>
                    <Text style={[tw`text-black font-bold`, { fontSize: 18 }]}>{displayTitle}</Text>
                    <CircleButton>
                        <Ionicons name="refresh" size={18} color="#3A3A3A" />
                    </CircleButton>
                </View>


                <View style={[tw`items-center mt-2`]}>
                    <View style={[tw`w-28 h-28 rounded-full shadow-xl items-center justify-center`, { backgroundColor: '#EFEFEF', overflow: 'hidden' }]}>
                        <Text style={[tw`text-black text-2xl font-bold`, { fontWeight: '800' }]}>AI</Text>
                    </View>
                    <TouchableOpacity accessibilityRole="button" style={[tw`mt-4 rounded-2xl px-4 py-2`, { backgroundColor: '#7F56D9' }]}>
                        <View style={tw`flex-row items-center`}>
                            <Text style={tw`text-white mr-2`}>Edit Work Order</Text>
                            <Ionicons name="pencil" size={16} color="#FFFFFF" />
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={[tw`px-4 mt-6 pb-6`]}>
                    <View style={[tw`rounded-2xl p-3`, { backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 }]}> 
                        {[
                            { label: 'ID Number', value: 'AK--1560' },
                            { label: 'Asset Type', value: 'Other' },
                            { label: 'Start Date', value: '12/01/2025', icon: 'calendar-clear' },
                            { label: 'End Date', value: '12/02/2025', icon: 'calendar-clear' },
                            { label: 'Supervisor', value: 'clairesupervisor' },
                            { label: 'Assigned to', value: 'Team Name' },
                            { label: 'Frequency', value: 'Every Day' },
                            { label: 'Duration', value: '2' },
                        ].map((row, idx) => (
                            <View key={idx} style={[tw`mb-3`, idx === 7 ? tw`` : null]}> 
                                <View style={[tw`flex-row items-center justify-between rounded-xl px-4 py-3`, { backgroundColor: '#F5F5F5' }]}> 
                                    <Text style={[tw`text-gray-600`]}>{row.label}</Text>
                                    <View style={tw`flex-row items-center`}>
                                        <Text style={[tw`text-gray-800`, { marginRight: row.icon ? 8 : 0 }]}>{row.value}</Text>
                                        {!!row.icon && (
                                            <Image source={calendar2} style={[tw`w-8 h-8`]} />
                                        )}
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const CircleButton = ({ children, onPress }: { children: React.ReactNode; onPress?: () => void }) => (
    <TouchableOpacity accessibilityRole="button" onPress={onPress} style={[tw`w-9 h-9 rounded-full bg-white items-center justify-center`, { shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 }]}>
        {children}
    </TouchableOpacity>
);


