import { View, Text, StyleSheet } from "react-native";
import { db } from "./firebaseConfig";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { Key, useEffect, useState } from "react";

// React component
const Timetable = () => {

    // Typescript interface for bus row from Firestore READ request
    interface BusRow {
        id: String;
        arrivalTime: Timestamp;
        arrivalLocation: String;
        departureTime: Timestamp;
        departureLocation: String;
        route: String;
    }

    const [buses, setBuses] = useState<BusRow[]>([]);

    // Get latest bus timetable
    const getBusTimetable = async () => {
        try {
            const busRef = collection(db, "buses");
            const data = await getDocs(busRef);
            const filteredData = data.docs.map((doc) => ({
                id: doc.id,
                arrivalTime: doc.data().arrivalTime,
                arrivalLocation: doc.data().arrivalLocation,
                departureLocation: doc.data().departureLocation,
                departureTime: doc.data().departureTime,
                route: doc.data().route
            }) as BusRow);
            setBuses(filteredData);
        } catch (err) {
            console.error(err);
        }
    }

    // Load on render, dependent on nothing
    useEffect(() => {
        getBusTimetable();
    }, []);

    return (
        <View 
            style={styles.container}
        >
            {buses.map((bus) => {
                return (
                    <View 
                        key={bus.id as Key} 
                        style={styles.busRow}
                    >
                        <Text 
                            style={styles.route}
                        >
                            Bus route: {bus.route}
                        </Text>
                        <View 
                            style={styles.row}
                        >
                            <Text 
                                style={styles.headers}
                            >
                                Departure
                            </Text>
                            <Text 
                                style={styles.headers}
                            >
                                Arrival
                            </Text>
                        </View>
                        <View 
                            style={styles.row}
                        >
                            <Text>
                                {bus.departureLocation}
                            </Text>
                            <Text 
                                style={styles.arrow}
                            >
                                &#10132;
                            </Text>
                            <Text>
                                {bus.arrivalLocation}
                            </Text>
                        </View>
                        <View 
                            style={styles.row}
                        >
                            <Text>
                                {bus.departureTime.toDate().toTimeString().slice(0, 8)}
                            </Text>
                            <Text 
                                style={styles.arrow}>&#10132;
                            </Text>
                            <Text>
                                {bus.arrivalTime.toDate().toTimeString().slice(0, 8)}
                            </Text>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

// React component styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        marginVertical: 25,
        alignItems: "center",
    },
    busRow: {
        width: '80%',
        borderWidth: 4,
        margin: 8,
        padding: 10,
        alignItems: 'center'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 6,
        paddingHorizontal: 6
    },
    route: {
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    arrow: {
        fontWeight: 'bold'
    },
    headers: {
        fontWeight: 'bold'
    }
});

// React component export
export default Timetable;