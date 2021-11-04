import React from 'react'
import { View } from 'react-native'

import { ChannelList } from './ChannelList'

import { Chat } from '../Chat/Chat'
import { channels, client } from '../docs/data'

export default function ChannelList() {
    return (
        <View
            style={channelList}
        >
            <Chat
                client={client}
            >
                <ChannelList
                    channels={channels}
                />
            </Chat>
        </View>
    )
}


const channelList = {
    height: '200px',
}

