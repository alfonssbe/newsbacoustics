// "use client"

// import { usePathname } from 'next/navigation';
// import SearchBox from '../../../components/searchbox';
// import Link from 'next/link';
// import Image from 'next/image';
// import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '../../../components/ui/navigation-menu';
// import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../../../components/ui/sheet';
// import { Button } from '../../../components/ui/button';
// import { ChevronRight, Loader2, Menu } from 'lucide-react';
// import { NavbarComponents, NavbarProducts, NewProduct, PriorityMenu } from '../types';
// import { getAllNavbarContentUtils } from '../utils/get-data';
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordionmobilemenu';
// import getAllNewProducts from '../actions/get-all-new-products';
// import SearchBoxNavbar from '../../../components/searchboxnavbar';
// import { DriversMenu, EmptyMenu, KitsMenu, MidrangesSubMenu, MidwoofersSubMenu, OEMMidwoofersSubMenu, OEMSubMenu, SubwoofersDefaultSubMenu, TweetersSubMenu, WidebandersDefaultSubMenu, WoofersSubMenu } from '@/lib/navbar-content';
// import { useEffect, useState } from 'react';



// const styledDropdown = "text-sm px-1 py-2 text-foreground"






// function Navbar() {
//   const [driverMenu, setDriversMenu] = useState<NavbarComponents[]>(EmptyMenu)
//   const [driversubMenu, setDriversSubMenu] = useState<NavbarComponents[]>(EmptyMenu)
//   const [driversubsubMenu, setDriversSubSubMenu] = useState<NavbarComponents[]>(EmptyMenu)
//   const [driversubsubsubMenu, setDriversSubSubSubMenu] = useState<NavbarComponents[]>(EmptyMenu)
//   const [driversubMenuUrl, setDriversSubMenuUrl] = useState<string>('')
//   const [driversubsubMenuUrl, setDriversSubSubMenuUrl] = useState<string>('')
//   const [driversubsubsubMenuUrl, setDriversSubSubSubMenuUrl] = useState<string>('')
//   const [activedriverhovered, setactivedriverhovered] = useState<string>('')
//   const [activekitshovered, setactivekitshovered] = useState<string>('')
//   const [pictureSlugUrl, setPictureSlugUrl] = useState<string>('')
//   const [pictureDesc, setPictureDesc] = useState<string>('')
//   const [nameForHoveredPicture, setnameForHoveredPicture] = useState<string>('')
//   const [_, setLoading] = useState(true);
//   const [_2, setOpenedContentForBg] = useState(false);
  
  
//   //FOR SEARCHING SUB MENU CONTENT
//   const [driverSubMenuMapping, setDriverSubMenuMapping] = useState<Record<string, NavbarComponents[]>>({});
//   const [driverSubSubMenuMapping, setDriverSubSubMenuMapping] = useState<Record<string, NavbarComponents[]>>({});
//   const [driverSubSubSubMenuMapping, setDriverSubSubSubMenuMapping] = useState<Record<string, NavbarComponents[]>>({});
//   const [kitsSubMenuMapping, setKitsSubMenuMapping] = useState<Record<string, NavbarComponents[]>>({});



//   //KITS
//   const [kitMenu, setKitMenu] = useState<NavbarComponents[]>(EmptyMenu)
//   const [kitssubMenu, setKitsSubMenu] = useState<NavbarComponents[]>([])


//   //NEW PRODUCTS
//   const [newProductsMenu, setnewProductsMenu] = useState<NewProduct[]>([])
//   const [newKitsMenu, setnewKitsMenu] = useState<NewProduct[]>([])

//   //TEST
//   const [WidebandersSubMenu, setWidebandersSubMenu] = useState<NavbarComponents[]>([])
//   const [SubwoofersSubMenu, setSubwoofersSubMenu] = useState<NavbarComponents[]>([])
//   const [PassiveRadiatorsSubMenu, setPassiveRadiatorsSubMenu] = useState<NavbarComponents[]>([])
//   const [CoaxialsSubMenu, setCoaxialsSubMenu] = useState<NavbarComponents[]>([])
  
//   //KITS
//   const [SBAcousticsKitsSubMenu, setSBAcousticsKitsSubMenu] = useState<NavbarComponents[]>([])
//   const [OpenSourceKitsSubMenu, setOpenSourceKitsSubMenu] = useState<NavbarComponents[]>([])
//   const [AccessoriesSubMenu, setAccessoriesSubMenu] = useState<NavbarComponents[]>([])
  


//   useEffect(() => {
 

//     let tempDomeTweeter: NavbarComponents[] = []
//     let tempRingRadiators: NavbarComponents[] = []
//     let tempSATORITweeters: NavbarComponents[] = []
    

//     let tempNRXMidranges: NavbarComponents[] = []
//     let tempSATORIMidranges: NavbarComponents[] = []

//     let tempCACMidwoofers: NavbarComponents[] = []
//     let tempCRCMidwoofers: NavbarComponents[] = []
//     let tempMFCMidwoofers: NavbarComponents[] = []
//     let tempNBACMidwoofers: NavbarComponents[] = []
//     let tempNRXMidwoofers: NavbarComponents[] = []
//     let tempPACMidwoofers: NavbarComponents[] = []
//     let tempPFCRMidwoofers: NavbarComponents[] = []
//     let tempSATORIMidwoofers: NavbarComponents[] = []
//     let tempSFCRMidwoofers: NavbarComponents[] = []

//     let tempCACWoofers: NavbarComponents[] = []
//     let tempPFCRWoofers: NavbarComponents[] = []
//     let tempSFCLWoofers: NavbarComponents[] = []
//     let tempNRXWoofers: NavbarComponents[] = []
//     let tempNBACWoofers: NavbarComponents[] = []
//     let tempSATORIWoofers: NavbarComponents[] = []

//     let tempTweetersOEM: NavbarComponents[] = []
//     let tempMidrangesOEM: NavbarComponents[] = []
//     let tempMidwoofersOEM: NavbarComponents[] = []
//     let tempWoofersOEM: NavbarComponents[] = []
//     let tempSubwoofersOEM: NavbarComponents[] = []
//     let tempShallowSubwoofersOEM: NavbarComponents[] = []
//     let tempPassiveRadiatorsOEM: NavbarComponents[] = []
//     let tempCoaxialsOEM: NavbarComponents[] = []

//     let tempNBACMidwoofersOEM: NavbarComponents[] = []
//     let tempNRXMidwoofersOEM: NavbarComponents[] = []
//     let tempPFCRMidwoofersOEM: NavbarComponents[] = []
//     let tempSATORIMidwoofersOEM: NavbarComponents[] = []


//     //TEST
//     let tempWidebanders: NavbarComponents[] = []
//     let tempFullRanges: NavbarComponents[] = []
//     let tempSubwoofers: NavbarComponents[] = []
//     let tempShallowSubwoofers: NavbarComponents[] = []
//     let tempPassiveRadiators: NavbarComponents[] = []
//     let tempCoaxials: NavbarComponents[] = []

//     //KITS
//     let tempSBAcousticsKits: NavbarComponents[] = []
//     let tempOpenSourceKits: NavbarComponents[] = []
//     let tempAccessories: NavbarComponents[] = []

//     //CONDITIONS
//     const DomeTweetersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Tweeters' },
//       { type: 'Sub Sub Category', name: 'Dome Tweeters' }
//     ];
//     const RingRadiatorsConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Tweeters' },
//       { type: 'Sub Sub Category', name: 'Ring Radiators' }
//     ];
//     const SATORITweetersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Tweeters' },
//       { type: 'Sub Sub Category', name: 'SATORI Tweeters' }
//     ];

//     const NRXMidrangesConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Midranges' },
//       { type: 'Sub Sub Category', name: 'NRX Midranges' }
//     ];
//     const SATORIMidrangesConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Midranges' },
//       { type: 'Sub Sub Category', name: 'SATORI Midranges' }
//     ];

    
//     const CACMidwoofersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Midwoofers' },
//       { type: 'Sub Sub Category', name: 'CAC Midwoofers' }
//     ];
//     const CRCMidwoofersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Midwoofers' },
//       { type: 'Sub Sub Category', name: 'CRC Midwoofers' }
//     ];
//     const MFCMidwoofersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Midwoofers' },
//       { type: 'Sub Sub Category', name: 'MFC Midwoofers' }
//     ];
//     const NBACMidwoofersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Midwoofers' },
//       { type: 'Sub Sub Category', name: 'NBAC Midwoofers' }
//     ];
//     const NRXMidwoofersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Midwoofers' },
//       { type: 'Sub Sub Category', name: 'NRX Midwoofers' }
//     ];
//     const PACMidwoofersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Midwoofers' },
//       { type: 'Sub Sub Category', name: 'PAC Midwoofers' }
//     ];
//     const PFCRMidwoofersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Midwoofers' },
//       { type: 'Sub Sub Category', name: 'PFCR Midwoofers' }
//     ];
//     const SATORIMidwoofersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Midwoofers' },
//       { type: 'Sub Sub Category', name: 'SATORI Midwoofers' }
//     ];
//     const SFCRMidwoofersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Midwoofers' },
//       { type: 'Sub Sub Category', name: 'SFCR Midwoofers' }
//     ];


