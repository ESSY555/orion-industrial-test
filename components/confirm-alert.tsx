import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

type ConfirmDialogProps = {
    visible: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onCancel: () => void;
    onConfirm: () => void;
    iconName?: any;
};

export function ConfirmDialog({ visible, title, message, confirmText = 'Delete', cancelText = 'Cancel', onCancel, onConfirm, iconName = 'trash' }: ConfirmDialogProps) {
    return (
        <Modal transparent animationType="fade" visible={visible} onRequestClose={onCancel}>
            <View style={[tw`flex-1 items-center justify-center`, { backgroundColor: 'rgba(0,0,0,0.35)' }]}>
                <View style={[tw`rounded-2xl px-5 pt-6 pb-4`, { width: '82%', backgroundColor: '#FFFFFF' }]}> 
                    <View style={[tw`w-14 h-14 rounded-full items-center justify-center self-center mb-4`, { backgroundColor: 'rgba(127,86,217,0.12)' }]}> 
                        <Ionicons name={iconName} size={22} color="#7F56D9" />
                    </View>
                    <Text style={[tw`text-center text-black`, { fontWeight: '800', fontSize: 16 }]}>{title}</Text>
                    <Text style={[tw`text-center text-gray-600 mt-2`, { fontSize: 13 }]}>{message}</Text>
                    <View style={[tw`flex-row mt-5`]}>
                        <TouchableOpacity accessibilityRole="button" onPress={onCancel} style={[tw`flex-1 py-3 mr-2 rounded-xl items-center justify-center`, { backgroundColor: '#F3F4F6' }]}>
                            <Text style={tw`text-gray-800`}>{cancelText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity accessibilityRole="button" onPress={onConfirm} style={[tw`flex-1 py-3 ml-2 rounded-xl items-center justify-center`, { backgroundColor: '#7F56D9' }]}>
                            <Text style={tw`text-white`}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

type ToastProps = {
    visible: boolean;
    text: string;
    iconName?: any;
};

export function Toast({ visible, text, iconName = 'checkmark' }: ToastProps) {
    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={[tw`flex-1 items-center justify-end`, { backgroundColor: 'transparent' }]}> 
                <View style={[tw`mb-12 self-center rounded-2xl px-4 py-3`, { backgroundColor: '#1F2937EE' }]}> 
                    <View style={tw`flex-row items-center`}>
                        <View style={[tw`w-7 h-7 rounded-full items-center justify-center mr-2`, { backgroundColor: 'rgba(34,197,94,0.18)' }]}> 
                            <Ionicons name={iconName} size={16} color="#22C55E" />
                        </View>
                        <Text style={[tw`text-white`]}>{text}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
}


