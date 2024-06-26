import Loader from "@/components/loader";

const LoadingPage = ({ loading }: { loading: boolean }) => {
    return <Loader loading={loading} />;
};

export default LoadingPage;
