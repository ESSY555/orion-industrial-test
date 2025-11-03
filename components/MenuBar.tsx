import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Keyboard, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/routes/homeStack';
import scanner from '../assets/images/scanner.png';
import note from '../assets/images/note.png';

export default function MenuBar() {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    let isHome = true;
    let isScan = false;
    let isWorkOrders = false;
    if (!isHome && !isScan && !isWorkOrders) {
        isHome = true;
    }

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardVisible(false));
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    if (isKeyboardVisible) return null;

    return (
        <View style={[tw`items-center`, { position: 'absolute', left: 0, right: 0, bottom: 18, zIndex: 1000 }]}> 
            <View style={[tw`flex-row items-center justify-between px-6 py-4 rounded-2xl`, { width: '92%', backgroundColor: '#2B2140', shadowColor: '#000', shadowOpacity: 0.18, shadowOffset: { width: 0, height: 6 }, shadowRadius: 16, elevation: 8 }]}>
                <Button icon="home" label="Home" active={!!isHome} onPress={() => navigation.navigate('CleanerDashboard')} />
                <Button style={[tw`text-white`]} imageSrc={scanner} label="Scan" active={!!isScan} onPress={() => { }} />
                <Button style={[tw`text-white`]} imageSrc={note} label="Work order" active={!!isWorkOrders} onPress={() => navigation.navigate('TrainingLevels')} />
            
            </View>
        </View>
    );
}

function Button({ icon, imageSrc, label, onPress, active, style }: { icon?: any; imageSrc?: any; label: string; onPress: () => void; active?: boolean; style?: any }) {
    return (
        <TouchableOpacity accessibilityRole="button" onPress={onPress} style={[tw`items-center`, style]}>
            <View style={[tw`w-10 h-10 rounded-full items-center justify-center`, { backgroundColor: 'transparent' }]}>
                {imageSrc ? (
                    <Image source={imageSrc} style={{ width: 22, height: 22, tintColor: active ? '#8B5CF6' : '#FFFFFF', resizeMode: 'contain' }} />
                ) : (
                    <Ionicons name={icon as any} size={22} color={active ? '#8B5CF6' : '#FFFFFF'} />
                )}
            </View>
            <Text style={[{ marginTop: 4, fontSize: 12, color: active ? '#8B5CF6' : '#FFFFFF', fontWeight: active ? '800' : '500' }]}>{label}</Text>
        </TouchableOpacity>
    );
}