//     const CACWoofersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Woofers' },
//       { type: 'Sub Sub Category', name: 'CAC Woofers' }
//     ];
//     const PFCRWoofersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Woofers' },
//       { type: 'Sub Sub Category', name: 'PFCR Woofers' }
//     ];
//     const SFCLWoofersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Woofers' },
//       { type: 'Sub Sub Category', name: 'SFCL Woofers' }
//     ];
//     const NRXWoofersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Woofers' },
//       { type: 'Sub Sub Category', name: 'NRX Woofers' }
//     ];
//     const NBACWoofersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Woofers' },
//       { type: 'Sub Sub Category', name: 'NBAC Woofers' }
//     ];
//     const SATORIWoofersConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'Woofers' },
//       { type: 'Sub Sub Category', name: 'SATORI Woofers' }
//     ];

    
//     const TweetersOEMConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'OEM' },
//       { type: 'Sub Sub Category', name: 'Tweeters OEM' }
//     ];   
//     const MidrangesOEMConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'OEM' },
//       { type: 'Sub Sub Category', name: 'Midranges OEM' }
//     ];   
//     const MidwoofersOEMConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'OEM' },
//       { type: 'Sub Sub Category', name: 'Midwoofers OEM' }
//     ];   
//     const WoofersOEMConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'OEM' },
//       { type: 'Sub Sub Category', name: 'Woofers OEM' }
//     ];   
//     const SubwoofersOEMConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'OEM' },
//       { type: 'Sub Sub Category', name: 'Subwoofers OEM' }
//     ];   
//     const ShallowSubwoofersOEMConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'OEM' },
//       { type: 'Sub Sub Category', name: 'Shallow Subwoofers OEM' }
//     ];   
//     const PassiveRadiatorsOEMConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'OEM' },
//       { type: 'Sub Sub Category', name: 'Passive Radiators OEM' }
//     ];   
//     const CoaxialsOEMConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'OEM' },
//       { type: 'Sub Sub Category', name: 'Coaxials OEM' }
//     ];


    
//     const NBACMidwoofersOEMConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'OEM' },
//       { type: 'Sub Sub Category', name: 'NBAC Midwoofers OEM' }
//     ];   
//     const NRXMidwoofersOEMConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'OEM' },
//       { type: 'Sub Sub Category', name: 'NRX Midwoofers OEM' }
//     ];   
//     const PFCRMidwoofersOEMConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'OEM' },
//       { type: 'Sub Sub Category', name: 'PFCR Midwoofers OEM' }
//     ];   
//     const SATORIMidwoofersOEMConditions = [
//       { type: 'Category', name: 'Drivers' },
//       { type: 'Sub Category', name: 'OEM' },
//       { type: 'Sub Sub Category', name: 'SATORI Midwoofers OEM' }
//     ];   
    


    
//     //TEST
//     const WidebandersConditions = [
//       { type: 'Sub Category', name: 'Widebanders' },
//     ];
//     const FullRangesConditions = [
//       { type: 'Sub Category', name: 'Full Ranges' },
//     ];
//     const SubwoofersConditions = [
//       { type: 'Sub Category', name: 'Subwoofers' },
//     ];
//     const ShallowSubwoofersConditions = [
//       { type: 'Sub Category', name: 'Shallow Subwoofers' },
//     ];
//     const PassiveRadiatorsConditions = [
//       { type: 'Sub Category', name: 'Passive Radiators' },
//     ];
//     const CoaxialsConditions = [
//       { type: 'Sub Category', name: 'Coaxials' },
//     ];

//     //KITS
//     const SBAcousticsKitsConditions = [
//       { type: 'Category', name: 'Kits' },
//       { type: 'Sub Category', name: 'SB Acoustics Kits' },
//     ];   
//     const OpenSourceKitsConditions = [
//       { type: 'Category', name: 'Kits' },
//       { type: 'Sub Category', name: 'Open Source Kits' },
//     ];   
//     const AccessoriesConditions = [
//       { type: 'Category', name: 'Kits' },
//       { type: 'Sub Category', name: 'Accessories' },
//     ];


//     async function fetchData() {
//       try {
//         const [navbarData, priority]: [NavbarProducts[], PriorityMenu[]] = await getAllNavbarContentUtils(pathname);
//         const [tempNewKits, tempNewProduct]: [NewProduct[], NewProduct[]] = await getAllNewProducts(pathname);
//         // setValue(navbarData);
//         setDriversSubMenu(EmptyMenu)


//         const conditionsAndTemps = [
//           { conditions: DomeTweetersConditions, tempArray: tempDomeTweeter },
//           { conditions: RingRadiatorsConditions, tempArray: tempRingRadiators },
//           { conditions: SATORITweetersConditions, tempArray: tempSATORITweeters },
//           { conditions: NRXMidrangesConditions, tempArray: tempNRXMidranges },
//           { conditions: SATORIMidrangesConditions, tempArray: tempSATORIMidranges },
//           { conditions: CACMidwoofersConditions, tempArray: tempCACMidwoofers },
//           { conditions: CRCMidwoofersConditions, tempArray: tempCRCMidwoofers },
//           { conditions: MFCMidwoofersConditions, tempArray: tempMFCMidwoofers },
//           { conditions: NBACMidwoofersConditions, tempArray: tempNBACMidwoofers },
//           { conditions: NRXMidwoofersConditions, tempArray: tempNRXMidwoofers },
//           { conditions: PACMidwoofersConditions, tempArray: tempPACMidwoofers },
//           { conditions: PFCRMidwoofersConditions, tempArray: tempPFCRMidwoofers },
//           { conditions: SATORIMidwoofersConditions, tempArray: tempSATORIMidwoofers },
//           { conditions: SFCRMidwoofersConditions, tempArray: tempSFCRMidwoofers },
//           { conditions: CACWoofersConditions, tempArray: tempCACWoofers },
//           { conditions: PFCRWoofersConditions, tempArray: tempPFCRWoofers },
//           { conditions: SFCLWoofersConditions, tempArray: tempSFCLWoofers },
//           { conditions: NRXWoofersConditions, tempArray: tempNRXWoofers },
//           { conditions: NBACWoofersConditions, tempArray: tempNBACWoofers },
//           { conditions: SATORIWoofersConditions, tempArray: tempSATORIWoofers },
//           { conditions: TweetersOEMConditions, tempArray: tempTweetersOEM },
//           { conditions: MidrangesOEMConditions, tempArray: tempMidrangesOEM },
//           { conditions: MidwoofersOEMConditions, tempArray: tempMidwoofersOEM },
//           { conditions: WoofersOEMConditions, tempArray: tempWoofersOEM },
//           { conditions: SubwoofersOEMConditions, tempArray: tempSubwoofersOEM },
//           { conditions: ShallowSubwoofersOEMConditions, tempArray: tempShallowSubwoofersOEM },
//           { conditions: PassiveRadiatorsOEMConditions, tempArray: tempPassiveRadiatorsOEM },
//           { conditions: CoaxialsOEMConditions, tempArray: tempCoaxialsOEM },
//           { conditions: NBACMidwoofersOEMConditions, tempArray: tempNBACMidwoofersOEM },
//           { conditions: NRXMidwoofersOEMConditions, tempArray: tempNRXMidwoofersOEM },
//           { conditions: PFCRMidwoofersOEMConditions, tempArray: tempPFCRMidwoofersOEM },
//           { conditions: SATORIMidwoofersOEMConditions, tempArray: tempSATORIMidwoofersOEM },



//           //TEST
//           { conditions: WidebandersConditions, tempArray: tempWidebanders },
//           { conditions: FullRangesConditions, tempArray: tempFullRanges },
//           { conditions: SubwoofersConditions, tempArray: tempSubwoofers },
//           { conditions: ShallowSubwoofersConditions, tempArray: tempShallowSubwoofers },
//           { conditions: PassiveRadiatorsConditions, tempArray: tempPassiveRadiators },
//           { conditions: CoaxialsConditions, tempArray: tempCoaxials },

//           //KITS
//           { conditions: SBAcousticsKitsConditions, tempArray: tempSBAcousticsKits },
//           { conditions: OpenSourceKitsConditions, tempArray: tempOpenSourceKits },
//           { conditions: AccessoriesConditions, tempArray: tempAccessories },

//         ];
    
//         // Loop through navbarData and check every condition
//         navbarData.forEach((product) => {
//           conditionsAndTemps.forEach(({ conditions, tempArray }) => {
//             const meetsConditions = conditions.every(condition =>
//               product.categories.some(cat => cat.type === condition.type && cat.name === condition.name)
//             );

//             if (meetsConditions) {

//               const productPriority = priority.find((val) =>
//                 val.productName === product.name &&
//                 conditions.find((cat) => cat.name === val.categoryName)
//               )?.priority ?? '999';

//               const newItem = {
//                 title: product.name,
//                 href: product.href,
//                 parent: "",
//                 url: product.url,
//                 imageDesc: product.navbarNotes,
//                 priority: productPriority,
//                 newProd: product.newProduct,
//                 hasProduct: false
//               };

//               // Insert `newItem` into `tempArray` at correct sorted position
//               const indexToInsert = tempArray.findIndex(
//                 (item) => Number(productPriority) < Number(item.priority)
//               );

//               if (indexToInsert === -1) {
//                 tempArray.push(newItem);
//               } else {
//                 tempArray.splice(indexToInsert, 0, newItem);
//               }
//             }
//           });
//         });



//         //TEST
//         WidebandersDefaultSubMenu.forEach((product) => {
//           tempWidebanders.push(product)
//         })
//         setWidebandersSubMenu(tempWidebanders)
//         SubwoofersDefaultSubMenu.forEach((product) => {
//           tempSubwoofers.push(product)
//         })
//         setSubwoofersSubMenu(tempSubwoofers)

//         setPassiveRadiatorsSubMenu(tempPassiveRadiators)
//         setCoaxialsSubMenu(tempCoaxials)

//         setSBAcousticsKitsSubMenu(tempSBAcousticsKits)
//         setOpenSourceKitsSubMenu(tempOpenSourceKits)
//         setAccessoriesSubMenu(tempAccessories)

//         //NEW PRODUCTS
//         setnewProductsMenu(tempNewProduct)
//         setnewKitsMenu(tempNewKits)



//         const submenuMappingDriver: Record<string, NavbarComponents[]> = {
//           "Tweeters-Drivers": TweetersSubMenu,
//           "Widebanders / Full Ranges-Drivers": tempWidebanders,
//           "Midranges-Drivers": MidrangesSubMenu,
//           "Midwoofers-Drivers": MidwoofersSubMenu,
//           "Woofers-Drivers": WoofersSubMenu,
//           "Subwoofers-Drivers": tempSubwoofers,
//           "Passive Radiators-Drivers": tempPassiveRadiators,
//           "Coaxials-Drivers": tempCoaxials,
//           "OEM-Drivers": OEMSubMenu,
//         };
//         setDriverSubMenuMapping(submenuMappingDriver)


