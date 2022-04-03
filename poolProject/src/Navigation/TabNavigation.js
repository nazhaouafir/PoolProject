import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ProblemsList from '../Screen/Problems/ProblemsList';
import ProductScreen from '../Screen/ProductScreen';
import ProductList from '../Components/ProductList';

const Tab = createMaterialTopTabNavigator();
 const TabNavigation =()=>{
       return(
           <Tab.Navigator
           screenOptions={{
            tabBarLabelStyle: { fontSize: 12 },
            tabBarStyle: { backgroundColor: 'white' }, }}>
                <Tab.Screen name="Produits" component={ProductScreen}/>
                <Tab.Screen name="Problèmes" component={ProblemsList} />
            </Tab.Navigator>
       )
            
}
export default TabNavigation