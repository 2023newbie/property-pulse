'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';

type BookmarkButtonType = {
    property: any;
};

const BookmarkButton = ({ property }: BookmarkButtonType) => {
    const { data: session } = useSession();

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        (async () => {
            try {
                if (!session?.user) return
                const res = await fetch('/api/bookmarks/check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ propertyId: property._id }),
                });

                if (!res.ok) {
                    return toast.error('Something went wrong!');
                }

                const result = await res.json();

                setIsBookmarked(result.isBookmarked);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [property._id]);

    const bookmarkHandler = async () => {
        if (!session || !session.user) {
            return toast.error('You need to sign in to bookmark property.');
        }

        try {
            const res = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ propertyId: property._id }),
            });

            if (!res.ok) {
                return toast.error('Something went wrong!');
            }

            const result = await res.json();

            setIsBookmarked(result.isBookmarked);

            if (result.isBookmarked) {
                toast.success(result.message);
            } else {
                toast.info(result.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!');
        }
    };

    let classes = `${
        isBookmarked
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
    } text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center disabled:bg-zinc-800`;

    return (
        <button
            className={classes}
            onClick={bookmarkHandler}
            disabled={loading}>
            <FaBookmark className='mr-2' />{' '}
            {loading
                ? 'Loading...'
                : isBookmarked
                ? 'Remove Bookmark'
                : 'Bookmark Property'}
        </button>
    );
};

export default BookmarkButton;
