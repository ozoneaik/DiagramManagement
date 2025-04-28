import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function DmForm() {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        sku_code: '',
        dm_type: 'DM01',
        path_file: '',
        layout : 'ด้านหน้า',
        url : '',
    });

    const [previewUrl, setPreviewUrl] = useState<string>('');

    // สร้าง URL ตัวอย่างเมื่อมีการเปลี่ยนแปลงข้อมูล
    useEffect(() => {
        if (data.sku_code) {
            const newUrl = `https://images.pumpkin.tools/SKUS/DM/Diagrams-${data.sku_code}-${data.dm_type}.jpg`;
            setPreviewUrl(newUrl);
        } else {
            setPreviewUrl('');
        }
    }, [data.sku_code, data.dm_type]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, labelName: "sku_code" | "dm_type" | "path_file" | "layout" | "url") => {
        const value = e.target.value;
        setData(labelName, value);
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalPathFile = `https://images.pumpkin.tools/SKUS/DM/Diagrams-${data.sku_code}-${data.dm_type}.jpg`;
        setData('path_file', finalPathFile);
        
        post(route('diagrams.store'), {
            onSuccess: () => {
                setData({
                    sku_code: '',
                    dm_type: 'DM01',
                    path_file: '',
                    layout: 'ด้านหน้า',
                    url: '',
                });
                setPreviewUrl('');
            },
            preserveState: true,
        });
    }

    return (
        <Authenticated header={'Diagram Form'}>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* ส่วนแสดงรูปภาพด้านซ้าย */}
                                <div className="md:w-1/2">
                                    <div className="border border-gray-300 rounded-lg p-4 h-full flex flex-col items-center justify-center">
                                        <h2 className="text-lg font-semibold mb-4">ตัวอย่างรูปภาพ</h2>
                                        {data.url ? (
                                            <div className="w-full flex flex-col items-center">
                                                <div className="relative w-full max-w-md aspect-video bg-gray-100 rounded overflow-hidden">
                                                    <img 
                                                        src={data.url}
                                                        alt="Preview DM"
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <div className="mt-4 w-full">
                                                    <p className="text-sm font-medium text-gray-700">URL รูปภาพ:</p>
                                                    <p className="text-sm text-gray-500 break-all mt-1">{data.url}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center p-8 w-full max-w-md aspect-video bg-gray-100 rounded">
                                                <p className="mt-4 text-gray-500 text-center">กรุณากรอกรหัสสินค้าและเลือกประเภท DM เพื่อดูตัวอย่าง</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* ส่วนฟอร์มด้านขวา */}
                                <div className="md:w-1/2">
                                    <form onSubmit={onSubmit} className="space-y-6">
                                        <div>
                                            <InputLabel htmlFor="sku_code" value="รหัสสินค้า" />
                                            <TextInput
                                                id="sku_code" className="mt-1 block w-full"
                                                required value={data.sku_code}
                                                onChange={(e) => handleOnChange(e,'sku_code')}
                                                isFocused autoComplete="name"
                                                placeholder="ระบุรหัสสินค้า"
                                            />
                                            <InputError className="mt-2" message={errors.sku_code} />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="type_dm" value="ประเภท DM" />
                                            <select
                                                disabled={!data.sku_code}
                                                id="type_dm" value={data.dm_type}  
                                                onChange={(e) => handleOnChange(e,'dm_type')}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            >
                                                <option value="DM01">DM01</option>
                                                <option value="DM02">DM02</option>
                                                <option value="DM03">DM03</option>
                                                <option value="DM04">DM04</option>
                                                <option value="DM05">DM05</option>
                                            </select>
                                            <InputError className="mt-2" message={errors.dm_type} />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="layout" value="เลเยอร์ (ด้านหน้า,ด้านหลัง)" />
                                            <TextInput
                                                id="layout" className="mt-1 block w-full"
                                                required value={data.layout}
                                                onChange={(e) => handleOnChange(e,'layout')}
                                                isFocused autoComplete="layout"
                                                placeholder="ระบุเลเยอร์"
                                            />
                                            <InputError className="mt-2" message={errors.layout} />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="url" value="URL รูปภาพ" />
                                            <TextInput
                                                id="url" className="mt-1 block w-full"
                                                required value={data.url}
                                                onChange={(e) => handleOnChange(e,'url')}
                                                isFocused autoComplete="url"
                                                placeholder="ระบุ URL รูปภาพ"
                                            />
                                            <InputError className="mt-2" message={errors.url} />
                                        </div>
                                        <div className="pt-4 flex items-center gap-4">
                                            <PrimaryButton disabled={processing || !data.sku_code}>บันทึก</PrimaryButton>
                                            <Transition
                                                show={recentlySuccessful} enter="transition ease-in-out"
                                                enterFrom="opacity-0" leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-gray-600">
                                                    บันทึกสำเร็จ
                                                </p>
                                            </Transition>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}