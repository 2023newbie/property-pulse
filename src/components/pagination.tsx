import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Pagination = ({
    total,
    page,
    pageSize,
}: {
    total: number;
    page: number | string;
    pageSize: number | string;
}) => {
    const pathname = usePathname();

    return (
        <section className='container mx-auto flex justify-center items-center my-8'>
            {Number(page) - 1 > 0 && (
                <Link
                    href={`${pathname}?page=${
                        Number(page) - 1
                    }&pageSize=${pageSize}`}
                    className='mr-2 px-2 py-1 border border-gray-300 rounded'>
                    Previous
                </Link>
            )}
            <span className='mx-2'>
                Page {page} of {Math.ceil(total / Number(pageSize))}
            </span>
            {Number(page) + 1 <= total / Number(pageSize) && (
                <Link
                    href={`${pathname}?page=${
                        Number(page) + 1
                    }&pageSize=${pageSize}`}
                    className='ml-2 px-2 py-1 border border-gray-300 rounded'>
                    Next
                </Link>
            )}
        </section>
    );
};

export default Pagination;
