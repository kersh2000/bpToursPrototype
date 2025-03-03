import { View, Text, StyleSheet } from "react-native";

// React component
const About = () => {
    return(
        <View 
        style={styles.container}
        >
            <Text 
                style={styles.title}
            >
                About BP Tours{"\n\n"}
            </Text>
            <Text 
                style={styles.sub}
            >
                The Company{"\n"}
            </Text>
            <Text 
                style={styles.par}
            >
                Sometimes it's just better not to be seen. That's how Harry had always lived his life. He prided himself as being the fly on the wall and the fae that blended into the crowd. That's why he was so shocked that she noticed him. {"\n"}
            </Text>
            <Text 
                style={styles.par}
            >
                What were the chances? It would have to be a lot more than 100 to 1. It was likely even more than 1,000 to 1. The more he thought about it, the odds of it happening had to be more than 10,000 to 1 and even 100,000 to 1. People often threw around the chances of something happening as being 1,000,000 to 1 as an exaggeration of an unlikely event, but he could see that they may actually be accurate in this situation. Whatever the odds of it happening, he knew they were big. What he didn't know was whether this happening was lucky or unlucky. {"\n"}
            </Text>
            <Text 
                style={styles.sub}
            >
                History of Blackpool{"\n"}
            </Text>
            <Text 
                style={styles.par}
            >
                What have you noticed today? I noticed that if you outline the eyes, nose, and mouth on your face with your finger, you make an "I" which makes perfect sense, but is something I never noticed before. What have you noticed today? {"\n"}
            </Text>
            <Text 
                style={styles.par}
            >
                Don't be scared. The things out there that are unknown aren't scary in themselves. They are just unknown at the moment. Take the time to know them before you list them as scary. Then the world will be a much less scary place for you. {"\n"}
            </Text>
            <Text 
                style={styles.sub}
            >
                Our Teams{"\n"}
            </Text>
            <Text 
                style={styles.par}
            >
                It was difficult for him to admit he was wrong. He had been so certain that he was correct and the deeply held belief could never be shaken. Yet the proof that he had been incorrect stood right before his eyes. "See daddy, I told you that they are real!" his daughter excitedly proclaimed. {"\n"}
            </Text>
            <Text 
                style={styles.par}
            >
                The red line moved across the page. With each millimeter it advanced forward, something changed in the room. The actual change taking place was difficult to perceive, but the change was real. The red line continued relentlessly across the page and the room would never be the same. {"\n"}
            </Text>
        </View>
    )
}

// React component styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: 'center',
        margin: 14
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    sub: {
        fontSize: 16,
        fontWeight: 'medium'
    },
    par: {
        fontSize: 12,
        fontWeight: 'light'
    }
});

// React component export
export default About;