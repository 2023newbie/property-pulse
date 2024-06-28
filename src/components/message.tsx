'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useGlobalContext } from '@/context/global-context';

const Message = ({ message }: { message: any }) => {
    const date = new Date(message.createdAt);
    const dateTime = date.toLocaleDateString();
    const hourTime = date.toLocaleString('en-US', { timeStyle: 'short' });
    const ctx = useGlobalContext()

    const [isRead, setIsRead] = useState(message.read);
    const [isDelete, setIsDelete] = useState(false);

    const handleReadClick = async () => {
        try {
            const res = await fetch(`/api/messages/${message._id}`, {
                method: 'PUT',
            });

            if (res.status === 200) {
                const { read } = await res.json();
                setIsRead(read);
                if (read) {
                    toast.success('Marked as read.');
                    ctx.setUnreadCount(prev => --prev)
                } else {
                    toast.success('Marked as new.');
                    ctx.setUnreadCount(prev => ++prev)
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!');
        }
    };

    const handleDeleteClick = async () => {
        try {
            const res = await fetch(`/api/messages/${message._id}`, {
                method: 'DELETE',
            });

            if (res.status === 200) {
                toast.success('Message deleted.');
                setIsDelete(true);
                ctx.setUnreadCount(prev => isRead ? prev : --prev)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!');
        }
    };

    return (
        <>
            {!isDelete && (
                <div className='space-y-4'>
                    <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
                        {!isRead && (
                            <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>
                                New
                            </div>
                        )}
                        <h2 className='text-xl mb-4'>
                            <span className='font-bold'>Property Inquiry:</span>{' '}
                            {message.property.name}
                        </h2>
                        <p className='text-gray-700'>{message.body}</p>

                        <ul className='mt-4'>
                            <li>
                                <strong>Name:</strong> {message.sender.username}
                            </li>

                            <li>
                                <strong>Reply Email:</strong>
                                <Link
                                    href={`mailto:${message.email}`}
                                    className='text-blue-500'>
                                    {' '}
                                    {message.email}
                                </Link>
                            </li>
                            <li>
                                <strong>Reply Phone:</strong>
                                <Link
                                    href={`tel:${message.phone}`}
                                    className='text-blue-500'>
                                    {' '}
                                    {message.phone}
                                </Link>
                            </li>
                            <li>
                                <strong>Received:</strong> {dateTime} {hourTime}
                            </li>
                        </ul>
                        <button
                            className={`mt-4 mr-3 ${
                                isRead
                                    ? 'bg-gray-300'
                                    : 'bg-blue-500 text-white'
                            } py-1 px-3 rounded-md`}
                            onClick={handleReadClick}>
                            {isRead ? 'Mark As New' : 'Mark As Read'}
                        </button>
                        <button
                            onClick={handleDeleteClick}
                            className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Message;
