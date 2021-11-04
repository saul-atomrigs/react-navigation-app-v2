import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import { StreamChat } from 'stream-chat'
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


const apiKey = '5htg57uxmqts';
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYmlsbG93aW5nLWZpcmVmbHktOCJ9.CQTVyJ6INIM8u28BxkneY2gdYpamjLzSVUOTZKzfQlg';
const user = 'billowing-firefly-8';
const chatClient = new StreamChat(apiKey);

const channel = getChannel()

const watchChannel = () => {
    const cPromise = channel.watch();
    cPromise.then(() => {
        for (let i = 0; i < channel.state.messages.length; i++) {
            if (channel.state.messages[i].reply_count > 0) {
                this.setState({
                    thread: channel.state.messages[i]
                });
                break;
            }
        }
    });
}

export default function Thread() {
    return (
        <SafeAreaView>
            <Chat
                style={theme}
                client={chatClient}
            >
                <Channel
                    client={chatClient}
                    channel={channel}
                    thread={this.state.thread}
                >
                    <View
                        style={thread}
                    >
                        <Thread
                            thread={this.state.thread}
                        />
                    </View>
                </Channel>

            </Chat>
        </SafeAreaView>
    )
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

// styling 
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

const thread = {
    display: 'flex',
    height: '100%',
}