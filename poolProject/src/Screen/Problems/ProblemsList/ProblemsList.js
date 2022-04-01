import {ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Grid from '../../../Components/Grid';
import { useNavigation } from '@react-navigation/native';
import instance from '../../../api';
import { getProblems } from '../../../api/services';

const ProblemsList = () => {
  const [problems, setproblems] = useState()
  function problemsList(){
    getProblems().then(
      (data)=>{
        setproblems(data)
    })
  }
  useEffect(()=>{ 
        return problemsList()
    },[])
  return (
    <>
        <Grid title="Les problèmes courants de la piscine" data={problems} />
    </>   
  );
};

export default ProblemsList;

const styles = StyleSheet.create({});
