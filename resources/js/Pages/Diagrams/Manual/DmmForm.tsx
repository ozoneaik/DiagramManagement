import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import React, {FormEvent} from "react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function DmmForm(){
    const {data, setData, processing, errors, setError,post} = useForm({
        sku_code : '',
        model_fg : '',
        type_dm : 'DM01',
        path_file : '',
    });

    const handleOnChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,label : any ) => {
        const value = e.target.value;
        console.log(value,label)
        setData(label,value)
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('diagrams.manual.store'),{
            onFinish : () => {
                alert('hello');
            }
        })
    }
    return (
        <Authenticated header={'ฟอร์ม'}>
            <Head title={'ฟอร์ม'}/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="md:w-1/2">
                                    {data.path_file && <iframe src={data.path_file} width="100%" height="600px"/>}
                                    {!data.path_file && 'คู่มือจะแสดงที่นี่หากเจอไฟล์ที่ระบุ'}
                                </div>
                                <div className="md:w-1/2">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <InputLabel htmlFor="sku_code" value="รหัสสินค้า" />
                                            <TextInput
                                                id="sku_code" className="mt-1 block w-full"
                                                required value={data.sku_code}
                                                onChange={(e) => handleOnChange(e,'sku_code')}
                                                isFocused autoComplete="sku_code"
                                                placeholder="ระบุรหัสสินค้า"
                                            />
                                            <InputError className="mt-2" message={errors.sku_code} />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="model_fg" value="Model" />
                                            <TextInput
                                                id="model_fg" className="mt-1 block w-full"
                                                required value={data.model_fg}
                                                onChange={(e) => handleOnChange(e,'model_fg')}
                                                isFocused autoComplete="model_fg"
                                                placeholder="ระบุModel"
                                            />
                                            <InputError className="mt-2" message={errors.sku_code} />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="type_dm" value="ประเภท DM" />
                                            <select
                                                disabled={!data.sku_code}
                                                id="type_dm" value={data.type_dm}
                                                onChange={(e) => handleOnChange(e,'type_dm')}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            >
                                                <option value="DM01">DM01</option>
                                                <option value="DM02">DM02</option>
                                                <option value="DM03">DM03</option>
                                                <option value="DM04">DM04</option>
                                                <option value="DM05">DM05</option>
                                            </select>
                                            <InputError className="mt-2" message={errors.type_dm} />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="path_file" value="ที่อยู่ไฟล์" />
                                            <TextInput
                                                id="path_file" className="mt-1 block w-full"
                                                required value={data.path_file}
                                                onChange={(e) => handleOnChange(e,'path_file')}
                                                isFocused autoComplete="path_file"
                                                placeholder="ระบุ ที่อยู่ไฟล์"
                                            />
                                            <InputError className="mt-2" message={errors.sku_code} />
                                        </div>
                                        <div className={'flex justify-end gap-1'}>
                                            <PrimaryButton type='submit'>บันทึก</PrimaryButton>
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
