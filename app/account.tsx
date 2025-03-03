import { View, StyleSheet, Button } from "react-native";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";
import { router } from "expo-router";

// React component
const Account = () => {

    // Logout function
    const logout = async () => {
        console.log("Logout");
        try {
            await signOut(auth);
            // Route to the auth page
            router.replace('/auth');
        } catch (err) {
            console.error(err);
        }
    }
    
    return(
        <View 
            style={styles.container}
        >
            <Button 
                title="Logout"
                onPress={logout}
            />
        </View>
    )
}

// React component styling
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        width: '90%',
        borderWidth: 1
    }
})

// React component export
export default Account;