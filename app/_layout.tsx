import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Home' }} />
            <Stack.Screen name="about" options={{ title: 'About' }} />
            <Stack.Screen name="account" options={{ title: 'Account' }} />
            <Stack.Screen name="events" options={{ title: 'Events' }} />
            <Stack.Screen name="reviews" options={{ title: 'Reviews' }} />
            <Stack.Screen name="timetable" options={{ title: 'Timetable' }} />
            <Stack.Screen name="auth" options={{ title: 'User Login' }} />
        </Stack>
    )
}