//         const subsubmenuMappingDriver: Record<string, NavbarComponents[]> = {
//           "Dome Tweeters-Tweeters": tempDomeTweeter,
//           "Ring Radiators-Tweeters": tempRingRadiators,
//           "SATORI Tweeters-Tweeters": tempSATORITweeters,
//           "Full Ranges-Widebanders / Full Ranges": tempFullRanges,
//           // "Filler Drivers-Midranges": tempFillerDrivers,
//           "NRX Midranges-Midranges": tempNRXMidranges,
//           "SATORI Midranges-Midranges": tempSATORIMidranges,
//           "CAC Midwoofers-Midwoofers": tempCACMidwoofers,
//           "CRC Midwoofers-Midwoofers": tempCRCMidwoofers,
//           "MFC Midwoofers-Midwoofers": tempMFCMidwoofers,
//           "NBAC Midwoofers-Midwoofers": tempNBACMidwoofers,
//           "NRX Midwoofers-Midwoofers": tempNRXMidwoofers,
//           "PAC Midwoofers-Midwoofers": tempPACMidwoofers,
//           "PFCR Midwoofers-Midwoofers": tempPFCRMidwoofers,
//           "SATORI Midwoofers-Midwoofers": tempSATORIMidwoofers,
//           "SFCR Midwoofers-Midwoofers": tempSFCRMidwoofers,
//           "CAC Woofers-Woofers": tempCACWoofers,
//           "PFCR Woofers-Woofers": tempPFCRWoofers,
//           "SFCL Woofers-Woofers": tempSFCLWoofers,
//           "NRX Woofers-Woofers": tempNRXWoofers,
//           "NBAC Woofers-Woofers": tempNBACWoofers,
//           "SATORI Woofers-Woofers": tempSATORIWoofers,
//           "Shallow Subwoofers-Subwoofers": tempShallowSubwoofers,
//           "Tweeters OEM-OEM": tempTweetersOEM,
//           "Midranges OEM-OEM": tempMidrangesOEM,
//           "Midwoofers OEM-OEM": OEMMidwoofersSubMenu,
//           "Woofers OEM-OEM": tempWoofersOEM,
//           "Subwoofers OEM-OEM": tempSubwoofersOEM,
//           "Shallow Subwoofers OEM-OEM": tempShallowSubwoofersOEM,
//           "Passive Radiators OEM-OEM": tempPassiveRadiatorsOEM,
//           "Coaxials OEM-OEM": tempCoaxialsOEM,
//         };
//         setDriverSubSubMenuMapping(subsubmenuMappingDriver)


//         const subSubSubMenuMappingDriver: Record<string, NavbarComponents[]> = {
//           "NBAC Midwoofers OEM-OEM Midwoofers": tempNBACMidwoofersOEM,
//           "NRX Midwoofers OEM-OEM Midwoofers": tempNRXMidwoofersOEM,
//           "PFCR Midwoofers OEM-OEM Midwoofers": tempPFCRMidwoofersOEM,
//           "SATORI Midwoofers OEM-OEM Midwoofers": tempSATORIMidwoofersOEM,
//         };
//         setDriverSubSubSubMenuMapping(subSubSubMenuMappingDriver)


//         const submenuMappingKits: Record<string, NavbarComponents[]> = {
//           "SB Acoustics Kits-Kits": tempSBAcousticsKits,
//           "Open Source Kits-Kits": tempOpenSourceKits,
//           "Accessories-Kits": tempAccessories,
//           // "Discontinued-Kits": tempDiscontinued,
//         };
//         setKitsSubMenuMapping(submenuMappingKits)



//       } catch (error) {
//         console.error('Error fetching navbar products:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();

    
//   }, []);

//   const [isLgScreen, setIsLgScreen] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(min-width: 1024px)');
//     const handleResize = (e: MediaQueryListEvent) => {
//       setIsLgScreen(e.matches);
//     };

//     // Set initial value
//     setIsLgScreen(mediaQuery.matches);

//     // Add event listener
//     mediaQuery.addEventListener('change', handleResize);

//     // Cleanup listener on unmount
//     return () => {
//       mediaQuery.removeEventListener('change', handleResize);
//     };
//   }, []);
//   const pathname = usePathname()
//   const [hoveredDriverMenu, setHoveredDriverMenu] = useState("");
//   const [hoveredDriverSubMenu, setHoveredDriverSubMenu] = useState("");
//   const [hoveredDriverSubSubMenu, setHoveredDriverSubSubMenu] = useState("");
//   const [hoveredKitsMenu, setHoveredKitsMenu] = useState("");
//   const [height, setHeight] = useState<number>(700);


//   function searchSubMenu(name: string, parent: string) { 
//     const key = `${name}-${parent}`;
//     // console.log(key)
//     if (driverSubMenuMapping[key]) {
//       // console.log("MASOK 1")
//       // console.log(driverSubMenuMapping)
//       setDriversSubMenu(driverSubMenuMapping[key]);
//     }
//   }  


//   function searchSubSubMenu(name: string, parent: string) {
//     const key = `${name}-${parent}`;
//     if (driverSubSubMenuMapping[key]) {
//       // console.log("MASOK 2")
//       // console.log("Key: ", key)
//       // console.log(driverSubSubMenuMapping[key])
//       setDriversSubSubMenu(driverSubSubMenuMapping[key]);
//       setDriversSubSubSubMenu(EmptyMenu);
//       setHoveredDriverSubMenu(name);
//       setHoveredDriverSubSubMenu("");
//       setHoveredKitsMenu("");
//     }
//   }


//   function searchKitsMenu(name: string, parent: string) {
//     const key = `${name}-${parent}`;
//     if (kitsSubMenuMapping[key]) {
//       setKitsSubMenu(kitsSubMenuMapping[key]);
//     }
//   }


//   function searchSubSubSubMenu(name: string, parent: string) {
//     const key = `${name}-${parent}`;
//     if (driverSubSubSubMenuMapping[key]) {
//       // console.log("MASOK 3")
//       setDriversSubSubSubMenu(driverSubSubSubMenuMapping[key]);
//       setHoveredDriverSubSubMenu(name);
//       setHoveredKitsMenu("");
//     }
//   }

  
//   const [navbarBg, setNavbarBg] = useState(false);

//   // Handle scrolling and changing the background of the navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 0) { // Change this value based on when you want the background to change
//         setNavbarBg(true);
//       } else {
//         setNavbarBg(false);
//       }
//     };
    
//     handleScroll()

//     window.addEventListener('scroll', handleScroll);

//     // Cleanup event listener on component unmount
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Enter') {
//         setOpenedContentForBg(false);
//       }
//     };
  
//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);
    


//   useEffect(() => {
//     // Function to update height
//     if(window){
//       const updateHeight = () => setHeight(window.innerHeight);

//       // Set initial height
//       updateHeight();

//       // Listen for window resize events
//       window.addEventListener("resize", updateHeight);

//       // Cleanup event listener on unmount
//       return () => window.removeEventListener("resize", updateHeight);
//     }
//   }, []);

//   return ( 
//   <div className={`${height > 600 ? 'fixed' : 'absolute'} left-0 z-40 bg-transparent`}>
//     <nav className={`${height > 600 ? 'fixed w-full' : 'w-screen'} xl:px-16 lg:px-12 px-8 py-4 h-fit transition-all duration-200 ease-in-out ${navbarBg ? 'bg-background shadow-lg' : pathname.includes('distributors')? '':''}`}>
//       <div className="flex items-center justify-between">
//         <div className="w-1/4 flex">
//           <Link
//             href={pathname.includes('sbaudience') ? '/sbaudience' : '/'}
//             className="flex items-center"
//           >
//             <div className="relative overflow-hidden flex items-center justify-center h-full max-w-[150px]">
//               <Image
//                 src={pathname.includes('sbaudience') ? '/images/sbaudience/logo_sbaudience.webp' : '/images/sbacoustics/logo_sbacoustics_black_clean.webp'}
//                 className="cursor-pointer max-w-[150px] h-8 z-101 object-contain"
//                 alt={pathname.includes('sbaudience') ? "Logo of SB Audience" : "Logo of SB Acoustics"}
//                 width={200}
//                 height={50}
//                 priority
//               />  
//             </div>
//           </Link>
//         </div>
//         <div className="w-1/2 hidden lg:flex justify-center relative z-100">
//           <NavigationMenu>
//             <NavigationMenuList className="flex items-center">
//               <NavigationMenuItem>
//                 {/* Drivers Menu Trigger */}
//                 <Link href="/drivers" passHref>
//                   <div className="p-0 relative z-101">
//                     <NavigationMenuTrigger
//                       className={navigationMenuTriggerStyle().concat(
//                         " bg-transparent text-foreground hover:text-primary z-101 relative"
//                       )}
//                       onMouseLeave={() => setOpenedContentForBg(false)}
//                       onMouseEnter={() => {
//                         setHoveredDriverMenu("");
//                         setHoveredDriverSubMenu("");
//                         setHoveredDriverSubSubMenu("");
//                         setHoveredKitsMenu("");
//                         setDriversSubMenu(EmptyMenu);
//                         setDriversSubSubMenu(EmptyMenu);
//                         setDriversSubSubSubMenu(EmptyMenu);
//                         setKitsSubMenu(EmptyMenu);
//                         setDriversSubMenuUrl("");
//                         setPictureSlugUrl("");
//                         setPictureDesc("");
//                         setactivedriverhovered("");
//                         setDriversSubSubMenuUrl("");
//                         setDriversSubSubSubMenuUrl("");
//                         setOpenedContentForBg(true);
//                       }}
//                     >
//                       Drivers
//                     </NavigationMenuTrigger>
//                   </div>
//                 </Link>

