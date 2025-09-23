"use client"

import axios, { AxiosResponse } from "axios"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Custom_Specification } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/app/admin/components/ui/input"
import { Button } from "@/app/admin/components/ui/button"
import { Separator } from "@/app/admin/components/ui/separator"
import { Heading } from "@/app/admin/components/ui/heading"
import { Label } from "@/app/admin/components/ui/label"
import { Textarea } from "@/app/admin/components/ui/textarea"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import HeadingTiptap from '@tiptap/extension-heading';
import ImageTiptap from '@tiptap/extension-image';
import LinkTiptap from '@tiptap/extension-link'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import './styles.scss'
import { Toggle } from "@/app/admin/components/ui/toggle"
import { Bold, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, LinkIcon, List, ListOrdered, LucideLink, LucideUnlink, Strikethrough } from "lucide-react"
import Link from "next/link"


interface CustomSpecFormProps {
  initialData?: Custom_Specification,
  product_name: string,
  isKits: boolean
};

export const CustomSpecForm: React.FC<CustomSpecFormProps> = ({
  initialData, product_name, isKits
}) => {
  const [customSpec, setCustomSpec] = useState<Custom_Specification>();
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit custom specification' : 'Create custom specification';
  const description = `For ${product_name}`;
  const toastMessage = initialData ? 'Custom Specification updated.' : 'Custom Specification created.';
  const action = initialData ? 'Save changes' : 'Create';


  useEffect(() => {
    if(initialData){
      setCustomSpec(initialData)
    }
   } , [initialData]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const temp : Custom_Specification = {
      customDesc: editor && editor.getHTML() ? editor.getHTML() : '',
      // @ts-ignore
      frequency_range: event.target[15].value,
      // @ts-ignore
      sensitivity: event.target[16].value,
      // @ts-ignore
      nominal_impedance: event.target[17].value,
      // @ts-ignore
      max_spl: event.target[18].value,
      // @ts-ignore
      recommended_amplifier: event.target[19].value,
      // @ts-ignore
      crossover_frequency: event.target[20].value,
      // @ts-ignore
      enclosure_type: event.target[21].value,
      // @ts-ignore
      port_tuning_frequency: event.target[22].value,
      // @ts-ignore
      driver_units: event.target[23].value,
      // @ts-ignore
      cabinet_material: event.target[24].value,
      // @ts-ignore
      speaker_dimension: event.target[25].value,
      // @ts-ignore
      net_weight: event.target[26].value,
      // @ts-ignore
      dc_resistance_re: event.target[27].value,
      // @ts-ignore
      voice_coil_diameter: event.target[28].value,
      // @ts-ignore
      voice_coil_height: event.target[29].value,
      // @ts-ignore
      air_gap_height: event.target[30].value,
      // @ts-ignore
      free_air_resonance_fs: event.target[31].value,
      // @ts-ignore
      rated_power_handling: event.target[32].value,
      // @ts-ignore
      magnetic_flux_density: event.target[33].value,
      // @ts-ignore
      magnet_weight: event.target[34].value,
      // @ts-ignore
      dome_material: event.target[35].value,
      // @ts-ignore
      custom_note_for_spec: event.target[36].value,
      productId: '',
      createdAt:new Date(),
      updatedAt:new Date(),
      id: '',
    }
    try {
      setLoading(true);
      let response: AxiosResponse;
      if (initialData) {
        response = await axios.patch(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/${params.customProductId}/customspecification/${initialData.id}`, temp);
      } else {
        response = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/${params.customProductId}/customspecification`, temp);
      }
      if(response.data === 'expired_session'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("Session expired, please login again");
      }
      else if(response.data === 'invalid_token'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("API Token Invalid, please login again");
      }
      else if(response.data === 'unauthorized'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("Unauthorized!");
      }
      else{
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/customproduct`);
        router.refresh();
        toast.success(toastMessage);
      }
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };



  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      HeadingTiptap.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      ImageTiptap,
      BulletList,
      OrderedList,
      LinkTiptap.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url: string, ctx:any) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p: string | { scheme: string }) => (typeof p === 'string' ? p : p.scheme))

            if (!allowedProtocols.includes(protocol)) {
              return false
            }

            // disallowed domains
            const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }

            // all checks have passed
            return true
          } catch (error) {
            return false
          }
        },
        shouldAutoLink: url => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
            const domain = parsedUrl.hostname

            return !disallowedDomains.includes(domain)
          } catch (error) {
            return false
          }
        },

      }),
      Text,
      TextStyle,
      Color,
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-hidden',
      },
    },
    content: initialData?.customDesc ? initialData.customDesc : '<p>Start editing...</p>',
  });

  

  const setLink = useCallback(() => {
    const previousUrl = editor!.getAttributes('link').href
    const url = window.prompt('Change the root URL to {temp}. Ex: https://sbacoustics.com/products/sb12pac25-4 => {temp}products/sb12pac25-4', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor!.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor!.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  if (!editor) {
    return null
  }




  
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
        <form onSubmit={onSubmit} className="space-y-4 w-full">

          <div className={`${!isKits && 'hidden'} border rounded-lg p-4 shadow-lg`}>
            <div className="font-bold text-base pb-2">Description</div>
              {/* Toolbar */}
              <div>
              <div className="flex gap-2 mb-4 flex-wrap">
                <Toggle
                  pressed={editor.isActive('bold')}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  <Bold className="w-4 h-4" />
                </Toggle>
                <Toggle
                  pressed={editor.isActive('italic')}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  <Italic className="w-4 h-4" />
                </Toggle>
                <Toggle
                  pressed={editor.isActive('strike')}
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                  <Strikethrough className="w-4 h-4" />
                </Toggle>
                <Toggle
                  pressed={editor.isActive('bulletList')}
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                  <List className="w-4 h-4" />
                </Toggle>
                <Toggle
                  pressed={editor.isActive('orderedList')}
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                  <ListOrdered className="w-4 h-4" />
                </Toggle>
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <Toggle
                    key={level}
                    pressed={editor.isActive('heading', { level })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()}
                  >
                    {level === 1 && <Heading1 className="w-4 h-4" />}
                    {level === 2 && <Heading2 className="w-4 h-4" />}
                    {level === 3 && <Heading3 className="w-4 h-4" />}
                    {level === 4 && <Heading4 className="w-4 h-4" />}
                    {level === 5 && <Heading5 className="w-4 h-4" />}
                    {level === 6 && <Heading6 className="w-4 h-4" />}
                  </Toggle>
                ))}
                 
                 <Toggle
                  pressed={editor.isActive('link')}
                  onClick={setLink}
                >
                    <LucideLink className="w-4 h-4" />
                </Toggle>
                <Toggle
                  pressed={!editor.isActive('link')}
                  onClick={() => editor.chain().focus().unsetLink().run()}
                >
                    <LucideUnlink className="w-4 h-4" />
                </Toggle>
                <Toggle
                  onClick={() => editor.chain().focus().setColor('#e60013').run()}
                  pressed={false}
                  // className={editor.isActive('textStyle', { color: '#ed3237' }) ? 'is-active' : ''}
                >
                  <p className="text-primary">Red</p>
                </Toggle>
                <Toggle
                  onClick={() => editor.chain().focus().unsetColor().run()}
                  pressed={false}
                >
                  Black
                </Toggle>
              </div>
                
                {/* <Input  
                  id={`file`}
                  type="file"
                  accept="image/*"
                  name="file"
                  onChange={(e) =>
                    e.target.files && handleFileChangeTiptap(e)
                  }
                  className="border border-gray-300 p-2 rounded-md"
                /> */}

              <EditorContent editor={editor} className="border p-4"/>
              </div>
            </div>



  
          <div className="border rounded-lg p-4 shadow-lg">
          <div className="font-bold pb-2">For Custom Table (Do not include units, except Net Weight and Speaker Dimension)</div>
          <div className="md:grid md:grid-cols-3 gap-8 border-2 rounded-lg p-2">
            <div>
            <Label htmlFor="frequency_range" className="font-bold text-base">Frequency Range (Hz)</Label>
            <Input disabled={loading} id="frequency_range" placeholder="Frequency range value" defaultValue={customSpec?.frequency_range? customSpec.frequency_range : ""} />
            </div>
            <div>
            <Label htmlFor="sensitivity" className="font-bold text-base">Sensitivity (dB)</Label>
            <Input disabled={loading} id="sensitivity" placeholder="Sensitivity value" defaultValue={customSpec?.sensitivity? customSpec.sensitivity : ""} />
            </div>
            <div>
            <Label htmlFor="nominal_impedance" className="font-bold text-base">Nominal Impedance (Ω)</Label>
            <Input disabled={loading} id="nominal_impedance" placeholder="Nominal Impedance value" defaultValue={customSpec?.nominal_impedance? customSpec.nominal_impedance : ""} />
            </div>
            <div>
            <Label htmlFor="max_spl" className="font-bold text-base">Max SPL (dB)</Label>
            <Input disabled={loading} id="max_spl" placeholder="Max SPL value" defaultValue={customSpec?.max_spl? customSpec.max_spl : ""} />
            </div>
            <div>
            <Label htmlFor="recommended_amplifier" className="font-bold text-base">Recommended Amplifier (W)</Label>
            <Input disabled={loading} id="recommended_amplifier" placeholder="Recommended Amplifier value" defaultValue={customSpec?.recommended_amplifier? customSpec.recommended_amplifier : ""} />
            </div>
            <div>
            <Label htmlFor="crossover_frequency" className="font-bold text-base">Crossover Frequency (Hz)</Label>
            <Input disabled={loading} id="crossover_frequency" placeholder="Crossover Frequency value" defaultValue={customSpec?.crossover_frequency? customSpec.crossover_frequency : ""} />
            </div>
            <div>
            <Label htmlFor="enclosure_type" className="font-bold text-base">Enclosure Type</Label>
            <Input disabled={loading} id="enclosure_type" placeholder="Enclosure Type value" defaultValue={customSpec?.enclosure_type? customSpec.enclosure_type : ""} />
            </div>
            <div>
            <Label htmlFor="port_tuning_frequency" className="font-bold text-base">Port Tuning Frequency (Hz)</Label>
            <Input disabled={loading} id="port_tuning_frequency" placeholder="Port Tuning Frequency value" defaultValue={customSpec?.port_tuning_frequency? customSpec.port_tuning_frequency : ""} />
            </div>
            <div>
            <Label htmlFor="driver_units" className="font-bold text-base">Driver Units</Label>
            <Input disabled={loading} id="driver_units" placeholder="Driver Units value" defaultValue={customSpec?.driver_units? customSpec.driver_units : ""} />
            </div>
            <div>
            <Label htmlFor="cabinet_material" className="font-bold text-base">Cabinet Material</Label>
            <Input disabled={loading} id="cabinet_material" placeholder="Cabinet Material value" defaultValue={customSpec?.cabinet_material? customSpec.cabinet_material : ""} />
            </div>
            <div>
            <Label htmlFor="speaker_dimension" className="font-bold text-base">Speaker Dimension</Label>
            <Input disabled={loading} id="speaker_dimension" placeholder="Speaker Dimension value" defaultValue={customSpec?.speaker_dimension? customSpec.speaker_dimension : ""} />
            </div>
            <div>
            <Label htmlFor="net_weight" className="font-bold text-base">Net Weight (kg)</Label>
            <Input disabled={loading} id="net_weight" placeholder="Net Weight value" defaultValue={customSpec?.net_weight? customSpec.net_weight : ""} />
            </div>
            <div>
            <Label htmlFor="dc_resistance_re" className="font-bold text-base">DC Resistance, re (Ω)</Label>
            <Input disabled={loading} id="dc_resistance_re" placeholder="DC Resistance value" defaultValue={customSpec?.dc_resistance_re? customSpec.dc_resistance_re : ""} />
            </div>
            <div>
            <Label htmlFor="voice_coil_diameter" className="font-bold text-base">Voice Coil Diameter (mm)</Label>
            <Input disabled={loading} id="voice_coil_diameter" placeholder="Voice Coil Diameter value" defaultValue={customSpec?.voice_coil_diameter? customSpec.voice_coil_diameter : ""} />
            </div>
            <div>
            <Label htmlFor="voice_coil_height" className="font-bold text-base">Voice Coil Height (mm)</Label>
            <Input disabled={loading} id="voice_coil_height" placeholder="Voice Coil Height value" defaultValue={customSpec?.voice_coil_height? customSpec.voice_coil_height : ""} />
            </div>
            <div>
            <Label htmlFor="air_gap_height" className="font-bold text-base">Air Gap Height (mm)</Label>
            <Input disabled={loading} id="air_gap_height" placeholder="Air Gap Height value" defaultValue={customSpec?.air_gap_height? customSpec.air_gap_height : ""} />
            </div>
            <div>
            <Label htmlFor="free_air_resonance_fs" className="font-bold text-base">Free Air Resonance, FS (Hz)</Label>
            <Input disabled={loading} id="free_air_resonance_fs" placeholder="Free Air Resonance value" defaultValue={customSpec?.free_air_resonance_fs? customSpec.free_air_resonance_fs : ""} />
            </div>
            <div>
            <Label htmlFor="rated_power_handling" className="font-bold text-base">Rated Power Handling (W)</Label>
            <Input disabled={loading} id="rated_power_handling" placeholder="Rated Power Handling value" defaultValue={customSpec?.rated_power_handling? customSpec.rated_power_handling : ""} />
            </div>
            <div>
            <Label htmlFor="magnetic_flux_density" className="font-bold text-base">Magnetic Flux Density (T)</Label>
            <Input disabled={loading} id="magnetic_flux_density" placeholder="Magnetic Flux Density value" defaultValue={customSpec?.magnetic_flux_density? customSpec.magnetic_flux_density : ""} />
            </div>
            <div>
            <Label htmlFor="magnet_weight" className="font-bold text-base">Magnet Weight (kg)</Label>
            <Input disabled={loading} id="magnet_weight" placeholder="Magnet Weight value" defaultValue={customSpec?.magnet_weight? customSpec.magnet_weight : ""} />
            </div>
            <div>
            <Label htmlFor="dome_material" className="font-bold text-base">Dome Material</Label>
            <Input disabled={loading} id="dome_material" placeholder="Dome Material" defaultValue={customSpec?.dome_material? customSpec.dome_material : ""} />
            </div>
            <div>
            <Label htmlFor="custom_note_for_spec" className="font-bold text-base">Custom Note for Specification | <Link href={'/images/admin/custom_spec_table_note_placement.png'} target="blank" className="text-primary hover:underline font-normal text-sm  ">See placement</Link></Label>
            <Textarea
              disabled={loading}
              id="custom_note_for_spec"
              placeholder="Custom Note for the Custom Specification"
              defaultValue={customSpec?.custom_note_for_spec? customSpec.custom_note_for_spec : ""}
            />
            </div>
            </div>
            </div>
          <Button disabled={loading} className="w-full flex gap-2 bg-green-500 text-white hover:bg-green-600 transition-colors" type="submit">
            {action}
          </Button>
        </form>
    </>
  );
};
