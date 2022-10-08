import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

export default function Hub() {

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.9}
        >

            <Text style={styles.name}>Desenvolvido por</Text>

            <a href="https://hubdocricare.com.br/">
            <Image
                style={{width: 200, height: 30}}
                source={require('../../logo3.png')}
            />
</a>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        marginLeft: 8,
        marginVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    icon: {
        width: 40,
        height: 40,
    }
})