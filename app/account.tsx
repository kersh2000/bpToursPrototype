import { Button, StyleSheet, View, Text } from "react-native";
import { auth, db } from "./firebaseConfig"
import { Key, useEffect, useState } from "react";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { collection, getDocs, Timestamp } from "firebase/firestore";

// React component
const Account = () => {

    // Event table
    interface EventRow {
        id: string;
        name: string;
        time: Timestamp;
        description: string;
        cost: number;
    }

    // Profile table
    interface ProfileRow {
        userID: string;
        points: number;
    }

    // Ticket table
    interface TicketRow {
        userID: string;
        eventID: string;
    }

    const [points, setPoints] = useState(0);
    const [currentUID, setCurrentUID] = useState(auth?.currentUser?.uid);
    const [boughtEventIDs, setBoughtEventIDs] = useState<string[]>([]);
    const [tickets, setTickets] = useState<EventRow[]>([]);

    const eventsRef = collection(db, "events");
    const ticketsRef = collection(db, "tickets");
    const profilesRef = collection(db, "profiles");

    // Fetch latest tickets
    const getTickets = async () => {
        try {
            const data = await getDocs(eventsRef);
            const filteredData = data.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
                time: doc.data().time,
                description: doc.data().description,
                cost: doc.data().cost
            }) as EventRow);
            const boughtTickets: EventRow[] = [];
            filteredData.forEach(row => {
                if (boughtEventIDs.includes(row.id)){
                    boughtTickets.push(row);
                }
            });
            setTickets(boughtTickets);
        } catch (err) {
            console.error(err);
        }
    }

    // Ftech the users bought events
    const getBoughtEvents = async () => {
        try {
            const data = await getDocs(ticketsRef);
            const filteredData = data.docs.map((doc) => ({
                userID: doc.data().userID,
                eventID: doc.data().eventID 
            }) as TicketRow);
            const idArray: string[] = [];
            filteredData.forEach(ticket => {
                if (ticket.userID == currentUID){
                    idArray.push(ticket.eventID);
                }
            })
            setBoughtEventIDs(idArray);
        } catch (err) {
            console.error(err);
        }
    }

    // Fetch the users points
    const getPoints = async () => {
        try {
            const data = await getDocs(profilesRef);
            const filteredData = data.docs.map((doc) => ({
                userID: doc.data().userID,
                points: doc.data().points 
            }) as ProfileRow);
            let tempPoints: number = 0;
            filteredData.forEach(profile => {
                if (profile.userID == currentUID){
                    tempPoints = profile.points;
                }
            })
            setPoints(tempPoints);
        } catch (err) {
            console.error(err);
        }
    }

    // Logout function
    const logout = async () => {
        console.log("Logout");
        try {
            await signOut(auth);
            router.replace('/auth');
        } catch (err) {
            console.error(err);
        }
    }


    // Render on load
    useEffect(() => {
        setCurrentUID(auth?.currentUser?.uid);
        async function fetchData() {
            await getBoughtEvents();
            await getTickets();
            await getPoints();
        }
        fetchData();
    }, [points]);

    return (
        <View 
            style={styles.container}
        >
            <Text>
                Current Tour Points: {points}
                </Text>
            <View 
                style={styles.container}
            >
                <Text 
                    style={styles.title}
                >
                    Purchased Events
                </Text>
                {tickets.map((ticket) => {
                    return (
                        <View 
                            style={styles.event} 
                            key={ticket.id as Key}
                        >
                            <Text 
                                style={styles.name}
                            >
                                {ticket.name} ({ticket.time.toDate().toString().slice(4, 24)}){"\n"}
                            </Text>
                            <Text>
                                {ticket.description}
                            </Text>
                        </View>
                    )
                })}
            </View>
            <Button 
                title="Logout"
                onPress={logout}
            />
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
        width: '90%',
        borderWidth: 1
    },
    buttons: {
        display: 'flex',
        alignItems: "center",
        rowGap: 4
    },
    title: {
        fontSize: 20
    },
    event: {
        borderWidth: 2,
        margin: 4,
        padding: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    name: {
        fontWeight: 'bold'
    }
});

// React component export
export default Account;