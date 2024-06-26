'use client';

import { CSSProperties } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

const override: CSSProperties = {
    display: 'block',
    margin: '100px auto',
};

const Loader = ({ loading }: { loading: boolean }) => {
    return (
        <div className='flex justify-center'>
            <SyncLoader
                color='#3b82f6'
                loading={loading}
                cssOverride={override}
                size={20}
                aria-label='Loading Spinner'
            />
        </div>
    );
};

export default Loader;
