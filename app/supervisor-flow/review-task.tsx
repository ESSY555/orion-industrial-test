import React, { useLayoutEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/routes/homeStack';
import { BlurView } from 'expo-blur';
import tw from 'twrnc';
import Signature from 'react-native-signature-canvas';
import SummaryCard from '@/components/SummaryCard';
import smileyAfricanWomanWithGoldenEarrings from '../../assets/images/smiley-african-woman-with-golden-earrings.png';

type Person = {
    name: string;
    avatar: any;
    status: string;
    start: string;
    end: string;
    assets: string[];
    frequency: string;
    duration: string | number;
};

export default function ReviewTaskScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'SupervisorSelectedItems'>>();
    const params: { name?: string } = (route.params as { name?: string } | undefined) ?? {};
    useLayoutEffect(() => {
        navigation.setOptions?.({ headerShown: false, title: '' });
    }, [navigation]);

    const person = useMemo<Person>(() => ({
        name: params.name || 'Bayo Sydney',
        avatar: smileyAfricanWomanWithGoldenEarrings,
        status: 'Cleaned',
        start: '12:00 PM',
        end: '16:30 PM',
        assets: ['Shelf', 'Cabinet'],
        frequency: 'Daily',
        duration: '1',
    }), [params]);

    const [activeSignatureTab, setActiveSignatureTab] = useState<'draw' | 'type'>('draw');
    const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
    const [selectedAction, setSelectedAction] = useState<'approve' | 'revise' | 'escalate'>('approve');
    const [penColor, setPenColor] = useState<string>('#7F56D9');
    const signatureColors = ['#7F56D9', '#261A3B', '#ED64A6'] as const;
    const [comment, setComment] = useState<string>('');
    const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState<boolean>(false);
    const areaOptions = useMemo(() => ['Time Tracking', 'Shelf Asset'] as const, []);
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

    function toggleAreaSelection(option: string) {
        setSelectedAreas((prev) => prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]);
    }

    function removeArea(option: string) {
        setSelectedAreas((prev) => prev.filter((o) => o !== option));
    }

    function handleSubmit() {

        const payload = {
            action: selectedAction,
            signature: signatureDataUrl,
        };
        console.log('Submit Review payload:', payload);
    }

    return (
        <>
            <StatusBar style="dark" backgroundColor="#FFFFFF" />
            <ScrollView style={[tw`h-full pb-28`, { backgroundColor: '#F7F7F7' }]} showsVerticalScrollIndicator={false}>

                <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
                    <TouchableOpacity style={[tw`w-9 h-9 rounded-full bg-white items-center justify-center`, shadow()]} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={20} color="#3A3A3A" />
                    </TouchableOpacity>
                    <Text style={[tw`text-black font-bold`, { fontSize: 18 }]}>Review Task</Text>
                    <View style={tw`flex-row items-center`}>
                        <TouchableOpacity style={[tw`w-9 h-9 rounded-full bg-white items-center justify-center mr-2`, shadow()]}> 
                            <Ionicons name="sparkles" size={16} color="#7F56D9" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[tw`w-9 h-9 rounded-full bg-white items-center justify-center`, shadow()]}> 
                            <Ionicons name="ellipsis-vertical" size={16} color="#3A3A3A" />
                        </TouchableOpacity>
                    </View>
                </View>




                <SummaryCard person={person} />


                <View style={[tw`px-2 mt-4`]}>
                    <View style={[tw`bg-white rounded-2xl p-3 flex-row`, { flexWrap: 'nowrap' }, shadow()]}>
                        {[
                            { key: 'approve', label: 'Approve' },
                            { key: 'revise', label: 'Revision' },
                            { key: 'escalate', label: 'Escalate' },
                        ].map(({ key, label }) => (
                            <TouchableOpacity
                                key={key}
                                onPress={() => setSelectedAction(key as any)}
                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                style={[
                                    tw`px-3 py-[2px] rounded-2xl items-center justify-center`,
                                    { backgroundColor: selectedAction === key ? '#7F56D9' : 'transparent', marginHorizontal: 4, flex: 1, alignSelf: 'stretch', minHeight: 44, minWidth: 0 },
                                ]}
                            >
                                <Text style={{ color: selectedAction === key ? '#FFFFFF' : '#6B7280', fontWeight: '700', textAlign: 'center', flexWrap: 'wrap', lineHeight: 18 }}>
                                    {label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>


                {selectedAction !== 'revise' && (
                    <View style={[tw`px-4 mt-4`]}>
                        <View style={[tw`rounded-2xl p-4`]}>



                            <Text style={[tw`text-gray-500 mb-2`, { fontSize: 12 }]}>Add Comment</Text>
                            <View style={[tw`rounded-2xl p-0 border-2 border-[#2D1B3D33]`, { backgroundColor: '#FFFFFF' }, shadowLight()]}>
                                <TextInput
                                    value={comment}
                                    onChangeText={setComment}
                                    placeholder="Add comment..."
                                    placeholderTextColor="#9CA3AF"
                                    multiline
                                    numberOfLines={4}
                                    style={[tw`text-gray-800 p-8`, { fontSize: 12, minHeight: 80, textAlignVertical: 'top' }]}
                                />
                            </View>
                        </View>
                    </View>
                )}

                {selectedAction === 'revise' && (
                    <View style={[tw`px-4 mt-4`]}>
                        <View style={[tw`rounded-2xl p-4`, { backgroundColor: '#FFFFFF' }, shadow()]}> 
                            <TouchableOpacity onPress={() => setIsAreaDropdownOpen((v) => !v)} activeOpacity={0.8} style={[tw`rounded-xl flex-row items-center justify-center mb-3`, { backgroundColor: '#EEEEEEEE', paddingVertical: 10 }]}>
                                <Text style={{ color: '#7F56D9', fontWeight: '700' }}>Select Specific Area</Text>
                                <Ionicons name={isAreaDropdownOpen ? 'chevron-up' : 'chevron-down'} size={16} color="#7F56D9" style={{ marginLeft: 8 }} />
                            </TouchableOpacity>
                            {isAreaDropdownOpen && (
                                <View style={[tw`rounded-2xl mb-3`, { borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFFFFF' }]}>
                                    {areaOptions.map((opt, idx) => (
                                        <TouchableOpacity key={opt} onPress={() => toggleAreaSelection(opt)} activeOpacity={0.8} style={[tw`flex-row items-center justify-between px-4 py-3`, idx < areaOptions.length - 1 ? { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' } : null] as any}>
                                            <Text style={[tw`text-gray-800`, { fontSize: 13 }]}>{opt}</Text>
                                            {selectedAreas.includes(opt) ? (
                                                <Ionicons name="checkmark-circle" size={18} color="#7F56D9" />
                                            ) : (
                                                <Ionicons name="ellipse-outline" size={18} color="#9CA3AF" />
                                            )}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                            <View style={[tw`rounded-2xl p-3 mb-4`, { borderWidth: 2, borderColor: '#E5E7EB' }]}>
                                <View style={tw`flex-row items-center flex-wrap`}>
                                    {selectedAreas.map((chip) => (
                                        <TouchableOpacity key={chip} onPress={() => removeArea(chip)} activeOpacity={0.7} style={[tw`flex-row items-center rounded-xl mr-3 mb-2 px-3 py-2`, { backgroundColor: '#F3F4F6' }]}>
                                            <Text style={[tw`text-gray-700 mr-2`, { fontSize: 12 }]}>{chip}</Text>
                                            <Ionicons name="close" size={12} color="#9CA3AF" />
                                        </TouchableOpacity>
                                    ))}
                                    {selectedAreas.length === 0 && (
                                        <Text style={[tw`text-gray-400 p-5`, { fontSize: 12 }]}>No area selected</Text>
                                    )}
                                </View>
                            </View>

                            <Text style={[tw`text-gray-500 mb-2`, { fontSize: 12 }]}>Add Comment</Text>
                            <View style={[tw`rounded-2xl p-0 border-2 border-gray-200 mb-4`, { backgroundColor: '#FFFFFF' }, shadowLight()]}>
                                <TextInput
                                    value={comment}
                                    onChangeText={setComment}
                                    placeholder="Add comment..."
                                    placeholderTextColor="#9CA3AF"
                                    multiline
                                    numberOfLines={4}
                                    style={[tw`text-gray-800 p-4`, { fontSize: 12, minHeight: 90, textAlignVertical: 'top' }]}
                                />
                            </View>

                            <Text style={[tw`text-gray-500 mb-2`, { fontSize: 12 }]}>Set Deadline</Text>
                            <View style={tw`flex-row items-center justify-between`}>
                                <View style={tw`items-center`}>
                                    <Text style={[tw`text-gray-700 mb-1`, { fontSize: 12 }]}>Thu, 18 Sept</Text>
                                    <Text style={[tw`text-gray-900`, { fontWeight: '800' }]}>08:00</Text>
                                </View>
                                <View style={[tw`items-center justify-center`, { width: 36, height: 36, borderRadius: 18, }]}>
                                    <Ionicons name="arrow-forward" size={16} color="#6B7280" />
                                </View>
                                <View style={tw`items-center`}>
                                    <Text style={[tw`text-gray-700 mb-1`, { fontSize: 12 }]}>Thu, 18 Sept</Text>
                                    <Text style={[tw`text-gray-900`, { fontWeight: '800' }]}>11:00</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}


                <View style={[tw`px-4 mt-6 mb-28 flex-row items-center justify-between`]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[tw`rounded-2xl px-4 py-[2px] border-2 border-[#8B5CF6]`, { backgroundColor: '#FFFFFF' }, shadow()]}>
                        <Text style={[tw`text-[#8B5CF6] p-2`, { fontWeight: '700' }]}>Previous Step</Text>
                    </TouchableOpacity>
                    <TouchableOpacity accessibilityRole="button" activeOpacity={0.9} onPress={handleSubmit} style={[tw`rounded-2xl px-2 py-[2px] items-center justify-center flex-row`, { backgroundColor: '#7F56D9' }, shadow()]}>
                        <Text style={[tw`text-white mr-2 p-2`, { fontWeight: '800' }]}>Submit Review</Text>
                        <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}

type RowProps = { label: string; value: React.ReactNode };

function mutedLabel() {
    return { color: '#6B7280', fontSize: 12 } as const;
}

const Row: React.FC<RowProps> = ({ label, value }) => (
    <View style={tw`flex-row items-center justify-between mb-2`}>
        <Text style={mutedLabel()}>{label}</Text>
        {typeof value === 'string' || typeof value === 'number' ? (
            <Text style={{ color: '#111827', fontSize: 12 }}>{String(value)}</Text>
        ) : (
            value
        )}
    </View>
);

function shadow() {
    return { shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 } as const;
}

function shadowLight() {
    return { shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10, elevation: 1.5 } as const;
}


