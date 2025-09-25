import Contact from "@/components/contact";
import GoogleCaptchaWrapper from "@/components/GoogleCaptchaWrapper";
import PageLoader from "@/components/pageLoader";

export default function ContactUs() {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": `Contact | SB Acoustics`,
    "url": `${baseUrl}/contact`,
    "logo": `${baseUrl}/images/sbacoustics/logo_sbacoustics_white_clean.webp`,
    "description":"Contact SB Acoustics to ask about our products, distributors, and more.",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+62 31 748 00 11",
        "contactType": `Sinar Baja Electric`
      }
    ]
  }

  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageLoader duration={500}/>
      <div className="relative pb-[420px]"> {/* Added padding bottom */}
        <h1 className="sr-only">Contact | SB Acoustics</h1>
        <div className="absolute inset-0 z-0">
          <img 
              src={'/images/sbacoustics/New_SBE.webp'} 
              alt="Sinar Baja Electric Facility" 
              width={1000} 
              height={1000} 
              className="w-screen h-[600px] object-cover object-center"
          />
        </div>
        <div className="relative z-10 top-96">
          <GoogleCaptchaWrapper>
            <Contact />
          </GoogleCaptchaWrapper>
        </div>
      </div>
    </>
  );
}