//                 {/* Drivers Submenu Content */}
//                 {/* {openedContentForBg && */}
//                 <NavigationMenuContent
//                   className="relative z-50" // Lower z-index
//                   onMouseLeave={() => setOpenedContentForBg(false)}
//                   onMouseEnter={() => setOpenedContentForBg(true)}
//                 >
//                   <div className='xl:pl-[72px] xl:pr-[72px] lg:pl-[56px] lg:pr-[56px] px-8 py-4 pt-20'>
//                     <SearchBoxNavbar/>
//                   </div>
//                   <div className="grid grid-cols-5 w-screen xl:px-16 lg:px-12 px-8 py-4 h-[550px]">
//                     <div className={`overflow-y-auto overflow-x-hidden border-r-2 z-40 bg-background`}>
//                       <ul className="gap-1 p-1">
//                         {/* Tweeters Submenu */}
//                         {/* <Link href={"/drivers/tweeters"} passHref> */}
//                           <NavigationMenuLink href={"/drivers/tweeters"}>
//                             <div
//                               onMouseEnter={() => {
//                                 setHoveredDriverMenu("Tweeters");
//                                 setHoveredDriverSubMenu("");
//                                 setHoveredDriverSubSubMenu("");
//                                 setHoveredKitsMenu("");
//                                 setactivedriverhovered("");
//                                 setDriversSubMenu(TweetersSubMenu);
//                                 setDriversSubSubMenu(EmptyMenu);
//                                 setDriversSubSubSubMenu(EmptyMenu);
//                                 setKitsSubMenu(EmptyMenu);
//                                 setDriversSubMenuUrl("");
//                                 setDriversSubSubMenuUrl("");
//                                 setDriversSubSubSubMenuUrl("");
//                               }}
//                               className={`px-2 transform duration-200 ${
//                                 hoveredDriverMenu === "Tweeters" ? "translate-x-2" : ""
//                               }`}
//                             >
//                               <div
//                                 className={`${styledDropdown} flex justify-between items-center align-middle ${
//                                   hoveredDriverMenu === "Tweeters" ? "text-primary" : ""
//                                 }`}
//                               >
//                                 Tweeters
//                                 <ChevronRight
//                                   size={15}
//                                   className={`pb-1 ${
//                                     hoveredDriverMenu === "Tweeters"
//                                       ? "text-primary"
//                                       : ""
//                                   }`}
//                                 />
//                               </div>
//                             </div>
//                           </NavigationMenuLink>
//                         {/* </Link> */}
//                         {/* <Link href={"/drivers/widebanders"} passHref> */}
//                           <NavigationMenuLink href={"/drivers/widebanders"}>
//                             <div
//                               onMouseEnter={() => {
//                                 setHoveredDriverMenu("Widebanders / Full Ranges");
//                                 setHoveredDriverSubMenu("");
//                                 setHoveredDriverSubSubMenu("");
//                                 setHoveredKitsMenu("");
//                                 setactivedriverhovered("");
//                                 setDriversSubMenu(WidebandersSubMenu);
//                                 setDriversSubSubMenu(EmptyMenu);
//                                 setDriversSubSubSubMenu(EmptyMenu);
//                                 setKitsSubMenu(EmptyMenu);
//                                 setDriversSubMenuUrl('');
//                                 setDriversSubSubMenuUrl('');
//                                 setDriversSubSubSubMenuUrl('');
//                               }}
//                               className={`px-2 transform duration-200 ${hoveredDriverMenu === "Widebanders / Full Ranges" ? 'translate-x-2' : ''}`}
//                             >
//                               <div className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredDriverMenu==="Widebanders / Full Ranges" ? 'text-primary' : ''}`}>
//                                 Widebanders / Full Ranges
//                                 <ChevronRight size={15} className={`pb-1 ${hoveredDriverMenu==="Widebanders / Full Ranges" ? ' text-primary' : ''}`}/>
//                               </div>
//                             </div>
//                           </NavigationMenuLink>
//                         {/* </Link> */}
//                         {/* <Link href={"/drivers/midranges"} passHref> */}
//                           <NavigationMenuLink href={"/drivers/midranges"}>
//                             <div
//                               onMouseEnter={() => {
//                                 setHoveredDriverMenu("Midranges");
//                                 setHoveredDriverSubMenu("");
//                                 setHoveredDriverSubSubMenu("");
//                                 setHoveredKitsMenu("");
//                                 setactivedriverhovered("");
//                                 setDriversSubMenu(MidrangesSubMenu);
//                                 setDriversSubSubMenu(EmptyMenu);
//                                 setDriversSubSubSubMenu(EmptyMenu);
//                                 setKitsSubMenu(EmptyMenu);
//                                 setDriversSubMenuUrl('');
//                                 setDriversSubSubMenuUrl('');
//                                 setDriversSubSubSubMenuUrl('');
//                               }}
//                               className={`px-2 transform duration-200 ${hoveredDriverMenu === "Midranges" ? 'translate-x-2' : ''}`}
//                             >
//                               <div title="Midranges" className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredDriverMenu==="Midranges" ? 'text-primary' : ''}`}>
//                                 Midranges
//                                 <ChevronRight size={15} className={`pb-1 ${hoveredDriverMenu==="Midranges" ? ' text-primary' : ''}`}/>
//                               </div>
//                             </div>
//                           </NavigationMenuLink>
//                         {/* </Link> */}
//                         {/* <Link href={"/drivers/midwoofers"} passHref> */}
//                           <NavigationMenuLink href={"/drivers/midwoofers"}>
//                             <div
//                               onMouseEnter={() => {
//                                 setHoveredDriverMenu("Midwoofers");
//                                 setHoveredDriverSubMenu("");
//                                 setHoveredDriverSubSubMenu("");
//                                 setHoveredKitsMenu("");
//                                 setactivedriverhovered("");
//                                 setDriversSubMenu(MidwoofersSubMenu);
//                                 setDriversSubSubMenu(EmptyMenu);
//                                 setDriversSubSubSubMenu(EmptyMenu);
//                                 setKitsSubMenu(EmptyMenu);
//                                 setDriversSubMenuUrl('');
//                                 setDriversSubSubMenuUrl('');
//                                 setDriversSubSubSubMenuUrl('');
//                               }}
//                               className={`px-2 transform duration-200 ${hoveredDriverMenu === "Midwoofers" ? 'translate-x-2' : ''}`}
//                             >
//                               <div title="Midwoofers" className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredDriverMenu==="Midwoofers" ? 'text-primary' : ''}`}>
//                                 Midwoofers
//                                 <ChevronRight size={15} className={`pb-1 ${hoveredDriverMenu==="Midwoofers" ? ' text-primary' : ''}`}/>
//                               </div>
//                             </div>
//                           </NavigationMenuLink>
//                         {/* </Link> */}
//                         {/* <Link href={"/drivers/woofers"} passHref> */}
//                           <NavigationMenuLink href={"/drivers/woofers"}>
//                             <div
//                               onMouseEnter={() => {
//                                 setHoveredDriverMenu("Woofers");
//                                 setHoveredDriverSubMenu("");
//                                 setHoveredDriverSubSubMenu("");
//                                 setHoveredKitsMenu("");
//                                 setactivedriverhovered("");
//                                 setDriversSubMenu(WoofersSubMenu);
//                                 setDriversSubSubMenu(EmptyMenu);
//                                 setDriversSubSubSubMenu(EmptyMenu);
//                                 setKitsSubMenu(EmptyMenu);
//                                 setDriversSubMenuUrl('');
//                                 setDriversSubSubMenuUrl('');
//                                 setDriversSubSubSubMenuUrl('');
//                               }}
//                               className={`px-2 transform duration-200 ${hoveredDriverMenu === "Woofers" ? 'translate-x-2' : ''}`}
//                             >
//                               <div title="Woofers" className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredDriverMenu==="Woofers" ? 'text-primary' : ''}`}>
//                                 Woofers
//                                 <ChevronRight size={15} className={`pb-1 ${hoveredDriverMenu==="Woofers" ? ' text-primary' : ''}`}/>
//                               </div>
//                             </div>
//                           </NavigationMenuLink>
//                         {/* </Link> */}
//                         {/* <Link href={"/drivers/subwoofers"} passHref> */}
//                           <NavigationMenuLink href={"/drivers/subwoofers"}>
//                             <div
//                               onMouseEnter={() => {
//                                 setHoveredDriverMenu("Subwoofers");
//                                 setHoveredDriverSubMenu("");
//                                 setHoveredDriverSubSubMenu("");
//                                 setHoveredKitsMenu("");
//                                 setactivedriverhovered("");
//                                 setDriversSubMenu(SubwoofersSubMenu);
//                                 setDriversSubSubMenu(EmptyMenu);
//                                 setDriversSubSubSubMenu(EmptyMenu);
//                                 setKitsSubMenu(EmptyMenu);
//                                 setDriversSubMenuUrl('');
//                                 setDriversSubSubMenuUrl('');
//                                 setDriversSubSubSubMenuUrl('');
//                               }}
//                               className={`px-2 transform duration-200 ${hoveredDriverMenu === "Subwoofers" ? 'translate-x-2' : ''}`}
//                             >
//                               <div title="Subwoofers" className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredDriverMenu==="Subwoofers" ? 'text-primary' : ''}`}>
//                                 Subwoofers
//                                 <ChevronRight size={15} className={`pb-1 ${hoveredDriverMenu==="Subwoofers" ? ' text-primary' : ''}`}/>
//                               </div>
//                             </div>
//                           </NavigationMenuLink>
//                         {/* </Link> */}
//                         {/* <Link href={"/drivers/passive-radiators"} passHref> */}
//                           <NavigationMenuLink href={"/drivers/passive-radiators"}>
//                             <div
//                               onMouseEnter={() => {
//                                 setHoveredDriverMenu("Passive Radiators");
//                                 setHoveredDriverSubMenu("");
//                                 setHoveredDriverSubSubMenu("");
//                                 setHoveredKitsMenu("");
//                                 setactivedriverhovered("");
//                                 setDriversSubMenu(PassiveRadiatorsSubMenu);
//                                 setDriversSubSubMenu(EmptyMenu);
//                                 setDriversSubSubSubMenu(EmptyMenu);
//                                 setKitsSubMenu(EmptyMenu);
//                                 setDriversSubMenuUrl('');
//                                 setDriversSubSubMenuUrl('');
//                                 setDriversSubSubSubMenuUrl('');
//                               }}
//                               className={`px-2 transform duration-200 ${hoveredDriverMenu === "Passive Radiators" ? 'translate-x-2' : ''}`}
//                             >
//                               <div title="Passive Radiators" className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredDriverMenu==="Passive Radiators" ? 'text-primary' : ''}`}>
//                                 Passive Radiators
//                                 <ChevronRight size={15} className={`pb-1 ${hoveredDriverMenu==="Passive Radiators" ? ' text-primary' : ''}`}/>
//                               </div>
//                             </div>
//                           </NavigationMenuLink>
//                         {/* </Link> */}
//                         {/* <Link href={"/drivers/coaxials"} passHref> */}
//                           <NavigationMenuLink href={"/drivers/coaxials"}>
//                             <div
//                               onMouseEnter={() => {
//                                 setHoveredDriverMenu("Coaxials");
//                                 setHoveredDriverSubMenu("");
//                                 setHoveredDriverSubSubMenu("");
//                                 setHoveredKitsMenu("");
//                                 setactivedriverhovered("");
//                                 setDriversSubMenu(CoaxialsSubMenu);
//                                 setDriversSubSubMenu(EmptyMenu);
//                                 setDriversSubSubSubMenu(EmptyMenu);
//                                 setKitsSubMenu(EmptyMenu);
//                                 setDriversSubMenuUrl('');
//                                 setDriversSubSubMenuUrl('');
//                                 setDriversSubSubSubMenuUrl('');
//                               }}
//                               className={`px-2 transform duration-200 ${hoveredDriverMenu === "Coaxials" ? 'translate-x-2' : ''}`}
//                             >
//                               <div title="Coaxials" className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredDriverMenu==="Coaxials" ? 'text-primary' : ''}`}>
//                                 Coaxials
//                                 <ChevronRight size={15} className={`pb-1 ${hoveredDriverMenu==="Coaxials" ? ' text-primary' : ''}`}/>
//                               </div>
//                             </div>
//                           </NavigationMenuLink>
//                         {/* </Link> */}
//                         {/* <Link href={"/drivers/oem"} passHref> */}
//                           <NavigationMenuLink href={"/drivers/oem"}>
//                             <div
//                               onMouseEnter={() => {
//                                 setHoveredDriverMenu("OEM");
//                                 setHoveredDriverSubMenu("");
//                                 setHoveredDriverSubSubMenu("");
//                                 setHoveredKitsMenu("");
//                                 setactivedriverhovered("");
//                                 setDriversSubMenu(OEMSubMenu);
//                                 setDriversSubSubMenu(EmptyMenu);
//                                 setDriversSubSubSubMenu(EmptyMenu);
//                                 setKitsSubMenu(EmptyMenu);
//                                 setDriversSubMenuUrl('');
//                                 setDriversSubSubMenuUrl('');
//                                 setDriversSubSubSubMenuUrl('');
//                               }}
//                               className={`px-2 transform duration-200 ${hoveredDriverMenu === "OEM" ? 'translate-x-2' : ''}`}
//                             >
//                               <div title="OEM" className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredDriverMenu==="OEM" ? 'text-primary' : ''}`}>
//                                 OEM
//                                 <ChevronRight size={15} className={`pb-1 ${hoveredDriverMenu==="OEM" ? ' text-primary' : ''}`}/>
//                               </div>
//                             </div>
//                           </NavigationMenuLink>
//                         {/* </Link> */}
//                       </ul>
//                     </div>
//                     {driversubMenu && driverMenu.length > 0 && driversubsubMenu && driversubsubMenu.length > 0 &&
//                       <div className={`overflow-y-auto overflow-x-hidden border-r-2 transform transition-all z-30 bg-background ${driversubMenu[0].title === ''? '-translate-x-1/2' : 'translate-x-0'} ${driversubsubMenu[0].title!=''? '' : driversubMenuUrl===''? 'border-transparent' : ''}`}>
//                         <ul className="gap-1 p-1">
//                           {/* SUB MENU */}
//                           {driversubMenu.map((products, index) => (
//                             <div key={index} onMouseEnter={() => searchSubSubMenu(products.title, products.parent)} 
//                               className={`px-2 transform duration-200 ${hoveredDriverSubMenu===products.title ? 'translate-x-2' : ''}`}
//                             >
//                               {products.parent===""? 
//                                 // <Link href={products.href} passHref>
//                                   <NavigationMenuLink href={products.href}>
//                                     <div className={`${styledDropdown} hover:text-primary ${activedriverhovered === products.title? 'text-primary': ''}`} onMouseEnter={() => (setDriversSubMenuUrl(products.url), setPictureSlugUrl(products.href), setPictureDesc(products.imageDesc), setactivedriverhovered(products.title), setDriversSubSubMenu(EmptyMenu), setHoveredDriverSubMenu(''), setnameForHoveredPicture(products.title), setDriversSubSubMenuUrl('') ,setDriversSubSubSubMenuUrl(''))} >
//                                     {products.newProd ? <>{products.title.split(" / ")[0]} <div className="inline-flex text-primary">NEW</div></> : products.title}
//                                     </div>
//                                   </NavigationMenuLink>
//                                 // </Link>
//                               :
//                                 // <Link href={products.href} passHref>
//                                   <NavigationMenuLink href={products.href}>
//                                     <div className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredDriverSubMenu===products.title ? 'text-primary' : ''}`} onMouseEnter={()=>(setDriversSubSubMenuUrl(''), setDriversSubSubSubMenuUrl(''), setactivedriverhovered(''))}>
//                                       {products.title}
//                                       <ChevronRight size={15} className={`pb-1 ${hoveredDriverSubMenu===products.title ? 'text-primary' : ''}`}/>
//                                     </div>
//                                   </NavigationMenuLink>
//                                 // </Link>
//                               }
//                             </div>
//                           ))}
//                         </ul>
//                       </div>
//                     }
//                     {driversubMenu && driverMenu.length > 0 && driversubsubMenu && driversubsubMenu.length > 0 && driversubsubsubMenu && driversubsubsubMenu.length > 0 &&
//                       <div className={`overflow-y-auto overflow-x-hidden border-r-2 transform transition-all z-20 bg-background ${driversubMenuUrl === ''? '-translate-x-1/2' : 'translate-x-0'} ${driversubsubMenu[0].title === ''? '-translate-x-1/2' : 'translate-x-0'} ${driversubsubsubMenu[0].title!=''? '' : driversubsubMenuUrl===''? 'border-transparent': ''}`}>
//                         <ul className="gap-1 p-1">
//                           {/* SUB SUB MENU */}
//                           {driversubsubMenu.map((products, index) => (
//                             <div key={index} onMouseEnter={() => searchSubSubSubMenu(products.title, products.parent)}
//                             className={`px-2 transform duration-200 ${hoveredDriverSubSubMenu===products.title ? 'translate-x-2' : ''}`}
//                             >
//                               {products.parent===""? 
//                                 products.title != ''?
//                                   // <Link href={products.href} passHref>
//                                     <NavigationMenuLink href={products.href}>
//                                       <div className={`${styledDropdown} hover:text-primary ${activedriverhovered === products.title? 'text-primary': ''}`} onMouseEnter={() => (setDriversSubSubMenuUrl(products.url), setPictureSlugUrl(products.href), setPictureDesc(products.imageDesc), setactivedriverhovered(products.title), setDriversSubSubSubMenu(EmptyMenu), setHoveredDriverSubSubMenu(''), setnameForHoveredPicture(products.title))}>
//                                       {products.newProd ? <>{products.title.split(" / ")[0]} <div className="inline-flex text-primary">NEW</div></> : products.title}
//                                       </div>
//                                     </NavigationMenuLink>
//                                   // </Link>
//                                 :
//                                   driversubMenuUrl != '' &&
//                                   //DISINI
//                                     // <Link href={pictureSlugUrl} passHref>
//                                       <NavigationMenuLink href={pictureSlugUrl}>
//                                         <div className="relative overflow-hidden flex items-center justify-center h-full w-50">
//                                           {driversubMenuUrl !== '' &&
//                                             <div className="absolute flex items-center justify-center z-0 w-10 h-10">
//                                               <Loader2 className="animate-spin text-gray-500" size={20} />
//                                             </div>
//                                           }
//                                         <Image src={driversubMenuUrl.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${driversubMenuUrl}` : driversubMenuUrl} alt={activedriverhovered} className='w-50 h-fit z-10' width={500} height={500} onMouseEnter={() => (setactivedriverhovered(nameForHoveredPicture))}/>
//                                           </div>
//                                         <div className='flex justify-center items-center text-center h-full'>
//                                           {pictureDesc}
//                                         </div>
//                                       </NavigationMenuLink>
//                                     // </Link>
//                               : 
//                                 // <Link href={products.href} passHref>
//                                   <NavigationMenuLink href={products.href}>
//                                     <div className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredDriverSubSubMenu===products.title ? 'text-primary' : ''}`} onMouseEnter={()=>(setDriversSubSubSubMenuUrl(''), setactivedriverhovered(''))}>
//                                       {products.title}
//                                       <ChevronRight size={15} className={`pb-1 ${hoveredDriverSubSubMenu===products.title ? 'text-primary' : ''}`}/>
//                                     </div>
//                                   </NavigationMenuLink>
//                                 // </Link>
//                               }
//                             </div>
//                           ))}
//                         </ul>
//                       </div>
//                     }
//                     {driversubMenu && driverMenu.length > 0 && driversubsubMenu && driversubsubMenu.length > 0 && driversubsubsubMenu && driversubsubsubMenu.length > 0 &&
//                       <div className={`overflow-y-auto overflow-x-hidden border-r-2 px-2 transform transition-all z-10 bg-background ${driversubsubMenuUrl === ''? '-translate-x-1/2' : 'translate-x-0'} ${driversubsubsubMenu[0].title === ''? '-translate-x-1/2' : 'translate-x-0'} ${driversubsubsubMenuUrl===''? 'border-transparent' : ''}`}>
//                         <ul className="gap-1 p-1">
//                           {/* SUB SUB SUB MENU */}
//                           {driversubsubsubMenu.map((products) => (
//                             products.parent===""?
//                               products.title != ''?
//                                 // <Link key={products.title} href={products.href} passHref>
//                                   <NavigationMenuLink key={products.title} href={products.href}>
//                                     <div className={`${styledDropdown} hover:text-primary ${activedriverhovered === products.title? 'text-primary': ''}`} onMouseEnter={() => (setDriversSubSubSubMenuUrl(products.url), setPictureSlugUrl(products.href), setPictureDesc(products.imageDesc), setactivedriverhovered(products.title), setnameForHoveredPicture(products.title))}>
//                                     {products.newProd ? <>{products.title.split(" / ")[0]} <div className="inline-flex text-primary">NEW</div></> : products.title}
//                                     </div>
//                                   </NavigationMenuLink>
//                                 // </Link>
//                               :
//                                 driversubsubMenuUrl != '' &&
//                                   // <Link href={pictureSlugUrl} passHref key={products.title}>
//                                     <NavigationMenuLink href={pictureSlugUrl} key={products.title}>
//                                     <div className="relative overflow-hidden flex items-center justify-center h-full w-50">
//                                       {driversubsubMenuUrl !== '' &&
//                                         <div className="absolute flex items-center justify-center z-0 w-10 h-10">
//                                           <Loader2 className="animate-spin text-gray-500" size={20} />
//                                         </div>
//                                       }
//                                       <Image key={products.title} src={driversubsubMenuUrl.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${driversubsubMenuUrl}` : driversubsubMenuUrl} alt={activedriverhovered} className='w-50 h-fit z-10' width={500} height={500} onMouseEnter={() => (setactivedriverhovered(nameForHoveredPicture))}/>
//                                         </div>
//                                       <div className='flex justify-center items-center text-center h-full'>
//                                         {pictureDesc}
//                                       </div>
//                                     </NavigationMenuLink>
//                                   // </Link>
//                             :
//                               // <Link key={products.title} href={products.href} passHref>
//                                 <NavigationMenuLink key={products.title} href={products.href}>
//                                   <div className={`${styledDropdown} flex justify-between items-center align-middle`}>
//                                     {products.title}
//                                     <ChevronRight size={15} className='pb-1'/>
//                                   </div>
//                                 </NavigationMenuLink>
//                               // </Link>
//                             ))
//                           }
//                         </ul>
//                       </div>
//                     }
//                     <div className={`overflow-y-auto overflow-x-hidden transform transition-all z-0 bg-background ${driversubsubsubMenuUrl === ''? '-translate-x-1/2' : 'translate-x-0'}`}>
//                       <ul className="gap-1 p-1">
//                         {driversubsubsubMenuUrl != '' &&
//                           // <Link href={pictureSlugUrl} passHref>
//                             <NavigationMenuLink href={pictureSlugUrl}>
//                             <div className="relative overflow-hidden flex items-center justify-center h-full w-50">
//                               {driversubsubsubMenuUrl !== '' &&
//                                 <div className="absolute flex items-center justify-center z-0 w-10 h-10">
//                                   <Loader2 className="animate-spin text-gray-500" size={20} />
//                                 </div>
//                               }
//                               <Image src={driversubsubsubMenuUrl.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${driversubsubsubMenuUrl}` : driversubsubsubMenuUrl } alt={activedriverhovered} className='w-50 h-fit z-10' width={500} height={500} onMouseEnter={() => (setactivedriverhovered(nameForHoveredPicture))}/>
//                                 </div>
//                               <div className='flex justify-center items-center text-center h-full'>
//                                 {pictureDesc}
//                               </div>
//                             </NavigationMenuLink>
//                           // </Link>
//                         }
//                       </ul>
//                     </div>
//                   </div>
//                 </NavigationMenuContent>
//                 {/* } */}
//               </NavigationMenuItem>
              
