import { collection, getDocs, addDoc } from "firebase/firestore";
import { Key, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import StarRating from 'react-native-star-rating-widget';
import { auth, db } from "./firebaseConfig";

// React component
const Reviews = () => {
    // Interface for rating table
    interface RatingRow {
        id: String;
        rating: Number;
        description: String;
    }

    const [stars, setStars] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [reviews, setReviews] = useState<RatingRow[]>([]);

    const reviewsRef = collection(db, "reviews")

    // Function to obtain the latest review
    const getReviews = async () => {
        try {
            const data = await getDocs(reviewsRef);
            const filteredData = data.docs.map((doc) => ({
                id: doc.id,
                rating: doc.data().rating,
                description: doc.data().description
            }) as RatingRow);
            setReviews(filteredData);
        } catch (err) {
            console.error(err);
        }
    }

    // Create a review function
    const postReview = async () => {
        if (!auth?.currentUser?.uid) {
            createAlert('Invalid User', 'You must be signed into an account to leave a review!');
            return;
        }
        if (!reviewText) {
            createAlert('Empty Description', 'Description cannot be empty to post a review!');
            return;
        }
        try {
            await addDoc(reviewsRef, {
                rating: stars,
                description: reviewText
            });
            setStars(0);
            setReviewText("");
            getReviews();
        } catch (err) {
            console.error(err);
        }
        
    }

    useEffect(() => {
        getReviews();
    }, []);

    const createAlert = (title: string, msg: string) =>
        Alert.alert(title, msg, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

    return (
        <View 
            style={styles.container}
        >
            <View 
                style={styles.reviewForm}
            >
                <Text 
                    style={styles.title}
                >
                    Give us a review!
                </Text>
                <StarRating 
                    rating={stars}
                    onChange={setStars}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Review Description..."
                    onChangeText={setReviewText}
                    value={reviewText}
                    multiline={true}
                />
                <Button 
                    title="Post"
                    onPress={postReview}
                />
            </View>
            <Text 
                style={styles.title}
            >
                Reviews
            </Text>
            <View 
                style={styles.container}
            >
                {reviews.map((review) => {
                    return (
                        <View 
                            key={review.id as Key} 
                            style={styles.reviewRow}
                        >
                            <StarRating 
                                rating={review.rating as number}
                                onChange={() => {}}
                            />
                            <Text>
                                {review.description}
                            </Text>
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
    input: {
        borderWidth: 2,
        margin: 6,
        padding: 6,
        width: '100%'
    },
    reviewForm: {
        width: '90%',
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        margin: 6,
        padding: 6
    },
    reviewRow: {
        borderWidth: 2,
        borderRadius: 4,
        padding: 8,
        margin: 6
    }
});

// React component export
export default Reviews;