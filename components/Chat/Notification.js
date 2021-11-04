import React from 'react'
import { View } from 'react-native'
import { MessageNotification } from './MessageNotification'
import { Chat } from '../Chat/Chat'
import { client } from '../docs/data'

export default function Notification() {
    return (
        <Chat
            client={client}>
            <View
                style={{ width: 90 }}>
                <MessageNotification
                    showNotification={true}
                    onPress={() => {
                        alert("Hello! I am an alert box!!");
                    }}
                />
            </View>
        </Chat>
    )
}
