import { View, Text, StyleSheet } from "react-native";

// React component
const Reviews = () => {
    return(
        <View 
            style={styles.container}
        >
            <Text>This is the Reviews Page! Edit app/reviews.tsx.</Text>
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
export default Reviews;