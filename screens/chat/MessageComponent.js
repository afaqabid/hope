import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import TimeDelivery from './TimeDelivery';

const MessageComponent = (props) => {
    const { sender, item, sendTime } = props;

    // console.log("item",item)
    return (
        <Pressable
            style={{ marginVertical: 0 }}
        >
            <View
                style={[styles.TriangleShapeCSS,
                sender ?
                    styles.right
                    :
                    [styles.left]
                ]}
            />
            <View
                style={[styles.masBox, {
                    alignSelf: sender ? 'flex-end' : 'flex-start',
                    // borderWidth:1,
                    backgroundColor: sender ? COLORS.theme : COLORS.white
                }]}
            >

                <Text style={{ paddingLeft: 5, color:  sender ? COLORS.white : COLORS.black,fontFamily:FONTS.Regular,fontSize:12.5 }}>
                    {item.message}
                </Text>

                <TimeDelivery
                    sender={sender}
                    item={item}
                />
            </View>
        </Pressable>
    );
};