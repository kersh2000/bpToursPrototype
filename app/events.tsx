import { collection, getDocs, addDoc, updateDoc, Timestamp, doc } from "firebase/firestore";
import { Key, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { auth, db } from "./firebaseConfig";

// React component
const Events = () => {

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
        id: string;
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
    const [events, setEvents] = useState<EventRow[]>([]);
    const [profileId, setProfileId] = useState<string>("");

    const eventsRef = collection(db, "events");
    const ticketsRef = collection(db, "tickets");
    const profilesRef = collection(db, "profiles");

    // Fetch latest events
    const getEvents = async () => {
        try {
            const data = await getDocs(eventsRef);
            const filteredData = data.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
                time: doc.data().time,
                description: doc.data().description,
                cost: doc.data().cost
            }) as EventRow);
            setEvents(filteredData);
        } catch (err) {
            console.error(err);
        }
    }

    // Fetch latest events bought by the current user
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

    // Fetch the latest points of the user
    const getPoints = async () => {
        try {
            const data = await getDocs(profilesRef);
            const filteredData = data.docs.map((doc) => ({
                id: doc.id,
                userID: doc.data().userID,
                points: doc.data().points 
            }) as ProfileRow);
            let tempPoints: number = 0;
            filteredData.forEach(profile => {
                if (profile.userID == currentUID){
                    tempPoints = profile.points;
                    setProfileId(profile.id);
                }
            })
            setPoints(tempPoints);
        } catch (err) {
            console.error(err);
        }
    }

    // Purchase a ticket and doi a CREATE and UPDATE function on Firebase
    const buyTicket = async (cost: number, id: string) => {
        if (!auth?.currentUser?.uid) {
            createAlert('Invalid User', 'You must be signed into an account to purchase a ticket!');
            return;
        }
        if (boughtEventIDs.includes(id)){
            createAlert('Purchase Conflict', 'You have already purchased this event! Check your account to view your current tickets!');
            return;
        }
        if (points < cost) {
            createAlert('Insufficient Funds', 'You do not have enough tour points to purchase this event!');
            return;
        }
        try {
            await addDoc(ticketsRef, {
                userID: currentUID,
                eventID: id
            });
            const newPoints = points - cost;
            const profileDoc = doc(db, "profiles", profileId);
            setPoints(newPoints);
            await updateDoc(profileDoc, { points: newPoints });
            createAlert('Purchase Successful', 'Congradulations, you have purchased this event and now have a ticket in your account!');
        } catch (err) {
            console.error(err);
        }
    }

    // Update on render
    useEffect(() => {
        setCurrentUID(auth?.currentUser?.uid);
        async function fetchData() {
            await getBoughtEvents();
            await getEvents();
            await getPoints();
        }
        fetchData();
    }, [points]);

    const createAlert = (title: string, msg: string) =>
        Alert.alert(title, msg, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

    return (
        <View 
            style={styles.container}
        >
            <Text>
                Current Tour Points: {points}
            </Text>
            <Text 
                style={styles.title}
            >
                Upcoming Events
            </Text>
            <View 
                style={styles.container}
            >
                {events.map((event) => {
                    return (
                        <View 
                            style={styles.event} 
                            key={event.id as Key}
                        >
                            <Text 
                                style={styles.name}
                            >
                                {event.name} ({event.time.toDate().toString().slice(4, 24)}){"\n"}Cost: {event.cost} Tour Points{"\n"}
                            </Text>
                            <Text>
                                {event.description}
                            </Text>
                            <Button 
                                title="Purchase" 
                                onPress={() => {buyTicket(event.cost, event.id)}}
                            />
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

// React component styling
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        margin: 6,
        padding: 6
    },
    title: {
        fontSize: 22
    },
    event: {
        borderWidth: 2,
        margin: 4,
        padding: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    name: {
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

// React component export
export default Events;