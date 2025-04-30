import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";

export default function DmmImportCSV(){
    return (
        <Authenticated header={'นำเข้าไฟล์ CSV'}>
            <Head title={'นำเข้าไฟล์ CSV'}/>
            นำเข้าไฟล์ CSV
        </Authenticated>
    )
}
