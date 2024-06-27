import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon,
} from 'react-share';

type ShareButtonType = {
    property: any;
};

const ShareButton = ({ property }: ShareButtonType) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`

    return (
        <>
            <h3 className='text-xl font-bold text-center pt-2'>Share This Property:</h3>
            <div className='flex gap-3 justify-center pb-5'>
                <FacebookShareButton
                    url='https://google.com'
                    hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}
                    >
                        <FacebookIcon size={40} round={true} />
                </FacebookShareButton>

                <TwitterShareButton
                    url='https://google.com'
                    title={property.name}
                    hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}
                    >
                        <TwitterIcon size={40} round={true} />
                </TwitterShareButton>

                <WhatsappShareButton
                    url='https://google.com'
                    title={property.name}
                    separator=':: '
                    >
                        <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>

                <EmailShareButton
                    url='https://google.com'
                    subject={property.name}
                    body={`Check out this property listing: ${shareUrl}`}
                    separator=':: '
                    >
                        <EmailIcon size={40} round={true} />
                </EmailShareButton>
            </div>
        </>
    );
};

export default ShareButton;
