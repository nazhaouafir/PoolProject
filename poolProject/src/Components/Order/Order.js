import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import * as cartActions from '../../redux/actions/shop'
import * as authActions from '../../redux/actions/auth'
import { bindActionCreators } from 'redux'
const {width} = Dimensions.get('window')

const Order = ({totalPrice}) => {
  return (
    <View style={styles.container}>
        <View style={{backgroundColor:'white', flex:1,flexDirection:'column',paddingHorizontal:5, height:100}}>
             <Text style={styles.paragraph}>Prix de Base</Text>
             <Text style={styles.paragraph}>Frais de livraison </Text>
        </View>
        <View style={{backgroundColor:'white', flex:1,flexDirection:'column',paddingHorizontal:5, height:100}}>
             <Text style={styles.paragraph}>{totalPrice} DH</Text>
             <Text style={styles.paragraph}>100.00 DH</Text>
        </View>
      
    </View>
  )
}
const mapStateToProps = state => ({
    token: state.auth.token,
    username: state.auth.username,
    loading : state.auth.loading,
    products: state.shop.products,
    cart: state.shop.cart,
    totalPrice: state.shop.totalPrice
  });
  const ActionCreators = Object.assign(
    {},
    authActions,
    cartActions
  );
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
  });
export default connect(mapStateToProps,mapDispatchToProps)(Order)

const styles = StyleSheet.create({
    container: {
        flex: 3,
        paddingTop: 1,
        backgroundColor: '#ecf0fa',
        width: width, 
        flexDirection:'row',
        marginVertical:5
      },
      title: {
        margin: 5,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:'left',
        color: '#34495e',
      },
      paragraph: {
        margin: 5,
        fontSize: 14,
        fontWeight:'normal',
        textAlign:'left',
        color: '#34495e',
      },
})