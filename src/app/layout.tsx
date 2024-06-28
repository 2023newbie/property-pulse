import { ReactNode } from 'react';
import '@/assets/styles/globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import AuthProvider from '@/components/auth-provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from '@/context/global-context';

export const metadata = {
    title: 'PropertyPulse | Find The Perfect Rental',
    description: 'Find your dream rental property',
    keywords: 'rental, find rentals, find properties',
};

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <GlobalProvider>
            <AuthProvider>
                <html lang='en'>
                    <body>
                        <Navbar />
                        <div className='min-h-fullBody'>
                            {children}
                        </div>
                        <Footer />
                        <ToastContainer />
                    </body>
                </html>
            </AuthProvider>
        </GlobalProvider>
    );
};

export default MainLayout;
