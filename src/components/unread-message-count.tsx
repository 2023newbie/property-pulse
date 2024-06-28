import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/global-context";

const UnreadMessageCount = ({ session }: any) => {
    const ctx = useGlobalContext()

    useEffect(() => {
        if (!session) return

        ;(async () => {
            try {
                const res = await fetch('/api/messages/unread-count')

                if (res.status === 200) {
                    const result = await res.json()
                    ctx.setUnreadCount(result.count)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    return ctx.unreadCount > 0 && (
        <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
            {ctx.unreadCount}
        </span>
    );
};

export default UnreadMessageCount;
