import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProductList from '../../Components/ProductList';
import instance from '../../api';
import { connect } from 'react-redux';

const ProductScreen = () => {
  const [isLoading, setLoading] = useState()
 
  return (
    <SafeAreaView>

    <ScrollView>
    <ProductList title="Produits de piscine" />   
  </ScrollView>
    </SafeAreaView>
  );
};

export default connect()(ProductScreen);

const styles = StyleSheet.create({});
