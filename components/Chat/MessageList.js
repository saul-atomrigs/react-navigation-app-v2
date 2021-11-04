import React, { PureComponent } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { StreamChat } from 'stream-chat';
import {
    Chat,
    Channel,
    MessageList,
    MessageInput,
    ChannelList,
    Thread,
    ChannelPreviewMessenger,
    CloseButton,
    TypingIndicator,
} from 'stream-chat-expo';

const apiKey = 'qk4nn7rpcn75';
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYmlsbG93aW5nLWZpcmVmbHktOCJ9.CQTVyJ6INIM8u28BxkneY2gdYpamjLzSVUOTZKzfQlg';
const user = 'billowing-firefly-8';
const chatClient = new StreamChat(apiKey);

const channel = getChannel();

export default class App extends React.Component {
    render() {
        return (
            <SafeAreaView>
                <Chat style={theme} client={chatClient}>
                    <Channel client={chatClient} channel={channel}>
                        <View style={{ display: 'flex', height: '100%' }}>
                            <MessageList
                                TypingIndicator={TypingIndicator}
                                onThreadSelect={(thread) => {
                                    this.props.navigation.navigate('Thread', {
                                        thread,
                                        channel: channel.id,
                                    });
                                }}
                            />
                        </View>
                    </Channel>
                </Chat>
            </SafeAreaView>
        );
    }
}


function getChannel() {
    chatClient.setUser(
        {
            id: user,
        },
        userToken,
    );

    return chatClient.channel('messaging', 'general', {
        image:
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg',
        name: 'Talk about the documentation',
    });
}

const theme = {
    avatar: {
        image: {
            size: 32,
        },
    },
    colors: {
        primary: 'magenta',
    },
    spinner: {
        css: `
        width: 15px;
        height: 15px;
      `,
    },
};

