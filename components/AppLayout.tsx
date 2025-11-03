import React, { useMemo, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Sidebar from '@/app/cleaner-flow/components/Sidebar';
import MenuBar from '@/components/MenuBar';
import { NavigationContainerRef, useNavigationContainerRef } from '@react-navigation/native';

type Props = {
  children: React.ReactNode;
  currentRouteName?: string;
};

export default function AppLayout({ children, currentRouteName }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hideChrome = currentRouteName === 'Login';

  return (
    <View style={tw`flex-1`}>
      {children}

      {/* Global MenuBar */}
      {!hideChrome && <MenuBar />}

      {/* Global Sidebar overlay */}
      {!hideChrome && <Sidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />}

      {/* Global toggle button (top-left) */}
      {!hideChrome && !sidebarOpen && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSidebarOpen(true)}
          style={[
            tw`items-center justify-center`,
            {
              position: 'absolute',
              left: 16,
              top: 84,
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#2B2140',
              elevation: 6,
              zIndex: 1100,
            },
          ]}
        >
          <Ionicons name="menu" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}


