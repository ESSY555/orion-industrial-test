import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { ConfirmDialog, Toast } from '@/components/confirm-alert';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/routes/homeStack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Image } from 'react-native';
import MenuBar from '@/components/MenuBar';
import calender from '../assets/images/calender.png';
import arrowRight from '../assets/images/arrow-right.png';
import floating from '../assets/images/floating.png';


export default function WorkOrders() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'WorkOrders'>>();
    const [selectedTab, setSelectedTab] = useState<'yesterday' | 'today' | 'tomorrow'>('yesterday');
    const [showAll, setShowAll] = useState(false);
    const [showNativePicker, setShowNativePicker] = useState(false);
    const [pickerDate, setPickerDate] = useState(new Date());
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState('');
    const [excludedIds, setExcludedIds] = useState<Set<number>>(() => new Set());
    const [showFilter, setShowFilter] = useState(false);
    const [statusFilter, setStatusFilter] = useState<'all' | 'cleaned' | 'not_cleaned'>('all');
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const [orders, setOrders] = useState([
        { id: 1, title: 'Fresh Kitchen Room', sub: 'Shelf AK--1560', status: 'Not Cleaned', color: '#E74C3C', when: 'yesterday' as const },
        { id: 2, title: 'Upper Room', sub: 'Shelf AK--1560', status: 'Not Cleaned', color: '#E74C3C', when: 'yesterday' as const },
        { id: 3, title: 'Upper Room', sub: 'Bench CK--1456', status: 'Cleaned', color: '#2ECC71', when: 'today' as const },
        { id: 4, title: 'Fresh Kitchen Room', sub: 'Shelf AK--1560', status: 'Cleaned', color: '#2ECC71', when: 'today' as const },
        { id: 5, title: 'Fresh Kitchen Room', sub: 'Shelf AK--1560', status: 'Cleaned', color: '#2ECC71', when: 'tomorrow' as const },
        { id: 6, title: 'Fresh Kitchen Room', sub: 'Shelf AK--1560', status: 'Not Cleaned', color: '#E74C3C', when: 'tomorrow' as const },
        { id: 7, title: 'Fresh Kitchen Room', sub: 'Shelf AK--1560', status: 'Not Cleaned', color: '#E74C3C', when: 'tomorrow' as const },
    ]);
    const isTyping = showSearch && (query ?? '').trim().length > 0;
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    function handleDelete() {
        if (selectedItems.size === 0) return;
        setShowConfirmDelete(true);
    }

    function confirmDeleteNow() {
        const toDeleteCount = selectedItems.size;
        setOrders(prev => prev.filter(item => !selectedItems.has(item.id)));
        setSelectedItems(new Set());
        setShowConfirmDelete(false);
        setShowSuccess(true);
        // Auto-hide success after short delay
        setTimeout(() => setShowSuccess(false), 1200);
    }

    function handleEdit() {
        if (selectedItems.size === 0) return;
        const ids = Array.from(selectedItems);
        const first = orders.find(o => o.id === ids[0]);
        navigation.navigate('SupervisorEdit', {
            id: first?.id,
            title: first?.title,
            sub: first?.sub,
            status: first?.status,
        });
    }
    useLayoutEffect(() => {
        navigation.setOptions?.({ headerShown: false, title: '' });
    }, [navigation]);
    return (
        <>
           <StatusBar style="dark" backgroundColor="#FFFFFF" />
            <ScrollView style={[tw`h-full`, { backgroundColor: '#F7F7F7' }]} showsVerticalScrollIndicator={false}>
                {/* Header */}
                {showSearch ? (
                    <View style={[tw`px-4 pt-14 pb-3`]}>
                        <View style={[tw`flex-row items-center bg-white rounded-2xl px-3 py-2`, { shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 }]}>
                            <TouchableOpacity style={[tw`w-9 h-9 rounded-full items-center justify-center`]} onPress={() => { setShowSearch(false); setQuery(''); setExcludedIds(new Set()); }}>
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
                        <TouchableOpacity style={[tw`w-9 h-9 rounded-full bg-white items-center justify-center`]} onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={20} color="#3A3A3A" />
                        </TouchableOpacity>
                        <Text style={[tw`text-black font-bold`, { fontSize: 18 }]}>
                            {selectedItems.size > 0 ? `${selectedItems.size} Selected` : 'Work Orders'}
                        </Text>
                        {selectedItems.size > 0 ? (
                            <View style={[tw`flex-row items-center`]}>
                                <TouchableOpacity onPress={handleEdit} style={[tw`w-9 h-9 rounded-full bg-white items-center justify-center mr-2`, { shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 }]}>
                                    <Ionicons name="pencil" size={18} color="#3A3A3A" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleDelete} style={[tw`w-9 h-9 rounded-full bg-white items-center justify-center mr-2`, { shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 }]}>
                                    <Ionicons name="trash" size={18} color="#3A3A3A" />
                                </TouchableOpacity>
                                <TouchableOpacity style={[tw`w-9 h-9 rounded-full bg-white items-center justify-center`, { shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 }]}>
                                    <Ionicons name="ellipsis-vertical" size={18} color="#3A3A3A" />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity style={[tw`w-9 h-9 rounded-full bg-white items-center justify-center`]} onPress={() => { setShowSearch(true); setExcludedIds(new Set()); }}>
                                <Ionicons name="search" size={18} color="#3A3A3A" />
                            </TouchableOpacity>
                        )}
                    </View>
                )}

            
                {!showSearch && (
                    <View style={[tw`px-4`]}>
                        <View style={[tw`flex-row bg-white rounded-2xl p-2`, { shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 }]}>
                            <TouchableOpacity
                                accessibilityRole="button"
                                onPress={() => setSelectedTab('yesterday')}
                                style={[tw`flex-1 py-2 rounded-2xl items-center`, { backgroundColor: selectedTab === 'yesterday' ? '#7F56D9' : 'transparent' }]}
                            >
                                <Text style={[selectedTab === 'yesterday' ? tw`text-white` : tw`text-gray-700`, { fontSize: 12 }]}>Yesterday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibilityRole="button"
                                onPress={() => setSelectedTab('today')}
                                style={[tw`flex-1 py-2 rounded-2xl items-center`, { backgroundColor: selectedTab === 'today' ? '#7F56D9' : 'transparent' }]}
                            >
                                <Text style={[selectedTab === 'today' ? tw`text-white` : tw`text-gray-700`, { fontSize: 12 }]}>Today</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibilityRole="button"
                                onPress={() => setSelectedTab('tomorrow')}
                                style={[tw`flex-1 py-2 rounded-2xl items-center`, { backgroundColor: selectedTab === 'tomorrow' ? '#7F56D9' : 'transparent' }]}
                            >
                                <Text style={[selectedTab === 'tomorrow' ? tw`text-white` : tw`text-gray-700`, { fontSize: 12 }]}>Tomorrow</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[tw`w-9 h-9 rounded-xl items-center justify-center ml-3`, { backgroundColor: '#FFFFFF' }]} onPress={() => setShowNativePicker(true)}>
                                <Image source={calender} style={[tw`w-8 h-8`]} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

           
                {!showSearch && (
                    <View style={[tw`px-4 mt-4 flex-row items-center justify-between`]}>
                   
                        <TouchableOpacity
                            accessibilityRole="button"
                            onPress={() => setShowAll(prev => !prev)}
                            style={[
                                tw`flex-row items-center bg-white rounded-2xl px-3 py-2`,
                                { shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 }
                            ]}
                        >
                            <Text style={[tw`text-gray-700`, { fontWeight: '600' }]}>All</Text>
                            <Ionicons name="chevron-down" size={14} color="#6B7280" style={{ marginLeft: 6 }} />
                        </TouchableOpacity>

                  
                        <TouchableOpacity
                            accessibilityRole="button"
                            onPress={() => setShowFilter(true)}
                            style={[
                                tw`flex-row items-center bg-white rounded-2xl px-3 py-2`,
                                { shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 }
                            ]}
                        >
                            <Text style={[tw`text-gray-700`, { marginRight: 6 }]}>Choose Filter</Text>
                            <Ionicons name="options-outline" size={16} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                )}

            
                <View style={[tw`px-4 mt-3 mb-6`]}> 
                    {orders
                        .filter(item => showAll ? true : item.when === selectedTab)
                        .filter(item => {
                            const q = (query ?? '').trim().toLowerCase();
                            return q.length ? item.title.toLowerCase().includes(q) : true;
                        })
                        .filter(item => {
                            if (statusFilter === 'all') return true;
                            if (statusFilter === 'cleaned') return item.status.toLowerCase() === 'cleaned';
                            return item.status.toLowerCase() === 'not cleaned';
                        })
                        .filter(item => !excludedIds.has(item.id))
                        .map(item => {
                            const isSelected = selectedItems.has(item.id);
                            return (
                            <TouchableOpacity 
                                key={item.id} 
                                activeOpacity={0.9}
                                onPress={() => {
                                    if (isSelected) {
                                  
                                        setSelectedItems(new Set());
                                        return;
                                    }
                               
                                    navigation.navigate('SupervisorEdit', {
                                        id: item.id,
                                        title: item.title,
                                        sub: item.sub,
                                        status: item.status,
                                    });
                                }}
                                onLongPress={() => {
                                  
                                    setSelectedItems(new Set([item.id]));
                                }}
                                delayLongPress={200}
                                style={[
                                    tw`flex-row items-center rounded-2xl px-3 py-8 mb-3`, 
                                    isSelected 
                                        ? { backgroundColor: 'rgba(127, 86, 217, 0.1)', borderRadius: 16 }
                                        : [tw`bg-white`, { borderWidth: 0.5, borderColor: '#EFEFEF' }]
                                ]}
                            >
                                <View style={[
                                    tw`w-9 h-9 rounded-full items-center justify-center`, 
                                    { backgroundColor: isSelected ? '#7F56D9' : '#F3F1F4' }
                                ]}>
                                    {isSelected ? (
                                        <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                                    ) : (
                                        <Text style={[tw`text-black`]}>{item.id}</Text>
                                    )}
                                </View>
                                <View style={[tw`pl-3 flex-1`]}>
                                    <Text style={[tw`text-black`, { fontWeight: '600' }]}>{item.title}</Text>
                                    <Text style={[tw`text-gray-600 text-[11.5px]`]}>{item.sub}</Text>
                                </View>
                                <Text style={[{ color: item.color, fontWeight: '600' }, tw`text-[12px]`]}>{item.status}</Text>
                                {showSearch && (
                                    isTyping ? (
                                        <TouchableOpacity
                                            accessibilityRole="button"
                                                onPress={() => { }}
                                            style={[tw`w-9 h-9 rounded-full items-center justify-center ml-2`]}
                                        >
                                                <Image source={arrowRight} style={[tw`w-8 h-8`]} />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            accessibilityRole="button"
                                            onPress={() => {
                                                const next = new Set(excludedIds);
                                                next.add(item.id);
                                                setExcludedIds(next); 
                                            }}
                                            style={[tw`w-9 h-9 rounded-full items-center justify-center ml-2`]}
                                        >
                                            <Ionicons name="close" size={16} color="#3A3A3A" />
                                        </TouchableOpacity>
                                    )
                                )}
                            </TouchableOpacity>
                            );
                        })}
                </View>







            </ScrollView>

            {/* Filter Modal */}
            <Modal
                transparent
                animationType="slide"
                visible={showFilter}
                onRequestClose={() => setShowFilter(false)}
            >
                <View style={[tw`flex-1 justify-end`, { backgroundColor: 'rgba(0,0,0,0.25)' }]}>
                    <View style={[tw`bg-white px-4 pt-4 pb-6 rounded-t-2xl`, { shadowColor: '#000', shadowOpacity: 0.15, shadowOffset: { width: 0, height: -2 }, shadowRadius: 8, elevation: 12 }]}>
                        <View style={[tw`items-center mb-4`]}>
                            <View style={[tw`w-12 h-1.5 rounded-full`, { backgroundColor: '#E5E7EB' }]} />
                        </View>
                        <Text style={[tw`text-black mb-3`, { fontWeight: '700', fontSize: 16 }]}>Filters</Text>
                        <View style={[tw`flex-row mb-3`]}>
                            <TouchableOpacity
                                accessibilityRole="button"
                                onPress={() => setStatusFilter('all')}
                                style={[tw`mr-2 px-3 py-2 rounded-2xl`, { backgroundColor: statusFilter === 'all' ? '#7F56D9' : '#F3F4F6' }]}
                            >
                                <Text style={statusFilter === 'all' ? tw`text-white` : tw`text-gray-700`}>All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibilityRole="button"
                                onPress={() => setStatusFilter('cleaned')}
                                style={[tw`mr-2 px-3 py-2 rounded-2xl`, { backgroundColor: statusFilter === 'cleaned' ? '#7F56D9' : '#F3F4F6' }]}
                            >
                                <Text style={statusFilter === 'cleaned' ? tw`text-white` : tw`text-gray-700`}>Cleaned</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessibilityRole="button"
                                onPress={() => setStatusFilter('not_cleaned')}
                                style={[tw`px-3 py-2 rounded-2xl`, { backgroundColor: statusFilter === 'not_cleaned' ? '#7F56D9' : '#F3F4F6' }]}
                            >
                                <Text style={statusFilter === 'not_cleaned' ? tw`text-white` : tw`text-gray-700`}>Not Cleaned</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[tw`flex-row justify-end`]}>
                            <TouchableOpacity accessibilityRole="button" onPress={() => setShowFilter(false)} style={[tw`px-4 py-2 rounded-2xl`, { backgroundColor: '#7F56D9' }]}>
                                <Text style={tw`text-white`}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <ConfirmDialog
                visible={showConfirmDelete}
                title={`Delete Work Order${selectedItems.size > 1 ? 's' : ''}`}
                message={`Are you sure you want to delete ${selectedItems.size} selected item${selectedItems.size > 1 ? 's' : ''}?`}
                onCancel={() => setShowConfirmDelete(false)}
                onConfirm={confirmDeleteNow}
                confirmText="Delete"
                cancelText="Cancel"
                iconName="trash"
            />

            <Toast visible={showSuccess} text="Deleted successfully" iconName="checkmark" />

            <TouchableOpacity activeOpacity={0.9} style={[tw`items-center justify-center`, { position: 'absolute', right: 18, bottom: 110, width: 56, elevation: 6 }]}> 
               
                <Image source={floating} style={[tw`w-20 h-20`]} />
            </TouchableOpacity>

            {/* Native Date Picker */}
            {showNativePicker && (
                <DateTimePicker
                    value={pickerDate}
                    mode="date"
                    display="calendar"
                    onChange={(event, date) => {
                        setShowNativePicker(false);
                        if (!date) return;
                        setPickerDate(date);
                        const today = new Date();
                        const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
                        const d0 = startOf(today).getTime();
                        const dSel = startOf(date).getTime();
                        const one = 24 * 60 * 60 * 1000;
                        if (dSel === d0) {
                            setSelectedTab('today');
                            setShowAll(false);
                        } else if (dSel === d0 - one) {
                            setSelectedTab('yesterday');
                            setShowAll(false);
                        } else if (dSel === d0 + one) {
                            setSelectedTab('tomorrow');
                            setShowAll(false);
                        } else {
                            setShowAll(true);
                        }
                    }}
                />
            )}
            <MenuBar />
        </>
    );
}


