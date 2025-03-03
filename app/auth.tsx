import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { View, StyleSheet, Alert, TextInput, Button } from "react-native";
import { auth } from "./firebaseConfig";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";

// React component
const Auth = () => {
    // React states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Login function
    const logIn = async () => {
        console.log("Log In");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Route to Home
            router.dismissAll();
            router.replace('/');
        } catch (err) {
            if (err instanceof FirebaseError){
                console.log(err.code);
                createAlert('Internal Error Encountered', err.message);
            }
        }
    }

    // Register function
    const register = async () => {
        console.log("Register Button!");
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Route to Home
            router.dismissAll();
            router.replace('/');
        } catch (err) {
            if (err instanceof FirebaseError){
                console.log(err.code);
                createAlert('Internal Error Encountered', err.message);
            }
        }
    }

    // Guest function
    const guest = async () => {
        console.log("Guest Button!");
        // Route to Home
        router.dismissAll();
        router.replace('/');
    }

    // Logout function
    const logout = async () => {
        console.log("Logout");
        try {
            await signOut(auth);
            // Route to Home
            router.dismissAll();
            router.replace('/');
        } catch (err) {
            if (err instanceof FirebaseError){
                console.log(err.code);
                createAlert('Internal Error Encountered', err.message);
            }
        }
    }

    // Create an alert pop-up for simple error handling
    const createAlert = (title: string, msg: string) =>
        Alert.alert(title, msg, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

    return (
        <View 
            style={styles.container}
        >
            <TextInput 
                style={styles.input}
                placeholder="Email..."
                onChangeText={setEmail}
                value={email}
            />
            <TextInput 
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                secureTextEntry={true}
                value={password}
            />
            <View 
                style={styles.buttons}
            >
                <Button 
                    title="Log In"
                    onPress={logIn}
                />
                <Button 
                    title="Register"
                    onPress={register}
                />
                <Button 
                    title="Continue as guest"
                    onPress={guest}
                />
                <Button 
                    title="Logout"
                    onPress={logout}
                />
            </View>
        </View>
    )
}

// React component styling
const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        margin: 6,
        padding: 6,
        width: '100%'
    },
    container: {
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        width: 200,
        borderWidth: 1,
    },
    buttons: {
        display: 'flex',
        alignItems: "center",
        rowGap: 4
    }
});

// React component export
export default Auth;