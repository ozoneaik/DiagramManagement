import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function DmForm() {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        sku_code: '',
        dm_type: 'DM01',
        path_file: '',
        layer : 'รูปที่ 1',
        fac_model : '',
        url : '',
        finalPathFile : '',
    });

    const [previewUrl, setPreviewUrl] = useState<string>('');

    // สร้าง URL ตัวอย่างเมื่อมีการเปลี่ยนแปลงข้อมูล
    useEffect(() => {
        if (data.sku_code) {
            const newUrl = `https://images.pumpkin.tools/SKUS/DM/new/${data.sku_code}-${data.fac_model}-${data.dm_type}.jpg`;
            console.log(newUrl);
            setData("url",newUrl);
        } else {
            setPreviewUrl('');
        }
    }, [data.sku_code, data.dm_type,data.fac_model]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
        const {name, value} = e.target;
        // setData(name, value);
        setData(name as keyof typeof data, value);
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalPathFile = `https://images.pumpkin.tools/SKUS/DM/new/${data.sku_code}-${data.fac_model}-${data.dm_type}.jpg`;
        setData('path_file', finalPathFile);
        post(route('diagrams.store'), {
            onSuccess: () => {
                setData({
                    sku_code: '',
                    dm_type: 'DM01',
                    path_file: '',
                    layer: 'รูปที่ 1',
                    url: '',
                    fac_model : '',
                    finalPathFile : finalPathFile,
                });
                setPreviewUrl('');
            },
            preserveState: true,
        });
    }

    return (
        <Authenticated header={'Diagram Form'}>
            <Head title="ฟอร์ม 📃"/>
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
                                                required value={data.sku_code} name='sku_code'
                                                onChange={(e) => handleOnChange(e)}
                                                isFocused autoComplete="name"
                                                placeholder="ระบุรหัสสินค้า"
                                            />
                                            <InputError className="mt-2" message={errors.sku_code} />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="type_dm" value="ประเภท DM" />
                                            <select
                                                disabled={!data.sku_code} name='type_dm'
                                                id="type_dm" value={data.dm_type}
                                                onChange={(e) => handleOnChange(e)}
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
                                            <InputLabel htmlFor="layer" value="เลเยอร์ (ด้านหน้า,ด้านหลัง)" />
                                            <TextInput
                                                id="layer" className="mt-1 block w-full"
                                                required value={data.layer}
                                                onChange={(e) => handleOnChange(e)}
                                                isFocused autoComplete="layer" name='layer'
                                                placeholder="ระบุเลเยอร์"
                                            />
                                            <InputError className="mt-2" message={errors.layer} />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="fac_model" value="fac model" />
                                            <TextInput
                                                id="fac_model" className="mt-1 block w-full"
                                                required value={data.fac_model}
                                                onChange={(e) => handleOnChange(e)}
                                                isFocused autoComplete="fac_model" name='fac_model'
                                                placeholder="ระบุ model"
                                            />
                                            <InputError className="mt-2" message={errors.fac_model} />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="url" value="URL รูปภาพ" />
                                            <TextInput
                                                id="url" className="mt-1 block w-full"
                                                required value={data.url} name='url'
                                                onChange={(e) => handleOnChange(e)}
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
