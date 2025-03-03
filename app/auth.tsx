import { View, Text, StyleSheet } from "react-native";

// React component
const Auth = () => {
    return(
        <View 
            style={styles.container}
        >
            <Text>This is the Auth Page! Edit app/auth.tsx.</Text>
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
export default Auth;