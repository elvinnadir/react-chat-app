import React from 'react'
import './App.css'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import { ChannelListContainer, ChannelContainer, Auth } from './components'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const apiKey = 'mdxz9nnsnx45'
const authToken = cookies.get("token")
const client = StreamChat.getInstance(apiKey)

if (authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken)
}


function App() {
    if (!authToken)
        return <Auth />
    return (
        <div className='app__wrapper'>
            <Chat client={client} theme="team light">
                <ChannelListContainer />
                <ChannelContainer />
            </Chat>
        </div>
    )
}
export default App