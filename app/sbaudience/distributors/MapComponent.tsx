"use client"

import { useEffect, useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Facebook, Globe, Instagram, Loader2, Mail, MapPin, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Link from 'next/link'

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import L from "leaflet";

const defaultIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",
  iconSize: [20, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [30, 30],
});

const activeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [30, 50], // Slightly bigger for emphasis
  iconAnchor: [15, 50],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});


interface MapData{
  name: string;
  desc: {
    country: string,
    phone: string,
    email: string,
    website: string,
    facebook: string,
    instagram: string,
  };
  lat: number;
  lng: number
  country_code: string[];
}

const asianDistributors: MapData[] = [
  { 
    name: "Artisan Acoustics", 
    desc: { 
      country:"SINGAPORE & MALAYSIA", 
      phone:"+65 9278 6994", 
      email:"info@artisanacoustics.net", 
      website:"https://www.artisanacoustics.net/", 
      facebook: "", 
      instagram: ""
    }, 
    lat: 1.3043835, 
    lng: 103.8495556, 
    country_code: ["SG", "SGP", "MY", "MYS"] 
  },
  { 
    name: "CTI (Cine Tech Intl)", 
    desc: {
      country:"SOUTH KOREA", 
      phone:"82-10-4585-3993", 
      email:"changchang102@gmail.com", 
      website:"https://www.ctishop.co.kr/", 
      facebook: "", 
      instagram: ""
    }, 
    lat: 35.9175398, 
    lng: 128.6350607, 
    country_code: ["KR", "KOR"] 
  },
  { 
    name: "Eight Audio International Pvt. Ltd.", 
    desc: {
      country:"INDIA", 
      phone:"+91 95 4288 1888", 
      email:"admin@eaipl.com", 
      website:"https://audiofy.in/", 
      facebook:"audiofy.in", 
      instagram:"audiofy.in"
    }, 
    lat: 17.3373242, 
    lng: 78.5312013, 
    country_code: ["IN", "IND"] 
  },
  { 
    name: "HIMSOUND", 
    desc: {
      country:"SOUTH KOREA", 
      phone:"+82 041-931-7117, +82 010-7254-7117", 
      email:"himsound@naver.com" , 
      website:"https://www.himsound.com", 
      facebook:"", 
      instagram:""
    }, 
    lat: 36.3644826, 
    lng: 126.6201487, 
    country_code: ["KR", "KOR"] 
  },
  { 
    name: "Huy Lan Anh Audio", 
    desc: {
      country:"VIETNAM", 
      phone:"+84 24-2240 9598, +84 24-3826 0308", 
      email:"lequochuy11@gmail.com, loahanoi.vn@gmail.com",
      website:"https://huylananhaudio.vn/tim?q=sb+acoustics", 
      facebook:"", 
      instagram:""
    }, 
    lat: 21.0240282, 
    lng: 105.8513223, 
    country_code: ["VN", "VNM"] 
  },
  { 
    name: "Hwely Audio", 
    desc: {
      country:"INDONESIA", 
      phone:"+62.3156.7966.9 , +62.8214.1139.097",
      email:"unscac@yahoo.com",
      website:"https://www.hwelyaudio.com/", 
      facebook:"", 
      instagram:""
    }, 
    lat: -7.2858917, 
    lng: 112.7143174, 
    country_code: ["ID", "IDN"] 
  },
  { 
    name: "Image Audio Limited", 
    desc: {
      country:"GUANGZHOU, CHINA", 
      phone:"+86 20-3439 0041", 
      email:"may@imageaudio.cn", 
      website:"http://www.imageaudio.cn/", 
      facebook:"", 
      instagram:""
    }, 
    lat: 23.1079815, 
    lng: 113.2623458, 
    country_code: ["CN", "CHN"] 
  },
  { 
    name: "MRF-Audio Labs", 
    desc: {
      country:"IRAN", 
      phone:"0098-21-77349726 , 0098-912-2868955", 
      email:"mrf.audiolabs@gmail.com", 
      website:"", 
      facebook:"", 
      instagram:"" 
    }, 
    lat: 35.7792638 , 
    lng: 51.4849439, 
    country_code: ["IR", "IRN"] 
  },
  { 
    name: "Samdee Audio Company Limited", 
    desc: {
      country:"THAILAND", 
      phone:"+66-81-295-6758", 
      email:"samdee2@hotmail.com", 
      website:"https://www.samdee-audio.com/", 
      facebook:"", 
      instagram:""
    }, 
    lat: 13.3137137, 
    lng: 100.9456855, 
    country_code: ["TH", "THA"] 
  },
  { 
    name: "Tang Hill International", 
    desc: {
      country:"TAIWAN, 1F., No.1, Aly. 5, Ln. 217, Sec. 3, Zhongxiao E. Rd., Da’an Dist., Taipei City 10653, Taiwan (R.O.C.)", 
      phone:"886-2-87713363/5", 
      email:"", 
      website:"https://www.thlaudio.com/indexE.htm", 
      facebook:"", 
      instagram:""
    }, 
    lat: 25.0430035, 
    lng: 121.5390005, 
    country_code: ["TW", "TWN"] 
  },
  { 
    name: "Yokohama Baysidenet", 
    desc: {
      country:"JAPAN", 
      phone:"+81-25-201-9825", 
      email:"bsn-shop@baysidenet.jp", 
      website:"https://www.baysidenet.jp/", 
      facebook:"", 
      instagram:""
    }, 
    lat: 37.1740205, 
    lng: 138.9715807, 
    country_code: ["JP", "JPN"] 
  },
]

