import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';

interface Props {
  handleGoogleLoginSuccess: (data: any) => void;
}

const GoogleLogin = ({ handleGoogleLoginSuccess }: Props) => {
  const googleSignInButton = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const handleGoogleSignIn = useCallback(
    (res: CredentialResponse) => {
      if (!res.clientId || !res.credential) return;
      const userObject = jwt_decode(res.credential);
      const { email, name } = userObject as ICredential;
      
      LoginIn(email, name); // your sign-in
    
      setScriptLoaded(false);
    },
    [handleGoogleLoginSuccess],
  );

  function onClickGooglelogin() {
    let element: HTMLElement = document.querySelector(
      '[aria-labelledby="button-label"]',
    ) as HTMLElement;
    element.click();
  }

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !window.google ||
      !googleSignInButton.current
    ) {
      return;
    }

    const { google } = window;

    const initializeGoogle = () => {
      if (!google || scriptLoaded || googleClientId === undefined) return;

      setScriptLoaded(true);
      google.accounts.id.initialize({
        client_id: '532431731489-e0n2qskrukk01odl2fbglaj981simqiv.apps.googleusercontent.com',
        callback: handleGoogleSignIn,
      });
      const parent = document.getElementById('google-login-api');
      if (parent) {
        google.accounts.id.renderButton(parent, {
          type: 'icon',
        });
      }
    };

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = initializeGoogle;
    script.async = true;
    script.id = 'google-client-script';
    document.querySelector('body')?.appendChild(script);

    return () => {
      window.google?.accounts.id.cancel();
      document.getElementById('google-client-script')?.remove();
    };
  }, [handleGoogleSignIn, scriptLoaded]);

  return (
    <>
      <GoogleButton id="google-login-api" ref={googleSignInButton} />
      <GoogleButtonImage
        src={'asset/images/logo_google.png'}
        alt="google login"
        onClick={onClickGooglelogin}
      />
    </>
  );
};

const GoogleButton = styled.div`
  display: none;
`;

const GoogleButtonImage = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  cursor: pointer;
`;

export default GoogleLogin;