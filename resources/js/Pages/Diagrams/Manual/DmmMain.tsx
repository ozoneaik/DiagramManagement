import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head, router} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

export default function DmmMain({DiagramManuals}: { DiagramManuals: DiagramManualProps }) {

    const TableList = () => (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
                <th scope="col" className="th-class">รหัสสินค้า</th>
                <th scope="col" className="th-class">ประเภท DM</th>
                <th scope="col" className="th-class">model</th>
                <th scope="col" className="th-class">ที่อยู่ไฟล์</th>
                <th scope="col" className="th-class">สร้างเมื่อ</th>
                <th scope="col" className="th-class">อัพเดทเมื่อ</th>
                <th scope="col" className="th-class">จัดการ</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {DiagramManuals.data.map((item: DmmListProps, index: number) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="td-class-medium">
                        {item.sku_code}
                    </td>
                    <td className="td-class">
                        <span className="td-class-rounded-full">
                            {item.type_dm}
                        </span>
                    </td>
                    <td className="td-class">
                        <span className="truncate block max-w-xs" title={'item.path_file'}>
                            {item.model_fg}
                        </span>
                    </td>
                    <td className="td-class">
                        <span className="truncate block max-w-xs" title={'item.path_file'}>
                            {item.created_at && new Date(item.created_at).toLocaleString('th-TH')}
                        </span>
                    </td>
                    <td className="td-class">
                        <span className="truncate block max-w-xs" title={'item.path_file'}>
                            {item.updated_at && new Date(item.updated_at).toLocaleString('th-TH')}
                        </span>
                    </td>
                    <td className="td-class">
                        <a href={item.path_file} target='_blank'>
                            📄&nbsp;PDF
                        </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                            <SecondaryButton>
                                แก้ไข
                            </SecondaryButton>
                        </div>
                    </td>
                </tr>
            ))}

            </tbody>
        </table>
    )

    const Redirect = (link : string) => {
        router.get(route(link));
    }

    return (
        <Authenticated header={'รายการคู่มือไดอะแกรม'}>
            <Head title={'รายการคู่มือไดอะแกรม'}/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">รายการคู่มือไดอะแกรมทั้งหมด</h2>
                                <div className='flex justify-start items-center gap-3'>
                                    <PrimaryButton onClick={()=>Redirect('diagrams.manual.create')}>
                                        เพิ่มรายการใหม่ ที่ละ 1 รายการ
                                    </PrimaryButton>
                                    <SecondaryButton onClick={()=>Redirect('diagrams.create.csv')}>
                                        นำเข้าข้อมูลจากไฟล์ CSV
                                    </SecondaryButton>
                                </div>
                            </div>
                            <div className="overflow-x-auto" style={{maxHeight : 'calc(100dvh - 335px)'}}>
                                <TableList/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
