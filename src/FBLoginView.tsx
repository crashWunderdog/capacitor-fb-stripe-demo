import { FacebookLogin } from "@capacitor-community/facebook-login";
import React, { useCallback, useEffect } from "react";

const FACEBOOK_PERMISSIONS = ["email"];

const FACEBOOK_APP_ID = "YOUR_FACEBOOK_APP_ID";

const FBLoginView = (): JSX.Element => {
  useEffect(() => {
    const initializeLogins = async () => {
      try {
        await FacebookLogin.initialize({ appId: `${FACEBOOK_APP_ID}` });
      } catch (e) {
        console.warn("Error initializing idp sign ups", e);
      }
    };
    initializeLogins();
  }, []);

  const onFacebookLoginSuccess = useCallback(async (facebookResponse: any) => {
    const { idpToken, email, firstname, lastname } = facebookResponse;
    console.log("facebookResponse ", idpToken, email, firstname, lastname);
  }, []);

  return (
    <div>
      <p>FB login</p>
      <button
        onClick={async () => {
          try {
            const tokenResult = await FacebookLogin.login({
              permissions: FACEBOOK_PERMISSIONS,
            });
            const profileResult = (await FacebookLogin.getProfile({
              fields: ["email", "first_name", "last_name", "name"],
            })) as any;
            const facebookResponse = {
              idpToken: tokenResult.accessToken?.token ?? "",
              email: profileResult.email,
              firstname: profileResult.first_name,
              lastname: profileResult.last_name,
            };
            onFacebookLoginSuccess(facebookResponse);
          } catch (e) {
            console.log("Error signing in", e);
          }
        }}
      >
        FB log in
      </button>
    </div>
  );
};

export default FBLoginView;