const europeDistributors: MapData[] = [
  { 
    name: "Audio Components B.V.", 
    desc: {
      country:"NETHERLANDS, BENELUX, BELGIUM, & LUXEMBURG", 
      phone:"+31(0)412-626.610 , +31(0)412-633.017", 
      email:"info@audiocomponents.nl", 
      website:"https://www.audio-components.com/", 
      facebook:"", 
      instagram:""
    }, 
    lat: 51.7694154, 
    lng: 5.5129188, 
    country_code: ["NL", "NLD", "BE", "BEL", "LU", "LUX" ] 
  },
  { 
    name: "Axiomedia srl", 
    desc: {
      country:"ITALY", 
      phone:"+39-349-3147786 , +39-039-2051560",
      email:"ordini@axiomedia.it", 
      website:"https://www.axiomedia.it/", 
      facebook:"", 
      instagram:""
    }, 
    lat: 45.5967964, 
    lng: 9.3050356, 
    country_code: ["IT", "ITA"] 
  },
  { 
    name: "Exproject-TG ltd.", 
    desc: {
      country:"BULGARIA", 
      phone:"+359 32-267092, +359 887-429031", 
      email:"office@exproject-bg.com", 
      website:"https://exproject-bg.com/bg/", 
      facebook:"", 
      instagram:""
    }, 
    lat: 42.1503451, 
    lng: 24.7486167, 
    country_code: ["BG", "BGR"] 
  },
  { 
    name: "Hifi kit Electronic AB", 
    desc: {
      country:"SWEDEN", 
      phone:"+46 0(8) 335151", 
      email:"info@hifikit.se", 
      website:"https://www.hifikit.se/", 
      facebook:"", 
      instagram:""
    }, 
    lat: 59.3463734, 
    lng: 18.0397290, 
    country_code: ["SE", "SWE"] 
  },
  { 
    name: "ICOM Võrgud OÜ", 
    desc: {
      country:"ESTONIA, LITHUANIA, LATVIA (BALTICUM), & RUSSIA , Maxim Soverinjuk", 
      phone:"+3725015786", 
      email:"sales@icom.ee" , 
      website:"http://www.icom.ee/en/", 
      facebook:"", 
      instagram:""
    }, 
    lat: 59.4366045, 
    lng: 24.7527696, 
    country_code: ["EE", "EST", "LT", "LTU", "LV", "LVA", "RU", "RUS" ] 
  },
  { 
    name: "Jantzen Audio", 
    desc: {
      country:"POLAND & DENMARK",
      phone:"+48 6838 22303", 
      email:"contact@jantzen-audio.com", 
      website:"https://www.jantzen-audio.com/", 
      facebook:"", 
      instagram:""
    }, 
    lat: 52.2537327, 
    lng: 15.4707253, 
    country_code: ["PL", "POL", "DK", "DNK"] 
  },
  { 
    name: "Lautsprechershop Daniel Gattig GmbH", 
    desc: {
      country:"GERMANY", 
      phone:"+49 (0)721-9703724", 
      email:"info@lautsprechershop.de", 
      website:"https://www.lautsprechershop.de/chassis/main_en.htm",
      facebook:"",
      instagram:""
    }, 
    lat: 49.0779167, 
    lng: 8.3779415, 
    country_code: ["DE", "DEU"] 
  },
  { 
    name: "Lean Business Audio", 
    desc: {
      country:"UNITED KINGDOM", 
      phone:"+44 (0) 1473 744089", 
      email:"sales@lean-business.co.uk", 
      website:"https://www.lean-business.co.uk/eshop/", 
      facebook:"", 
      instagram:""
    }, 
    lat: 52.0649709, 
    lng: 1.1143322, 
    country_code: ["GB", "GBR"] 
  },
  { 
    name: "Sinar Baja Denmark (B2B Only)", 
    desc: {
      country:"DENMARK", 
      phone:"+45 2815 2633", 
      email:"info@sinarbaja.dk", 
      website:"", 
      facebook:"", 
      instagram:""
    }, 
    lat: 56.1352009, 
    lng: 9.0175999, 
    country_code: ["DK", "DNK"] 
  },
  { 
    name: "Speakerbuddies", 
    desc: {
      country:"GERMANY", 
      phone:"+49 (0) 2273-9084-0",
      email:"info@speakerbuddies.eu", 
      website:"https://www.speakerbuddies.eu/en/", 
      facebook:"", 
      instagram:""
    }, 
    lat: 50.8954225, 
    lng: 6.6738498, 
    country_code: ["DE", "DEU"] 
  },
  { 
    name: "Subing d.o.o.", 
    desc: {
      country:"CROATIA", 
      phone:"+385 91 4488 768", 
      email:"nik@subing.hr", 
      website:"https://subing.hr/", 
      facebook:"", 
      instagram:""
    }, 
    lat: 46.022733, 
    lng: 16.546145, 
    country_code: ["HR", "HRV"] 
  },
  { 
    name: "TLHP", 
    desc: {
      country:"FRANCE", 
      phone:"", 
      email:"info@tlhp.fr", 
      website:"https://www.toutlehautparleur.com/", 
      facebook:"", 
      instagram:""
    }, 
    lat: 48.006956, 
    lng: -1.603238, 
    country_code: ["FR", "FRA"] 
  },
  { 
    name: "URALTONE", 
    desc: {
      country:"FINLAND", 
      phone:"+358 44 7743 695", 
      email:"orders@uraltone.com", 
      website:"https://en.uraltone.com/", 
      facebook:"", 
      instagram:""
    }, 
    lat: 60.186457, 
    lng: 24.946798, 
    country_code: ["FI", "FIN"] 
  },
]

