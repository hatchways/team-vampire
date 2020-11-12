import React from 'react';
import { GoogleLogin } from 'react-google-login';

// refresh token
import { refreshTokenSetup } from '../utils/refreshTokenSetup';

const clientId = '734201335677-kakgc3np91nr45ss5j9f5l89v6b29h0n.apps.googleusercontent.com';

function LoginBtn() {
    const onSuccess = res => {
        console.log('[Login Success] currentUser:', res.profileObj);

        // initializing the setup
        refreshTokenSetup(res);
    };

    const onFailure = res => {
        console.log('[Login failed] res:', res);
    };

    return (
        <div>
            <GoogleLogin 
                clientId={clientId}
                buttonText="Sign up with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </div>
    );
}

export default LoginBtn;