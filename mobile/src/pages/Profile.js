import React from  'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview'

function Profile({ route, navigation }) {
    const { github_username } = route.params;
    return <WebView style={{ flex: 1}} source={{ uri: `https://github.com/${github_username}` }}/>
}

export default Profile;