const americaDistributors: MapData[] = [
  { 
    name: "Madisound Speaker Components", 
    desc: {
      country:"USA , P.O.Box 44283", 
      phone:"(1) 608-831-3433 , (1) 866-883-1488", 
      email:"info@madisound.com", 
      website:"https://www.madisoundspeakerstore.com/welcome", 
      facebook:"", 
      instagram:""
    }, 
    lat: 43.0978240, 
    lng: -89.5355584, 
    country_code: ["US", "USA"] 
  },
  { 
    name: "Solen Electronique Inc.", 
    desc: {
      country:"CANADA", 
      phone:"(1) 450-656-2759",
      email:"solen@solen.ca", 
      website:"https://www.solen.ca/en", 
      facebook:"facebook.com/solenelectronique", 
      instagram:""
    }, 
    lat: 45.5063216, 
    lng: -73.4506177, 
    country_code: ["CA", "CAN"] 
  },
]

const oceaniaDistributors: MapData[] = [
  { 
    name: "WES Australasia", 
    desc: {
      country:"AUSTRALIA", 
      phone:"02 9797 9866", 
      email:"", 
      website:"https://www.wes.com.au/", 
      facebook:"", 
      instagram:""
    }, 
    lat: -33.8867673, 
    lng: 151.1395643, 
    country_code: ["AU", "AUS"] 
  },
]


