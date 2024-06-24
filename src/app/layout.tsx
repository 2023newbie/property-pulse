import { ReactNode } from 'react';
import '@/assets/styles/globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export const metadata = {
    title: 'PropertyPulse | Find The Perfect Rental',
    description: 'Find your dream rental property',
    keywords: 'rental, find rentals, find properties'
}

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang='en'>
            <body>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
};

export default MainLayout;
