import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Image, ActivityIndicator } from 'react-native'

import { useNavigation } from "@react-navigation/native"
import { Feather } from '@expo/vector-icons'
import api from '../../services/api';

import CategoryItem, { } from '../../components/CategoryItem'
import { getFavorite, setFavorite } from '../../services/favorite'
import FavoritePost from '../../components/FavoritePost'
import PostItem from "../../components/PostItem";

import ClipLoader from "react-spinners/ClipLoader";
import BounceLoader from "react-spinners/BounceLoader";

import * as Animatable from 'react-native-animatable'
import Hub from "../../components/Hub";


const FlatListAnimated = Animatable.createAnimatableComponent(FlatList)


export default function Home() {

    const navigation = useNavigation();
    const [categories, setCategories] = useState([])
    const [favCategory, setFavCategory] = useState([])

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        async function loadData() {

            await getListPosts();

            const category = await api.get("/api/categories?populate=icon")
            setCategories(category.data.data)
        }

        loadData()

    }, [])

    useEffect(() => {
        async function favorite() {
            const response = await getFavorite()
            setFavCategory(response);
        }

        favorite();
    }, [])

    async function getListPosts() {
        setLoading(true);

        const response = await api.get("api/posts?populate=cover&sort=createdAt:desc")
        setPosts(response.data.data)

        setLoading(false);
    }

    //Favoritando uma categoria
    async function handleFavorite(id) {
        const response = await setFavorite(id)

        setFavCategory(response);
        // alert("Categoria favoritada!")
    }

    if (loading) {
        return(
<SafeAreaView style={styles.container}>

<View style={styles.header}>

    <Image
        style={styles.cover}
        source={{ uri: 'https://res.cloudinary.com/dj8vjtwp3/image/upload/v1661268679/thumbnail_inicial2_3d6cfbd483.png?width=648&height=830' }}
    />

    <Animatable.Text animation="fadeInLeft" style={styles.name}>Bem vindo!
        {'\n'} <Text style={styles.nome}>Por Ana Carolina Alves Diniz. </Text>
    </Animatable.Text>

    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <Feather name="search" size={24} color="#FFF" />
    </TouchableOpacity>
</View>

<View style={styles.mainLoading}>

    <ActivityIndicator color='#09aad0' size={45} loading={loading} />

    <View style={{ maxHeight: 115,
        backgroundColor: '#EFEFEF',
        marginHorizontal: 18,
        borderRadius: 8,
        zIndex: 9,
        marginTop: 50}}>

        <Hub />

    </View>

</View>

</SafeAreaView>
        )
        
    } else {

        return (
            <SafeAreaView style={styles.container}>


                <View style={styles.header}>

                    <Image
                        style={styles.cover}
                        source={{ uri: 'https://res.cloudinary.com/dj8vjtwp3/image/upload/v1661268679/thumbnail_inicial2_3d6cfbd483.png?width=648&height=830' }}
                    />

                    <Animatable.Text animation="fadeInLeft" style={styles.name}>Bem vindo!
                        {'\n'} <Text style={styles.nome}>Por Ana Carolina Alves Diniz. </Text>
                    </Animatable.Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <Feather name="search" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {/* <View style={styles.nome}>
                    <Animatable.Text animation="fadeInLeft" style={styles.nome}> por Ana Carolina Alves Diniz </Animatable.Text>
                    </View> */}

                <FlatListAnimated
                    animation="flipInX"
                    delay={500}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    contentContainerStyle={{ paddingRight: 12 }}
                    style={styles.categories}
                    data={categories}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <CategoryItem
                            data={item}
                            favorite={() => handleFavorite(item.id)}
                        />
                    )}
                />

                <View style={styles.main}>

                    {/* <BounceLoader style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} size={30} color={'#09aad0'} loading={loading} /> */}

                    {favCategory.length !== 0 && (
                        <FlatList
                            style={{ marginTop: 50, maxHeight: 100, paddingStart: 18, }}
                            contentContainerStyle={{ paddingEnd: 18, }}
                            data={favCategory}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({ item }) => <FavoritePost data={item} />}
                        />
                    )}

                    <Text style={[
                        styles.title,
                        { marginTop: favCategory.length > 0 ? 14 : 46 }
                    ]}> CARTILHA PARA A PESSOA ESTOMIZADA </Text>

                    <FlatList
                        style={{ flex: 1, paddingHorizontal: 18 }}
                        showsVerticalScrollIndicator={false}
                        data={posts}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => <PostItem data={item} />}
                        refreshing={loading}
                        onRefresh={() => getListPosts()}
                    />

                    {/* <View style={{ backgroundColor: '#000', flexDirection: "row" }}>
    
                        <Text style={styles.nome}> Desenvolvido por </Text>
    
                        <Image
                            source={require('../../../src/logo3.png')}
                            style={{ width: 200, height: 30 }}
                        >
    
                        </Image>
    
                    </View> */}

                    <View style={styles.categories}>

                        <Hub />

                    </View>

                </View>

            </SafeAreaView>
        )

    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#09aad0'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 18,
        marginTop: 18,
        marginBottom: 24
    },
    name: {
        fontSize: 28,
        color: '#FFF',
        fontWeight: 'bold'
    },
    nome: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: 'bold',
    },
    categories: {
        maxHeight: 115,
        backgroundColor: '#EFEFEF',
        marginHorizontal: 18,
        borderRadius: 8,
        zIndex: 9
    },
    main: {
        backgroundColor: '#fff',
        flex: 1,
        marginTop: -30,
    },
    mainLoading: {
        backgroundColor: '#fff',
        flex: 1,
        marginTop: -30,
        paddingTop: 50,
        paddingBottom: 50,
        marginBottom: 50
    },
    title: {
        fontSize: 16,
        paddingHorizontal: 18,
        marginBottom: 14,
        fontWeight: 'bold',
        color: '#162133'
    },
    cover: {
        width: 70,
        height: 90,
        borderRadius: 4,
    },
})