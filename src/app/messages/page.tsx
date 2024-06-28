'use client';

import Loader from '@/components/loader';
import Message from '@/components/message';
import { useEffect, useState } from 'react';

const MessagesPage = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/messages');

                if (res.status === 200) {
                    const result = await res.json();
                    setMessages(result);
                } else {
                    setMessages([]);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <>
            {loading ? (
                <Loader loading={loading} />
            ) : (
                <section className='bg-blue-50'>
                    <div className='container m-auto py-24 max-w-6xl'>
                        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
                            <h1 className='text-3xl font-bold mb-4'>
                                Your Messages
                            </h1>

                            <div className='flex gap-6 flex-col'>
                                {messages.length === 0 && <p>You have no messages.</p>}
                                {messages.map((message, index) => (
                                    <Message message={message} key={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default MessagesPage;