//               <NavigationMenuItem>
//                 {/* <Link href="/products/?categorySlug=kits" passHref> */}
//                 {/* <Link href="/kits" passHref> */}
//                   <NavigationMenuLink href='/kits'>
//                     <div className="p-0 relative z-101">
//                       <NavigationMenuTrigger className={navigationMenuTriggerStyle().concat(" bg-transparent text-foreground hover:text-primary")} onMouseLeave={() => setOpenedContentForBg(false)} onMouseEnter={() => {
//                         setKitsSubMenu(EmptyMenu)
//                         setHoveredDriverMenu("");
//                         setHoveredDriverSubMenu("");
//                         setHoveredDriverSubSubMenu("");
//                         setHoveredKitsMenu("");
//                         setDriversSubMenu(EmptyMenu);
//                         setDriversSubSubMenu(EmptyMenu);
//                         setDriversSubSubSubMenu(EmptyMenu);
//                         setPictureSlugUrl('');
//                         setPictureDesc('');
//                         setactivedriverhovered('');
//                         setDriversSubMenuUrl('');
//                         setDriversSubSubMenuUrl('');
//                         setDriversSubSubSubMenuUrl('');
//                         setOpenedContentForBg(true);
//                       }}>
//                         Kits
//                       </NavigationMenuTrigger>
//                     </div>
//                   </NavigationMenuLink>
//                 {/* </Link> */}
//                 {/* {openedContentForBg && */}
//                   <NavigationMenuContent onMouseLeave={() => setOpenedContentForBg(false)} onMouseEnter={() => setOpenedContentForBg(true)}>
//                   <div className='xl:pl-[72px] xl:pr-[72px] lg:pl-[56px] lg:pr-[56px] py-4 pt-20'>
//                       <SearchBoxNavbar/>
//                     </div>
//                     <div className='grid grid-cols-5 w-screen xl:px-16 lg:px-12 px-8 py-4 h-[550px]'>
//                       <div className='overflow-y-auto overflow-x-hidden border-r-2 z-40 bg-background'>
//                         <ul className="gap-1 p-1">
//                           {/* <Link href={"/kits/sb-acoustics-kits"} passHref> */}
//                             <NavigationMenuLink href={"/kits/sb-acoustics-kits"}>
//                               <div
//                                 onMouseEnter={() => {
//                                   setKitsSubMenu(SBAcousticsKitsSubMenu)
//                                   setHoveredDriverMenu("");
//                                   setHoveredDriverSubMenu("");
//                                   setHoveredDriverSubSubMenu("");
//                                   setHoveredKitsMenu("SB Acoustics Kits");
//                                   setDriversSubMenu(EmptyMenu);
//                                   setDriversSubSubMenu(EmptyMenu);
//                                   setDriversSubSubSubMenu(EmptyMenu);
//                                   setDriversSubMenuUrl('');
//                                   setactivedriverhovered("");
//                                 }}
//                                 className={`px-2 transform duration-200 ${hoveredKitsMenu === "SB Acoustics Kits" ? 'translate-x-2' : ''}`}
//                               >
//                                 <div className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredKitsMenu==="SB Acoustics Kits" ? 'text-primary' : ''}`}>
//                                   SB Acoustics Kits
//                                   <ChevronRight size={15} className={`pb-1 ${hoveredKitsMenu==="SB Acoustics Kits" ? 'text-primary' : ''}`}/>
//                                 </div>
//                               </div>
//                             </NavigationMenuLink>
//                           {/* </Link> */}
//                           {/* <Link href={"/kits/open-source-kits"} passHref> */}
//                             <NavigationMenuLink href={"/kits/open-source-kits"}>
//                               <div
//                                 onMouseEnter={() => {
//                                   setKitsSubMenu(OpenSourceKitsSubMenu)
//                                   setHoveredDriverMenu("");
//                                   setHoveredDriverSubMenu("");
//                                   setHoveredDriverSubSubMenu("");
//                                   setHoveredKitsMenu("Open Source Kits");
//                                   setDriversSubMenu(EmptyMenu);
//                                   setDriversSubSubMenu(EmptyMenu);
//                                   setDriversSubSubSubMenu(EmptyMenu);
//                                   setDriversSubMenuUrl('');
//                                   setactivedriverhovered("");
//                                 }}
//                                 className={`px-2 transform duration-200 ${hoveredKitsMenu === "Open Source Kits" ? 'translate-x-2' : ''}`}
//                               >
//                                 <div className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredKitsMenu==="Open Source Kits" ? 'text-primary' : ''}`}>
//                                   Open Source Kits
//                                   <ChevronRight size={15} className={`pb-1 ${hoveredKitsMenu==="Open Source Kits" ? 'text-primary' : ''}`}/>
//                                 </div>
//                               </div>
//                             </NavigationMenuLink>
//                           {/* </Link> */}
//                           {/* <Link href={"/kits/accessories"} passHref> */}
//                             <NavigationMenuLink href={"/kits/accessories"}>
//                               <div
//                                 onMouseEnter={() => {
//                                   setKitsSubMenu(AccessoriesSubMenu)
//                                   setHoveredDriverMenu("");
//                                   setHoveredDriverSubMenu("");
//                                   setHoveredDriverSubSubMenu("");
//                                   setHoveredKitsMenu("Accessories");
//                                   setDriversSubMenu(EmptyMenu);
//                                   setDriversSubSubMenu(EmptyMenu);
//                                   setDriversSubSubSubMenu(EmptyMenu);
//                                   setDriversSubMenuUrl('');
//                                   setactivedriverhovered("");
//                                 }}
//                                 className={`px-2 transform duration-200 ${hoveredKitsMenu === "Accessories" ? 'translate-x-2' : ''}`}
//                               >
//                                 <div className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredKitsMenu==="Accessories" ? 'text-primary' : ''}`}>
//                                   Accessories
//                                   <ChevronRight size={15} className={`pb-1 ${hoveredKitsMenu==="Accessories" ? 'text-primary' : ''}`}/>
//                                 </div>
//                               </div>
//                             </NavigationMenuLink>
//                         </ul>
//                       </div>
//                       <div className={`overflow-y-auto overflow-x-hidden border-r-2 px-2 transform transition-all z-30 bg-background ${kitssubMenu.length>0 && kitssubMenu[0].title === ''? '-translate-x-1/2' : 'translate-x-0'} ${driversubMenuUrl===''? 'border-transparent' : ''}`}>
//                         <ul className="gap-1 p-1">
//                           {/* SUB MENU */}
//                           {kitssubMenu.map((products, index) => (
//                             products.parent === ""?
//                               // <Link key={index} href={products.href} passHref>
//                                 <NavigationMenuLink key={index} href={products.href}>
//                                   <div className={`${styledDropdown} hover:text-primary ${activedriverhovered === products.title? 'text-primary': ''}`} onMouseEnter={() => (setDriversSubMenuUrl(products.url), setPictureSlugUrl(products.href), setPictureDesc(products.imageDesc), setactivedriverhovered(products.title),setnameForHoveredPicture(products.title))}>
//                                   {products.newProd ? <>{products.title.split(" / ")[0]} <div className="inline-flex text-primary">NEW</div></> : products.title}
//                                   </div>
//                                 </NavigationMenuLink>
//                               // </Link>
//                             :
//                               // <Link key={index} href={products.href} passHref>
//                                 <NavigationMenuLink key={index} href={products.href}>
//                                   <div className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredDriverSubMenu===products.title ? 'text-primary' : ''}`} onMouseEnter={()=>(setDriversSubSubMenuUrl(''), setDriversSubSubSubMenuUrl(''), setactivedriverhovered(''))}>
//                                     {products.title}
//                                     <ChevronRight size={15} className='pb-1'/>
//                                   </div>
//                                 </NavigationMenuLink>
//                               // </Link>
//                             ))
//                           }
//                         </ul>
//                       </div>
//                       <div className={`overflow-y-auto overflow-x-hidden transform transition-all z-20 bg-background ${driversubMenuUrl === ''? '-translate-x-1/2' : 'translate-x-0'}`}>
//                         <ul className="gap-1 p-1">
//                           {driversubMenuUrl != '' &&
//                             // <Link href={pictureSlugUrl} passHref>
//                               <NavigationMenuLink href={pictureSlugUrl}>
//                               <div className="relative overflow-hidden flex items-center justify-center h-full w-50">
//                                 {driversubMenuUrl !== '' &&
//                                   <div className="absolute flex items-center justify-center z-0 w-10 h-10">
//                                     <Loader2 className="animate-spin text-gray-500" size={20} />
//                                   </div>
//                                 }
//                                   <Image src={driversubMenuUrl.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${driversubMenuUrl}` : driversubMenuUrl} alt={activedriverhovered} className='w-50 h-fit z-10' width={500} height={500} onMouseEnter={() => (setactivedriverhovered(nameForHoveredPicture))}/>
//                                 </div>
//                                 <div className='flex justify-center items-center text-center h-full'>
//                                   {pictureDesc}
//                                 </div>
//                               </NavigationMenuLink>
//                             // </Link>
//                           }    
//                         </ul>
//                       </div>
//                     </div>
//                   </NavigationMenuContent>
//                 {/* } */}
//               </NavigationMenuItem>


