import { View, Text, StyleSheet } from "react-native";

// React component
const About = () => {
    return(
        <View 
            style={styles.container}
        >
            <Text>This is the About Page! Edit app/about.tsx.</Text>
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
export default About;