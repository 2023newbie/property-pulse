import Hero from '@/components/hero';
import HomeProperties from '@/components/home-properties';
import InfoBoxes from '@/components/info-boxes';

const HomePage = async () => {
    return (
        <>
            <Hero />
            <InfoBoxes />
            <HomeProperties />
        </>
    );
};

export default HomePage;