//               <NavigationMenuItem>
//                 {/* <Link href="/new-products" passHref> */}
//                   <NavigationMenuLink href="/new-products">
//                     <div className="p-0 relative z-101">
//                       <NavigationMenuTrigger className={navigationMenuTriggerStyle().concat(" bg-transparent text-foreground hover:text-primary")} onMouseLeave={() => setOpenedContentForBg(false)} onMouseEnter={() => {
//                         setKitsSubMenu(EmptyMenu)
//                         setHoveredDriverMenu("");
//                         setHoveredDriverSubMenu("");
//                         setHoveredDriverSubSubMenu("");
//                         setHoveredKitsMenu("");
//                         setDriversSubMenu(EmptyMenu);
//                         setDriversSubSubMenu(EmptyMenu);
//                         setDriversSubSubSubMenu(EmptyMenu);
//                         setPictureSlugUrl('');
//                         setPictureDesc('');
//                         setactivedriverhovered('');
//                         setDriversSubMenuUrl('');
//                         setDriversSubSubMenuUrl('');
//                         setDriversSubSubSubMenuUrl('');
//                         setactivekitshovered('');
//                         setOpenedContentForBg(true);
//                       }}>
//                         New Products
//                       </NavigationMenuTrigger>
//                     </div>
//                   </NavigationMenuLink>
//                 {/* </Link> */}
//                 {/* {openedContentForBg && */}
//                   <NavigationMenuContent onMouseLeave={() => setOpenedContentForBg(false)} onMouseEnter={() => setOpenedContentForBg(true)}>
//                   <div className='xl:pl-[72px] xl:pr-[72px] lg:pl-[56px] lg:pr-[56px] py-4 pt-20'>
//                       <SearchBoxNavbar/>
//                     </div>
//                     <div className='grid grid-cols-5 w-screen xl:px-16 lg:px-12 px-8 py-4 h-[550px]'>
//                       <div className='overflow-y-auto border-r-2 z-40 bg-background'>
//                         <ul className="gap-1 p-1">
//                           {/* MENU */}
//                           <div className='font-bold pl-1'>
//                             Drivers
//                           </div>
//                           {newProductsMenu.length>0 && newProductsMenu.map((products, index) => (
//                             // <Link key={index} href={products.href} passHref>
//                               <NavigationMenuLink key={index} href={products.href}>
//                                 <div className={`${styledDropdown} hover:text-primary ${activedriverhovered === products.name? 'text-primary': ''}`} onMouseEnter={() => (setDriversSubMenuUrl(products.image_url), setPictureSlugUrl(products.href), setPictureDesc(products.navbarNotes), setactivekitshovered(''), setactivedriverhovered(products.name),setnameForHoveredPicture(products.name))}>
//                                   {products.name.split(" / ")[0]} <div className="inline-flex text-primary">NEW</div>
//                                 </div>
//                               </NavigationMenuLink>
//                             // </Link>
//                           ))}
//                         </ul>
//                         <ul className="gap-1 p-1">
//                           {/* MENU */}
//                           <div className='font-bold pl-1'>
//                             Kits
//                           </div>
//                           {newKitsMenu.length>0 && newKitsMenu.map((products, index) => (
//                             // <Link key={index} href={products.href} passHref>
//                               <NavigationMenuLink key={index} href={products.href}>
//                                 <div className={`${styledDropdown} hover:text-primary ${activekitshovered === products.name? 'text-primary': ''}`} onMouseEnter={() => (setDriversSubMenuUrl(products.image_url), setPictureSlugUrl(products.href), setPictureDesc(products.navbarNotes), setactivedriverhovered(''), setactivekitshovered(products.name),setnameForHoveredPicture(products.name))}>
//                                   {products.name.split(" / ")[0]} <div className="inline-flex text-primary">NEW</div>
//                                 </div>
//                               </NavigationMenuLink>
//                             // </Link>
//                           ))}
//                         </ul>
//                       </div>
//                       <div className={`overflow-y-auto transform transition-all z-30 bg-background ${driversubMenuUrl === ''? '-translate-x-1/2' : 'translate-x-0'}`}>
//                         <ul className="gap-1 p-1">
//                           {driversubMenuUrl != '' &&
//                             // <Link href={pictureSlugUrl} passHref>             
//                               <NavigationMenuLink href={pictureSlugUrl}>
//                               <div className="relative overflow-hidden flex items-center justify-center h-full w-50">
//                                 {driversubMenuUrl !== '' &&
//                                   <div className="absolute flex items-center justify-center z-0 w-10 h-10">
//                                     <Loader2 className="animate-spin text-gray-500" size={20} />
//                                   </div>
//                                 }
//                                   <Image src={driversubMenuUrl.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${driversubMenuUrl}` : driversubMenuUrl} alt={activedriverhovered} className='w-50 h-fit z-10' width={500} height={500} onMouseEnter={() => (setactivedriverhovered(nameForHoveredPicture))}/>
//                                 </div>
//                                 <div className='flex justify-center items-center text-center h-full'>
//                                   {pictureDesc}
//                                 </div>
//                               </NavigationMenuLink>
//                             // </Link>
//                           }    
//                         </ul>
//                       </div>
//                       <div className={`overflow-y-auto z-20 bg-background`}>
//                       </div>
//                       <div className={`overflow-y-auto z-10 bg-background`}>
//                       </div>
//                       <div className={`overflow-y-auto transform transition-all z-0 bg-background ${driversubsubsubMenuUrl === ''? '-translate-x-1/2' : 'translate-x-0'}`}>
//                       </div>
//                     </div>
//                   </NavigationMenuContent>
//               </NavigationMenuItem>


