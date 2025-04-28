import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Link} from "@inertiajs/react";
import {useState} from "react";

interface sparePartListProps {
    data: ListProps[];
    links: {
        total: number;
    };
    meta: any;
    length : number;

}

interface ListProps {
    serial?: string;
    skusp?: string;
    skuspname?: string;
    skuspunit?: string;
    pathfile_sp?: string;
    namefile_sp?: string;
    skufg?: string;
    skufgname?: string;
    modelfg?: string;
    pathfile_dm?: string;
    namefile_dm?: string;
    typedm?: string;
    pathfile_manual?: string;
    namefile_manual?: string;
    createon?: string;
    price?: string;
}

export default function SpMain({sparePartList}: { sparePartList: sparePartListProps }) {
    const [list, setList] = useState(sparePartList.data);
    return (
        <Authenticated header={'รายการ Diagram'}>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">รายการ Diagram ทั้งหมด</h2>
                                <Link
                                    href={route('diagrams.create')}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                                    เพิ่มรายการใหม่
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            รหัสสินค้า
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ประเภท DM
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ที่อยู่ไฟล์
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            จัดการ
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {list.length > 0 ? (
                                        list.map((item: ListProps, index: number) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {item.skusp}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <span
                                                            className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {item.typedm}
                                                        </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <span className="truncate block max-w-xs"
                                                              title={item.pathfile_dm}>
                                                            {item.pathfile_dm}
                                                        </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <button className="text-blue-600 hover:text-blue-900">
                                                            แก้ไข
                                                        </button>
                                                        <button className="text-red-600 hover:text-red-900">
                                                            ลบ
                                                        </button>
                                                        <a href={item.pathfile_manual} target="_blank"
                                                           className="text-green-600 hover:text-green-900">
                                                            ดาวน์โหลด
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                                                ไม่พบข้อมูล
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Component */}
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex-1 flex justify-between sm:hidden">
                                    <button
                                        className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                        ก่อนหน้า
                                    </button>
                                    <button
                                        className="ml-3 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                        ถัดไป
                                    </button>
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            แสดง
                                            <span className="font-medium">1</span> ถึง <span
                                            className="font-medium">{sparePartList.length}</span> จาก <span
                                            className="font-medium">
                                                {sparePartList.meta?.total || sparePartList.length}
                                                </span> รายการ
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                             aria-label="Pagination">
                                            <button
                                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <span className="sr-only">ก่อนหน้า</span>
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd"
                                                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            </button>
                                            <button
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                1
                                            </button>
                                            <button
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                                                2
                                            </button>
                                            <button
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                3
                                            </button>
                                            <button
                                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <span className="sr-only">ถัดไป</span>
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd"
                                                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
