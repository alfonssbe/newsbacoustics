import DistributorPageClient from "./pageClient";

export default function DistributorPage() {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": `Distributors | SB Acoustics`,
    "url": `${baseUrl}/distributors`,
    "logo": `${baseUrl}/images/sbacoustics/logo_sbacoustics_white_clean.webp`,
    "description": `All SB Acoustics Distributors`,
     "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Artisan Acoustics",
        "description": "Distributor for SB Acoustics in Singapore & Malaysia",
        "url": "https://www.artisanacoustics.net/",
        "email": "info@artisanacoustics.net",
        "telephone": "+65 9278 6994",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "SINGAPORE & MALAYSIA",
          "addressCountry": ["SG", "SGP", "MY", "MYS"]
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 1.3043835,
          "longitude": 103.8495556
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "CTI (Cine Tech Intl)",
        "description": "Distributor for SB Acoustics in South Korea",
        "url": "https://www.ctishop.co.kr/",
        "email": "changchang102@gmail.com",
        "telephone": "82-10-4585-3993",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "SOUTH KOREA",
          "addressCountry": ["KR", "KOR"]
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 35.9175398,
          "longitude": 128.6350607
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "Eight Audio International Pvt. Ltd.",
        "description": "Distributor for SB Acoustics in India",
        "url": "https://audiofy.in/",
        "email": "admin@eaipl.com",
        "telephone": "+91 95 4288 1888",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "INDIA",
          "addressCountry": ["IN", "IND"]
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 17.3373242,
          "longitude": 78.5312013
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "HIMSOUND",
        "description": "Distributor for SB Acoustics in Korea",
        "url": "https://www.himsound.com",
        "email": "himsound@naver.com",
        "telephone": ["+82 041-931-7117", "+82 010-7254-7117"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "KOREA",
          "addressCountry": ["KR", "KOR"]
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 36.3644826,
          "longitude": 126.6201487
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "Huy Lan Anh Audio",
        "description": "Distributor for SB Acoustics in Vietnam",
        "url": "https://huylananhaudio.vn/tim?q=sb+acoustics",
        "email": ["lequochuy11@gmail.com", "loahanoi.vn@gmail.com"],
        "telephone": ["+84 24-2240 9598", "+84 24-3826 0308"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "VIETNAM",
          "addressCountry": ["VN", "VNM"]
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 21.0240282,
          "longitude": 105.8513223
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "Hwely Audio",
        "description": "Distributor for SB Acoustics in Indonesia",
        "url": "https://www.hwelyaudio.com/",
        "email": "unscac@yahoo.com",
        "telephone": ["+62.3156.7966.9" , "+62.8214.1139.097"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "INDONESIA",
          "addressCountry": ["ID", "IDN"]
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -7.2858917,
          "longitude": 112.7143174
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "Image Audio Limited",
        "description": "Distributor for SB Acoustics in China",
        "url": "http://www.imageaudio.cn/",
        "email": "may@imageaudio.cn",
        "telephone": "+86 20-3439 0041",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "CHINA",
          "addressCountry": ["CN", "CHN"]
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 23.1079815, 
          "longitude": 113.2623458
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "MRF-Audio Labs",
        "description": "Distributor for SB Acoustics in Iran",
        "url": "",
        "email": "mrf.audiolabs@gmail.com",
        "telephone": ["0098-21-77349726", "0098-912-2868955"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "IRAN",
          "addressCountry": ["IR", "IRN"]
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 35.7792638, 
          "longitude": 51.4849439
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "Samdee Audio Company Limited",
        "description": "Distributor for SB Acoustics in Thailand",
        "url": "https://www.samdee-audio.com/",
        "email": "samdee2@hotmail.com",
        "telephone": "+66-81-295-6758",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "THAILAND",
          "addressCountry": ["TH", "THA"]
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 13.3137137,
          "longitude": 100.9456855
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "Tang Hill International",
        "description": "Distributor for SB Acoustics in Taiwan",
        "url": "https://www.thlaudio.com/indexE.htm",
        "email": "",
        "telephone": "886-2-87713363/5",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "TAIWAN",
          "addressCountry": ["TW", "TWN"]
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 25.0430035,
          "longitude": 121.5390005
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "Yokohama Baysidenet",
        "description": "Distributor for SB Acoustics in Japan",
        "url": "https://www.baysidenet.jp/",
        "email": "bsn-shop@baysidenet.jp",
        "telephone": "+81-25-201-9825",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "JAPAN",
          "addressCountry": ["JP", "JPN"]
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 37.1740205,
          "longitude": 138.9715807
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "Audio Components B.V.",
        "description": "Distributor for SB Acoustics in NETHERLANDS, BENELUX, BELGIUM, & LUXEMBURG",
        "url": "https://www.audio-components.com/",
        "email": "info@audiocomponents.nl",
        "telephone": ["+31(0)412-626.610" , "+31(0)412-633.017"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "NETHERLANDS, BENELUX, BELGIUM, & LUXEMBURG",
          "addressCountry": ["NL", "NLD", "BE", "BEL", "LU", "LUX" ]
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 51.7694154,
          "longitude": 5.5129188
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "Axiomedia srl",
        "description": "Distributor for SB Acoustics in Italy",
        "url": "https://www.axiomedia.it/",
        "email": "ordini@axiomedia.it",
        "telephone": ["+39-349-3147786" , "+39-039-2051560"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "ITALY",
          "addressCountry": ["IT", "ITA"]
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 45.5967964,
          "longitude": 9.3050356
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "Exproject-TG ltd.",
        "description": "Distributor for SB Acoustics in Bulgaria",
        "url": "https://exproject-bg.com/bg/",
        "email": "office@exproject-bg.com",
        "telephone": ["+359 32-267092", "+359 887-429031"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "BULGARIA",
          "addressCountry": ["BG", "BGR"]
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 42.1503451,
          "longitude": 24.7486167
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "Hifi kit Electronic AB",
        "description": "Distributor for SB Acoustics in Sweden",
        "url": "https://www.hifikit.se/",
        "email": "info@hifikit.se",
        "telephone": "+46 0(8) 335151",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "SWEDEN",
          "addressCountry": ["SE", "SWE"] 
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 59.3463734,
          "longitude": 18.0397290
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "ICOM Võrgud OÜ",
        "description": "Distributor for SB Acoustics in ESTONIA, LITHUANIA, LATVIA (BALTICUM), & RUSSIA , Maxim Soverinjuk",
        "url":"http://www.icom.ee/en/", 
        "email":"sales@icom.ee" , 
        "telephone":"+3725015786", 
        "address": {
          "@type": "PostalAddress",
          "addressLocality":"ESTONIA, LITHUANIA, LATVIA (BALTICUM), & RUSSIA , Maxim Soverinjuk", 
          "addressCountry": ["EE", "EST", "LT", "LTU", "LV", "LVA", "RU", "RUS" ] 
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 59.4366045,
          "longitude": 24.7527696
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name":"Jantzen Audio", 
        "description": "Distributor for SB Acoustics in POLAND & DENMARK",
        "url":"https://www.jantzen-audio.com/", 
        "email":"contact@jantzen-audio.com",
        "telephone":"+48 6838 22303", 
        "address": {
          "@type": "PostalAddress",
          "addressLocality":"POLAND & DENMARK",
          "addressCountry": ["PL", "POL", "DK", "DNK"] 
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude":52.2537327,
          "longitude":15.4707253
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name":"Lautsprechershop Daniel Gattig GmbH", 
        "description": "Distributor for SB Acoustics in Germany",
        "url":"https://www.lautsprechershop.de/chassis/main_en.htm",
        "email":"info@lautsprechershop.de", 
        "telephone":"+49 (0)721-9703724", 
        "address": {
          "@type": "PostalAddress",
          "addressLocality":"GERMANY", 
          "addressCountry": ["DE", "DEU"] 
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 49.0779167,
          "longitude": 8.3779415
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name":"Lean Business Audio", 
        "description": "Distributor for SB Acoustics in United Kingdom",
        "url":"https://www.lean-business.co.uk/eshop/", 
        "email":"sales@lean-business.co.uk", 
        "telephone":"+44 (0) 1473 744089",
        "address": {
          "@type": "PostalAddress",
          "addressLocality":"UNITED KINGDOM", 
          "addressCountry":["GB", "GBR"] 
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 52.0649709, 
          "longitude": 1.1143322
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name":"Sinar Baja Denmark (B2B Only)", 
        "description": "Distributor for SB Acoustics in Denmark",
        "url": "",
        "email":"info@sinarbaja.dk", 
        "telephone":"+45 2815 2633", 
        "address": {
          "@type": "PostalAddress",
          "addressLocality":"DENMARK", 
          "addressCountry": ["DK", "DNK"] 
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 56.1352009, 
          "longitude": 9.0175999
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "Speakerbuddies", 
        "description": "Distributor for SB Acoustics in Germany",
        "url":"https://www.speakerbuddies.eu/en/", 
        "email":"info@speakerbuddies.eu", 
        "telephone":"+49 (0) 2273-9084-0",
        "address": {
          "@type": "PostalAddress",
          "addressLocality":"GERMANY", 
          "addressCountry": ["DE", "DEU"] 
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 50.8954225, 
          "longitude": 6.6738498
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "Subing d.o.o.", 
        "description": "Distributor for SB Acoustics in Croatia",
        "url":"https://subing.hr/", 
        "email":"nik@subing.hr", 
        "telephone":"+385 91 4488 768", 
        "address": {
          "@type": "PostalAddress",
          "addressLocality":"CROATIA", 
          "addressCountry": ["HR", "HRV"] 
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 46.022733,
          "longitude": 16.546145
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "TLHP",
        "description": "Distributor for SB Acoustics in France",
        "url":"https://www.toutlehautparleur.com/", 
        "email":"info@tlhp.fr", 
        "telephone":"",
        "address": {
          "@type": "PostalAddress",
          "addressLocality":"FRANCE", 
          "addressCountry": ["FR", "FRA"] 
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 48.006956, 
          "longitude": -1.603238
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "URALTONE", 
        "description": "Distributor for SB Acoustics in Finland",
        "url":"https://en.uraltone.com/", 
        "email":"orders@uraltone.com", 
        "telephone":"+358 44 7743 695", 
        "address": {
          "@type": "PostalAddress",
          "addressLocality":"FINLAND", 
          "addressCountry": ["FI", "FIN"] 
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 60.186457, 
          "longitude": 24.946798
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "Madisound Speaker Components", 
        "description": "Distributor for SB Acoustics in USA",
        "url":"https://www.madisoundspeakerstore.com/welcome", 
        "email":"info@madisound.com", 
        "telephone":["(1) 608-831-3433" , "(1) 866-883-1488"], 
        "address": {
          "@type": "PostalAddress",
          "addressLocality":"USA , P.O.Box 44283", 
          "addressCountry": ["US", "USA"] 
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 43.0978240, 
          "longitude": -89.5355584
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "Solen Electronique Inc.", 
        "description": "Distributor for SB Acoustics in Canada",
        "url":"https://www.solen.ca/en", 
        "email":"solen@solen.ca", 
        "telephone":"(1) 450-656-2759",
        "address": {
          "@type": "PostalAddress",
          "addressLocality":"CANADA", 
          "addressCountry": ["CA", "CAN"] 
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 45.5063216, 
          "longitude": -73.4506177
        },
        "sameAs": []
      },
      {
        "@type": "LocalBusiness",
        "name": "WES Australasia", 
        "description": "Distributor for SB Acoustics in Australia",
        "url":"https://www.wes.com.au/", 
        "email":"",
        "telephone":"02 9797 9866", 
        "address": {
          "@type": "PostalAddress",
          "addressLocality":"AUSTRALIA", 
          "addressCountry":["AU", "AUS"] 
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -33.8867673, 
          "longitude": 151.1395643
        },
        "sameAs": []
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DistributorPageClient />
    </>
  )
}