//               <NavigationMenuItem>
//                 {/* <Link href="/technical" passHref> */}
//                   <NavigationMenuLink href="/technical" className={navigationMenuTriggerStyle().concat(" bg-transparent")}>
//                     <div className="p-0 relative z-101">
//                       Technical
//                     </div>
//                   </NavigationMenuLink>
//                 {/* </Link> */}
//               </NavigationMenuItem>


//               <NavigationMenuItem>
//                 {/* <Link href="/distributors" passHref> */}
//                   <NavigationMenuLink href="/distributors" className={navigationMenuTriggerStyle().concat(" bg-transparent")}>
//                     <div className="p-0 relative z-101">
//                       Distributors
//                     </div>
//                   </NavigationMenuLink>
//                 {/* </Link> */}
//               </NavigationMenuItem>


//               <NavigationMenuItem>
//                 {/* <Link href="/contact" passHref> */}
//                   <NavigationMenuLink href="/contact" className={navigationMenuTriggerStyle().concat(" bg-transparent")}>
//                     <div className="p-0 relative z-101">
//                       Contact
//                     </div>
//                   </NavigationMenuLink>
//                 {/* </Link> */}
//               </NavigationMenuItem>
//             </NavigationMenuList>
//           </NavigationMenu>
//         </div>
//         <div className={`w-1/4 hidden lg:flex justify-end`}>
//           <SearchBox mobile={false}/>
//         </div>


