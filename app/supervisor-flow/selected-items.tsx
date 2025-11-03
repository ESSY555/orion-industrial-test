import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import calender from '../../assets/images/calender.png';

export default function SelectedItemsScreen() {
    const [selectedTab, setSelectedTab] = useState<'yesterday' | 'today' | 'tomorrow'>('yesterday');
    const [room, setRoom] = useState('Upper Room');
    const [selectedFirst, setSelectedFirst] = useState(true);

    return (
        <>
            <StatusBar style="dark" backgroundColor="#FFFFFF" />
            <ScrollView style={[tw`h-full`, { backgroundColor: '#F7F7F7' }]} showsVerticalScrollIndicator={false}>

                <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
                    <TouchableOpacity style={[tw`w-9 h-9 rounded-full bg-white items-center justify-center`, shadow()]}>
                        <Ionicons name="chevron-back" size={20} color="#3A3A3A" />
                    </TouchableOpacity>

                    <Text style={[tw`text-black font-bold`, { fontSize: 18 }]}>1 Selected</Text>

                    <View style={[tw`flex-row items-center`]}>
                        <CircleIcon name="pencil" />
                        <CircleIcon name="trash" style={{ marginLeft: 10 }} />
                        <CircleIcon name="ellipsis-vertical" style={{ marginLeft: 10 }} />
                    </View>
                </View>


                <View style={[tw`px-4`]}>
                    <View style={[tw`flex-row bg-white rounded-2xl p-2`, shadow()]}> 
                        {(['yesterday', 'today', 'tomorrow'] as const).map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                accessibilityRole="button"
                                onPress={() => setSelectedTab(tab)}
                                style={[tw`flex-1 py-2 rounded-2xl items-center`, { backgroundColor: selectedTab === tab ? '#7F56D9' : 'transparent' }]}
                            >
                                <Text style={[selectedTab === tab ? tw`text-white` : tw`text-gray-700`, { fontSize: 12, textTransform: 'capitalize' }]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity style={[tw`w-9 h-9 rounded-xl items-center justify-center ml-3 bg-white`]}>
                            <Image source={calender} style={[tw`w-8 h-8`]} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[tw`px-4 mt-4 flex-row items-center justify-between`]}>
                    <TouchableOpacity style={[pill()]}> 
                        <Text style={[tw`text-gray-700`, { fontWeight: '600' }]}>All</Text>
                        <Ionicons name="chevron-down" size={14} color="#6B7280" style={{ marginLeft: 6 }} />
                    </TouchableOpacity>

                    <View style={[tw`flex-row items-center`]}>
                        <TouchableOpacity style={[pill(), tw`mr-3`]}>
                            <Text style={[tw`text-gray-700`]}>{room}</Text>
                            <Ionicons name="chevron-down" size={14} color="#6B7280" style={{ marginLeft: 6 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[pill()]}> 
                            <Ionicons name="options-outline" size={16} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={[tw`px-4 mt-4`]}>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setSelectedFirst(!selectedFirst)}
                        style={[tw`flex-row items-center rounded-2xl px-3 py-3 mb-3`, selectedFirst ? selectedCard() : unselectedCard()]}
                    >
                        <View style={[tw`w-9 h-9 rounded-full items-center justify-center`, { backgroundColor: selectedFirst ? '#7F56D9' : '#F3F1F4' }]}> 
                            {selectedFirst ? (
                                <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                            ) : (
                                <Text style={tw`text-black`}>1</Text>
                            )}
                        </View>
                        <View style={[tw`pl-3 flex-1`]}>
                            <Text style={[tw`text-black`, { fontWeight: '600' }]}>Upper Room</Text>
                            <Text style={[tw`text-gray-600 text-[11.5px]`]}>Shelf AK--1560</Text>
                        </View>
                        <Text style={[{ color: '#E74C3C', fontWeight: '600' }, tw`text-[12px]`]}>Not Cleaned</Text>
                    </TouchableOpacity>

                    <View style={[tw`flex-row items-center bg-white rounded-2xl px-3 py-3`, shadowLight(), { marginBottom: 28 }]}> 
                        <View style={[tw`w-9 h-9 rounded-full items-center justify-center`, { backgroundColor: '#F3F1F4' }]}>
                            <Text style={tw`text-black`}>3</Text>
                        </View>
                        <View style={[tw`pl-3 flex-1`]}>
                            <Text style={[tw`text-black`, { fontWeight: '600' }]}>Upper Room</Text>
                            <Text style={[tw`text-gray-600 text-[11.5px]`]}>Bench CK--1456</Text>
                        </View>
                        <Text style={[{ color: '#2ECC71', fontWeight: '600' }, tw`text-[12px]`]}>Cleaned</Text>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const CircleIcon = ({ name, style, onPress }: { name: any; style?: any; onPress?: () => void }) => (
    <TouchableOpacity accessibilityRole="button" onPress={onPress} style={[tw`w-9 h-9 rounded-full bg-white items-center justify-center`, shadow(), style]}>
        <Ionicons name={name} size={18} color="#3A3A3A" />
    </TouchableOpacity>
);

function shadow() {
    return { shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 };
}

function shadowLight() {
    return { shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10, elevation: 1.5 } as const;
}

function pill() {
    return [tw`flex-row items-center bg-white rounded-2xl px-3 py-2`, shadow()] as const;
}

function selectedCard() {
    return [{ backgroundColor: 'rgba(127, 86, 217, 0.1)' }, tw``, { borderRadius: 16 }] as const;
}

function unselectedCard() {
    return [tw`bg-white`, shadowLight()] as const;
}


