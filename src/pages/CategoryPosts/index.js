import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native'


import { useNavigation, useRoute } from "@react-navigation/native"
import PostItem from "../../components/PostItem";

import api from '../../services/api'
import { TouchableOpacity } from "react-native-web";

export default function CategoryPosts() {
    const navigation = useNavigation()
    const route = useRoute()
    const [posts, setPosts] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params?.title === '' ? 'Categoria' : route.params?.title
        })
    }, [navigation])

    useEffect(() => {
        async function loadPosts() {
            const response = await api.get(`api/categories/${route.params?.id}?fields=name&populate=posts,posts.cover`)
            setPosts(response.data?.data?.attributes?.posts?.data)
        }

        loadPosts();

    }, [])


    function handleBack(){
        navigation.goBack()
    }

    return (
        <View style={styles.container}>

{posts.length === 0 && (
    <View style={styles.waeningContainer}>

        <Text style={styles.warning}> Essa categoria não tem nenhum post.</Text>
        <TouchableOpacity style={styles.backbutton} onPress={handleBack}>
            <Text style={styles.textButton}>Encontrar posts</Text>
        </TouchableOpacity>

        </View>
)}

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                data={posts}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => <PostItem  data={item}/>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 18,
        backgroundColor: '#FFF'
    },
    waeningContainer:{
        alignItems: 'center'
    },
    warning:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    backbutton:{
        backgroundColor: '#162133',
        padding: 8,
        marginTop: 12,
        borderRadius: 4,
    },
    textButton:{
        color: '#FFF'
    }
})