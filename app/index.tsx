import { Link } from "expo-router";
import { Text, View, StyleSheet, Image } from "react-native";
import { auth } from "./firebaseConfig";

// React component
const Index = () => {
    return (
        <View
            style={styles.container}
        >
            {
                auth?.currentUser?.uid ? 
                <Link 
                    style={styles.account} 
                    href="/account"
                >
                    Account{"\n"}Info
                </Link>
                :
                <Link 
                    style={styles.account} 
                    href="/auth"
                >
                    Account{"\n"}Login
                </Link>
            }
            <Image 
                source={require('./img/bp-tours-logo.png')}
                style={styles.companyImage}
            />
            <Text 
                style={styles.compnayText}
            >
                This is the dcescription of the BP Tours company blah blah balh...
            </Text>
            <View 
                style={styles.pageContainer}
            >
                <Link 
                    style={styles.pageLink} 
                    href="/about"
                >
                    About Us
                </Link>
                <Link 
                    style={styles.pageLink} 
                    href="/timetable"
                >
                    Bus Timetable
                </Link>
                <Link 
                    style={styles.pageLink} 
                    href="/events"
                >
                    Guided Events
                </Link>
                <Link 
                    style={styles.pageLink} 
                    href="/reviews"
                >
                    Reviews Page
                </Link>
            </View>
        </View>
    );
}

// React component styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        margin: 5,
        borderWidth: 1
    },
    companyImage: {
        height: '25%',
        width: '90%',
        borderWidth: 4,
        margin: 4
    },
    compnayText: {
        backgroundColor: 'orange',
        margin: 4
    },
    pageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "flex-start",
        justifyContent: 'center',
        margin: 5,
        borderWidth: 1
    },
    pageLink: {
        width: '35%',
        aspectRatio: 1,
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'lightgreen',
        margin: 8,
        borderWidth: 2,
        borderRadius: 8,
        elevation: 5
    },
    account: {
        alignSelf: 'flex-end',
        textAlign: 'center',
        margin: 8,
        padding: 2,
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'lightgrey'
    }
});

// React component export
export default Index;