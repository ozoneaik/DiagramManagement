import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

interface CsvDataItem {
    [key: string]: string;
}

export default function DMImportCSV() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFileName, setSelectedFileName] = useState<string>("");
    const [csvData, setCsvData] = useState<CsvDataItem[]>([]);
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event.target.files?.[0];
            if (!file) return;

            setSelectedFileName(file.name);

            const reader = new FileReader();

            reader.onload = (e) => {
                const csvContent = e.target?.result as string;
                if (csvContent) {
                    const parsedData = parseCSV(csvContent);
                    setCsvData(parsedData);
                    console.log("Parsed CSV Data:", parsedData);
                }
            };

            reader.onerror = (error) => {
                console.error("Error reading file:", error);
            };

            reader.readAsText(file);
        } catch (error) {
            alert("เกิดข้อผิดพลาดในการอ่านไฟล์ CSV กรุณาลองใหม่อีกครั้ง");
        }
    };

    // Function to parse CSV and convert to array with A1 as key
    const parseCSV = (csvContent: string): CsvDataItem[] => {
        // Split CSV content into rows
        const rows = csvContent.split(/\r?\n/).filter(row => row.trim() !== '');

        // Extract headers
        const headers = rows[0].split(',').map(header => header.trim());

        const result: CsvDataItem[] = [];

        // Process data rows
        for (let i = 1; i < rows.length; i++) {
            const values = rows[i].split(',').map(value => value.trim());

            // Skip empty rows
            if (values.length !== headers.length) continue;

            // Create object with A1 column as key
            const rowObject: CsvDataItem = {};

            // Use first column (A1) as key
            const key = values[0];

            // Add all columns to the object
            headers.forEach((header, index) => {
                rowObject[header] = values[index];
            });

            // Add object to result array with A1 as key
            result.push(rowObject);
        }

        return result;
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted with data:", csvData);
        alert("บันทึกข้อมูลสำเร็จ");
        router.post(route('diagrams.store.csv', { csvData }))
    }

    const { flash } = usePage().props;
    console.log(flash);
    

    return (
        <AuthenticatedLayout header='นำเข้าข้อมูลจากไฟล์ไดอะแกรม CSV'>
            <Head title="นำเข้าข้อมูลจากไฟล์ไดอะแกรม CSV" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-end items-center space-y-4 gap-3">
                                {selectedFileName && (
                                    <div className="text-sm text-gray-600 mb-2">
                                        ไฟล์ที่เลือก: {selectedFileName}
                                    </div>
                                )}

                                <input
                                    type="file"
                                    id="csvFileInput"
                                    ref={fileInputRef}
                                    accept=".csv"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />

                                <PrimaryButton
                                    onClick={triggerFileInput}
                                    className="flex items-center gap-2 bg-lime-600"
                                >
                                    <FontAwesomeIcon icon={faFileCsv} fontSize="24px" />
                                    เลือกไฟล์ CSV
                                </PrimaryButton>

                                <PrimaryButton onClick={handleSubmit} disabled={csvData.length === 0}>
                                    <FontAwesomeIcon icon={faFloppyDisk} fontSize="24px" />
                                    บันทึก
                                </PrimaryButton>
                            </div>
                            {flash.success && (
                                <div className="mt-3 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                    <span className="block sm:inline">{flash.success}</span>
                                </div>
                            )}

                            {csvData.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-medium text-gray-700">ข้อมูลที่นำเข้า</h3>
                                    <div className="mt-2 overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    {Object.keys(csvData[0]).map((header, index) => (
                                                        <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            {header}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {csvData.map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        {Object.values(row).map((value, valueIndex) => (
                                                            <td key={valueIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {value}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}