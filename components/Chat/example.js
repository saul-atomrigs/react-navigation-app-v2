import React from 'react'
import { View, Text } from 'react-native'

export default function CustomChannelHeader() {
    const { channel, loading } = useChannelContext()
    return loading ? (
        <View>
            <Text>Channel is loading</Text>
        </View>
    ) : (
        <View>
            <Text>Channel: {channel.cid}</Text>
            <Text>
                There are currently {channel.state.watch_count} people online
            </Text>

            <View>
                <Chat client={chat}>
                    <Channel channel={dataChannel}>
                        <CustomChannelHeader />
                        <MessageList />
                        <MessageInput />
                    </Channel>
                </Chat>
            </View>;
        </View>
    )
}

