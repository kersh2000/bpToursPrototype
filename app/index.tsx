import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

// React component
const Index = () => {
    return (
        <View
            style={styles.container}
        >
            <Link style={styles.pageLink} href="/about">About Us</Link>
            <Link style={styles.pageLink} href="/timetable">Bus Timetable</Link>
            <Link style={styles.pageLink} href="/events">Guided Events</Link>
            <Link style={styles.pageLink} href="/reviews">Reviews Page</Link>
            <Link style={styles.pageLink} href="/account">Account Page</Link>
            <Link style={styles.pageLink} href="/auth">Authentication Page</Link>
        </View>
    );
}

// React component styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    pageLink: {
        textAlign: 'center'
    }
})

// React component export
export default Index;