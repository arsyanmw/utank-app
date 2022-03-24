import React from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {useDispatch, useSelector, connect} from 'react-redux';
import {
  setDataHutangs,
  setIsLoading,
  setIsRefreshing,
  setSudahBayar,
} from '../../config/redux/action';
import {ItemDataDetails} from './itemDataDetails';
import {CardDetails, Header, LoadingScreen} from '../../components';
import {globalVariable} from '../../variables/global';

const Detail = ({route, navigation}) => {
  const {name} = route.params;

  const {dataHutangs} = useSelector(state => state.hutangsReducer);
  const {isRefreshing, isLoading} = useSelector(state => state.globalReducer);
  const dispatch = useDispatch();
  const dataHutangByName = dataHutangs.filter(item => item.name === name);

  const onRefresh = () => {
    dispatch(setIsLoading(true));
    dispatch(setIsRefreshing(true));
    dispatch(setDataHutangs());
  };

  const handleSudahbayar = id => {
    dispatch(setSudahBayar(id));
  };

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <View style={{height: '100%', backgroundColor: '#fff'}}>
        <ScrollView
          style={[globalVariable.padding, {marginTop: 60}]}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }>
          {dataHutangByName.length
            ? dataHutangByName.map(item => (
                <CardDetails key={item._id}>
                  <ItemDataDetails
                    data={item}
                    onPress={() => handleSudahbayar(item._id)}
                  />
                </CardDetails>
              ))
            : navigation.goBack()}
        </ScrollView>
        <Header
          title={'Detail Hutang ' + name}
          nav={() => navigation.goBack()}
        />
      </View>
    );
  }
};

export default connect()(Detail);
