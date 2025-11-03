import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/routes/homeStack';

type SidebarItemKey = 'chemical' | 'feedback' | 'evident' | 'tasks' | 'lms' | 'logout';

export type SidebarProps = {
    isOpen?: boolean;
    onToggle?: (open: boolean) => void;
    onSelect?: (key: SidebarItemKey) => void;
    initialActive?: SidebarItemKey;
};

const ACTIVE_COLOR = '#8B4CE8';
const ICON_MUTED = '#6B7280';

export default function Sidebar({ isOpen = false, onToggle, onSelect, initialActive = 'chemical' }: SidebarProps) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [open, setOpen] = useState<boolean>(isOpen);
    const slide = useRef(new Animated.Value(isOpen ? 1 : 0)).current; // 0: closed, 1: open
    const backdropOpacity = slide.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
    const sidebarX = slide.interpolate({ inputRange: [0, 1], outputRange: [-240, 0] });
    const [active, setActive] = useState<SidebarItemKey>(initialActive);

    const items = useMemo(
        () => [
            { key: 'chemical' as const, label: 'Chemical', icon: 'flask-outline' },
            { key: 'feedback' as const, label: 'Feedback', icon: 'chatbubbles-outline' },
            { key: 'evident' as const, label: 'Cleaner Evident', icon: 'camera-outline' },
            { key: 'tasks' as const, label: 'Tasks Overview', icon: 'list-outline' },
            { key: 'lms' as const, label: 'LMS', icon: 'school-outline' },
            { key: 'logout' as const, label: 'Logout', icon: 'log-out-outline' },
        ],
        []
    );

    useEffect(() => {
        setOpen(isOpen);
        Animated.timing(slide, {
            toValue: isOpen ? 1 : 0,
            duration: 260,
            easing: isOpen ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, [isOpen]);

    function handleToggle() {
        const next = !open;
        setOpen(next);
        onToggle?.(next);
        Animated.timing(slide, {
            toValue: next ? 1 : 0,
            duration: 260,
            easing: next ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }

    function handleSelect(key: SidebarItemKey) {
        setActive(prev => (prev === key ? prev : key));
        if (key === 'logout') {
            onToggle?.(false);
            setOpen(false);
            Animated.timing(slide, { toValue: 0, duration: 200, easing: Easing.in(Easing.cubic), useNativeDriver: true }).start(() => {
                navigation.goBack();
            });
            return;
        }
        if (key === 'lms') {
            onToggle?.(false);
            setOpen(false);
            Animated.timing(slide, { toValue: 0, duration: 200, easing: Easing.in(Easing.cubic), useNativeDriver: true }).start(() => {
                navigation.navigate('RequiredCourses');
            });
            return;
        }
        onSelect?.(key);
    }

    return (
        <View pointerEvents={open ? 'auto' : 'none'} style={[tw`absolute left-0 top-0 bottom-0 z-50`, open ? { width: '100%' } : { width: 0 }]}> 
            <Animated.View
                pointerEvents={open ? 'auto' : 'none'}
                style={[tw`absolute left-0 right-0 top-0 bottom-0`, { backgroundColor: 'rgba(0,0,0,0.12)', opacity: backdropOpacity }]}
            >
                <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => { setOpen(false); onToggle?.(false); }} />
            </Animated.View>
            <Animated.View style={[tw`absolute left-0 top-0 bottom-0 w-60 bg-[#F9FAFB] border-r border-[#E5E7EB] pt-5 px-3`, { transform: [{ translateX: sidebarX }] }]}>
                <TouchableOpacity accessibilityRole="button" onPress={handleToggle} style={tw`w-9 h-9 rounded-full bg-white items-center justify-center border border-[#E5E7EB] mt-5`}>
                    <Ionicons name={open ? 'close' : 'menu'} size={18} color="#111827" />
                </TouchableOpacity>

                <View style={[tw``]}> 
                    <View>
                        <Text style={[tw`text-black font-bold text-[18px] text-center py-3`]}>Cleaner Tabs</Text>
                   </View>
                    {items.map(item => {
                        const isActive = active === item.key;
                        const backgroundColor = isActive ? ACTIVE_COLOR : '#FFFFFF';
                        const color = isActive ? '#FFFFFF' : '#111827';
                        const iconColor = isActive ? '#FFFFFF' : ICON_MUTED;
                        return (
                            <TouchableOpacity
                                key={item.key}
                                accessibilityRole="button"
                                onPress={() => handleSelect(item.key)}
                                style={[tw`flex-row items-center py-3 px-3 rounded-xl mb-2.5 border`, { borderColor: '#ECECEC', backgroundColor }]}
                            >
                                <Ionicons name={item.icon as any} size={18} color={iconColor} />
                                <Text style={[tw`ml-2.5 font-extrabold`, { color }]}>{item.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </Animated.View>
        </View>
    );
}



