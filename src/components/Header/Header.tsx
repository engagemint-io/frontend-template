import React from 'react';
import {HeaderProps} from './types.ts';
import styles from './Header.module.sass';

const Header = ({}: HeaderProps) => {
    const connectToTwitter = async () => {
        //Sign in to twitter app to get a twitter OAuth token

        //Hit API to get twitter access token

        // Arbitrarily sign Twitter access token with wallet

        // Hit API /register endpoint with signed twitter access token
    };

    return (
        <div className={styles.content}>
            <p>EngageMint</p>
            <button onClick={connectToTwitter}>connect your twitter</button>
        </div>
    );
};

export default Header;
