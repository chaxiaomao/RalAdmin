import React from 'react';
import {fakeAuthProvider} from "../router/auth.tsx";

const Home = () => (
    <div>
        <p>Welcome @{fakeAuthProvider.user.username}</p>
    </div>
);

export default Home;