import React from 'react';
import { SafeAreaView, Text, TextInput, Button, TrouchableOpacity} from 'react-native';
import COLORS from '../..conts/colors';

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <View>
                <Text style ={{color: COLORS.black, fontSize:40, fontWeight:'bold'}} >
                    Review
                </Text>

                <Text style ={{color: COLORS.black, fontSize:18, fontWeight:'bold'}} >
                    share Details of your own experience at this place
                </Text>
                <View style={{marginVertical: 20}}></View>
                <Button
                title="Cancel"
                onPress={() => Alert.alert('Cancel Button pressed')}
                />
                <Button
                title="Post"
                onPress={() => Alert.alert('Post Button pressed')}
                />
            </View>
        </SafeAreaView>
    );


