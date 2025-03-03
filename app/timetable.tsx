import { View, Text, StyleSheet } from "react-native";

// React component
const Timetable = () => {
    return(
        <View 
            style={styles.container}
        >
            <Text>This is the Timetable Page! Edit app/timetable.tsx.</Text>
        </View>
    )
}

// React component styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    }
})

// React component export
export default Timetable;