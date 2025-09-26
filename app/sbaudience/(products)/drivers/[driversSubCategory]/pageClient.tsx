"use client"

import { CheckBoxData, Products, ProductsSBAudience, SliderData } from "@/app/types";
import { useEffect, useState, use } from 'react';
import { Loader } from "@/components/ui/loader";
import { usePathname } from "next/navigation";
import getAllProductsBySubCategory from "@/app/sbaudience/actions/get-all-products-by-sub-category";
import AllDriversandFiltersProducts from "../../components-all-drivers-page/all-filters";

type Props = {
  params: Promise<{ driversSubCategory?: string }>
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


export default function DriversBySubCategoryPageClient(props: Props) { 
  const [allproduct, setAllProducts] = useState<ProductsSBAudience[]>([])
  const [slider, setSlider] = useState<SliderData[]>([])
  const [checkbox, setCheckbox] = useState<CheckBoxData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [show, setShow] = useState<boolean>(true)
  const [slideUp, setSlideUp] = useState(false);
  const pathname = usePathname()
  useEffect(() => {    
    const fetchData = async () => {
      try {
        const { driversSubCategory = '' } = await props.params;
        document.body.style.overflow = 'hidden';
        let tempData = await getAllProductsBySubCategory(pathname, driversSubCategory);
        let sliderRows: SliderData[] = [];
        let checkboxRows: CheckBoxData[] = [];

        let tempSliderLoop = [];
        let tempCheckboxLoop = [];
        let counterShow = 0;
        if(driversSubCategory === 'compression-drivers'){  
          tempSliderLoop.push(
            createFilterProps('allImpedance', 'Impedance', '', 'nominal_impedance'),
            createFilterProps('allMaxPower', 'Max Power', '', 'maximum_power_handling'),
            createFilterProps('allSensitivity', 'Sensitivity', '', 'sensitivity'),
            createFilterProps('allVoiceCoilDiameter', 'Voice Coil Diameter', '', 'voice_coil_diameter'),
            createFilterProps('allNominalThroatDiameter', 'Nominal Throat Diameter', '', 'nominal_throat_diameter'),
          )
          tempSliderLoop.map((value) =>{
            //@ts-ignore
            const allValueWithoutDuplicates: number[] = removeDuplicates(tempData[value.key]);
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
            createFilterProps('allDiaphragmMaterial', 'Diaphragm Material', '', 'diaphragm_material'),
            createFilterProps('allMagnetMaterial', 'Magnet Material', '', 'magnet')
          )
          tempCheckboxLoop.map((value) =>{
            //@ts-ignore
            const allValueWithoutDuplicates: string[] = removeDuplicates(tempData[value.key]);
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
        else if(driversSubCategory === 'horn'){
          tempSliderLoop.push(
            createFilterProps('allNominalCoverageHorizontal', 'Nominal Coverage Horizontal', '', 'nominalCoverageHorizontal'),
            createFilterProps('allNominalCoverageVertical', 'Nominal Coverage Vertical', '', 'nominalCoverageVertical'),
            createFilterProps('allDirectivityFactor', 'Directivity Factor', '', 'directivityFactor'),
            createFilterProps('allDirectivityIndex', 'Directivity Index', '', 'directivityIndex'),
            createFilterProps('allThroatDiameter', 'Throat Diameter', '', 'throatDiameter'),
            createFilterProps('allMinimumRecommendedCrossover', 'Minimum Recommended Crossover', '', 'minimumRecommendedCrossover'),
            createFilterProps('allBaffleCutoutDimensionsHorizontal', 'Baffle Cutout Dimensions Horizontal', '', 'baffleCutoutDimensionsHorizontal'),
            createFilterProps('allBaffleCutoutDimensionsVertical', 'Baffle Cutout Dimensions Vertical', '', 'baffleCutoutDimensionsVertical'),
            createFilterProps('allSensitivity', 'Sensitivity', '', 'sensitifityOnDriver'),
          )

          tempSliderLoop.map((value) =>{
            //@ts-ignore
            const allValueWithoutDuplicates: number[] = removeDuplicates(tempData[value.key]);
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
            createFilterProps('allMechanicalConnectionofDriver', 'Mechanical Connection of Driver', '', 'mechanicalConnectionofDriver'),
          )
          tempCheckboxLoop.map((value) =>{
            //@ts-ignore
            const allValueWithoutDuplicates: string[] = removeDuplicates(tempData[value.key]);
            const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => number != '');
            let sortedValues = allValueWithoutDuplicatesAndNone.sort()
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
            createFilterProps('allImpedance', 'Impedance', '', 'nominal_impedance'),
            createFilterProps('allMaxPower', 'Max Power', '', 'maximum_power_handling'),
            createFilterProps('allFS', 'FS', '', 'fs'),
            createFilterProps('allSensitivity', 'Sensitivity', '', 'sensitivity'),
            createFilterProps('allQTS', 'QTS', '', 'qts'),
            createFilterProps('allXmax', 'X Max', '', 'x_max'),
            createFilterProps('allMms', 'Mms', '', 'mms'),
            createFilterProps('allVoiceCoilDiameter', 'Voice Coil Diameter', '', 'voice_coil_diameter'),
          )

          tempSliderLoop.map((value) =>{
            //@ts-ignore
            const allValueWithoutDuplicates: number[] = removeDuplicates(tempData[value.key]);
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

          // tempCheckboxLoop.push(
          //   createFilterProps('coneMaterial', 'Cone Material', '', 'cone_material'),
          //   createFilterProps('allImpedance', 'Nominal Impedance', 'Ω', 'impedance'),
          // )
          // tempCheckboxLoop.map((value) =>{
          //   //@ts-ignore
          //   const allValueWithoutDuplicates: string[] = removeDuplicates(tempData[value.key]);
          //   const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => number != '');
          //   let sortedValues = allValueWithoutDuplicatesAndNone.sort()
          //   if(value.filterKey === 'impedance'){
          //     sortedValues = sortedValues.filter(number => !Number.isNaN(number));
          //     sortedValues = sortedValues.slice().map(Number).sort((a, b) => a - b).map(String);
          //   }
          //   if(sortedValues.length>1){
          //     counterShow+=1
          //   }
          //   checkboxRows.push(
          //     {
          //       name: value.name, 
          //       value: sortedValues, 
          //       unit: value.unit,
          //       slug: value.filterKey,
          //     },
          //   )
          // })
        }
        if(counterShow===0){
          setShow(false)
        }
        setSlider(sliderRows)
        setCheckbox(checkboxRows)
        setAllProducts(tempData.allProducts)

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
  }, [props.params]);

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