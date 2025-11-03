import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/routes/homeStack';
import { Ionicons } from '@expo/vector-icons';


export default function LoginScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Dashboard'>>();
    const [baseUrl, setBaseUrl] = useState('https://api.example.com');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const canSubmit = (baseUrl ?? '').trim().length > 0 && (username ?? '').trim().length > 0 && password.length > 0;

    const onLogin = () => {
        navigation.navigate('CleanerDashboard', { username });
    };

    return (
        <>
            <StatusBar style="dark" backgroundColor="#FFFFFF" />
            <ScrollView style={tw`h-full bg-[#F7F7F7]`} contentContainerStyle={tw`flex-1 justify-center`}>
                <View style={tw`px-4 pt-14 pb-6`}>
                    <View style={[tw`items-center mb-6`]}>
                        <Text style={[tw`text-black font-bold mt-3 text-[20px]`]}>Welcome Back</Text>
                        <Text style={[tw`text-gray-600 mt-1 text-[12px]`]}>Sign in to continue</Text>
                    </View>

                    <View style={tw`bg-white rounded-2xl p-4`}>
                        <View style={tw`mb-3.5`}>
                            <Text style={tw`text-[#3A3A3A] mb-2 font-semibold`}>Base URL</Text>
                            <TextInput
                                placeholder="https://api.example.com"
                                placeholderTextColor="#9CA3AF"
                                value={baseUrl}
                                onChangeText={setBaseUrl}
                                autoCapitalize="none"
                                style={tw`bg-white rounded-xl py-3 px-3.5 border border-[#EFEFEF] text-[#111827]`}
                            />
                        </View>

                        <View style={tw`mb-3.5`}>
                            <Text style={tw`text-[#3A3A3A] mb-2 font-semibold`}>Username</Text>
                            <TextInput
                                placeholder="Enter username"
                                placeholderTextColor="#9CA3AF"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                style={tw`bg-white rounded-xl py-3 px-3.5 border border-[#EFEFEF] text-[#111827]`}
                            />
                        </View>

                        <View style={tw`mb-3.5`}>
                            <Text style={tw`text-[#3A3A3A] mb-2 font-semibold`}>Password</Text>
                            <View style={tw`bg-white rounded-xl border border-[#EFEFEF] flex-row items-center pr-2`}>
                                <TextInput
                                    placeholder="Enter password"
                                    placeholderTextColor="#9CA3AF"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    style={tw`flex-1 py-3 px-3.5 text-[#111827]`}
                                />
                                <TouchableOpacity onPress={() => setShowPassword((v) => !v)} style={tw`px-2.5 py-1.5 rounded-lg`}>
                                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={18} color="#2D1B3D" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={onLogin}
                            disabled={!canSubmit}
                            style={tw.style('py-3.5 rounded-xl mt-4 items-center', 'bg-[#7C5CFF]', !canSubmit && 'opacity-50')}
                        >
                            <Text style={tw`text-white font-bold text-center`}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}


