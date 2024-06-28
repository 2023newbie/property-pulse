import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async () => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response('You must be logged in to send a message.', {
                status: 401,
            });
        }

        const { userId } = sessionUser;

        const readMessages = await Message.find({ recipient: userId, read: true })
            .sort({ createdAt: -1 }) // Sort read messages in asc order
            .populate('sender', 'username')
            .populate('property', 'name')

        const unreadMessages = await Message.find({ recipient: userId, read: false })
        .sort({ createdAt: -1 }) // Sort unread messages in asc order
        .populate('sender', 'username')
        .populate('property', 'name')

        const messages = [...unreadMessages, ...readMessages]

        return new Response(JSON.stringify(messages), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong!', { status: 500 });
    }
};

// POST api/messages
export const POST = async (request: NextRequest) => {
    try {
        await connectDB();

        const { name, email, message, phone, recipient, property } =
            await request.json();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response('You must be logged in to send a message.', {
                status: 401,
            });
        }

        // Can not send message to self
        if (sessionUser.userId === recipient) {
            return new Response(
                JSON.stringify({ message: 'Cannot send message to yourself.' }),
                { status: 400 }
            );
        }

        const newMessage = new Message({
            sender: sessionUser.userId,
            recipient,
            property,
            name,
            email,
            phone,
            body: message,
        });

        await newMessage.save();

        return new Response(JSON.stringify({ message: 'Message sented.' }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong!', { status: 500 });
    }
};
