import React from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import AppLayout from '@/components/AppLayout';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import WorkOrders from '@/app/WorkOrders';
import SelectedItemsScreen from '@/app/supervisor-flow/selected-items';
import SupervisorEditScreen from '@/app/supervisor-flow/edit';
import EditTaskScreen from '@/app/supervisor-flow/edit-task';
import TaskScreen from '@/app/supervisor-flow/task';
import CleanerFlow from '@/app/cleaner-flow/index';
import Dashboard from '@/app/dashboard';
import RequiredCourses from '@/app/cleaner-flow/required-courses';
import LevelsScreen from '@/app/cleaner-flow/levels';
import TrainingLevels from '@/app/cleaner-flow/screens/TrainingLevels';
import ModulsScreen from '@/app/cleaner-flow/moduls';
import Certification from '@/app/cleaner-flow/certification';
import TestQuestion from '@/app/cleaner-flow/components/testQuestion';
import FinalTest from '@/app/cleaner-flow/components/finalTest';
import CleanerDashboard from '@/app/cleaner-flow/cleaner-dashboard';
import Login from '@/app/login';




export type RootStackParamList = {
    Login: undefined;
    Dashboard: undefined | { username?: string };
    WorkOrders: undefined;
    TrainingLevels: undefined;
    SupervisorSelectedItems: undefined;
    SupervisorEdit: { id?: number; title?: string; sub?: string; status?: string } | undefined;
    SupervisorEditTask: { id?: number; name?: string } | undefined;
    SupervisorTask: undefined;
    CleanerFlow: undefined;
    CleanerDashboard: { username?: string } | undefined;
    RequiredCourses: { username?: string } | undefined;
    Levels: { level?: string; title?: string; courses?: string; time?: string; progress?: string; locked?: string } | undefined;
    Moduls: { module?: string; total?: string; title?: string } | undefined;
    Certification: { username?: string } | undefined;
    TestQuestion: { username?: string } | undefined;
    FinalTest: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackScreen = () => (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, title: 'Login' }}
        />
        <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false, title: 'Dashboard' }}
        />
        <Stack.Screen name="CleanerDashboard" component={CleanerDashboard} options={{ headerShown: false, title: 'Cleaner Dashboard' }} />
        <Stack.Screen name="RequiredCourses" component={RequiredCourses} options={{ headerShown: false, title: 'Required Courses' }} />
        <Stack.Screen name="Levels" component={LevelsScreen} options={{ headerShown: false, title: 'Levels' }} />
        <Stack.Screen name="Moduls" component={ModulsScreen} options={{ headerShown: false, title: 'Courses' }} />
        <Stack.Screen name="Certification" component={Certification} options={{ headerShown: false, title: 'Certification' }} />
        <Stack.Screen name="TestQuestion" component={TestQuestion} options={{ headerShown: false, title: 'Test Question' }} />
        <Stack.Screen name="FinalTest" component={FinalTest} options={{ headerShown: false, title: 'Final Test' }} />
        <Stack.Screen name="TrainingLevels" component={TrainingLevels} options={{ headerShown: false, title: 'Training Levels' }} />
        <Stack.Screen
            name="WorkOrders"
            component={WorkOrders}
            options={{ headerShown: false, title: 'Work Orders' }}
        />
        <Stack.Screen
            name="SupervisorSelectedItems"
            component={SelectedItemsScreen}
            options={{ headerShown: false, title: 'Selected Items' }}
        />
        <Stack.Screen
            name="SupervisorEdit"
            component={SupervisorEditScreen}
            options={{ headerShown: false, title: 'Edit Work Order' }}
        />
        <Stack.Screen
            name="SupervisorEditTask"
            component={EditTaskScreen}
            options={{ headerShown: false, title: 'Edit task' }}
        />
        <Stack.Screen
            name="SupervisorTask"
            component={TaskScreen}
            options={{ headerShown: false, title: 'Tasks' }}
        />
        <Stack.Screen
            name="CleanerFlow"
            component={CleanerFlow}
            options={{ headerShown: false, title: 'Cleaner Flow' }}
        />

     

    </Stack.Navigator>
);

export default function App() {
    const navRef = React.useRef<NavigationContainerRef<any>>(null);
    const [routeName, setRouteName] = React.useState<string | undefined>(undefined);

    return (
        <NavigationContainer
            ref={navRef}
            onReady={() => setRouteName(navRef.current?.getCurrentRoute()?.name)}
            onStateChange={() => setRouteName(navRef.current?.getCurrentRoute()?.name)}
        >
            <AppLayout currentRouteName={routeName}>
                <StackScreen />
            </AppLayout>
        </NavigationContainer>
    );
}
