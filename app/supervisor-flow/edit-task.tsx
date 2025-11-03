import React, { useLayoutEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/routes/homeStack';
import tw from 'twrnc';
import SummaryCard from '@/components/SummaryCard';
import scientistsLookOrangeChemicalsGlassLaboratory from '../../assets/images/scientists-look-orange-chemicals-glass-laboratory 1.png';
import newChemical from '../../assets/images/new-chemical.png';
import manSmile from '../../assets/images/man-smile.png';

export default function EditTaskDetailScreen() {
    const [activeTab, setActiveTab] = useState<'time' | 'evidence'>('time');
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SupervisorEditTask'>>();
    const route = useRoute<RouteProp<RootStackParamList, 'SupervisorEditTask'>>();
    const params = route.params ?? {};

    useLayoutEffect(() => {
        navigation.setOptions?.({ headerShown: false, title: '' });
    }, [navigation]);

    const person = useMemo(() => ({
        name: params.name || 'Bayo Sydney',
        avatar: manSmile,
        status: 'Cleaned',
        assets: ['Shelf', 'Cabinet'],
        frequency: 'Daily',
        duration: '1',
        start: '12:00 PM',
        end: '16:30 PM',
    }), [params]);

    return (
        <>
            <StatusBar style="dark" backgroundColor="#FFFFFF" />
            <ScrollView style={tw`h-full bg-[#F7F7F7]`} showsVerticalScrollIndicator={false}>

                <View style={tw`px-4 pt-14 pb-3 flex-row items-center justify-between`}>
                    <TouchableOpacity style={tw`w-9 h-9 rounded-full bg-white items-center justify-center border border-[#E5E7EB]`} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={20} color="#3A3A3A" />
                    </TouchableOpacity>
                    <Text style={tw`text-black font-bold text-[18px]`}>Review Work Order</Text>
                    <View style={tw`flex-row items-center`}>
                        <TouchableOpacity style={tw`w-9 h-9 rounded-full bg-white items-center justify-center mr-2 border border-[#E5E7EB]`}> 
                            <Ionicons name="sparkles" size={16} color="#7F56D9" />
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`w-9 h-9 rounded-full bg-white items-center justify-center border border-[#E5E7EB]`}> 
                            <Ionicons name="ellipsis-vertical" size={16} color="#3A3A3A" />
                        </TouchableOpacity>
                    </View>
                </View>

             <SummaryCard person={person} />

                <View style={tw`px-4 mt-5 flex-row items-center justify-center`}>
                    <View style={tw`bg-white rounded-2xl flex-row border border-[#E5E7EB]`}>
                        <TouchableOpacity onPress={() => setActiveTab('time')} style={tw.style('px-4 py-3 rounded-2xl m-1.5', activeTab === 'time' ? 'bg-[#7F56D9]' : '')}>
                            <Text style={tw.style('font-bold', activeTab === 'time' ? 'text-white' : 'text-[#6B7280]')}>Time Tracking</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setActiveTab('evidence')} style={tw.style('px-4 py-3 rounded-2xl m-1.5', activeTab === 'evidence' ? 'bg-[#7F56D9]' : '')}>
                            <Text style={tw.style('font-bold', activeTab === 'evidence' ? 'text-white' : 'text-[#6B7280]')}>Evidence</Text>
                        </TouchableOpacity>
                    </View>
                </View>





                {activeTab === 'time' && (
                    <View style={tw`px-4 mt-4`}>
                        <View style={tw`rounded-2xl p-4 bg-white border border-[#E5E7EB]`}>
                            <Text style={tw`text-[#261A3B] font-extrabold text-[18px] mb-3`}>Time Tracking</Text>
                            {[
                                ['Release to Sanitation', '10:00 AM'],
                                ['Ready for QA', '15:30 PM'],
                                ['QA Start Pre-op', '15:40 PM'],
                                ['QA Finish Pre-op', '16:15 PM'],
                                ['Released to Production', '16:30 PM'],
                            ].map((row, i) => (
                                <View key={i} style={tw`flex-row items-center justify-between py-3`}>
                                    <Text style={tw`text-[#6B7280] text-[14px]`}>{row[0]}</Text>
                                    <View style={tw`flex-row items-center`}>
                                        <Text style={tw`text-[#111827] text-[14px] mr-2.5`}>{row[1]}</Text>
                                        <View style={tw`w-7 h-7 rounded-full bg-[#F3F4F6] items-center justify-center`}> 
                                            <Ionicons name="arrow-up" size={14} color="#7F56D9" style={{ transform: [{ rotate: '45deg' }] }} />
                                        </View>
                                    </View>
                                </View>
                            ))}
                            <View style={tw.style('', { height: 1, borderBottomWidth: 1, borderStyle: 'dashed', borderColor: '#E5E7EB', marginVertical: 10 })} />
                            <View style={tw`flex-row items-center justify-between mt-1`}>
                                <Text style={tw`text-[#6B7280]`}>Total Duration</Text>
                                <Text style={tw`text-[#22C55E] font-extrabold text-[14px]`}>4 hrs 27 mins</Text>
                            </View>
                        </View>
                    </View>
                )}


                {activeTab === 'evidence' && (
                    <View style={tw`px-4 mt-4`}>
                        <View style={tw`rounded-2xl p-3 bg-white border border-[#E5E7EB]`}>
                            <View style={tw`flex-row items-center justify-between mb-2`}>
                                <Text style={[tw`text-black`, { fontWeight: '800' }]}>Evidence</Text>
                                <View style={tw`flex-row items-center`}>
                                    <Text style={tw`text-gray-600 mr-1`}>All Assets</Text>
                                    <Ionicons name="chevron-down" size={14} color="#6B7280" />
                                </View>
                            </View>


                            <Text style={tw`text-gray-500 mb-2 text-[12px]`}>Documentation</Text>
                            <View style={tw`rounded-2xl p-3 mb-3 border-2 border-gray-200 bg-white`}>
                                <Text style={tw`text-gray-700 border-gray-200 pb-2 text-[12px]`}>
                                    Foamed and Scrubbed Affected Area with SK-250. Applied Sterile Solution. SFT treatment completed on all drains.
                                </Text>
                            </View>


                            <Text style={tw`text-gray-500 mb-2 text-[12px]`}>Photo Evidence</Text>
                            <View style={tw`flex-row`}>
                                <View style={tw`flex-1 rounded-2xl overflow-hidden mr-2 border border-gray-200`}> 
                                    <Image source={scientistsLookOrangeChemicalsGlassLaboratory} style={[tw`w-full h-26`]} />
                                </View>
                                <View style={tw`flex-1 rounded-2xl overflow-hidden border border-gray-200`}> 
                                    <Image source={newChemical} style={[tw`w-full h-26`]} />
                                </View>
                            </View>
                        </View>
                    </View>
                )}


                <View style={tw`px-4 mt-6 mb-28`}>
                    <TouchableOpacity accessibilityRole="button" activeOpacity={0.9} onPress={() => navigation.navigate('SupervisorSelectedItems')} style={tw`rounded-2xl px-4 py-4 items-center justify-center flex-row bg-[#7F56D9]`}> 
                        <Text style={tw`text-white mr-2 font-extrabold`}>Next Step</Text>
                        <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <View style={tw`flex-row items-center justify-between mt-1`}>
            <Text style={Object.assign({}, mutedLabel())}>{label}</Text>
            <Text style={[tw`text-gray-800`, { fontSize: 12 }]}>{value}</Text>
        </View>
    );
}

function mutedLabel() {
    return Object.assign({}, tw`text-gray-500`, { fontSize: 12 });
}

function shadow() {
    return { shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 } as const;
}

function shadowLight() {
    return { shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10, elevation: 1.5 } as const;
}


