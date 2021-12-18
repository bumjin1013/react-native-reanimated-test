import React, { FC } from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

interface Props {
    placeholder: string;
    onChangeText: (text: string) => void;
}

const Input: FC<Props> = (props) => {
    return (
        <View>
            <View>
                <Ionicons size={22} color="#555"/>
            </View>
            <View>
                <TextInput placeholderTextColor="#555" placeholder={props.placeholder} onChangeText={props.onChangeText}/>
            </View>
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})