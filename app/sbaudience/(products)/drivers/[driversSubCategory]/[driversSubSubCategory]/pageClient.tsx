"use client"

import { CheckBoxData, Products, SliderData } from "@/app/(sbacoustics)/types";
import getAllProductsBySubSubCategory from '@/app/(sbacoustics)/actions/get-all-products-by-sub-sub-category';
import AllDriversandFiltersProducts from '../../components/all-filters';
import { useEffect, useState } from 'react';
import { Loader } from "@/components/ui/loader";
import { usePathname } from "next/navigation";

type Props = {
  params: Promise<{ driversSubCategory?: string, driversSubSubCategory?: string }>
}

function createFilterProps(
  key: string,
  name: string,
  unit: string,
  filterKey: string,
) {
  return { key, name, unit, filterKey };
}

function removeDuplicates<RangeSliderFilter>(arr: RangeSliderFilter[]): RangeSliderFilter[] {
  return Array.from(new Set(arr));
}


export default function DriversBySubSubCategoryPageClient(props: Props) { 
  const [allproduct, setAllProducts] = useState<Products[]>([])
  const [slider, setSlider] = useState<SliderData[]>([])
  const [checkbox, setCheckbox] = useState<CheckBoxData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [show, setShow] = useState<boolean>(true)
  const [slideUp, setSlideUp] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { driversSubCategory = '', driversSubSubCategory = '' } = await props.params;
        document.body.style.overflow = 'hidden';
        let tempData = await getAllProductsBySubSubCategory(pathname, driversSubCategory, driversSubSubCategory);
        let sliderRows: SliderData[] = [];
        let checkboxRows: CheckBoxData[] = [];

        let tempSliderLoop = [];
        let tempCheckboxLoop = []
        let counterShow = 0;
        if(driversSubCategory === 'tweeters'){  
          tempSliderLoop.push(
            createFilterProps('allSensitivity', 'Sensitivity', 'dB', 'sensitivity'),
            createFilterProps('allAirResonanceFS', 'Free air resonance, Fs', 'Hz', 'free_air_resonance_fs'),
            createFilterProps('allVoiceCoilDiameter', 'Voice Coil Diameter', 'mm', 'voice_coil_diameter'),
            createFilterProps('allMountingDiameter', 'Overall Diameter', 'Ø', 'mounting_diameter'),
          )
          tempSliderLoop.map((value) =>{
            //@ts-ignore
            const allValueWithoutDuplicates: number[] = removeDuplicates(tempData.allproduct[value.key]);
            const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => !Number.isNaN(number));
            const sortedValues = allValueWithoutDuplicatesAndNone.slice().sort((a, b) => a - b);
            if(sortedValues.length>1){
              counterShow+=1
            }
            sliderRows.push(
              {
                name: value.name, 
                value: sortedValues, 
                unit: value.unit,
                max_index: sortedValues.length - 1,
                min_index: 0,
                minIndex: 0,
                maxIndex: sortedValues.length - 1,
                slug: value.filterKey
              },
            )
          })

          tempCheckboxLoop.push(
            createFilterProps('domeMaterial', 'Dome Material', '', 'dome_material'),
            createFilterProps('allImpedanceCheckbox', 'Nominal Impedance', 'Ω', 'impedance')
          )
          tempCheckboxLoop.map((value) =>{
            //@ts-ignore
            const allValueWithoutDuplicates: string[] = removeDuplicates(tempData.allproduct[value.key]);
            const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => number != '');
            const sortedValues = allValueWithoutDuplicatesAndNone.sort()
            if(sortedValues.length>1){
              counterShow+=1
            }
            checkboxRows.push(
              {
                name: value.name, 
                value: sortedValues, 
                unit: value.unit,
                slug: value.filterKey,
              },
            )
          })

        }
        else if(driversSubCategory === 'coaxials'){
          tempSliderLoop.push(
            createFilterProps('parentSize', 'Size', '"', 'size'),
            createFilterProps('allSensitivity', 'Sensitivity', 'dB', 'sensitivity'),
            createFilterProps('allQFactorQTS', 'Total Q-factor, Qts', '', 'total_q_factor_qts'),
            createFilterProps('linearCoilTravelXmax', 'Linear coil travel', 'mm', 'linear_coil_travel_pp'),
            createFilterProps('Vas', 'Equivalent volume, Vas', 'liters', 'equivalent_volume_vas'),
            // createFilterProps('allMountingDiameter', 'Overall Diameter', 'Ø', 'mounting_diameter'),
          )

          tempSliderLoop.map((value) =>{
            if(value.key==='parentSize'){
              //@ts-ignore
              const allValueWithoutDuplicates: number[] = removeDuplicates(tempData.allsizes);
              const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => !Number.isNaN(number));
              const sortedValues = allValueWithoutDuplicatesAndNone.slice().sort((a, b) => a - b);
              if(sortedValues.length>1){
                counterShow+=1
              }
              sliderRows.push(
                {
                  name: value.name, 
                  value: sortedValues, 
                  unit: value.unit,
                  max_index: sortedValues.length - 1,
                  min_index: 0,
                  minIndex: 0,
                  maxIndex: sortedValues.length - 1,
                  slug: value.filterKey
                },
              )
            }
            else{
              //@ts-ignore
              const allValueWithoutDuplicates: number[] = removeDuplicates(tempData.allproduct[value.key]);
              const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => !Number.isNaN(number));
              const sortedValues = allValueWithoutDuplicatesAndNone.slice().sort((a, b) => a - b);
              if(sortedValues.length>1){
                counterShow+=1
              }
              sliderRows.push(
                {
                  name: value.name, 
                  value: sortedValues, 
                  unit: value.unit,
                  max_index: sortedValues.length - 1,
                  min_index: 0,
                  minIndex: 0,
                  maxIndex: sortedValues.length - 1,
                  slug: value.filterKey
                },
              )
            }
          })

          tempCheckboxLoop.push(
            createFilterProps('coneMaterial', 'Cone Material', '', 'cone_material'),
          )
          tempCheckboxLoop.map((value) =>{
            //@ts-ignore
            const allValueWithoutDuplicates: string[] = removeDuplicates(tempData.allproduct[value.key]);
            const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => number != '');
            let sortedValues = allValueWithoutDuplicatesAndNone.sort()
            if(value.filterKey === 'impedance'){
              sortedValues = sortedValues.filter(number => !Number.isNaN(number));
              sortedValues = sortedValues.slice().map(Number).sort((a, b) => a - b).map(String);
            }
            if(sortedValues.length>1){
              counterShow+=1
            }
            checkboxRows.push(
              {
                name: value.name, 
                value: sortedValues, 
                unit: value.unit,
                slug: value.filterKey,
              },
            )
          })
        }
        else{
          tempSliderLoop.push(
            createFilterProps('parentSize', 'Size', '"', 'size'),
            // createFilterProps('allImpedance', 'Nominal Impedance', 'Ω', 'impedance'),
            createFilterProps('allAirResonanceFS', 'Free air resonance, Fs', 'Hz', 'free_air_resonance_fs'),
            createFilterProps('allSensitivity', 'Sensitivity', 'dB', 'sensitivity'),
            createFilterProps('allQFactorQTS', 'Total Q-factor, Qts', '', 'total_q_factor_qts'),
            createFilterProps('linearCoilTravelXmax', 'Linear coil travel', 'mm', 'linear_coil_travel_pp'),
            createFilterProps('Vas', 'Equivalent volume, Vas', 'liters', 'equivalent_volume_vas'),
            // createFilterProps('allMountingDiameter', 'Overall Diameter', 'Ø', 'mounting_diameter'),
          )

          tempSliderLoop.map((value) =>{
            if(value.key==='parentSize'){
              //@ts-ignore
              const allValueWithoutDuplicates: number[] = removeDuplicates(tempData.allsizes);
              const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => !Number.isNaN(number));
              const sortedValues = allValueWithoutDuplicatesAndNone.slice().sort((a, b) => a - b);
              if(sortedValues.length>1){
                counterShow+=1
              }
              sliderRows.push(
                {
                  name: value.name, 
                  value: sortedValues, 
                  unit: value.unit,
                  max_index: sortedValues.length - 1,
                  min_index: 0,
                  minIndex: 0,
                  maxIndex: sortedValues.length - 1,
                  slug: value.filterKey
                },
              )
            }
            else{
              //@ts-ignore
              const allValueWithoutDuplicates: number[] = removeDuplicates(tempData.allproduct[value.key]);
              const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => !Number.isNaN(number));
              const sortedValues = allValueWithoutDuplicatesAndNone.slice().sort((a, b) => a - b);
              if(sortedValues.length>1){
                counterShow+=1
              }
              sliderRows.push(
                {
                  name: value.name, 
                  value: sortedValues, 
                  unit: value.unit,
                  max_index: sortedValues.length - 1,
                  min_index: 0,
                  minIndex: 0,
                  maxIndex: sortedValues.length - 1,
                  slug: value.filterKey
                },
              )
            }
          })

          tempCheckboxLoop.push(
            createFilterProps('coneMaterial', 'Cone Material', '', 'cone_material'),
            createFilterProps('allImpedance', 'Nominal Impedance', 'Ω', 'impedance'),
          )
          tempCheckboxLoop.map((value) =>{
            //@ts-ignore
            const allValueWithoutDuplicates: string[] = removeDuplicates(tempData.allproduct[value.key]);
            const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => number != '');
            let sortedValues = allValueWithoutDuplicatesAndNone.sort()
            if(value.filterKey === 'impedance'){
              sortedValues = sortedValues.filter(number => !Number.isNaN(number));
              sortedValues = sortedValues.slice().map(Number).sort((a, b) => a - b).map(String);
            }
            if(sortedValues.length>1){
              counterShow+=1
            }
            checkboxRows.push(
              {
                name: value.name, 
                value: sortedValues, 
                unit: value.unit,
                slug: value.filterKey,
              },
            )
          })
        }
        if(counterShow===0){
          setShow(false)
        }
        setSlider(sliderRows)
        setCheckbox(checkboxRows)
        setAllProducts(tempData.allproduct.allProducts)

        setTimeout(() => {
          requestAnimationFrame(() => {
            setSlideUp(true);
            document.body.style.overflow = '';
            setTimeout(() => {
              setLoading(false);
            }, 700);
          });
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        document.body.style.overflow = '';
      }
    };

    fetchData();
  }, []);

  return(
    <div className="2xl:px-60 xl:px-40 xl:py-8 lg:py-6 lg:px-12 px-8 py-4">
      {loading && (
      <div
        className={`fixed top-0 left-0 w-full h-full z-[1000] flex items-center justify-center bg-black transition-transform duration-700 ${
          slideUp ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <Loader />
      </div>
    )}
      {show?
        <div className="md:grid lg:grid-cols-5 md:grid-cols-4">
          <AllDriversandFiltersProducts data={allproduct} slider={slider} checkbox={checkbox} showFilters={show}/>
        </div>
        :
        <div className="md:grid md:grid-cols-4">
          <AllDriversandFiltersProducts data={allproduct} slider={slider} checkbox={checkbox} showFilters={show} />
        </div>
      }
    </div>
  );
}
