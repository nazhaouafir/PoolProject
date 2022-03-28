import React from 'react'
import {  ScrollView,FlatList, StyleSheet, Text, View, VirtualizedList, SectionList } from 'react-native'
import SmallCard from '../SmallCard'
const Grid = ({ title, data }) => {
    return (
        <View>
           <Text style={styles.textTitle}>{title}</Text>
                    <FlatList
                    style={styles.listStyle}
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        renderItem={({ item }) => <SmallCard item={item}  />}
                    />
        </View>

    )
}

export default Grid

const styles = StyleSheet.create({
    listStyle:{
        marginVertical: 10,
        marginHorizontal: 10,
       flexDirection: "column"
    },
    textTitle:{
        textAlign: "center",
        fontSize: 16,
        paddingVertical: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase'
               
    }
})
