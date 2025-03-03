import { View, Text, StyleSheet } from "react-native";

// React component
const Events = () => {
    return(
        <View 
            style={styles.container}
        >
            <Text>This is the Events Page! Edit app/events.tsx.</Text>
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
export default Events;