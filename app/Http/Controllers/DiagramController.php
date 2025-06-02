<?php

namespace App\Http\Controllers;

use App\Http\Requests\DiagramListRequest;
use App\Models\DiagramList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DiagramController extends Controller
{
    public function index()
    {
        $diagramList = DiagramList::paginate(100);
        return Inertia::render('Diagrams/DmMain', [
            'diagramList' => $diagramList,
        ]);
    }
    public function create()
    {
        return Inertia::render('Diagrams/DmForm');
    }
    public function store(DiagramListRequest $request)
    {
        try {

            // ตรวจสอบข้อมูลที่ส่งมาจากฟอร์ม
            $validatedData = $request->all();
    
            $test = DiagramList::query()->first();
            // ตรวจสอบว่า SKU Code นี้มีอยู่แล้วหรือไม่
            $existingDiagram = DiagramList::query()->where('sku_code', $validatedData['sku_code'])
            ->where('dm_type', $validatedData['dm_type'])
            ->where('path_file', $validatedData['url'])
            ->where('layer', $validatedData['layer'])
            ->first();


            if ($existingDiagram) {
                return redirect()->back()
                    ->withInput()
                    ->withErrors(['sku_code' => 'รหัสสินค้าและประเภท DM นี้มีอยู่ในระบบแล้ว']);
            }

            // สร้างข้อมูลใหม่
            $diagramList = new DiagramList();
            $diagramList->sku_code = $validatedData['sku_code'];
            $diagramList->dm_type = $validatedData['dm_type'];
            $diagramList->path_file = $validatedData['url'];
            $diagramList->layer = $validatedData['layer'];

            // บันทึกข้อมูล
            $diagramList->save();

            // ส่งกลับไปหน้ารายการพร้อมข้อความสำเร็จ
            return redirect()->back()->with('success', 'เพิ่มรายการ Diagram สำเร็จแล้ว');
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error('Diagram Store Error: ' . $e->getMessage());
            // จัดการข้อผิดพลาดการเชื่อมต่อฐานข้อมูล
            $errorCode = $e->errorInfo[1];

            // ตรวจสอบ error code สำหรับข้อผิดพลาดที่พบบ่อย
            if ($errorCode == 1062) { // Duplicate entry error
                return redirect()->back()
                    ->withInput()
                    ->withErrors(['database' => 'มีข้อมูลนี้ในระบบแล้ว กรุณาตรวจสอบอีกครั้ง']);
            }

            // กรณีข้อผิดพลาดอื่นๆ เกี่ยวกับฐานข้อมูล
            return redirect()->back()
                ->withInput()
                ->withErrors(['database' => 'เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง']);
        } catch (\Exception $e) {
            // จัดการข้อผิดพลาดทั่วไป
            Log::error('Diagram Store Error: ' . $e->getMessage());

            return redirect()->back()
                ->withInput()
                ->withErrors(['general' => 'เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้งหรือติดต่อผู้ดูแลระบบ']);
        }
    }


    public function createCsv()
    {
        return Inertia::render('Diagrams/DMImportCSV');
    }

    public function storeCsv(Request $request){
        $request->validate([
            'csvData' => 'required|array',
        ]);
        $csvData = $request->csvData;
        foreach ($csvData as $key => $value) {
            DiagramList::query()->create([
                'sku_code' => $value['sku_code'],
                'dm_type' => $value['dm_type'],
                'path_file' => $value['path_file'],
                'layer' => $value['layer'],
            ]);
        }
        return redirect()->back()->with('success', 'เพิ่มรายการ Diagram สำเร็จแล้ว');
    }
}