//         {/* MAIN MENU TABLET & MOBILE VIEW */}
//         <div className='flex lg:hidden'>
//           <SearchBox mobile={true} />
//           <Sheet open={isLgScreen?false:undefined}>
//             <SheetTrigger asChild>
//               <Button variant={null} className='w-fit p-0'>
//                 <Menu size={30} />
//               </Button>
//             </SheetTrigger>
//             <SheetContent className="w-screen h-auto p-0 overflow-y-auto">
//               <SheetTitle/>
//               <SheetDescription/>
//               <div className="grid pt-12"> 
//                 <Accordion type="single" collapsible className="w-full px-6">
//                   <AccordionItem value="item-1">
//                     <AccordionTrigger onClick={() =>{
//                       setDriversMenu(DriversMenu)
//                     }} 
//                     className='hover:text-primary px-2'>
//                       Drivers
//                     </AccordionTrigger>
//                     <AccordionContent>
//                       {/* <Button asChild variant={"default"} className='w-full '> */}
//                       <Link href="/drivers" className='w-full'>
//                         <SheetClose className='w-full flex text-center justify-center p-1 bg-primary text-white rounded-xl'>
//                           Show All Drivers
//                         </SheetClose>
//                       </Link>
//                       {/* </Button> */}
//                       <Accordion type="single" collapsible className={`${pathname.includes('sbaudience') ? 'bg-zinc-800' : 'bg-zinc-50'} w-full pl-2 rounded-lg`}>
//                         {driverMenu.map((menu, indexdriver) => 
//                           <AccordionItem key={menu.title} value={"item-".concat(indexdriver.toString())}>
//                             {menu.parent===""? 
//                               <Link href={menu.href} key={menu.title}>
//                                 <SheetClose className='p-2 w-full hover:text-primary text-left'>
//                                 {menu.newProd ? <>{menu.title.split(" / ")[0]} <div className="inline-flex text-primary">NEW</div></> : menu.title}
//                                 </SheetClose>
//                               </Link>
//                             :
//                               <AccordionTrigger value={menu.title} onClick={() =>{
//                                 searchSubMenu(menu.title, menu.parent)
//                               }} className='hover:text-primary px-2'>
//                                 {menu.title}
//                               </AccordionTrigger>
//                             }
//                             <AccordionContent>
//                               <Link href={menu.href} className='w-full'>
//                                 <SheetClose className='w-full flex text-center justify-center p-1 bg-primary text-white rounded-xl'>
//                                   Show All {menu.title === 'Widebanders / Full Ranges' ? 'Widebanders' : menu.title}
//                                 </SheetClose>
//                               </Link>
//                               <Accordion type="single" collapsible className={`${pathname.includes('sbaudience') ? 'bg-zinc-700' : 'bg-zinc-100'} w-full pl-2 rounded-lg`}>
//                                 {driversubMenu.map((submenu) => 
//                                   <AccordionItem key={submenu.title} value={submenu.title}>
//                                     {submenu.parent===""? 
//                                       <Link key={submenu.title} href={submenu.href}>
//                                         <SheetClose className='p-2 w-full hover:text-primary text-left'>
//                                         {submenu.newProd ? <>{submenu.title.split(" / ")[0]} <div className="inline-flex text-primary">NEW</div></> : submenu.title}
//                                         </SheetClose>
//                                       </Link>
//                                     :
//                                       <AccordionTrigger value={submenu.title} onClick={() =>{
//                                         searchSubSubMenu(submenu.title, submenu.parent)
//                                       }} className='hover:text-primary px-2'>
//                                         {submenu.title}
//                                       </AccordionTrigger>
//                                     }
//                                     <AccordionContent>
//                                       <Link href={submenu.href} className='w-full'>
//                                         <SheetClose className='w-full flex text-center justify-center p-1 bg-primary text-white rounded-xl'>
//                                           Show All {submenu.title}
//                                         </SheetClose>
//                                       </Link>
//                                       <Accordion type="single" collapsible className={`${pathname.includes('sbaudience') ? 'bg-zinc-600' : 'bg-zinc-200'} w-full pl-2 rounded-lg`}> 
//                                         {driversubsubMenu.map((subsubmenu) =>
//                                           <AccordionItem key={subsubmenu.title} value={subsubmenu.title}>
//                                             {subsubmenu.parent===""? 
//                                               <Link key={subsubmenu.title} href={subsubmenu.href}>
//                                                 <SheetClose className='p-2 w-full hover:text-primary text-left'>
//                                                   {subsubmenu.newProd ? <>{subsubmenu.title.split(" / ")[0]} <div className="inline-flex text-primary">NEW</div></> : subsubmenu.title}
//                                                 </SheetClose>
//                                               </Link>
//                                             :
//                                               <AccordionTrigger value={subsubmenu.title} onClick={() =>{
//                                                 searchSubSubSubMenu(subsubmenu.title, subsubmenu.parent)
//                                               }} className='hover:text-primary px-2'>
//                                                 {subsubmenu.title}
//                                               </AccordionTrigger>
//                                             }
//                                             <AccordionContent className={`${pathname.includes('sbaudience') ? 'bg-zinc-500' : 'bg-zinc-300'} rounded-lg`}>
//                                               <Link href={subsubmenu.href} className='w-full'>
//                                                 <SheetClose className='w-full flex text-center justify-center p-1 bg-primary text-white rounded-xl'>
//                                                   Show All {subsubmenu.title}
//                                                 </SheetClose>
//                                               </Link>
//                                               {driversubsubsubMenu.map((subsubsubmenu) => 
//                                                 <Link key={subsubsubmenu.title} href={subsubsubmenu.href}>
//                                                   <SheetClose className='p-2 w-full hover:text-primary text-left'>
//                                                     {subsubsubmenu.newProd ? <>{subsubsubmenu.title.split(" / ")[0]} <div className="inline-flex text-primary">NEW</div></> : subsubsubmenu.title}
//                                                   </SheetClose>
//                                                 </Link>
//                                               )}
//                                             </AccordionContent>
//                                           </AccordionItem>
//                                         )}
//                                       </Accordion>
//                                     </AccordionContent>
//                                   </AccordionItem>
//                                 )}
//                               </Accordion>
//                             </AccordionContent>
//                           </AccordionItem>
//                         )}
//                       </Accordion>
//                     </AccordionContent>
//                   </AccordionItem>
//                   <AccordionItem value="item-2">
//                     <AccordionTrigger onClick={() =>{
//                       setKitMenu(KitsMenu)
//                     }} className='hover:text-primary px-2'>
//                       Kits
//                     </AccordionTrigger>
//                     <AccordionContent>
//                       <Link href='/kits' className='w-full'>
//                         <SheetClose className='w-full flex text-center justify-center p-1 bg-primary text-white rounded-xl'>
//                           Show All Kits
//                         </SheetClose>
//                       </Link>
//                       <Accordion type="single" collapsible className={`${pathname.includes('sbaudience') ? 'bg-zinc-800' : 'bg-zinc-50'} w-full pl-2 rounded-lg`}>
//                         {kitMenu.map((kits) => 
//                           <AccordionItem key={kits.title} value={kits.title}>
//                             {kits.parent===""? 
//                               <Link href={kits.href} key={kits.title}>
//                                 <SheetClose className='p-2 w-full hover:text-primary text-left'>
//                                   {kits.newProd ? <>{kits.title.split(" / ")[0]} <div className="inline-flex text-primary">NEW</div></> : kits.title}
//                                 </SheetClose>
//                               </Link>
//                             :
//                               <AccordionTrigger onClick={() =>{
//                                 searchKitsMenu(kits.title, kits.parent)
//                               }} className='hover:text-primary px-2'>
//                                 {kits.title}
//                               </AccordionTrigger>
//                             }
//                             <AccordionContent>
//                               <Link href={kits.href} className='w-full'>
//                                 <SheetClose className='w-full flex text-center justify-center p-1 bg-primary text-white rounded-xl'>
//                                   Show All {kits.title}
//                                 </SheetClose>
//                               </Link>
//                               {kitssubMenu.map((kitsubmenu, index) => 
//                                 <Accordion key={kitsubmenu.title} type="single" collapsible className={`${pathname.includes('sbaudience') ? 'bg-zinc-700' : 'bg-zinc-100'} w-full pl-2 ${index === 0 ? 'rounded-t-lg' : index === kitssubMenu.length -1 ? 'rounded-b-lg' : 'rounded-none'}`}>
//                                   <AccordionItem key={kitsubmenu.title} value={kitsubmenu.title.concat(index.toString())}> 
//                                     <Link key={kitsubmenu.title} href={kitsubmenu.href}>
//                                       <SheetClose className='p-2 w-full hover:text-primary text-left'>
//                                         {kitsubmenu.newProd ? <>{kitsubmenu.title.split(" / ")[0]} <div className="inline-flex text-primary">NEW</div></> : kitsubmenu.title}
//                                       </SheetClose>
//                                     </Link>
//                                   </AccordionItem>
//                                 </Accordion>
//                               )}
//                             </AccordionContent>
//                           </AccordionItem>
//                         )}
//                       </Accordion>
//                     </AccordionContent>
//                   </AccordionItem>
//                   <AccordionItem value="item-3">
//                     <AccordionTrigger className='hover:text-primary px-2'>
//                       New Products
//                     </AccordionTrigger>
//                     <AccordionContent>
//                       <Accordion type="single" collapsible className={`${pathname.includes('sbaudience') ? 'bg-zinc-800' : 'bg-zinc-50'} w-full pl-2 rounded-lg`}>
//                         <AccordionItem key={'New Drivers'} value={'New Drivers'}>
//                           <AccordionTrigger className='hover:text-primary px-2'>
//                             Drivers
//                           </AccordionTrigger>
//                           <AccordionContent>
//                             {newProductsMenu.map((newsubmenu, index) => 
//                               <Accordion key={newsubmenu.name} type="single" collapsible className={`${pathname.includes('sbaudience') ? 'bg-zinc-700' : 'bg-zinc-100'} w-full pl-2 ${index === 0 ? 'rounded-t-lg' : index === newProductsMenu.length -1 ? 'rounded-b-lg' : 'rounded-none'}`}>
//                                 <AccordionItem key={newsubmenu.name} value={newsubmenu.name.concat(index.toString())}> 
//                                   <Link key={newsubmenu.name} href={newsubmenu.href}>
//                                     <SheetClose className='p-2 w-full hover:text-primary text-left'>
//                                       {newsubmenu.name} <div className="inline-flex text-primary">NEW</div>
//                                     </SheetClose>
//                                   </Link>
//                                 </AccordionItem>
//                               </Accordion>
//                             )}
//                           </AccordionContent>
//                         </AccordionItem>
//                         <AccordionItem key={'New Kits'} value={'New Kits'}>
//                           <AccordionTrigger className='hover:text-primary px-2'>
//                             Kits
//                           </AccordionTrigger>
//                           <AccordionContent>
//                             {newKitsMenu.map((newsubmenu, index) => 
//                               <Accordion key={newsubmenu.name} type="single" collapsible className={`${pathname.includes('sbaudience') ? 'bg-zinc-700' : 'bg-zinc-100'} w-full pl-2 ${index === 0 ? 'rounded-t-lg' : index === newKitsMenu.length -1 ? 'rounded-b-lg' : 'rounded-none'}`}>
//                                 <AccordionItem key={newsubmenu.name} value={newsubmenu.name.concat(index.toString())}> 
//                                   <Link key={newsubmenu.name} href={newsubmenu.href}>
//                                     <SheetClose className='p-2 w-full hover:text-primary text-left'>
//                                       {newsubmenu.name} <div className="inline-flex text-primary">NEW</div>
//                                     </SheetClose>
//                                   </Link>
//                                 </AccordionItem>
//                               </Accordion>
//                             )}
//                           </AccordionContent>
//                         </AccordionItem>
//                       </Accordion>
//                     </AccordionContent>
//                   </AccordionItem>
//                 </Accordion>
//                 <Button variant={null} asChild className='px-6'>
//                   <Link href="/technical">
//                     <SheetClose className='w-full text-base text-left hover:text-primary pl-2'>
//                       Technical
//                     </SheetClose>
//                   </Link>
//                 </Button>
//                 <Button variant={null} asChild className='px-6'>
//                   <Link href="/distributors">
//                     <SheetClose className='w-full text-base text-left hover:text-primary pl-2'>
//                       Distributors
//                     </SheetClose>
//                   </Link>
//                 </Button>
//                 <Button variant={null} asChild className='px-6'>
//                   <Link href="/contact">
//                     <SheetClose className='w-full text-base text-left hover:text-primary pl-2'>
//                       Contact
//                     </SheetClose>
//                   </Link>
//                 </Button>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </nav>
//     </div>
//   );
// }

// export default Navbar;