const allDistributors: MapData[] = [
  ...asianDistributors,
  ...europeDistributors,
  ...americaDistributors,
  ...oceaniaDistributors
]

export default function DistributorMap() {
  const [activeMap, setActiveMap] = useState<MapData>(asianDistributors[0])
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoadingLoader, setIsLoadingLoader] = useState(true);
  const [center, setCenter]= useState<LatLngExpression>([199.3043835, -103.8495556]);
  const mapRef = useRef<L.Map | null>(null);


  useEffect(() => {
    const fetchIpAndSetMap = async () => {
      try {
        const res = await fetch('/api/ip');
        const data = await res.json();
        const res_2 = await fetch(`https://ipapi.co/${data.ip}/json/`);
        const data_2 = await res_2.json();

        const allDistributors = [
          ...asianDistributors,
          ...europeDistributors,
          ...americaDistributors,
          ...oceaniaDistributors,
        ]
        
        const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
          const toRad = (value: number) => (value * Math.PI) / 180;
          const R = 6371; // Earth radius in km
        
          const dLat = toRad(lat2 - lat1);
          const dLon = toRad(lon2 - lon1);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
          return R * c;
        };
        
        const closestDistributor = allDistributors.reduce((closest, distributor) => {
          const distributorDistance = getDistance(data_2.latitude, data_2.longitude, distributor.lat, distributor.lng);
          const closestDistance = getDistance(data_2.latitude, data_2.longitude, closest.lat, closest.lng);
        
          return distributorDistance < closestDistance ? distributor : closest;
        }, asianDistributors[0]);
        
        setActiveMap(closestDistributor);
        setCenter([closestDistributor.lat, closestDistributor.lng]);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };
  
    fetchIpAndSetMap();
  }, []);
  
  
  useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo(center, 3, { duration: 1.5 });
        }
    }, [center])
  

  const handleScrollToTop = () => {
    // Set isScrolling to true to disable pointer events
    setIsScrolling(true);

    // Start the smooth scroll to the top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Check if scrolling has reached the top every 100ms
    const scrollCheck = setInterval(() => {
      if (window.scrollY === 0) {
        // When scroll position reaches the top, clear the interval and enable pointer events
        clearInterval(scrollCheck);
        setIsScrolling(false);
      }
    }, 100);
  };

  return (
      <>
      <h1 className='sr-only'>Distributors | SB Acoustics</h1>
      <div className="w-screen h-[400px] md:h-[500px] relative">
      <div className="relative flex items-center justify-center h-full w-full">
        {/* Loader */}
        {isLoadingLoader && (
          <div className="absolute flex items-center justify-center z-0 w-10 h-10">
            <Loader2 className="animate-spin text-gray-500" size={20} />
          </div>
        )}
        <MapContainer
          center={center} // ✅ Fixed
          zoom={3}
          className='z-10 mt-12 md:h-[500px] h-[400px] w-full'
          ref={(mapInstance) => {
            if (mapInstance && !mapRef.current) {
              mapRef.current = mapInstance;
            }
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {allDistributors.map((loc) => (
            <Marker 
              key={loc.name} 
              position={[loc.lat, loc.lng]}
              icon={activeMap.name === loc.name ? activeIcon : defaultIcon}
              eventHandlers={{
                click: () => {
                  setActiveMap(loc), 
                  mapRef.current?.flyTo([loc.lat, loc.lng], 3, { duration: 1.5 });
                }
              }}>
              <Popup>{loc.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
        </div>
        <Card className="absolute m-4 md:w-full w-fit md:max-w-sm md:overflow-y-hidden overflow-y-scroll bottom-0 right-4 md:max-h-full max-h-[100px] bg-background/70 backdrop-blur-xs z-30 rounded-none">
          <CardContent className="md:p-4 p-2">
            <div className="md:text-xl text-base font-bold mb-2">{activeMap.name}</div>
            <div className="space-y-2 text-sm">
              {activeMap.desc.country && (
                <p className="flex items-center md:text-base text-xs gap-2">
                  <MapPin size={14} />
                  {activeMap.desc.country}
                </p>
              )}
              {activeMap.desc.phone && (
                <p className="flex items-center md:text-base text-xs gap-2">
                  <Phone size={14} />
                  {activeMap.desc.phone}
                </p>
              )}
              {activeMap.desc.email && (
                <p className="flex items-center md:text-base text-xs gap-2">
                  <Mail size={14} />
                  <Link href={`mailto:${activeMap.desc.email}`} className="underline">{activeMap.desc.email}</Link>
                </p>
              )}
              {activeMap.desc.website && (
                <p className="flex items-center md:text-base text-xs gap-2">
                  <Globe size={14} />
                  <Link href={activeMap.desc.website} target="_blank" rel="noopener noreferrer" className="underline">Visit Website</Link>
                </p>
              )}
              {activeMap.desc.facebook && (
                <p className="flex items-center md:text-base text-xs gap-2">
                  <Facebook size={14} />
                  <Link href={`https://facebook.com/${activeMap.desc.facebook}`} target="_blank" rel="noopener noreferrer" className="underline">facebook.com/{activeMap.desc.facebook}</Link>
                </p>
              )}
              {activeMap.desc.instagram && (
                <p className="flex items-center md:text-base text-xs gap-2">
                  <Instagram size={14} />
                  <Link href={`https://instagram.com/${activeMap.desc.instagram}`} target="_blank" rel="noopener noreferrer" className="underline">{activeMap.desc.instagram}</Link>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
    <div className="py-16 2xl:px-80 xl:px-60 lg:px-12 px-8">
      <div className='text-3xl font-bold mb-6 text-center'>
        Our Distributors
      </div>
      <div className="grid md:grid-cols-2 gap-4">
  <Card className="md:w-4/5 w-full h-[500px] shadow-lg justify-self-end rounded-none">
          <CardHeader className='bg-zinc-700 text-white py-4'>
            <h2 className='sr-only'>All Distributors in Asia for SB Acoustics</h2>
            <CardTitle>
              Asia
            </CardTitle>
          </CardHeader>
          <CardContent className='pb-4 pt-5'>
            <ScrollArea className="h-[400px] w-full">
              {asianDistributors.map((distributor, index) => (
                <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger className='w-full text-left'>
                    <div
                      className={`mb-4 p-4 bg-zinc-100 hover:text-primary hover:cursor-pointer ${activeMap === distributor? 'border-primary border-2' : ''} ${isScrolling ? ' pointer-events-none' : ''}`}
                      onMouseEnter={() => {setActiveMap(distributor); setIsLoadingLoader(true); 
                        mapRef.current?.flyTo([distributor.lat, distributor.lng], 3, { duration: 1.5 }); }}
                      onClick={handleScrollToTop}
                    >
                      <h4 className="text-lg font-semibold mb-2">{distributor.name}</h4>
                      <h5 className="text-gray-600 flex items-center">
                      {distributor.desc.country}
                      </h5>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click for more info</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
  <Card className="md:w-4/5 w-full h-[500px] shadow-lg justify-self-start rounded-none">
          <CardHeader className='bg-zinc-700 text-white py-4'>
            <h2 className='sr-only'>All Distributors in America for SB Acoustics</h2>
            <CardTitle>
              America
            </CardTitle>
          </CardHeader>
          <CardContent className='pb-4 pt-5'>
            <ScrollArea className="h-[400px] w-full">
              {americaDistributors.map((distributor, index) => (
                <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger className='w-full text-left'>
                    <div
                      className={`mb-4 p-4 bg-zinc-100 hover:text-primary hover:cursor-pointer ${activeMap === distributor? 'border-primary border-2' : ''} ${isScrolling ? ' pointer-events-none' : ''}`}
                      onMouseEnter={() => {setActiveMap(distributor); setIsLoadingLoader(true); 
                        mapRef.current?.flyTo([distributor.lat, distributor.lng], 3, { duration: 1.5 });}}
                      onClick={handleScrollToTop}
                    >
                      <h4 className="text-lg font-semibold mb-2">{distributor.name}</h4>
                      <h5 className="text-gray-600 flex items-center">
                      {distributor.desc.country}
                      </h5>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click for more info</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
  <Card className="md:w-4/5 w-full h-[500px] shadow-lg justify-self-end rounded-none">
          <CardHeader className='bg-zinc-700 text-white py-4'>
            <h2 className='sr-only'>All Distributors in Europe for SB Acoustics</h2>
            <CardTitle>
              Europe
            </CardTitle>
          </CardHeader>
          <CardContent className='pb-4 pt-5'>
            <ScrollArea className="h-[400px] w-full">
              {europeDistributors.map((distributor, index) => (
                <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger className='w-full text-left'>
                    <div
                      className={`mb-4 p-4 bg-zinc-100 hover:text-primary hover:cursor-pointer ${activeMap === distributor? 'border-primary border-2' : ''} ${isScrolling ? ' pointer-events-none' : ''}`}
                      onMouseEnter={() => {setActiveMap(distributor); setIsLoadingLoader(true); 
                        mapRef.current?.flyTo([distributor.lat, distributor.lng], 3, { duration: 1.5 });}}
                      onClick={handleScrollToTop}
                    >
                      <h4 className="text-lg font-semibold mb-2">{distributor.name}</h4>
                      <h5 className="text-gray-600 flex items-center">
                      {distributor.desc.country}
                      </h5>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click for more info</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
  <Card className="md:w-4/5 w-full h-[500px] shadow-lg justify-self-start rounded-none">
          <CardHeader className='bg-zinc-700 text-white py-4'>
            <h2 className='sr-only'>All Distributors in Oceania for SB Acoustics</h2>
            <CardTitle>
              Oceania
            </CardTitle>
          </CardHeader>
          <CardContent className='pb-4 pt-5'>
            <ScrollArea className="h-[400px] w-full">
              {oceaniaDistributors.map((distributor, index) => (
                <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger className='w-full text-left'>
                    <div
                      className={`mb-4 p-4 bg-zinc-100 hover:text-primary hover:cursor-pointer ${activeMap === distributor? 'border-primary border-2' : ''} ${isScrolling ? ' pointer-events-none' : ''}`}
                      onMouseEnter={() => { setActiveMap(distributor); setIsLoadingLoader(true);
                        mapRef.current?.flyTo([distributor.lat, distributor.lng], 3, { duration: 1.5 });}}
                      onClick={handleScrollToTop}
                    >
                      <h4 className="text-lg font-semibold mb-2">{distributor.name}</h4>
                      <h5 className="text-gray-600 flex items-center">
                      {distributor.desc.country}
                      </h5>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click for more info</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  )
}
